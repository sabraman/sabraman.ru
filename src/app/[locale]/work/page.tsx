"use client";

import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import WorkExperience from "~/components/WorkExperience";

export default function WorkPage() {
	const t = useTranslations();

	return (
		<main className="container mx-auto max-w-4xl px-4 py-16">
			<h1 className="mb-12 font-bold font-mono text-4xl text-foreground">
				{t("experience.title")} {t("experience.titleSecond")}
			</h1>

			<WorkExperience
				company="VAPARSHOP"
				title={t("experience.vaparshop.title")}
				period={t("experience.vaparshop.period")}
				location={t("experience.vaparshop.location")}
				achievements={[
					t("experience.vaparshop.achievements.0"),
					t("experience.vaparshop.achievements.1"),
					t("experience.vaparshop.achievements.2"),
					t("experience.vaparshop.achievements.3"),
					t("experience.vaparshop.achievements.4"),
				]}
			/>

			<WorkExperience
				company="HORNY PLACE"
				title={t("experience.hornyPlace.title")}
				period={t("experience.hornyPlace.period")}
				location={t("experience.hornyPlace.location")}
				achievements={[
					t("experience.hornyPlace.achievements.0"),
					t("experience.hornyPlace.achievements.1"),
					t("experience.hornyPlace.achievements.2"),
					t("experience.hornyPlace.achievements.3"),
					t("experience.hornyPlace.achievements.4"),
				]}
			/>

			<WorkExperience
				company="ELYSIUM"
				title={t("experience.elysium.title")}
				period={t("experience.elysium.period")}
				location={t("experience.elysium.location")}
				achievements={[
					t("experience.elysium.achievements.0"),
					t("experience.elysium.achievements.1"),
				]}
			/>

			<WorkExperience
				company="VAPE CLUB"
				title={t("experience.vapeClub.title")}
				period={t("experience.vapeClub.period")}
				location={t("experience.vapeClub.location")}
				achievements={[
					t("experience.vapeClub.achievements.0"),
					t("experience.vapeClub.achievements.1"),
				]}
			/>
		</main>
	);
}
