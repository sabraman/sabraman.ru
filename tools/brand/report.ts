#!/usr/bin/env bun

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.argv[2];
if (!root) {
	console.error("usage: bun tools/brand/report.ts <eval-dir>");
	process.exit(1);
}

interface RunResult {
	code: string;
	variant: string;
	model: string;
	brief: string;
	ok: boolean;
	errors: string[];
	artifact: {
		hook: string;
		body: string;
		cta: string;
		slides: string[];
	} | null;
}

const index = JSON.parse(readFileSync(join(root, "index.json"), "utf8")) as {
	createdAt: string;
	results: RunResult[];
};

const runs = index.results
	.filter((run) => run.artifact)
	.sort((a, b) => a.code.localeCompare(b.code));

const key = Object.fromEntries(
	runs.map((run) => [run.code, { model: run.model, variant: run.variant }]),
);
writeFileSync(join(root, "key.json"), `${JSON.stringify(key, null, 2)}\n`);

const cards = runs
	.map((run) => {
		const artifact = run.artifact;
		if (!artifact) return "";
		const text = [artifact.hook, artifact.body, artifact.cta]
			.filter(Boolean)
			.join("\n\n");
		return `<article class="card" data-code="${run.code}">
  <div class="top"><span class="code">${run.code}</span><span class="flag">${run.ok ? "валидатор пройден" : "есть замечания"}</span></div>
  <div class="text">${text.replace(/</g, "&lt;")}</div>
  <div class="rate" role="group" aria-label="оценка">
    ${[1, 2, 3, 4, 5].map((n) => `<button type="button" data-score="${n}">${n}</button>`).join("")}
  </div>
</article>`;
	})
	.join("\n");

const html = `<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*{box-sizing:border-box}
body{margin:0;font-family:var(--font-sans),system-ui,sans-serif;color:var(--foreground);background:transparent;font-size:14px}
.wrap{display:flex;flex-direction:column;gap:18px;padding-bottom:120px}
h1{font-size:19px;margin:0;font-weight:600}
.sub{font-size:12.5px;color:var(--muted-foreground);max-width:70ch}
.card{border:1px solid var(--border);border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:10px}
.top{display:flex;align-items:center;justify-content:space-between;gap:8px}
.code{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;color:var(--muted-foreground)}
.flag{font-size:10.5px;color:var(--muted-foreground)}
.text{white-space:pre-wrap;font-size:15px;line-height:1.55}
.rate{display:flex;gap:6px}
.rate button{width:34px;height:30px;border:1px solid var(--border);background:transparent;color:var(--foreground);border-radius:7px;font-family:var(--font-mono);font-size:12px;cursor:pointer}
.rate button:hover{border-color:var(--accent)}
.rate button.on{background:var(--accent);color:var(--accent-foreground);border-color:var(--accent);font-weight:600}
.footer{position:fixed;left:0;right:0;bottom:0;padding:12px 16px;background:var(--background);border-top:1px solid var(--border);display:flex;gap:10px;align-items:center}
.footer .count{font-size:12px;color:var(--muted-foreground);font-family:var(--font-mono)}
.footer button{padding:8px 12px;border-radius:8px;border:1px solid var(--border);background:var(--accent);color:var(--accent-foreground);font-size:12px;font-weight:600;cursor:pointer}
.footer textarea{position:absolute;left:-9999px}
@media(max-width:600px){.text{font-size:14px}}
</style></head><body>
<div class="wrap">
  <header>
    <h1>Слепая оценка: 16 постов</h1>
    <div class="sub">Модель и техника промпта скрыты. Оцени каждый текст от 1 до 5 одной цифрой: узнал бы себя владелец, есть ли своя мысль, хочется ли дочитать, не звучит ли как нейросеть, видишь ли это в своей ленте. Потом нажми «собрать оценки» и пришли JSON.</div>
  </header>
  ${cards}
</div>
<div class="footer">
  <span class="count" id="count">0 / ${runs.length}</span>
  <button id="collect">собрать оценки</button>
  <textarea id="out" readonly></textarea>
</div>
<script>
const scores = {};
const total = ${runs.length};
document.querySelectorAll(".card").forEach(card => {
  const code = card.dataset.code;
  card.querySelectorAll(".rate button").forEach(btn => {
    btn.addEventListener("click", () => {
      scores[code] = Number(btn.dataset.score);
      card.querySelectorAll(".rate button").forEach(b => b.classList.toggle("on", b === btn));
      document.getElementById("count").textContent = Object.keys(scores).length + " / " + total;
    });
  });
});
document.getElementById("collect").addEventListener("click", () => {
  const out = document.getElementById("out");
  out.value = JSON.stringify(scores, null, 2);
  out.style.position = "fixed"; out.style.left = "0"; out.style.bottom = "52px"; out.style.width = "100%";
  out.style.height = "140px"; out.style.zIndex = "50"; out.style.padding = "10px";
  out.style.fontFamily = "var(--font-mono)"; out.style.fontSize = "11px";
  out.style.background = "var(--card)"; out.style.color = "var(--foreground)"; out.style.border = "1px solid var(--border)";
  out.select();
});
</script>
</body></html>`;

const outPath = join(root, "blind.html");
writeFileSync(outPath, html);
console.log(outPath);
console.log(`${runs.length} карточек, ключ: key.json`);
