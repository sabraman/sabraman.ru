import { createPortfolioOgImageResponse } from "~/lib/seo/og-image";

export const runtime = "nodejs";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const title =
			searchParams.get("title")?.slice(0, 100) ??
			"Danya Yudin (Даня Юдин) - Sabraman";
		const subtitle =
			searchParams.get("subtitle")?.slice(0, 200) ??
			"Creative Designer & Frontend Developer";

		return createPortfolioOgImageResponse({
			title,
			subtitle,
			variant: "page",
		});
	} catch (e: unknown) {
		const errorMessage = e instanceof Error ? e.message : "Unknown error";
		console.log(errorMessage);
		return new Response("Failed to generate the image", {
			status: 500,
		});
	}
}
