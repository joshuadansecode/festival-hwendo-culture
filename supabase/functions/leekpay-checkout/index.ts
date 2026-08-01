import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { ...corsHeaders, 'Content-Type': 'application/json' },
});

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  try {
    const body = await request.json();
    const quantity = Number(body.quantity);
    const participantId = String(body.participant_id || '');
    const rawPhone = String(body.voter_phone || '').replace(/[\s-]/g, '');
    const voterPhone = rawPhone.startsWith('+')
      ? rawPhone
      : rawPhone.startsWith('229')
        ? `+${rawPhone}`
        : `+229${rawPhone}`;
    const voterName = String(body.voter_name || 'Anonyme').trim();
    const customerEmail = body.customer_email ? String(body.customer_email).trim() : undefined;

    if (!participantId || !Number.isInteger(quantity) || quantity < 1 || !voterPhone) {
      return json({ error: 'Données de vote invalides.' }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );
    const { data: config } = await supabase.from('voting_config').select('*').eq('id', true).maybeSingle();
    if (!config?.is_voting_open) return json({ error: 'Les votes sont fermés.' }, 409);
    if (quantity < config.min_votes_per_purchase) return json({ error: `Minimum : ${config.min_votes_per_purchase} vote(s).` }, 400);

    const { data: participant } = await supabase.from('participants')
      .select('id,name,number,vote_active')
      .eq('id', participantId)
      .maybeSingle();
    if (!participant?.vote_active) return json({ error: 'Ce participant ne reçoit pas de votes.' }, 409);

    const amount = quantity * config.price_per_vote_fcfa;
    const receiptNumber = `REC-HW2026-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const appUrl = (Deno.env.get('PUBLIC_APP_URL') || '').replace(/\/$/, '');
    const webhookUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/leekpay-webhook`;

    // LeekPay only accepts public HTTPS return URLs. During localhost testing,
    // omit them; payment confirmation still arrives through the HTTPS webhook.
    const redirectUrls = appUrl.startsWith('https://')
      ? {
          return_url: `${appUrl}/vote/success`,
          cancel_url: `${appUrl}/vote/cancelled`,
        }
      : {};

    const secretKey = Deno.env.get('LEEKPAY_SECRET_KEY');
    if (!secretKey) return json({ error: 'La clé secrète LeekPay manque côté serveur.' }, 500);

    const checkoutResponse = await fetch('https://leekpay.fr/api/v1/checkout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency: 'XOF',
        description: `Votes pour ${participant.name} - ${quantity} vote(s)`,
        ...redirectUrls,
        webhook_url: webhookUrl,
        customer_name: voterName,
        customer_phone: voterPhone,
        customer_email: customerEmail,
        metadata: { participant_id: participantId, quantity, receipt_number: receiptNumber },
      }),
    });
    const checkout = await checkoutResponse.json();
    if (!checkoutResponse.ok || !checkout.data?.id || !checkout.data?.payment_url) {
      console.error('LeekPay checkout error', checkout);
      const validationDetails = checkout?.errors && typeof checkout.errors === 'object'
        ? Object.values(checkout.errors).flat().join(' ')
        : '';
      const upstreamMessage = validationDetails || checkout?.message || checkout?.error || checkout?.errors?.[0]?.message;
      return json({
        error: upstreamMessage
          ? `LeekPay : ${String(upstreamMessage)}`
          : `LeekPay a refusé le checkout (HTTP ${checkoutResponse.status}).`,
      }, 502);
    }

    const { error: insertError } = await supabase.from('vote_transactions').insert({
      receipt_number: receiptNumber,
      participant_id: participantId,
      quantity,
      price_per_vote_fcfa: config.price_per_vote_fcfa,
      total_amount_fcfa: amount,
      voter_name: voterName,
      voter_phone: voterPhone,
      payment_method: 'Carte Bancaire',
      status: 'en_attente',
      transaction_ref: checkout.data.id,
      checkout_id: checkout.data.id,
      leekpay_status: checkout.data.status || 'pending',
    });
    if (insertError) return json({ error: 'Le paiement a été créé mais son suivi n’a pas pu être enregistré.' }, 500);

    return json({ checkout_id: checkout.data.id, payment_url: checkout.data.payment_url, receipt_number: receiptNumber });
  } catch (error) {
    console.error(error);
    return json({ error: 'Erreur interne.' }, 500);
  }
});
