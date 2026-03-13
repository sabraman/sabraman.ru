import { permanentRedirect } from "next/navigation";

export default async function LegacyHornyPlacePage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	permanentRedirect(locale === "ru" ? "/ru/horny-place" : "/horny-place");
}
