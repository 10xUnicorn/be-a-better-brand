# Build Notes — Be a Better Brand

## Assumptions
- Supabase project creation blocked: Knight Ops org has overdue invoices. Full schema SQL is ready in `supabase/schema.sql`. Once billing is resolved, create the project and run the migration.
- Stripe, Resend, and AI integrations use placeholder env vars. Real keys needed before going live.
- Logo references the Knight Ops Supabase storage bucket (public URL).
- Owner account = Chrissy Bernal (first signup gets owner role via trigger).

## Blockers
1. **Supabase billing** — Resolve overdue invoices at https://supabase.com/dashboard → Knight Ops org → Invoices, then create a new project named "Be a Better Brand" in us-west-1.
