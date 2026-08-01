# Festival HWENDO-CULTURE

Site officiel du Festival HWENDO-CULTURE, consacré à la promotion, à la préservation et à la transmission des cultures endogènes béninoises.

Le projet présente notamment :

- Miss ENDO-CULTURE
- La Nuit de l'Élégance Africaine
- Le match de gala HWENDO
- Les participants et les archives du festival
- Une plateforme sécurisée de votes en ligne
- Un espace d'administration connecté à Supabase

## Technologies

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Supabase Auth, Database, Storage et Edge Functions
- LeekPay pour les paiements

## Installation

Prérequis : Node.js 20 ou supérieur.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Le serveur local est accessible sur `http://localhost:3000`.

## Variables publiques

Configurer dans `.env.local` :

```env
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-publishable-key"
```

Ne jamais placer de clé `service_role` ou de clé secrète LeekPay dans le frontend.

## Vérification

```bash
npm run lint
npm run build
```

## Supabase

Les migrations, seeds et Edge Functions se trouvent dans `supabase/`.

Les secrets LeekPay doivent être configurés dans Supabase Edge Functions :

- `LEEKPAY_SECRET_KEY`
- `LEEKPAY_PUBLIC_KEY`
- `PUBLIC_APP_URL`
