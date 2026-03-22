import { RoundbitFrame } from "~/components/roundbit";

const IMAGE_SRC =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 720 450'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23f8e7b1'/%3E%3Cstop offset='38%25' stop-color='%23f7b7a1'/%3E%3Cstop offset='74%25' stop-color='%238db6ff'/%3E%3Cstop offset='100%25' stop-color='%23191f35'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='720' height='450' fill='url(%23g)'/%3E%3Ccircle cx='176' cy='120' r='80' fill='%23ffffff' fill-opacity='.18'/%3E%3Cpath d='M0 348C92 302 178 270 266 270C396 270 450 362 560 362C620 362 668 344 720 308V450H0Z' fill='%230a1022' fill-opacity='.34'/%3E%3C/svg%3E";

export function RoundbitFrameXlStep4ImageExample() {
	return (
		<RoundbitFrame
			className="roundbit-xl roundbit-step-4 roundbit-border-4 roundbit-border-solid roundbit-border-sky-500/90 w-[360px] shadow-[0_12px_0_rgba(36,56,102,0.3)]"
			contentClassName="overflow-hidden bg-zinc-100"
		>
			{/* biome-ignore lint/performance/noImgElement: copy-paste example for a replaced element */}
			<img
				alt="Gradient placeholder"
				className="block h-auto w-full"
				height={450}
				src={IMAGE_SRC}
				width={720}
			/>
		</RoundbitFrame>
	);
}
