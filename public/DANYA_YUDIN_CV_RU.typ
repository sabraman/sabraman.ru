#set page(
  paper: "a4",
  margin: (x: 15mm, top: 11mm, bottom: 11mm),
)

#set text(
  font: ("Helvetica Neue", "Arial", "PT Sans"),
  size: 8.7pt,
  fill: rgb("#1e293b"),
  spacing: 110%,
  lang: "ru",
)

#set par(
  leading: 0.50em,
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
  v(7pt)
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
      #text(weight: "bold", size: 9.1pt, fill: primary)[#title]
      #text(fill: border)[ — ]
      #text(weight: "medium", size: 8.7pt, fill: secondary)[#subtitle]
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
  spacing: 3.0pt,
  indent: 1pt,
  body-indent: 5pt,
)

// Header
#align(center)[
  #text(size: 18pt, weight: "bold", fill: primary, tracking: 0.5pt)[Даня Юдин]
  
  #v(2pt)
  #text(size: 10pt, weight: "medium", fill: secondary)[Full-Stack & Systems Engineer]
  #text(size: 9pt, fill: muted)[ (TypeScript · Rust · Next.js · C/C++)]
  
  #v(3.5pt)
  #text(size: 8.5pt, fill: muted)[
    Санкт-Петербург, Россия
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
#section("Профиль")
Full-stack и systems инженер, создающий выразительные интерфейсы, инструменты разработчика и системное ПО. Стек: #strong[TypeScript, Rust, Next.js, C/C++, Swift и Python] -- от низкоуровневых протоколов и медиа (C++ под MIPS на Sony PSP, C-драйверы E-paper, WebCodecs, реверс BLE и SOAP) до веб-продуктов (Next.js, Telegram Mini Apps, open-source плагины для Tailwind, DuckDB OLAP). Фокусируюсь на производительности, инструментах разработки и автономных архитектурах.

// Technical Skills
#section("Технические навыки")
#grid(
  columns: (auto, 1fr),
  column-gutter: 14pt,
  row-gutter: 4.5pt,
  text(weight: "bold", fill: secondary)[Языки], [TypeScript, JavaScript, Rust, C++, C, Swift, Python, SQL],
  text(weight: "bold", fill: secondary)[Веб и интерфейсы], [Next.js, React, Tailwind CSS, плагины Tailwind, Motion, Radix UI, Canvas, Vite],
  text(weight: "bold", fill: secondary)[Системы и железо], [Rust (Frankenstein, Ureq, Rusqlite), C++ (SDL2, MIPS), C (E-paper / Embedded), Swift (macOS)],
  text(weight: "bold", fill: secondary)[Данные и бэкенд], [Node.js, Bun, DuckDB (OLAP), PostgreSQL, SQLite, MS SQL, Redis, REST и SOAP API],
  text(weight: "bold", fill: secondary)[Инструменты и Dev], [WebCodecs, WebAssembly (Wasm), реверс BLE, Telegram Mini Apps, Docker, Proxmox VE],
)

// Work Experience
#section("Опыт работы")

#entry("ДААРИЯ-ТРАНС", "Ведущий системный архитектор и IT-консультант", "Удалённо", "09/2026 – 10/2026")
- Провёл реверс-инжиниринг проприетарного SOAP-протокола (\~90 RPC-методов) и внутренних API системы #strong[TMS Logister] без остановки рейсов.
- Собрал автоматизированный почтовый конвейер, парсящий транспортные заявки из корпоративной почты и ускоривший обработку на 60%.
- Разработал алгоритм комбинаторной склейки спаренных рейсов («Обратка»), снизивший затраты на наёмный транспорт на 4.9%.
- Развернул отказоустойчивый серверный кластер на #strong[Proxmox VE] с VDI-образами рабочих мест диспетчеров из Golden Image за 15 минут.
- Внедрил 4-уровневую систему «Самосохранение» (VSS-снимки каждые 3 часа, скриптовые бэкапы баз, ночные vzdump-образы и Vaultwarden).

#v(4.5pt)
#entry("VAPARSHOP", "Full-Stack разработчик и продуктовый дизайнер", "Санкт-Петербург", "06/2024 – 03/2025")
- Разработал и запустил #strong[Telegram Mini App] на Next.js с интеграцией GetMeBack API, QR-картами лояльности, учетом смен и геймификацией.
- Создал инструмент #strong[Price Tag Printer] для парсинга Excel/Google Sheets, массового редактирования и генерации ценников в PDF/HTML для 1000+ SKU.
- Автоматизировал сверку кассы и закрытие смен через Telegram-ботов, сократив время закрытия на 40% при нулевых расхождениях по сейфу.
- Спроектировал и развернул CMS-альтернативу Taplink на #strong[Next.js] с блогом, интерактивной картой торговых точек и локальным SEO.

#v(4.5pt)
#entry("HORNY PLACE", "Визуальный дизайнер и frontend-разработчик", "Санкт-Петербург", "10/2022 – 05/2024")
- Разработал посадочную страницу событий на #strong[Next.js] с бесшовной интеграцией билетного виджета #strong[Ticketscloud].
- Спроектировал полную систему айдентики бренда (брендбук, цифровые интерфейсы, полиграфия, офлайн-носители).
- Собрал дизайн-систему в Figma с прямой трансляцией в чистые UI-компоненты на Tailwind CSS.

// Selected Projects
#section("Избранные проекты")
- #strong[Kwork Parser & Pinterest Bot] #text(fill: muted)[(Rust, Frankenstein, SQLite)] -- Сверхлегкие сетевые мониторы и боты для Telegram на Rust с минимальным потреблением RAM на VPS.
- #strong[PSP Video Web] #text(fill: muted)[(TypeScript, WebCodecs, MediaBunny)] -- Браузерный аппаратный конвертер видео для Sony PSP на WebCodecs с автоопределением USB и управлением файловой системой.
- #strong[PSP Book Reader] #text(fill: muted)[(C++, SDL2, MIPS-оптимизация)] -- Нативный EPUB/TXT ридер под процессор MIPS Sony PSP с двухуровневым кэшированием и оптимизацией батареи.
- #strong[Spritefusion Pixel Snapper] #text(fill: muted)[(Rust, Image Processing, Wasm)] -- Open-source Rust-библиотека и CLI для квантования пиксель-арта и цветового маппинга через k-means.
- #strong[SleepOff] #text(fill: muted)[(Swift, macOS)] -- Нативное приложение в строку меню macOS для удержания активного состояния Mac с закрытой крышкой и контролем подсветки.
- #strong[Tailwindcss-Rounbit] #text(fill: muted)[(TypeScript, Tailwind Plugin API)] -- Open-source плагин для Tailwind CSS, генерирующий аутентичные пиксельные скругления углов.
- #strong[Price Tag Printer] #text(fill: muted)[(Next.js, TypeScript, Canvas, Print CSS)] -- Браузерный инструмент для ритейла: парсинг сложных таблиц, массовое редактирование и печать ценников в PDF для 1000+ SKU.
