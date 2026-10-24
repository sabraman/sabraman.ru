# Implementation Plan — Agent Discovery & Markdown-for-Agents

- **Spec:** `docs/superpowers/specs/2026-06-20-agent-discovery-design.md`
- **Plan date:** 2026-06-20
- **Status:** Ready for implementation

Implementation is ordered so each step is independently verifiable and the highest-leverage item lands first. Each workstream ends with its own verification before moving on.

---

## Workstream 1 — Content Signals

**Files:** delete `src/app/robots.ts`; add `src/app/robots.txt/route.ts`.

### Step 1.1 — Create the manual robots.txt route

- New file `src/app/robots.txt/route.ts` exporting a `GET` handler.
- Body text reproduces the **exact** rules currently in `src/app/robots.ts` (user agents: `*`, `Yandex`, `Googlebot`, `Bingbot`, `YandexBot`, `GPTBot`, `ClaudeBot`, `PerplexityBot`; `User-agent: *` allows `/` and disallows `/api/`, `/trpc/`; `Yandex` gets `Crawl-delay: 1`), then appends:
  - An empty line separator, then `Content-Signal: ai-train=yes, search=yes, ai-input=yes`
  - `Host: https://sabraman.ru`
  - `Sitemap: https://sabraman.ru/sitemap.xml`
- Use `SITE_URL` from `~/lib/site-config` for `Host`/`Sitemap` (do not hardcode).
- Headers: `Content-Type: text/plain; charset=utf-8`, `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`.

### Step 1.2 — Delete `src/app/robots.ts`

- Next supports either the typed convention or the route, not both. Removing `robots.ts` prevents a build conflict.

### Step 1.3 — Verify

- `bun run dev`, then:
  - `curl -s http://localhost:3000/robots.txt` contains every user-agent block and the `Content-Signal:` line.
  - `curl -s -I http://localhost:3000/` shows NO `Content-Signal` header (robots isolation confirmed).
  - `curl -s -I http://localhost:3000/robots.txt` shows `Content-Type: text/plain`.

---

## Workstream 2 — Markdown for Agents

**Files:** edit `src/proxy.ts`; add `src/lib/seo/markdown-for-agents.ts`; add tests.

### Step 2.1 — Build the markdown generator (pure, no Next deps)

- New `src/lib/seo/markdown-for-agents.ts` exporting:
  ```ts
  export interface MarkdownForAgentsResult {
  	body: string;
  	tokens: number;
  }
  export function renderMarkdownForAgents(
  	pathname: string,
  ): MarkdownForAgentsResult | null;
  ```
- **Locale resolution:** strip a leading `/ru` → `ru`; otherwise `en` (matches `routing` default-unprefixed English). Validate the leading segment against `routing.locales`; if the first segment is neither a locale nor absent, return `null`.
- **Route table** (derive data from existing modules — no new content):
  | Path match | Source |
  |---|---|
  | `/`, `/ru` | `getStaticIndexableContentEntry("home")` title+description; link list of featured case studies from `getCaseStudyIndexableContentEntries()` |
  | `/work`, `/ru/work` | Work index title+desc; bulleted links to all case studies (`pathEn`) |
  | `/components`, `/ru/components` | Components index title+desc; bulleted links from `getComponentDocIndexableContentEntries()` |
  | `/blog`, `/ru/blog` | Blog index title+desc; bulleted links from `getBlogPostIndexableContentEntries()` |
  | `/iphone`, `/ru/iphone` | Title + one-line "interactive simulator; see HTML version" summary |
  | `/{caseStudy}` (canonical, e.g. `/vaparshop`) | Title + description + related-project links. Resolve via `getCaseStudyIndexableContentEntries()` `pathEn` match. |
  | `/blog/{post}` | Serialize `BlogBlock[]` → markdown: `heading`→`#`/`##`, `paragraph`→text, `bullets`→`- `, `quote`→`> `, `callout`→`> **{kind}**: ...` |
  | `/components/{slug}` | **Reuse** `renderComponentDocMarkdown(doc)` from `~/components/legacy/docs/component-doc-markdown`. Resolve doc via `getComponentDocBySlug`. |
  | anything else | `null` |
