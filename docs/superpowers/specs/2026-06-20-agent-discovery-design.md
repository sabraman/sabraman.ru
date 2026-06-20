# Agent Discovery & Markdown-for-Agents — Design

- **Date:** 2026-06-20
- **Site:** sabraman.ru (Next.js 16 / React 19, `next-intl`, locales `en`/`ru`, no auth, static-exportable marketing/portfolio)
- **Status:** Approved design (pending implementation)
- **Scope approved:** "Recommended set" — Group A (code) + Group B (DNS runbook). Group C documented as intentionally N/A. Group D (WebMCP) deferred.

## 1. Goal

Make `sabraman.ru` discoverable and consumable by AI agents. Implement the checklist items that genuinely apply to a static portfolio, and honestly document the ones that presuppose infrastructure this site does not have (an auth server, an MCP server).

Guiding principle: **every published artifact is honest.** No fabricated OAuth endpoints, no invented MCP server, no lossy HTML scraping. Markdown, skills, and the catalog all derive from data that already exists in the codebase.

## 2. Background — what already exists

| Existing | Location | Relevance |
|---|---|---|
| AI-bot allow rules in robots | `src/app/robots.ts` | GPTBot/ClaudeBot/PerplexityBot already allowed |
| `llms.txt` | `src/app/llms.txt/route.ts` | LLM-facing index; reused as a catalog entry |
| Component docs served as markdown | `src/app/api/component-docs/[slug]/route.ts` → `text/markdown` | Reused for both Markdown-for-Agents and the skills index |
| Content registry | `src/lib/seo/content-registry.ts` | Structured titles/descriptions/slugs/paths for all indexable content — the data source for markdown generation |
| Blog data | `src/data/blog.ts` (`BlogBlock[]`) | Block-structured blog posts; serializable to markdown |
| Site config | `src/lib/site-config.ts` | `SITE_URL`, social links, owner info |

No middleware exists today. No `.well-known/` routes exist. No authentication, OAuth, or MCP server.

## 3. Scope

### In scope (implemented)

1. **Content Signals** — `Content-Signal` directive in robots.txt
2. **Markdown for Agents** — `Accept: text/markdown` negotiation returning structured-data markdown
3. **Agent Skills discovery index** — `/.well-known/agent-skills/index.json`
4. **API Catalog (RFC 9727)** — `/.well-known/api-catalog`
5. **DNS-AID runbook** — documentation of DNS records to publish out-of-repo

### Out of scope (intentionally not implemented)

- OAuth/OIDC discovery (`/.well-known/openid-configuration`, `/.well-known/oauth-authorization-server`)
- OAuth Protected Resource Metadata (`/.well-known/oauth-protected-resource`)
- `auth.md` (agent registration)
- MCP Server Card (`/.well-known/mcp/server-card.json`)
- WebMCP (`navigator.modelContext.*`)

Reason: these presuppose an auth server and/or a running MCP server. `sabraman.ru` has neither. Publishing them would mean fabricating `token_endpoint`, `jwks_uri`, `authorization_servers`, MCP `serverInfo`, etc. — a correctness and anti-phishing hazard. See §8 for the documented rationale and upgrade path.

## 4. Architecture

Five workstreams. New/changed files:

| # | Workstream | Files |
|---|---|---|
| 1 | Content Signals | **delete** `src/app/robots.ts`, **add** `src/app/robots.txt/route.ts` |
| 2 | Markdown for Agents | **add** `src/middleware.ts`, **add** `src/lib/seo/markdown-for-agents.ts` |
| 3 | Agent Skills index | **add** `src/app/.well-known/agent-skills/index.json/route.ts`, **add** `src/lib/seo/agent-skills.ts` |
| 4 | API Catalog | **add** `src/app/.well-known/api-catalog/route.ts` |
| 5 | Documentation | **add** `docs/agent-discovery/dns-aid-runbook.md`, **add** `docs/agent-discovery/not-applicable.md` |

### `.well-known` and the `[locale]` segment

App routes live under `src/app/[locale]/`, but `.well-known` endpoints **must** be at the site root (no `/en/.well-known/...`). They live at `src/app/.well-known/...` (sibling to `src/app/[locale]`), which Next.js serves at the root — correct. The middleware **must skip** all `/.well-known/` paths so they are served verbatim.

## 5. Workstream detail

### 5.1 Content Signals

**Decision:** replace the typed `src/app/robots.ts` (`MetadataRoute.Robots`) with a manual `src/app/robots.txt/route.ts` returning the full text. Next's typed convention cannot emit the non-standard `Content-Signal` directive; Next supports **either** `robots.ts` **or** `robots.txt/route.ts`, not both, so `robots.ts` is deleted.

