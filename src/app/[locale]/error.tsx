"use client";

import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { resolveSupportedLocale } from "~/i18n/types";

interface ErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

const COPY = {
	en: {
		title: "Interface Exception",
		subtitle:
			"An unhandled runtime error has occurred inside this application segment.",
		resetBtn: "Restart Segment",
		homeBtn: "Return Home",
		logTitle: "System Crash Log",
		digestLabel: "Exception Digest",
		messageLabel: "Message",
		fallbackDesc: "No further error details are available.",
	},
	ru: {
		title: "Исключение интерфейса",
		subtitle:
			"В сегменте приложения произошла необработанная ошибка выполнения.",
		resetBtn: "Перезапустить сегмент",
		homeBtn: "На главную",
		logTitle: "Лог системного сбоя",
		digestLabel: "Идентификатор ошибки",
		messageLabel: "Сообщение",
		fallbackDesc: "Дополнительные сведения об ошибке отсутствуют.",
	},
} as const;

export default function ErrorBoundary({ error, reset }: ErrorProps) {
	const params = useParams();
	const locale =
		typeof params?.locale === "string"
			? resolveSupportedLocale(params.locale)
			: "en";
	const copy = COPY[locale];

	useEffect(() => {
		// Log the error to standard error stream
		console.error("Caught unhandled segment error:", error);
	}, [error]);

	return (
		<div className="relative flex min-h-[70vh] w-full items-center justify-center px-4 py-16">
			{/* Decorative background grid and gradient blur */}
			<div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
			<div className="absolute top-1/2 left-1/2 -z-10 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-destructive/10 blur-[120px]" />

			<div className="relative w-full max-w-[560px] overflow-hidden rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(26,34,49,0.92)_0%,rgba(10,15,24,0.98)_100%)] p-6 shadow-[0_24px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-8">
				{/* Inner glow radial gradient overlay */}
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.12),transparent_48%)]" />

				<div className="relative z-10 flex flex-col items-center text-center">
					{/* Skeuomorphic glowing caution badge */}
					<div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-destructive/20 bg-destructive/8 shadow-[0_0_24px_rgba(239,68,68,0.15),inset_0_1px_0_rgba(255,255,255,0.1)]">
						<AlertTriangle className="h-8 w-8 text-destructive" />
					</div>

					<h1 className="mb-3 font-bold text-2xl text-white tracking-tight sm:text-3xl">
						{copy.title}
					</h1>
					<p className="mb-8 max-w-[420px] text-muted-foreground text-sm leading-relaxed sm:text-base">
						{copy.subtitle}
					</p>

					{/* Custom Skeuomorphic System Crash Log Block */}
					<div className="mb-8 w-full overflow-hidden rounded-[14px] border border-white/5 bg-black/40 text-left shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]">
						<div className="flex items-center justify-between border-white/5 border-b bg-white/[0.02] px-4 py-2">
							<span className="font-mono text-[11px] text-white/40 uppercase tracking-wider">
								{copy.logTitle}
							</span>
							<span className="h-2 w-2 animate-pulse rounded-full bg-destructive/80" />
						</div>

						<div className="p-4 font-mono text-[12px] leading-relaxed">
							{error.digest && (
								<div className="mb-2">
									<span className="text-white/40">{copy.digestLabel}:</span>{" "}
									<span className="select-all font-semibold text-destructive/90">
										{error.digest}
									</span>
								</div>
							)}
							<div>
								<span className="text-white/40">{copy.messageLabel}:</span>{" "}
								<span className="select-all break-words text-white/80">
									{error.message || copy.fallbackDesc}
								</span>
							</div>
						</div>
					</div>

					{/* Interactive skeuomorphic action buttons */}
					<div className="flex w-full flex-col justify-center gap-3 sm:flex-row">
						<Button
							variant="destructive"
							onClick={reset}
							className="h-11 rounded-[12px] font-semibold text-sm shadow-[0_4px_12px_rgba(239,68,68,0.2),inset_0_1px_0_rgba(255,255,255,0.2)] transition active:translate-y-px"
						>
							<RefreshCw className="mr-2 h-4 w-4" />
							{copy.resetBtn}
						</Button>

						<Button
							variant="outline"
							asChild
							className="h-11 rounded-[12px] border-white/10 bg-transparent font-semibold text-sm text-white/90 hover:bg-white/5 hover:text-white"
						>
							<Link href={`/${locale}`}>
								<Home className="mr-2 h-4 w-4 text-white/60" />
								{copy.homeBtn}
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
