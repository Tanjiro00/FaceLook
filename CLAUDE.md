# FaceLook - AI Cosmetic Visualization Platform

## Stack
- **Frontend:** Next.js 16 (App Router) + React 19 + TypeScript 5 + Tailwind CSS v4
- **UI:** shadcn/ui (Base Nova style) + Lucide icons + next-themes (dark mode)
- **State:** Zustand 5
- **Backend:** Supabase (PostgreSQL + Auth + Storage) with RLS
- **Payments:** Stripe (subscriptions + pay-per-use)
- **AI Pipeline:** fal.ai (FLUX Kontext Pro -> CodeFormer -> Real-ESRGAN)
- **Rate Limiting:** Upstash Redis
- **Face Detection:** MediaPipe (client-side)
- **Deploy:** Docker (multi-stage, node:20-alpine)

## Project Structure
```
src/
  app/
    (marketing)/     - Landing pages (public)
    (auth)/          - Login/signup pages
    (app)/           - Protected routes (dashboard, generate, history)
    api/             - API routes (auth, generate, checkout, webhooks, waitlist)
  components/
    app/             - App components (sidebar, dashboard, generate-flow, history)
    landing/         - Marketing components (hero, pricing, FAQ, etc.)
    shared/          - Shared (navbar, footer, before-after-slider)
    ui/              - shadcn/ui components
  lib/
    ai/              - AI pipeline (fal.ai orchestration, face detection)
    supabase/        - Supabase clients (browser/server) + middleware
    stripe/          - Stripe clients
    validators/      - Zod schemas
    rate-limit.ts    - Upstash rate limiter
  config/            - Procedures config, site metadata
  hooks/             - Zustand store
  types/             - TypeScript interfaces
supabase/migrations/ - SQL migrations (schema + waitlist)
```

## Commands
- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - ESLint

## Key Patterns
- Route groups: `(marketing)`, `(auth)`, `(app)` for layout separation
- Supabase RLS enforces per-user data isolation
- AI pipeline: face detection (client) -> prompt engineering -> FLUX Kontext Pro -> CodeFormer restore -> HD upscale (premium)
- Middleware handles auth refresh + security headers
- `USE_MOCK_AI=true` env var skips real AI calls for dev

## Tiers
- Free: 3 generations, watermark
- Basic ($9.99/mo): 30 generations
- Premium ($24.99/mo): 100 generations + HD upscale
- Pay-per-use ($1.99): 5-pack

## Database
- `profiles` - user subscription, generation limits, Stripe IDs
- `generations` - generation history with status tracking
- `waitlist_entries` - waitlist signups

## Style Guide
- Tailwind CSS v4 with OKLch color variables in globals.css
- shadcn/ui components with Base Nova style
- Dark mode support via next-themes
- Use `cn()` utility from `@/lib/utils` for class merging

---

## Autonomous Testing & Improvement Workflow

### Available Tools

| Tool | Type | Purpose |
|---|---|---|
| **Playwright** | CLI (`npx playwright`) | Browser automation, screenshots, E2E tests |
| **context7** | MCP (cloud) | Fetch latest docs for any library |
| **figma** | MCP (cloud) | Read Figma designs, convert to code |
| **Bash** | Built-in | Run build, lint, dev server, curl, any CLI |

### Autonomous QA Workflow

When asked to test or improve the app, follow this sequence:

#### Phase 1: Pre-flight Checks
1. `npm run build` — catch TypeScript/build errors
2. `npm run lint` — catch code quality issues
3. Start dev server: `npm run dev` (background)

#### Phase 2: E2E Testing with Playwright
Write and run Playwright tests via CLI:

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/landing.spec.ts

# Run with headed browser (debug)
npx playwright test --headed

# Screenshot a page
npx playwright screenshot http://localhost:3000 screenshot.png

# Test specific viewport
npx playwright test --viewport-size=375,812
```

**Test coverage targets:**
- Landing page: hero, pricing, CTA, nav links, responsive
- Auth: `/login`, `/signup` — form validation, redirects, OAuth button
- App: `/dashboard`, `/generate`, `/history` — protected routes, data display
- Edge: 404 page, dark mode toggle, external links

#### Phase 3: Database Validation
- Read `supabase/migrations/*.sql` — verify schema
- Cross-check migration SQL with TypeScript types in `src/types/`
- Grep for hardcoded Supabase URLs or keys in client code

#### Phase 4: Security Audit
- Grep for `SUPABASE_SERVICE_ROLE` in client-side code (must be server-only)
- Verify middleware security headers (X-Frame-Options, CSP, etc.)
- Check API routes validate auth before processing
- Verify rate limiting on `/api/generate`
- Check Stripe webhook signature verification
- `grep -r "secret\|password\|token" --include="*.ts" --include="*.tsx"` for leaks

#### Phase 5: Performance & SEO
- `curl -s http://localhost:3000 | grep -E '<meta|<title|og:'` — check meta tags
- Verify `robots.txt`, `sitemap.xml` exist
- Check `next/image` usage (no raw `<img>` tags)
- `npm run build` output — check bundle sizes

### Autonomous Improvement Workflow

#### 1. Fetch Latest Docs First
Use **context7** MCP before making changes:
- `resolve-library-id` → `query-docs` for up-to-date API patterns
- Prevents using deprecated APIs

#### 2. Design Reference
If Figma URL is provided:
- Use **figma** `get_design_context` to extract design specs
- Match to existing shadcn/ui components
- Map tokens to project's OKLch color variables

#### 3. Code Changes
- Edit existing files (prefer Edit over Write)
- Follow project patterns (see Style Guide above)
- Use existing UI components from `src/components/ui/`
- Validate with `npm run build` after changes

#### 4. Post-Change Verification
- `npm run build && npm run lint`
- `npx playwright test` — run E2E suite
- `npx playwright screenshot` — visual diff for user review

### Key Testing URLs
```
http://localhost:3000          - Landing page
http://localhost:3000/login    - Auth: login
http://localhost:3000/signup   - Auth: signup
http://localhost:3000/dashboard - App: dashboard (protected)
http://localhost:3000/generate  - App: generate (protected)
http://localhost:3000/history   - App: history (protected)
http://localhost:3000/privacy   - Legal: privacy policy
http://localhost:3000/terms     - Legal: terms of service
```

### Testing Checklist
```
[ ] Build passes (npm run build)
[ ] Lint passes (npm run lint)
[ ] Playwright E2E tests pass
[ ] Landing page renders (desktop + mobile)
[ ] Auth flows work (login, signup, logout)
[ ] Generate flow: upload -> select -> generate -> result
[ ] History page loads past generations
[ ] Dark mode works across all pages
[ ] API routes return correct status codes
[ ] Security headers present
[ ] No hardcoded secrets in client code
[ ] Responsive (375px, 768px, 1024px, 1440px)
```
