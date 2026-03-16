import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const BASE_URL = process.env.OG_CAPTURE_BASE_URL ?? "http://localhost:3000";
const OUTPUT_ROOT = join(process.cwd(), "public", "og");
const COMPONENT_SLUGS = [
	"legacy-wheel-picker",
	"legacy-alert-dialog",
	"legacy-bar-button",
	"legacy-clock",
	"legacy-notification",
	"legacy-switch",
	"legacy-slider",
	"legacy-code-block-command",
];

const TARGETS = [
	{
		outputPath: join(OUTPUT_ROOT, "components.png"),
		selector: '[data-og-stage="components"]',
		url: `${BASE_URL}/en/components/og-preview`,
	},
	...COMPONENT_SLUGS.map((slug) => ({
		outputPath: join(OUTPUT_ROOT, "components", `${slug}.png`),
		selector: `[data-og-stage="${slug}"]`,
		url: `${BASE_URL}/en/components/${slug}/og-preview`,
	})),
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
	colorScheme: "dark",
	deviceScaleFactor: 1,
	viewport: { width: 1200, height: 630 },
});

try {
	for (const target of TARGETS) {
		await mkdir(dirname(target.outputPath), { recursive: true });
		console.log(`Capturing ${target.url}`);
		await page.goto(target.url, {
			timeout: 120_000,
			waitUntil: "commit",
		});
		const stage = page.locator(target.selector);
		await stage.waitFor({ state: "visible", timeout: 120_000 });
		await page.evaluate(async () => {
			await document.fonts.ready;
			await Promise.all(
				Array.from(document.images)
					.filter((image) => !image.complete)
					.map(
						(image) =>
							new Promise((resolve) => {
								image.addEventListener("error", resolve, { once: true });
								image.addEventListener("load", resolve, { once: true });
							}),
					),
			);
		});
		await page.waitForTimeout(1200);
		await stage.screenshot({
			animations: "disabled",
			path: target.outputPath,
		});
	}
} finally {
	await page.close();
	await browser.close();
}
