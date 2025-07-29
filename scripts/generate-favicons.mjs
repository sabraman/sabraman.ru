#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import favicons from "favicons";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const source = path.join(__dirname, "../public/logo.svg");
const outputPath = path.join(__dirname, "../public");

const configuration = {
	path: "/",
	appName: "Sabraman - Danya Yudin Portfolio",
	appShortName: "Sabraman",
	appDescription:
		"Danya Yudin (Даня Юдин) - Sabraman - Creative Designer & Developer Portfolio",
	developerName: "Danya Yudin",
	developerURL: "https://sabraman.ru",
	dir: "ltr",
	lang: "en-US",
	background: "#1a1a1a",
	theme_color: "#7878fa",
	appleStatusBarStyle: "default",
	display: "standalone",
	orientation: "portrait-primary",
	scope: "/",
	start_url: "/",
	version: "1.0.0",
	logging: true,
	pixel_art: false,
	loadManifestWithCredentials: false,
	icons: {
		android: [
			"android-chrome-36x36.png",
			"android-chrome-48x48.png",
			"android-chrome-72x72.png",
			"android-chrome-96x96.png",
			"android-chrome-144x144.png",
			"android-chrome-192x192.png",
			"android-chrome-256x256.png",
			"android-chrome-384x384.png",
			"android-chrome-512x512.png",
		],
		appleIcon: [
			"apple-touch-icon.png",
			"apple-touch-icon-57x57.png",
			"apple-touch-icon-60x60.png",
			"apple-touch-icon-72x72.png",
			"apple-touch-icon-76x76.png",
			"apple-touch-icon-114x114.png",
			"apple-touch-icon-120x120.png",
			"apple-touch-icon-144x144.png",
			"apple-touch-icon-152x152.png",
			"apple-touch-icon-167x167.png",
			"apple-touch-icon-180x180.png",
		],
		appleStartup: [
			"apple-touch-startup-image-320x460.png",
			"apple-touch-startup-image-640x920.png",
			"apple-touch-startup-image-640x1096.png",
			"apple-touch-startup-image-768x1004.png",
			"apple-touch-startup-image-748x1024.png",
			"apple-touch-startup-image-750x1334.png",
			"apple-touch-startup-image-1125x2436.png",
			"apple-touch-startup-image-1242x2148.png",
			"apple-touch-startup-image-1242x2208.png",
			"apple-touch-startup-image-1242x2688.png",
			"apple-touch-startup-image-1536x2048.png",
			"apple-touch-startup-image-1668x2224.png",
			"apple-touch-startup-image-1668x2388.png",
			"apple-touch-startup-image-2048x2732.png",
		],
		favicons: [
			"favicon-16x16.png",
			"favicon-32x32.png",
			"favicon-48x48.png",
			"favicon.ico",
		],
		windows: [
			"tile-70x70.png",
			"tile-144x144.png",
			"tile-150x150.png",
			"tile-310x150.png",
			"tile-310x310.png",
		],
		yandex: ["yandex-browser-50x50.png", "yandex-browser-90x90.png"],
	},
};

async function generateFavicons() {
	try {
		console.log("🎨 Generating favicons from logo.svg...");

		const response = await favicons(source, configuration);

		// Create output directory if it doesn't exist
		if (!fs.existsSync(outputPath)) {
			fs.mkdirSync(outputPath, { recursive: true });
		}

		// Write all files
		await Promise.all(
			response.images.map(async (image) => {
				const filePath = path.join(outputPath, image.name);
				await fs.promises.writeFile(filePath, image.contents);
				console.log(`✅ Generated: ${image.name}`);
			}),
		);

		// Write HTML
		if (response.html) {
			const htmlPath = path.join(outputPath, "favicon.html");
			await fs.promises.writeFile(htmlPath, response.html.join("\n"));
			console.log("✅ Generated: favicon.html (for reference)");
		}

		// Update site.webmanifest
		if (response.files) {
			const manifestFile = response.files.find(
				(file) => file.name === "site.webmanifest",
			);
			if (manifestFile) {
				const manifestPath = path.join(outputPath, "site.webmanifest");
				await fs.promises.writeFile(manifestPath, manifestFile.contents);
				console.log("✅ Updated: site.webmanifest");
			}
		}

		console.log("\n🎉 Favicon generation complete!");
		console.log("📁 Files generated in: public/");
		console.log("📝 Add the HTML tags from favicon.html to your layout.tsx");
	} catch (error) {
		console.error("❌ Error generating favicons:", error);
		process.exit(1);
	}
}

generateFavicons();