- Links use the requested locale's path (prepend `/ru` for Russian). Bodies include an H1 title and a footer line: `_Source: sabraman.ru — markdown rendering for agents. HTML is the canonical version._`.
- `tokens = Math.round(body.length / 4)`.

### Step 2.2 — Unit-test the generator (`vitest`)

- New `src/lib/seo/markdown-for-agents.test.ts`:
  - `/` → non-null, contains home title, contains ≥1 case-study link, `tokens > 0`.
  - `/ru` → Russian title present.
  - `/work` → contains every case-study `pathEn`.
  - `/components/{known-slug}` → delegates to renderer, non-empty.
  - `/blog/{known-post}` → contains a heading and paragraph from that post's blocks.
  - `/iphone` → one-line summary, no crash.
  - `/nope` → `null`.
  - `/ru/work` → Russian locale, links prefixed `/ru/`.

### Step 2.3 — Wire negotiation into `src/proxy.ts`

- Import `renderMarkdownForAgents`.
- Replace `export default createMiddleware(routing);` with a wrapper:
  ```ts
  const intlMiddleware = createMiddleware(routing);
  export default function proxy(req: NextRequest) {
  	const accept = req.headers.get("accept") ?? "";
  	if (accept.includes("text/markdown")) {
  		const result = renderMarkdownForAgents(req.nextUrl.pathname);
  		if (result) {
  			return new NextResponse(result.body, {
  				status: 200,
  				headers: {
  					"Content-Type": "text/markdown; charset=utf-8",
  					"x-markdown-tokens": String(result.tokens),
  					Vary: "Accept",
  					"Cache-Control":
  						"public, s-maxage=3600, stale-while-revalidate=86400",
  				},
  			});
  		}
  	}
  	return intlMiddleware(req);
  }
  ```
- Extend the matcher exclusion to add `well-known`:
  `matcher: "/((?!api|trpc|_next|_vercel|opengraph-image|well-known|.*\\..*).*)"`
  (so `.well-known` routes are never intercepted).

### Step 2.4 — Verify

- `curl -s -H 'Accept: text/markdown' http://localhost:3000/work` → `200`, `Content-Type: text/markdown; charset=utf-8`, `Vary: Accept`, `x-markdown-tokens` present, body has case-study links.
- `curl -s -H 'Accept: text/markdown' http://localhost:3000/ru/work` → Russian locale body.
- `curl -s http://localhost:3000/work` (no Accept) → `200`, `Content-Type: text/html` (default preserved).
- `curl -s -H 'Accept: text/markdown' http://localhost:3000/iphone` → summary body.
- `curl -s http://localhost:3000/.well-known/api-catalog` → still served (not intercepted) — checked again in WS4.

---

## Workstream 3 — Agent Skills discovery index

**Files:** add `src/lib/seo/agent-skills.ts`; add `src/app/.well-known/agent-skills/index.json/route.ts`; add tests.

### Step 3.1 — Skill builder (pure)

- New `src/lib/seo/agent-skills.ts` exporting:
  ```ts
  export interface AgentSkillEntry {
  	name: string;
  	type: "guide";
  	description: string;
  	url: string;
  	sha256: string;
  }
  export function getAgentSkillsIndex(): {
  	$schema: string;
  	skills: AgentSkillEntry[];
  };
  ```
- Iterate `getAllComponentDocs()`; for each doc:
  - `markdown = await renderComponentDocMarkdown(doc)` (note: async).
  - `sha256` via `node:crypto` `createHash("sha256").update(markdown).digest("hex")`.
  - `name = doc.slug`, `type = "guide"`, `description = doc.frontmatter.description`, `url = toAbsoluteSiteUrl("/components/" + doc.slug + ".mdx")`.
- `$schema = "https://agentskills.io/schemas/agent-skills-index.json"`.

### Step 3.2 — Unit-test

- New `src/lib/seo/agent-skills.test.ts`:
  - `skills.length === getAllComponentDocs().length`.
  - Each entry has all 5 fields; `sha256` is 64-char hex; `url` ends `.mdx`.
  - Recompute one digest independently and assert equality (tamper check).

