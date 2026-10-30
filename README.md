# sabraman.art

Personal site and portfolio for Danya Yudin (Sabraman). The app combines localized case studies, a work hub, a blog, reusable legacy UI component docs, an interactive iOS showcase, and a homepage contact section across English and Russian routes.

## Stack

- Next.js 16 (App Router, Cache Components, Turbopack)
- React 19
- TypeScript 7
- Tailwind CSS 4
- next-intl for localized routing (EN / RU)
- shadcn/ui and Radix primitives
- Motion / Framer Motion for animation
- oxlint + oxfmt for linting and formatting
- Vitest for unit tests
- Bun for package management and script execution

## Commands

```bash
bun install
bun run dev
bun run typecheck
bun run check
bun run test:unit
```

Additional project scripts:

- `bun run og:capture` regenerates component social preview images.
- `bun run cv:pdfs` regenerates CV PDFs from the source docs.
- `bun run registry:build` rebuilds the component registry payloads.
- `bun run generate-favicons` regenerates favicon assets.

## Routes

- `/` and `/ru` render the localized homepage.
- `/work` and `/ru/work` render the work hub.
- `/components` and `/ru/components` render the legacy component docs hub.
- `/blog` and `/ru/blog` render the blog, posts under `/blog/[slug]`.
- `/iphone` renders the interactive iOS lock-screen portfolio showcase.
- `/legal/[slug]` renders legal information pages.
- Project case studies live under localized slugs such as `/vaparshop` and `/ru/vaparshop`.

## Environment

No custom application environment variables are currently required. The repo validates only `NODE_ENV` via `src/env.js`.
