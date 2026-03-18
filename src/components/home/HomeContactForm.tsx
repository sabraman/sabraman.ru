import { getDirectContactLinks } from "~/components/contact/contact-links";
import type { ContactCopy } from "./home-copy";

type HomeContactFormProps = {
	copy: ContactCopy;
};

export function HomeContactForm({ copy }: HomeContactFormProps) {
	const contactLinks = getDirectContactLinks(copy);

	return (
		<article className="mx-auto max-w-3xl border-white/10 border-y">
			<div className="divide-y divide-white/10">
				{contactLinks.map((contactLink) => (
					<a
						key={contactLink.href}
						href={contactLink.href}
						target={contactLink.external ? "_blank" : undefined}
						rel={contactLink.external ? "noopener noreferrer" : undefined}
						className="group flex items-center justify-between gap-4 px-1 py-4 transition-colors hover:text-white"
					>
						<div className="flex min-w-0 items-center gap-4">
							<div className="flex h-5 w-5 shrink-0 items-center justify-center text-accent/80">
								{contactLink.icon}
							</div>
							<p className="text-[0.68rem] text-muted-foreground uppercase tracking-[0.24em]">
								{contactLink.label}
							</p>
						</div>
						<p className="truncate font-mono text-base text-white">
							{contactLink.value}
						</p>
					</a>
				))}
			</div>
		</article>
	);
}
