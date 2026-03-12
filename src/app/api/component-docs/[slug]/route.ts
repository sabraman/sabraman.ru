import { renderComponentDocMarkdown } from "~/components/ios/docs/component-doc-markdown";
import {
	getAllComponentDocs,
	getComponentDocBySlug,
} from "~/components/ios/docs/component-documents";

const CACHE_CONTROL = "public, s-maxage=3600, stale-while-revalidate=86400";

export function generateStaticParams() {
	return getAllComponentDocs().map((doc) => ({
		slug: doc.slug,
	}));
}

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ slug: string }> },
) {
	const { slug } = await params;
	const doc = getComponentDocBySlug(slug);

	if (!doc) {
		return new Response("Not found", {
			status: 404,
		});
	}

	return new Response(await renderComponentDocMarkdown(doc), {
		headers: {
			"Cache-Control": CACHE_CONTROL,
			"Content-Type": "text/markdown; charset=utf-8",
		},
	});
}