### Step 3.3 — Route

- New `src/app/.well-known/agent-skills/index.json/route.ts`, `export async function GET()`:
  - `const data = await getAgentSkillsIndex(); return NextResponse.json(data, { headers: { "Cache-Control": "...", "Content-Type": "application/json; charset=utf-8" } });`

### Step 3.4 — Verify

- `curl -s http://localhost:3000/.well-known/agent-skills/index.json | head` → valid JSON, `$schema` + `skills` array; every entry well-formed.

---

## Workstream 4 — API Catalog (RFC 9727)

**Files:** add `src/app/.well-known/api-catalog/route.ts`.

### Step 4.1 — Route

- `export function GET()` returns `application/linkset+json`:
  ```json
  {
  	"linkset": [
  		{
  			"anchor": "https://sabraman.ru/llms.txt",
  			"service-desc": [
  				{ "href": "https://sabraman.ru/llms.txt", "type": "text/plain" }
  			],
  			"service-doc": [{ "href": "https://sabraman.ru/" }]
  		},
  		{
  			"anchor": "https://sabraman.ru/.well-known/agent-skills/index.json",
  			"service-desc": [
  				{
  					"href": "https://sabraman.ru/.well-known/agent-skills/index.json",
  					"type": "application/json"
  				}
  			]
  		},
  		{
  			"anchor": "https://sabraman.ru/.well-known/api-catalog",
  			"service-desc": [
  				{
  					"href": "https://sabraman.ru/.well-known/api-catalog",
  					"type": "application/linkset+json"
  				}
  			]
  		},
  		{
  			"anchor": "https://sabraman.ru/api/component-docs/{slug}",
  			"service-desc": [
  				{
  					"href": "https://sabraman.ru/api/component-docs/{slug}",
  					"type": "text/markdown"
  				}
  			],
  			"service-doc": [{ "href": "https://sabraman.ru/components/{slug}" }]
  		}
  	]
  }
  ```
- No `status` relation (no health endpoint; documented in WS5). Build anchors from `SITE_URL`.
- Headers: `Content-Type: application/linkset+json; charset=utf-8`, same `Cache-Control`.

### Step 4.2 — Verify

- `curl -s http://localhost:3000/.well-known/api-catalog` → valid `linkset+json`, `linkset` array, `Content-Type` correct.

---

## Workstream 5 — Documentation (DNS runbook + N/A note)

**Files:** add `docs/agent-discovery/dns-aid-runbook.md`; add `docs/agent-discovery/not-applicable.md`.

### Step 5.1 — DNS-AID runbook

- Sections per spec §5.5: exact SVCB/HTTPS records (`_index._agents` and `_a2a._agents`), field explanations, DNSSEC enablement + DS record, `dig`/`delv` verification commands, and a plain statement that these are out-of-repo DNS records.

### Step 5.2 — Not-applicable note

- Per spec §3/§5.5: for OAuth/OIDC discovery, OAuth Protected Resource Metadata, `auth.md`, MCP Server Card, WebMCP — state the prerequisite (auth server / MCP server), why fabricating metadata is a hazard, and the upgrade path with RFC/spec links (8414, 9728, SEP-1649, WorkOS auth.md, WebMCP). Also note `status` relation is omitted from the API catalog for the same reason.

---

## Final verification

- `bun run check` (oxlint + oxfmt) passes.
- `bun run typecheck` passes.
- `bun run test:unit` passes (new tests for markdown generator + agent-skills).
- Manual curl matrix from each workstream's Verify step, run against `bun run dev`.
- `git status` shows only the intended new/changed files staged (no accidental sweep) — stage explicitly by path before any commit.

## Definition of done

1. `/robots.txt` contains the `Content-Signal` line; HTML responses do not.
2. `Accept: text/markdown` returns structured-data markdown for content routes; HTML is default otherwise; `Vary: Accept` set.
3. `/.well-known/agent-skills/index.json` is valid, every entry has `sha256`.
4. `/.well-known/api-catalog` is valid `linkset+json`.
5. DNS runbook + N/A note exist and accurately describe the in/out-of-scope rationale.
6. Lint, typecheck, and unit tests green.
