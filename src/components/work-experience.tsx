"use client";

import {
	BriefcaseBusinessIcon,
	ChevronsDownUpIcon,
	ChevronsUpDownIcon,
} from "lucide-react";
import Image from "next/image";
import type { ComponentProps, ComponentType } from "react";
import ReactMarkdown from "react-markdown";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

export type ExperiencePositionItemType = {
	id: string;
	title: string;
	employmentPeriod: string;
	employmentType?: string;
	description?: string;
	icon?: ComponentType<ComponentProps<"svg">>;
	skills?: string[];
	isExpanded?: boolean;
};

export type ExperienceItemType = {
	id: string;
	companyName: string;
	companyLogo?: string;
	positions: ExperiencePositionItemType[];
	isCurrentEmployer?: boolean;
};

export type WorkExperienceProps = {
	className?: string;
	experiences: ExperienceItemType[];
};

export function WorkExperience({
	className,
	experiences,
}: WorkExperienceProps) {
	return (
		<div className={cn("bg-background px-4", className)}>
			{experiences.map((experience) => (
				<ExperienceItem key={experience.id} experience={experience} />
			))}
		</div>
	);
}

function ExperienceItem({ experience }: { experience: ExperienceItemType }) {
	return (
		<div className="space-y-4 py-4">
			<div className="not-prose flex items-center gap-3">
				<div className="flex size-6 shrink-0 items-center justify-center">
					{experience.companyLogo ? (
						<Image
							src={experience.companyLogo}
							alt={experience.companyName}
							width={24}
							height={24}
							quality={100}
							className="rounded-full"
							aria-hidden
							unoptimized
						/>
					) : (
						<span className="flex size-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
					)}
				</div>

				<h3 className="font-medium text-foreground text-lg leading-snug">
					{experience.companyName}
				</h3>

				{experience.isCurrentEmployer ? (
					<span className="relative flex items-center justify-center">
						<span className="absolute inline-flex size-3 animate-ping rounded-full bg-accent opacity-50" />
						<span className="relative inline-flex size-2 rounded-full bg-accent" />
						<span className="sr-only">Current Employer</span>
					</span>
				) : null}
			</div>

			<div className="relative space-y-4 before:absolute before:left-3 before:h-full before:w-px before:bg-border">
				{experience.positions.map((position) => (
					<ExperiencePositionItem key={position.id} position={position} />
				))}
			</div>
		</div>
	);
}

function ExperiencePositionItem({
	position,
}: {
	position: ExperiencePositionItemType;
}) {
	const ExperienceIcon = position.icon ?? BriefcaseBusinessIcon;

	return (
		<Collapsible
			defaultOpen={position.isExpanded}
			disabled={!position.description}
			asChild
		>
			<div className="relative last:before:absolute last:before:h-full last:before:w-4 last:before:bg-background">
				<CollapsibleTrigger
					className={cn(
						"group not-prose relative block w-full select-none text-left before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-7 before:rounded-lg hover:before:bg-muted/30",
						"data-disabled:before:content-none",
					)}
				>
					<div className="relative z-1 mb-1 flex items-center gap-3">
						<div className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground ring-1 ring-black/5 ring-offset-1 ring-offset-background">
							<ExperienceIcon className="size-4" />
						</div>

						<h4 className="flex-1 text-balance font-medium text-base text-foreground">
							{position.title}
						</h4>

						<div className="shrink-0 text-muted-foreground group-disabled:hidden [&_svg]:size-4">
							<ChevronsDownUpIcon className="hidden group-data-[state=open]:block" />
							<ChevronsUpDownIcon className="hidden group-data-[state=closed]:block" />
						</div>
					</div>

					<div className="relative z-1 flex items-center gap-2 pl-9 text-muted-foreground text-sm">
						{position.employmentType ? (
							<>
								<dl>
									<dt className="sr-only">Employment Type</dt>
									<dd>{position.employmentType}</dd>
								</dl>

								<Separator
									className="data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-center"
									orientation="vertical"
								/>
							</>
						) : null}

						<dl>
							<dt className="sr-only">Employment Period</dt>
							<dd>{position.employmentPeriod}</dd>
						</dl>
					</div>
				</CollapsibleTrigger>

				<CollapsibleContent className="overflow-hidden">
					{position.description ? (
						<Prose className="pt-2 pl-9">
							<ReactMarkdown>{position.description}</ReactMarkdown>
						</Prose>
					) : null}
				</CollapsibleContent>

				{Array.isArray(position.skills) && position.skills.length > 0 ? (
					<ul className="not-prose flex flex-wrap gap-1.5 pt-3 pl-9">
						{position.skills.map((skill, index) => (
							<li key={`${position.id}-${index}`} className="flex">
								<Skill>{skill}</Skill>
							</li>
						))}
					</ul>
				) : null}
			</div>
		</Collapsible>
	);
}

function Prose({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"prose prose-sm prose-zinc dark:prose-invert max-w-none font-mono text-foreground",
				"prose-headings:text-balance prose-h2:font-semibold prose-headings:tracking-tight",
				"prose-a:font-medium prose-a:text-foreground prose-a:underline prose-a:underline-offset-4",
				"prose-code:rounded-md prose-code:border prose-code:bg-muted/50 prose-code:px-[0.3rem] prose-code:py-[0.2rem] prose-code:font-normal prose-code:text-sm prose-code:before:content-none prose-code:after:content-none",
				"prose-strong:font-medium",
				className,
			)}
			{...props}
		/>
	);
}

function Skill({ className, ...props }: ComponentProps<"span">) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-lg border bg-muted/50 px-1.5 py-0.5 font-mono text-muted-foreground text-xs",
				className,
			)}
			{...props}
		/>
	);
}
