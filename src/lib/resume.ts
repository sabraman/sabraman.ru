export function getResumeAsset(
	locale: string,
	format: "pdf" | "markdown" = "pdf",
) {
	const isRussian = locale === "ru";
	const extension = format === "markdown" ? "md" : "pdf";
	const baseName = isRussian ? "DANYA_YUDIN_CV_RU" : "DANYA_YUDIN_CV";

	return {
		href: `/${baseName}.${extension}`,
		downloadName: `${baseName}.${extension}`,
	};
}
