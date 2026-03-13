export function getResumeAsset(locale: string) {
	const isRussian = locale === "ru";

	return {
		href: isRussian ? "/DANYA_YUDIN_CV_RU.pdf" : "/DANYA_YUDIN_CV.pdf",
		downloadName: isRussian ? "DANYA_YUDIN_CV_RU.pdf" : "DANYA_YUDIN_CV.pdf",
	};
}
