# sabraman.ru

Personal site and portfolio for Danya Yudin (Sabraman). The app combines case studies, services pages, reusable legacy UI component docs, and a localized App Router setup for English and Russian URLs.

## Stack

- Next.js 16.1
- React 19
- TypeScript 5
- Tailwind CSS 4
- next-intl for localized routing
- shadcn/ui and Radix primitives
- Motion / Framer Motion for animation
- Biome for linting and formatting
- Bun for package management and script execution

## Commands

```bash
bun install
bun run dev
bun run typecheck
bun run check
```

Additional project scripts:

- `bun run og:capture` regenerates component social preview images.
- `bun run cv:pdfs` regenerates CV PDFs from the source docs.
- `bun run registry:build` rebuilds the component registry payloads.