**Content:** identical rules to today (user agents: `*`, `Yandex`, `Googlebot`, `Bingbot`, `YandexBot`, `GPTBot`, `ClaudeBot`, `PerplexityBot`; allow `/`, disallow `/api/`, `/trpc/`), plus:

```
Content-Signal: ai-train=yes, search=yes, ai-input=yes
```

Fully permissive (approved). Aligns with the existing explicit allow rules for AI bots.

**Headers:** `Content-Type: text/plain; charset=utf-8`, `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`.

**Verification:** `Content-Signal` appears only in `/robots.txt`; not present in any HTML response (confirms robots isolation).

### 5.2 Markdown for Agents

**Negotiation** — new `src/middleware.ts`:
1. Skip non-GET, and skip paths starting with `/api/`, `/trpc/`, `/_next/`, `/.well-known/`, plus static asset extensions.
2. Parse the `Accept` header; if `text/markdown` is acceptable (any quality value), call the generator; otherwise pass through (HTML stays default — the core requirement).
3. If the generator returns a body: respond `200` with markdown headers. If it returns `null` (route has no meaningful markdown): pass through to HTML.

**Generator** — `src/lib/seo/markdown-for-agents.ts`, a pure function:

```
renderMarkdownForAgents(pathname: string): { body: string; tokens: number } | null
```

Locale resolved from the leading path segment (`/ru/...` → `ru`, unprefixed → `en`), per the existing `routing` config.

| Route | Markdown source |
|---|---|
| `/`, `/work`, `/components`, `/blog` | Title + description + bulleted list of child links (case studies / component docs / posts) from `content-registry.ts` |
| `/iphone` | Title + one-line summary (the simulator is non-textual) |
| `/{caseStudy}` | Case-study summary: title, description, related-project links. Canonical case-study paths come from `getCaseStudyIndexableContentEntries().pathEn` (e.g. `/vaparshop`). Note `/work/{slug}` is a 308 redirect to `/{slug}`; the generator keys on the canonical `/{slug}` path. |
| `/blog/{post}` | Full blog body serialized from `BlogBlock[]` → markdown (headings, paragraphs, bullets, quotes, callouts) |
| `/components/[slug]` | **Reuse** `renderComponentDocMarkdown(doc)` from `component-doc-markdown.ts` |
| Anything else | `null` → pass through to HTML |

**Response headers:**
- `Content-Type: text/markdown; charset=utf-8`
- `x-markdown-tokens: <approx>` — token estimate = `Math.round(body.length / 4)`
- `Vary: Accept` — **critical**, so CDNs don't serve markdown to browsers
- `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`

### 5.3 Agent Skills discovery index

**Endpoint:** `GET /.well-known/agent-skills/index.json` → `src/app/.well-known/agent-skills/index.json/route.ts`.

**Content** (Agent Skills Discovery RFC v0.2.0): a `skills` array; each entry has `name`, `type`, `description`, `url`, `sha256`. One entry per component doc, reusing the markdown the component-docs route already serves.

```json
{
  "$schema": "https://agentskills.io/schemas/agent-skills-index.json",
  "skills": [
    {
      "name": "legacy-switch",
      "type": "guide",
      "description": "Install and use the legacy skeuomorphic switch component.",
      "url": "https://sabraman.ru/components/legacy-switch.mdx",
      "sha256": "<sha256 hex of the rendered markdown body>"
    }
  ]
}
```

**Digest logic** (`src/lib/seo/agent-skills.ts`): iterate `getAllComponentDocs()`; for each, call `renderComponentDocMarkdown(doc)`, hash with `node:crypto` (`sha256`, hex). `name` = the doc slug; `type` = `"guide"`; `description` = `frontmatter.description`; `url` = `toAbsoluteSiteUrl("/components/" + slug + ".mdx")`.

**Caching:** request-time computation with `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`; `Content-Type: application/json; charset=utf-8`.

### 5.4 API Catalog (RFC 9727)

**Endpoint:** `GET /.well-known/api-catalog` → `src/app/.well-known/api-catalog/route.ts`.

**Content:** `application/linkset+json` with a `linkset` array. Each entry has an `anchor` and link relations `service-desc`, `service-doc`, and `status` **where applicable**. Entries derive from existing endpoints:

