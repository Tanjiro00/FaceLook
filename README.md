# FaceLook

**AI-Powered Virtual Try-On for Cosmetic Procedures**

Upload a selfie, choose a procedure (rhinoplasty, lip fillers, botox, etc.), and get a photorealistic AI-generated result in ~10 seconds. Not morphing — real generative AI.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), TailwindCSS v4, shadcn/ui |
| Auth | Supabase Auth (email + Google OAuth) |
| Database | Supabase PostgreSQL with RLS |
| Payments | Stripe (subscriptions + checkout + webhooks) |
| AI Pipeline | fal.ai — FLUX Kontext Pro → CodeFormer → Real-ESRGAN |
| Rate Limiting | Upstash Redis |
| State | Zustand |

## Quick Start (Development)

```bash
# 1. Clone
git clone git@github.com:Tanjiro00/FaceLook.git
cd FaceLook

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.local.example .env.local
# Fill in your keys (see Environment Variables below)

# 4. Run database migration
# Go to Supabase Dashboard → SQL Editor → paste contents of:
# supabase/migrations/001_initial_schema.sql

# 5. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Docker Deployment

```bash
# 1. Configure environment
cp .env.local.example .env.local
# Fill in your keys

# 2. Build and run
docker compose up -d --build

# 3. Check health
docker compose ps
```

The app will be available at `http://localhost:3000`.

### Production (VPS / Cloud)

```bash
# With custom port
PORT=8080 docker compose up -d --build

# View logs
docker compose logs -f app

# Restart
docker compose restart

# Stop
docker compose down
```

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

| Variable | Required | Where to get |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase → Settings → API (secret!) |
| `FAL_KEY` | Yes* | [fal.ai/dashboard/keys](https://fal.ai/dashboard/keys) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | No** | Stripe → Developers → API Keys |
| `STRIPE_SECRET_KEY` | No** | Stripe → API Keys |
| `STRIPE_WEBHOOK_SECRET` | No** | Stripe → Webhooks |
| `UPSTASH_REDIS_REST_URL` | No | [console.upstash.com](https://console.upstash.com) |
| `UPSTASH_REDIS_REST_TOKEN` | No | Upstash Redis dashboard |

\* Set `USE_MOCK_AI=true` to run without fal.ai (returns original photo as result).

\** Payments are disabled without Stripe keys; the app works in free-tier mode.

## Database Migration

Run in **Supabase SQL Editor** (Dashboard → SQL Editor → New Query):

```
File: supabase/migrations/001_initial_schema.sql
```

This creates:
- `profiles` table (extends auth.users, tracks subscription & usage)
- `generations` table (stores generation history)
- RLS policies (users can only access their own data)
- Trigger to auto-create profile on sign-up
- Functions for usage tracking and monthly reset

### Storage Setup

Create a `generations` bucket in Supabase Storage, then run:

```sql
create policy "Users can upload own images"
  on storage.objects for insert
  with check (
    bucket_id = 'generations' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can read own images"
  on storage.objects for select
  using (
    bucket_id = 'generations' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );
```

## Project Structure

```
src/
├── app/
│   ├── (marketing)/          Landing page, pricing, privacy, terms
│   ├── (auth)/               Login, signup
│   ├── (app)/                Dashboard, generate, history (protected)
│   └── api/                  generate, checkout, webhooks, auth callback
├── components/
│   ├── landing/              Hero, HowItWorks, Demo slider, Pricing, CTA
│   ├── app/                  Sidebar, Dashboard, GenerateFlow, History
│   ├── shared/               Navbar, Footer, BeforeAfterSlider
│   └── ui/                   shadcn/ui components
├── lib/
│   ├── ai/                   AI pipeline (FLUX Kontext + CodeFormer + ESRGAN)
│   ├── supabase/             Client, server, middleware
│   ├── stripe/               Client, server
│   ├── validators/           Zod schemas
│   └── rate-limit.ts         Upstash Redis rate limiting
├── config/                   Procedures, pricing plans, site config
├── hooks/                    Zustand store
└── types/                    TypeScript types
```

## AI Pipeline

```
Selfie → Face Validation → Prompt Engineering → FLUX Kontext Pro → CodeFormer → [Real-ESRGAN] → Result
         (client-side)      (procedure→prompt)   (image editing)    (face fix)    (HD upscale)
```

- **FLUX Kontext Pro**: Instruction-based editing with identity preservation
- **CodeFormer**: Face restoration to fix AI artifacts
- **Real-ESRGAN**: 2x upscale for premium users
- **Cost**: ~$0.05–$0.08 per generation (standard), ~$0.08–$0.12 (premium with upscale)

## Monetization

| Plan | Price | Generations |
|---|---|---|
| Free | $0 | 3 (with watermark) |
| Basic | $9.99/mo | 30/month |
| Premium | $24.99/mo | 100/month + HD + clinic matching |
| Pay-per-use | $1.99 | 5 pack |

## License

Proprietary. All rights reserved.
