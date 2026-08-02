import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json' },
});

const timingSafeEqual = (a: string, b: string) => {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let index = 0; index < a.length; index += 1) result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  return result === 0;
};

Deno.serve(async (request) => {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  const rawBody = await request.text();
  const signature = request.headers.get('X-LeekPay-Signature') || '';
  const publicKey = Deno.env.get('LEEKPAY_PUBLIC_KEY') || '';
  const expected = await crypto.subtle.sign(
    'HMAC',
    await crypto.subtle.importKey('raw', new TextEncoder().encode(publicKey), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']),
    new TextEncoder().encode(rawBody),
  );
  const expectedSignature = [...new Uint8Array(expected)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
  if (!timingSafeEqual(expectedSignature, signature)) return json({ error: 'Invalid signature' }, 401);

  try {
    const payload = JSON.parse(rawBody);
    const payment = payload.data;
    const checkoutId = payment?.checkout_id;
    if (!checkoutId) return json({ error: 'Missing checkout id' }, 400);

    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const { data: transaction } = await supabase.from('vote_transactions').select('*').eq('checkout_id', checkoutId).maybeSingle();
    if (!transaction) return json({ error: 'Transaction not found' }, 404);
    if (transaction.status === 'reussi') return json({ ok: true, duplicate: true });

    const paid = payment.status === 'paid';
    const failed = ['failed', 'cancelled', 'expired'].includes(payment.status);
    const nextStatus = paid ? 'reussi' : failed ? 'echoue' : 'en_attente';
    const { data: updatedTransaction, error: updateError } = await supabase.from('vote_transactions').update({
      status: nextStatus,
      leekpay_status: payment.status,
      transaction_ref: payment.transaction_id || checkoutId,
      payment_method_label: payment.payment_method || payment.method || null,
    }).eq('id', transaction.id).eq('status', 'en_attente').select('id').maybeSingle();
    if (updateError) return json({ error: 'Transaction update failed' }, 500);

    // Another webhook delivery already handled this checkout.
    if (!updatedTransaction) return json({ ok: true, duplicate: true });

    if (paid) {
      const { error: voteError } = await supabase.rpc('settle_vote_transaction', { transaction_id: transaction.id });
      if (voteError) return json({ error: 'Vote settlement failed' }, 500);
    }
    return json({ ok: true });
  } catch (error) {
    console.error(error);
    return json({ error: 'Invalid webhook' }, 400);
  }
});
