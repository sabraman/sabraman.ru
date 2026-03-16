import {
	createComponentsHubSocialImageResponse,
	SOCIAL_IMAGE_CONTENT_TYPE,
	SOCIAL_IMAGE_SIZE,
} from "~/components/legacy/docs/static-social-image";

export const runtime = "nodejs";
export const alt = "Components social preview";
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = SOCIAL_IMAGE_CONTENT_TYPE;

export default async function Image({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	await params;

	return createComponentsHubSocialImageResponse();
}