| anchor | service-desc | service-doc | status |
|---|---|---|---|
| `https://sabraman.ru/llms.txt` | itself (`text/plain`) | `/` | omitted |
| `https://sabraman.ru/.well-known/agent-skills/index.json` | itself | — | omitted |
| `https://sabraman.ru/.well-known/api-catalog` | itself (self-referential, per RFC) | — | omitted |
| `https://sabraman.ru/api/component-docs/{slug}` | itself | `/components/{slug}` | omitted |

**`status` relation:** RFC 9727 lists `status` as the health endpoint. `sabraman.ru` has none. Rather than fabricate one, the `status` relation is **omitted**. This is conformant (relations are optional) and honest; the omission is documented in `not-applicable.md`. If a health endpoint is added later, this is the single field to append.

**Headers:** `Content-Type: application/linkset+json; charset=utf-8`, `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`.

### 5.5 Documentation (Group B runbook + Group C note)

**`docs/agent-discovery/dns-aid-runbook.md`** — DNS records live outside the repo. A copy-pasteable runbook to apply at the DNS provider:

1. **SVCB/HTTPS records** (RFC 9460), ServiceMode, with `alpn` and `endpoint` params:
   - `_index._agents.sabraman.ru.  HTTPS 1 . alpn=h2 endpoint=https://sabraman.ru/.well-known/agent-skills/index.json`
   - `_a2a._agents.sabraman.ru.  HTTPS 1 . alpn=h2 endpoint=https://sabraman.ru/`
   - Field explanations: priority `1`; target name; ServiceMode vs AliasMode; `alpn=h2`; `endpoint` param carrying the agent entrypoint URL.
2. **DNSSEC** — enable at the registrar, publish the DS record, verify. Provider-specific notes for common registrars (Reg.ru, Beget, Cloudflare).
3. **Verification commands:** `dig HTTPS _index._agents.sabraman.ru +short`, `dig +dnssec sabraman.ru DS`, `delv`.
4. Plain statement that these are DNS/infrastructure records the Next.js app cannot publish.

**`docs/agent-discovery/not-applicable.md`** — for each out-of-scope item (OAuth/OIDC discovery, OAuth Protected Resource Metadata, `auth.md`, MCP Server Card, WebMCP): the checklist's own fix text presupposes an auth server or MCP server; the site has neither; fabricating discovery metadata is a hazard; upgrade path (the exact endpoints to create + RFC links: 8414, 9728, SEP-1649, WorkOS auth.md, WebMCP spec) when the prerequisite infrastructure is added.

## 6. Testing & verification

**Unit tests** (`vitest`):
- `markdown-for-agents.ts`: home (returns body with title + child links), `/components/{slug}` (delegates to existing renderer), `/blog/{post}` (serializes blocks), `/iphone` (one-line summary), `/{caseStudy}` (canonical path), an unmapped route (returns `null`), and locale resolution for `/ru/...`.
- `agent-skills.ts`: digest is correct sha256 hex, `name` derives from slug, required fields present, non-empty for the real component docs.

**Manual curl checks:**
- `curl -H 'Accept: text/markdown' http://localhost:3000/work` → `200`, `Content-Type: text/markdown`, `Vary: Accept` present, `x-markdown-tokens` present.
- `curl http://localhost:3000/work` (no Accept) → `200`, `Content-Type: text/html` (default preserved).
- `curl http://localhost:3000/.well-known/agent-skills/index.json` → valid JSON; every entry has `name`, `type`, `description`, `url`, `sha256`.
- `curl http://localhost:3000/.well-known/api-catalog` → valid `linkset+json`.
- `curl http://localhost:3000/robots.txt` → contains `Content-Signal:` line; `Content-Signal` absent from `/` HTML.

**Lint/typecheck:** `bun run check`, `bun run typecheck` pass.

## 7. Out of scope (recap)

OAuth/OIDC discovery, OAuth Protected Resource Metadata, `auth.md`, MCP Server Card, WebMCP, and the actual DNS record application. Rationale and upgrade paths in §3, §5.5, §8.

## 8. Open questions / risks

- **`robots.ts` → `robots.txt/route.ts` migration:** deleting the typed convention is a deliberate trade to emit `Content-Signal`. Risk: if any tooling depends on the `robots.ts` file specifically, it must move. Mitigation: the manual route emits byte-identical rules plus the new directive; verified by curl.
- **`Vary: Accept` correctness:** if the edge CDN ignores `Vary`, browsers could receive markdown. Mitigation: header is set on every markdown response; documented in the runbook as a CDN setting to verify at deploy time.
- **Markdown is a structured-data summary, not a full render:** intentional, given the site is highly visual/interactive. A future enhancement could add richer per-case-study markdown bodies sourced from case-study data.
