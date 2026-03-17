import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const HEADING_NOW_FONT_NAME = "Heading Now Variable";

let headingNowFontPromise: Promise<Buffer> | undefined;

export function getHeadingNowFont() {
	headingNowFontPromise ??= readFile(
		join(process.cwd(), "public", "HeadingNowVariable-Regular.ttf"),
	);

	return headingNowFontPromise;
}
