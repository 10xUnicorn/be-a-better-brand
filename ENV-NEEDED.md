# Environment Variables Needed

## Supabase (create project first — blocked by billing)
- `NEXT_PUBLIC_SUPABASE_URL` — Project URL from Supabase dashboard
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` — Service role key (server-side only)

## Stripe
- `STRIPE_SECRET_KEY` — From Stripe dashboard (test mode)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Publishable key
- `STRIPE_WEBHOOK_SECRET` — From Stripe webhook setup

## Resend
- `RESEND_API_KEY` — From Resend dashboard

## AI
- `AI_API_KEY` — Anthropic or OpenAI API key

## App
- `NEXT_PUBLIC_APP_URL` — Deployed URL (e.g., https://be-a-better-brand.vercel.app)
- `CRON_SECRET` — Random secret for cron job verification
