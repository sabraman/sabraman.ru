import { permanentRedirect } from "next/navigation";

export default async function LegacyVaparshopPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	permanentRedirect(locale === "ru" ? "/ru/vaparshop" : "/vaparshop");
}
