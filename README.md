# sabraman.ru

Personal site and portfolio for Danya Yudin (Sabraman). The app combines localized case studies, a work hub, reusable legacy UI component docs, and a homepage contact section across English and Russian routes.

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

## Routes

- `/` and `/ru` render the localized homepage.
- `/work` and `/ru/work` render the work hub.
- `/components` and `/ru/components` render the legacy component docs hub.
- Project case studies live under localized slugs such as `/ru/vaparshop`.

## Environment

No custom application environment variables are currently required. The repo validates only `NODE_ENV` via `src/env.js`.
