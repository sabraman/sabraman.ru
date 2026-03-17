# SEO Architecture

## Source of truth

- `src/lib/site-config.ts` defines the canonical site URL, owner metadata, locales, and public social/contact references.
- `src/lib/seo/content-registry.ts` normalizes indexable content into one registry for:
  - static indexable pages
  - case studies
  - component docs

## Route-level metadata

- `src/lib/projects/case-study-seo.ts` owns case-study metadata and JSON-LD for both generic and dedicated project routes.
- `src/lib/seo/component-doc-seo.ts` owns component-doc metadata and TechArticle JSON-LD.
- Collection routes such as `/work` and `/components` read from `content-registry.ts` for both metadata copy and `CollectionPage` item lists.

## Discovery endpoints

- `src/app/sitemap.ts` reads the registry-backed route list and emits localized URLs with alternates and `lastModified` when content provides it.
- `src/app/llms.txt/route.ts` reads the same registry so AI-facing canonical URLs match the sitemap.
- `src/app/robots.ts` uses the shared canonical site URL and exposes the sitemap location.

## Content metadata

- Case-study freshness fields live in `src/data/project-case-studies.ts`.
- Component-doc freshness and keyword metadata live in `src/content/components/*.mdx` and are parsed by `src/components/legacy/docs/component-documents.ts`.

The route layer should stay thin: resolve params, call the appropriate SEO helper, render the page.

## Lint And Rendering Exceptions

- Prefer `next/image` for ordinary user-facing content where width, height, and responsive behavior are stable.
- Keep raw `<img>` only for exact-rendering legacy chrome, OG or screenshot capture surfaces, or tracking pixels that require a plain image element.
- Every retained raw `<img>` use should include a precise Biome ignore reason at the render boundary or go through a tiny helper that centralizes that justification.
- `!important` is forbidden in app styles. If the cascade needs help, fix the selector or move the behavior into component logic instead.
- Biome ignores are acceptable only when a framework rule conflicts with a deliberate rendering or tooling constraint and the comment explains that constraint directly.
