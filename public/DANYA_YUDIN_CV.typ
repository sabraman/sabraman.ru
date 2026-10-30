#set page(
  paper: "a4",
  margin: (x: 15mm, top: 11mm, bottom: 11mm),
)

#set text(
  font: ("Helvetica Neue", "Arial", "PT Sans"),
  size: 8.8pt,
  fill: rgb("#1e293b"),
  spacing: 110%,
  lang: "en",
)

#set par(
  leading: 0.51em,
  justify: false,
)

// Brand colors
#let primary = rgb("#0f172a")
#let secondary = rgb("#334155")
#let muted = rgb("#64748b")
#let border = rgb("#cbd5e1")
#let accent = rgb("#0369a1")

#show link: it => text(fill: accent)[#it.body]

// Section header component
#let section(title) = {
  v(8pt)
  text(size: 8.8pt, weight: "bold", fill: primary, tracking: 1.2pt)[#upper(title)]
  v(2.5pt)
  line(length: 100%, stroke: 0.5pt + rgb("#e2e8f0"))
  v(4.5pt)
}

// Entry header (Company / Role / Location / Date)
#let entry(title, subtitle, location, period) = {
  grid(
    columns: (1fr, auto),
    gutter: 10pt,
    [
      #text(weight: "bold", size: 9.2pt, fill: primary)[#title]
      #text(fill: border)[ — ]
      #text(weight: "medium", size: 8.8pt, fill: secondary)[#subtitle]
      #if location != "" [ #text(fill: border)[ | ] #text(size: 8.3pt, fill: muted)[#location] ]
    ],
    [
      #text(size: 8.4pt, fill: muted)[#period]
    ]
  )
  v(3pt)
}

// Custom bullet list
#set list(
  marker: text(fill: rgb("#94a3b8"), size: 6.5pt)[•],
  spacing: 3.1pt,
  indent: 1pt,
  body-indent: 5pt,
)

// Header
#align(center)[
  #text(size: 18pt, weight: "bold", fill: primary, tracking: 0.5pt)[Danya Yudin]
  
  #v(2pt)
  #text(size: 10pt, weight: "medium", fill: secondary)[Full-Stack & Systems Engineer]
  #text(size: 9pt, fill: muted)[ (TypeScript · Rust · Next.js · C/C++)]
  
  #v(3.5pt)
  #text(size: 8.5pt, fill: muted)[
    Saint Petersburg, Russia
    #text(fill: border)[ #h(4pt) • #h(4pt) ]
    #link("mailto:sabraman@ya.ru")[sabraman\@ya.ru]
    #text(fill: border)[ #h(4pt) • #h(4pt) ]
    #link("https://t.me/sabraman")[Telegram \@sabraman]
    #text(fill: border)[ #h(4pt) • #h(4pt) ]
    #link("https://github.com/sabraman")[github.com/sabraman]
    #text(fill: border)[ #h(4pt) • #h(4pt) ]
    #link("https://sabraman.art/work")[sabraman.art/work]
  ]
]

#v(1pt)

// Profile
#section("Profile")
Full-stack and systems engineer building high-craft user interfaces, developer tools, and low-level software. Experienced across #strong[TypeScript, Rust, Next.js, C/C++, Swift, and Python]: from hardware & media internals (MIPS C++ on Sony PSP, C e-paper drivers, WebCodecs, BLE/SOAP reverse-engineering) to production web applications (Next.js, Telegram Mini Apps, open-source Tailwind plugins, DuckDB OLAP). Focused on performance, developer tooling, and offline-first product engineering.

// Technical Skills
#section("Technical Skills")
#grid(
  columns: (auto, 1fr),
  column-gutter: 14pt,
  row-gutter: 4.5pt,
  text(weight: "bold", fill: secondary)[Languages], [TypeScript, JavaScript, Rust, C++, C, Swift, Python, SQL],
  text(weight: "bold", fill: secondary)[Web & Interfaces], [Next.js, React, Tailwind CSS, custom plugins, Motion, Radix UI, Canvas, Vite],
  text(weight: "bold", fill: secondary)[Systems & Hardware], [Rust (Frankenstein, Ureq, Rusqlite), C++ (SDL2, MIPS), C (E-paper / Embedded), Swift (macOS)],
  text(weight: "bold", fill: secondary)[Data & Backends], [Node.js, Bun, DuckDB (OLAP), PostgreSQL, SQLite, MS SQL, Redis, REST & SOAP APIs],
  text(weight: "bold", fill: secondary)[Tooling & Dev], [WebCodecs, WebAssembly (Wasm), BLE Reverse Engineering, Telegram Mini Apps, Docker, Proxmox VE],
)

