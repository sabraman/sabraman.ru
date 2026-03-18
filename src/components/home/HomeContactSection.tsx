import { HomeContactForm } from "./HomeContactForm";
import type { HomeContactCopy } from "./home-copy";

type HomeContactSectionProps = {
	copy: HomeContactCopy;
};

export function HomeContactSection({ copy }: HomeContactSectionProps) {
	return (
		<section
			id="contact-section"
			className="relative overflow-hidden py-24"
			style={{
				contentVisibility: "auto",
				containIntrinsicSize: "640px",
			}}
		>
			<div className="container mx-auto px-4">
				<HomeContactForm copy={copy.copy} />
			</div>
		</section>
	);
}
