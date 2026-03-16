import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ComponentDocSlug } from "~/components/legacy/docs/component-doc-paths";

export const SOCIAL_IMAGE_SIZE = {
	width: 1200,
	height: 630,
} as const;

export const SOCIAL_IMAGE_CONTENT_TYPE = "image/png";

const CACHE_CONTROL = "public, max-age=31536000, immutable";

export async function createComponentsHubSocialImageResponse() {
	return createStaticSocialImageResponse("og/components.png");
}

export async function createComponentDocSocialImageResponse(
	slug: ComponentDocSlug,
) {
	return createStaticSocialImageResponse(`og/components/${slug}.png`);
}

async function createStaticSocialImageResponse(relativePath: string) {
	try {
		const file = await readFile(join(process.cwd(), "public", relativePath));

		return new Response(new Uint8Array(file), {
			headers: {
				"Cache-Control": CACHE_CONTROL,
				"Content-Type": SOCIAL_IMAGE_CONTENT_TYPE,
			},
		});
	} catch (error) {
		if (error instanceof Error && "code" in error && error.code === "ENOENT") {
			return new Response("Not found", { status: 404 });
		}

		throw error;
	}
}