// Work Experience
#section("Work Experience")

#entry("DAARIA TRANS", "Lead Systems Architect & IT Consultant", "Remote", "09/2026 – 10/2026")
- Reverse-engineered proprietary #strong[TMS Logister] SOAP protocol (\~90 RPC endpoints) without disrupting live freight dispatches.
- Built automated email order ingestion pipeline, extracting transport parameters and cutting booking latency by 60%.
- Modeled combinatorial backhaul consolidation, achieving 4.9% freight procurement cost reduction on northern return legs.
- Architected high-availability #strong[Proxmox VE] cluster hosting dispatcher VDI workstations provisioned via Golden Image in 15 minutes.
- Implemented 4-tier disaster recovery: 3-hour VSS snapshots, automated DB dumps, nightly vzdump images, and Vaultwarden.

#v(5pt)
#entry("VAPARSHOP", "Full-Stack Developer & Product Designer", "Saint Petersburg", "06/2024 – 03/2025")
- Shipped #strong[Telegram Mini App] on Next.js integrating GetMeBack loyalty API, QR verification, shift logging, and gamified staff onboarding.
- Built #strong[Price Tag Printer] web tool with Excel/Google Sheets parsing, bulk editing, and instant print/PDF export for 1,000+ SKUs.
- Automated cash drawer reconciliation and shift handoffs via Telegram bots, eliminating manual managerial audits and safe variances.
- Developed an in-house Taplink CMS alternative in #strong[Next.js] with dynamic blogs, interactive retail map widgets, and SEO optimization.

#v(5pt)
#entry("HORNY PLACE", "Visual Designer & Frontend Developer", "Saint Petersburg", "10/2022 – 05/2024")
- Engineered high-conversion event landing page on #strong[Next.js] with seamless #strong[Ticketscloud] ticketing widget integration.
- Designed comprehensive retail brand system and guidelines covering digital UI, offline touchpoints, and print collateral.
- Built reusable modular component library in Figma translated directly into clean CSS/Tailwind frontend primitives.

// Selected Projects
#section("Selected Projects")
- #strong[Kwork Parser & Pinterest Bot] #text(fill: muted)[(Rust, Frankenstein, SQLite)] -- Memory-efficient event monitors and Telegram forwarders optimized for minimal VPS memory footprints.
- #strong[PSP Video Web] #text(fill: muted)[(TypeScript, WebCodecs, MediaBunny)] -- In-browser hardware video transcode pipeline with WebCodecs, USB auto-detection, and Sony PSP storage management.
- #strong[PSP Book Reader] #text(fill: muted)[(C++, SDL2, MIPS Optimization)] -- Native EPUB/TXT reader engineered for Sony PlayStation Portable hardware with dual-stage caching and battery optimization.
- #strong[Spritefusion Pixel Snapper] #text(fill: muted)[(Rust, Image Processing, Wasm)] -- Open-source Rust CLI and library for pixel art quantization and palette mapping with k-means color clustering.
- #strong[SleepOff] #text(fill: muted)[(Swift, macOS)] -- Native macOS menu bar application managing system sleep states with display dimming when laptop lid is closed.
- #strong[Tailwindcss-Rounbit] #text(fill: muted)[(TypeScript, Tailwind Plugin API)] -- Open-source Tailwind CSS plugin generating authentic pixel-art rounded corners for retro interfaces.
- #strong[Price Tag Printer] #text(fill: muted)[(Next.js, TypeScript, Canvas, Print CSS)] -- Open-source price tag generator parsing messy spreadsheet tables with custom template rendering and PDF generation.
