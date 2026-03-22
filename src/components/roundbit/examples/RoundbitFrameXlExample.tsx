import { RoundbitFrame } from "~/components/roundbit";

export function RoundbitFrameXlExample() {
	return (
		<RoundbitFrame
			className="roundbit-xl roundbit-border-2 roundbit-border-solid roundbit-border-sky-500/85 w-[360px] shadow-[0_10px_0_rgba(36,56,102,0.26)]"
			contentClassName="bg-[linear-gradient(180deg,#fbfdff_0%,#eff4ff_100%)] px-6 py-5 text-zinc-950"
		>
			<p className="font-mono text-[13px] text-zinc-950">
				RoundbitFrame + roundbit-xl
			</p>
			<p className="mt-2 text-[13px] text-zinc-600 leading-relaxed">
				Uniform frame corners with one stable frame stroke and shadow setup.
			</p>
		</RoundbitFrame>
	);
}
