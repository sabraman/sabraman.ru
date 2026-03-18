import { HomeContactForm } from "./HomeContactForm";
import type { HomeContactCopy } from "./home-copy";

type HomeContactSectionProps = {
	copy: HomeContactCopy;
};

export function HomeContactSection({ copy }: HomeContactSectionProps) {
	return (
		<section
			id="contact-section"
			className="relative overflow-hidden pt-8 pb-24"
			style={{
				contentVisibility: "auto",
				containIntrinsicSize: "640px",
			}}
		>
			<div className="mx-auto max-w-2xl px-4">
				<HomeContactForm copy={copy} />
			</div>
		</section>
	);
}
