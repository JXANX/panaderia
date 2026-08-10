# AGENTS.md

## Overview
Single-page site for **Vainilla y Chocolate**, an artisan bakery brand in Mar de Ajó, Buenos Aires, Argentina. Next.js 14 (App Router) statically exported to Cloudflare Pages. All content is in Spanish (`lang="es"`) — keep new copy in Spanish. No tests, no CI workflows; `next build` is the only typecheck.

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
- Tailwind v3 theme in `tailwind.config.ts`: 7 brand colors driven by CSS variables in `globals.css` (hex + RGB channels for opacity). Semantic tokens: `cream` `#FFF7E6` (background), `vanilla` `#F5E6C8` (surface/cards), `beige` `#EAD7B5` (border/divisors), `caramel` `#D7B48A` (accent/hover/awning), `milk` `#A87C5A` (muted text/icons/structural strokes), `choc` `#6B4B3E` (primary text/buttons), `cacao` `#3B2A23` (headings/max contrast/dark sections). Override via the variables in `globals.css`, never hardcode hex literals in components. Never use pure white or pure black.
- **Light theme**: `body` is `bg-cream text-cacao`. Sections use brand textures from `globals.css`: `awning-stripes`, `tile-grid`, `basket-weave`, `paper-grain`. Never use glassmorphism. Buttons/CTAs use `bg-choc`/`bg-cacao` with `hover:bg-caramel hover:text-cacao`; borders use beige, subtle.
- **Sharp corners everywhere**: no `rounded-*` — buttons, cards, tags, images and plates are square by brand rule.
- Motion stack: GSAP + Lenis (`smooth-scroll.tsx`) + ScrollTrigger + SplitType (via `useGSAP` in `@gsap/react`). Shared `useSectionReveal` hook (`src/components/use-section-reveal.ts`); the hero opening sequence lives in `hero.tsx` (block (d)); the menu animation lives in `nav.tsx` (block (e)). All animation is gated behind `prefers-reduced-motion`. Icons via `react-icons` (Tabler) — do NOT reintroduce `lucide-react`, it was deliberately replaced.
- The design-aesthetics skills live at `.agents/skills/frontend-design/SKILL.md` and `.agents/skills/frontend-no-ia/SKILL.md`; follow them when making visual changes.

## Gotchas
- `out/`, `.next/`, `next-env.d.ts`, `.wrangler` are gitignored — don't commit build output.
- `.npmrc` sets `legacy-peer-deps=true` — run `npm install`, not `npm ci`.
- Brand: Vainilla y Chocolate, an artisan bakery in Mar de Ajó, Buenos Aires, Argentina. Products with real prices, story of 3 generations since 1974, daily bake at 6:30. Keep copy in that voice (plain, artisanal, active voice).
- The palette is exact per the brand brief — don't invent new colors.
