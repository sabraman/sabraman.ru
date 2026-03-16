import { isComponentDocSlug } from "~/components/legacy/docs/component-doc-paths";
import {
	createComponentDocSocialImageResponse,
	SOCIAL_IMAGE_CONTENT_TYPE,
	SOCIAL_IMAGE_SIZE,
} from "~/components/legacy/docs/static-social-image";

export const runtime = "nodejs";
export const alt = "Component social preview";
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = SOCIAL_IMAGE_CONTENT_TYPE;

export default async function Image({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>;
}) {
	const { slug } = await params;

	if (!isComponentDocSlug(slug)) {
		return new Response("Not found", { status: 404 });
	}

	return createComponentDocSocialImageResponse(slug);
}
