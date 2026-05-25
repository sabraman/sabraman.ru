"use client";

import { ExternalLink, PlusIcon } from "lucide-react";

import { LegacyBarButton } from "~/components/legacy-bar-button";
import { cn } from "~/lib/utils";
import { useLegacyUiLocale } from "./legacy-locale-context";

interface LegacyBarButtonDemoProps {
	className?: string;
}

const BUTTON_COPY = {
	en: {
		label: "Label",
		add: "Add",
		back: "Back",
		primary: "Primary",
		open: "Open",
		delete: "Delete",
		danger: "Danger",
	},
	ru: {
		label: "Кнопка",
		add: "Добавить",
		back: "Назад",
		primary: "Основная",
		open: "Открыть",
		delete: "Удалить",
		danger: "Опасно",
	},
} as const;

export function LegacyBarButtonDemo({ className }: LegacyBarButtonDemoProps) {
	const locale = useLegacyUiLocale();
	const copy = BUTTON_COPY[locale];

	return (
		<div className={cn("flex flex-col items-center gap-4", className)}>
			<div className="flex flex-wrap items-center justify-center gap-3">
				<LegacyBarButton label={copy.label} />
				<LegacyBarButton icon={<PlusIcon />} layout="icon" />
				<LegacyBarButton
					icon={<PlusIcon />}
					label={copy.add}
					layout="text-icon"
				/>
				<LegacyBarButton label={copy.back} layout="backward" />
			</div>

			<div className="flex flex-wrap items-center justify-center gap-3">
				<LegacyBarButton label={copy.primary} variant="accent" />
				<LegacyBarButton icon={<PlusIcon />} layout="icon" variant="accent" />
				<LegacyBarButton
					label={copy.open}
					layout="text-icon"
					trailingIcon={<ExternalLink />}
					variant="accent"
				/>
			</div>

			<div className="flex flex-wrap items-center justify-center gap-3">
				<LegacyBarButton label={copy.delete} variant="destructive" />
				<LegacyBarButton
					icon={<PlusIcon />}
					label={copy.danger}
					layout="text-icon"
					variant="destructive"
				/>
			</div>
		</div>
	);
}
