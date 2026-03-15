## shadcn Registry Index Submission

Prepared against the current official directory source:

- `https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/directory.json`

The official directory entries currently use this shape:

- `name`
- `homepage`
- `url`
- `description`
- `logo`

Important detail:

- `logo` is not a URL in the official file.
- It is an inline SVG string embedded directly in `directory.json`.

Prepared payload:

- [shadcn-registry-directory-entry.json](/Users/sabraman/sandbox/sabraman.ru/shadcn-registry-directory-entry.json)

Logo source:

- [logo.svg](/Users/sabraman/sandbox/sabraman.ru/public/logo.svg)

Notes:

- The submission payload uses the shape from `public/logo.svg`.
- The fills were converted from the hardcoded gray to `var(--foreground)` so the logo behaves like the existing logos in shadcn's directory.
- The registry URL is `https://sabraman.ru/r/{name}.json`, which matches the live registry configuration in this repo.
