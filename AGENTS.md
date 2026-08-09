# AGENTS.md

## Overview
Single-page site for **La Espiga Verde**, an artisan bakery brand. Next.js 14 (App Router) statically exported to Cloudflare Pages. All content is in Spanish (`lang="es"`) — keep new copy in Spanish. No tests, no CI workflows; `next build` is the only typecheck.

## Commands
- `npm run dev` — dev server
- `npm run build` — static export to `out/` (type-checks; no separate `typecheck` script)
- `npm run lint` — `next lint` (uses `.eslintrc.json`, `next/core-web-vitals`)
- `npm run deploy` — `npx wrangler pages deploy out`; **build first**, `out/` must exist. Deploys to Cloudflare Pages per `wrangler.toml` (`pages_build_output_dir = "out"`)

## Architecture
- `output: 'export'` in `next.config.mjs` — fully static. No API routes, SSR, or dynamic data fetching. `images.unoptimized: true`.
- Single entry: `src/app/page.tsx` composes `Nav`, `Hero`, `Marquee`, `Products`, `Story`, `Corner`, `Footer` from `src/components/*`.
- `src/app/layout.tsx` mounts global `SmoothScroll` (Lenis), `CustomCursor`, and a `.noise-overlay` div. Keep these wrappers when touching layout.
- Path alias `@/*` → `./src/*`; import components as `@/components/...`.
- Fonts: `next/font/google` (`Fraunces`, `Archivo`, `DM_Mono`) bundled at build time into CSS variables `--font-display`, `--font-sans`, `--font-mono`; consumed via Tailwind classes `font-display`, `font-sans`, `font-mono`. Display type = `font-display` (Fraunces).
- The reference project `artisan-bakery-brand/` is a design reference ONLY — it's excluded from the build in `tsconfig.json` (`exclude: ["artisan-bakery-brand"]`) and was built with a different stack (Next 16, Tailwind v4, lucide, pnpm). Never import from it.

## Styling conventions
- Tailwind v3 theme in `tailwind.config.ts`: 8 brand colors driven by CSS variables in `globals.css` (hex + RGB channels for opacity): `green` `#4f8853`, `ink` `#1d190e`, `brown` `#685839`, `beige` `#bfa895`, `gold` `#987f53`, `olive` `#3c3c23`, `paper` `#efe7db`, `cream` `#e4d7c4`. Override via the variables in `globals.css`, never hardcode hex literals in components.
- **Light theme**: `body` is `bg-paper text-ink`. Sections use brand textures from `globals.css`: `awning-stripes`, `tile-grid`, `basket-weave`, `paper-grain`. Never use glassmorphism.
- **Sharp corners everywhere**: no `rounded-*` — buttons, cards, tags, images and plates are square by brand rule.
- Motion stack: GSAP + Lenis (`smooth-scroll.tsx`) + ScrollTrigger + SplitType (via `useGSAP` in `@gsap/react`). Shared `useSectionReveal` hook (`src/components/use-section-reveal.ts`); the hero opening sequence lives in `hero.tsx` (block (d)); the menu animation lives in `nav.tsx` (block (e)). All animation is gated behind `prefers-reduced-motion`. Icons via `react-icons` (Tabler) — do NOT reintroduce `lucide-react`, it was deliberately replaced.
- The design-aesthetics skills live at `.agents/skills/frontend-design/SKILL.md` and `.agents/skills/frontend-no-ia/SKILL.md`; follow them when making visual changes.

## Gotchas
- `out/`, `.next/`, `next-env.d.ts`, `.wrangler` are gitignored — don't commit build output.
- `.npmrc` sets `legacy-peer-deps=true` — run `npm install`, not `npm ci`.
- Brand: La Espiga Verde, an artisan bakery. Products with real prices, story of 3 generations since 1974, corner at Calle del Horno 12 (Barrio de las Letras), daily bake at 6:30. Keep copy in that voice (plain, artisanal, active voice).
- The palette is exact per the brand brief — don't invent new colors.
