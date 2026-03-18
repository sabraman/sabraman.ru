import { Github, Instagram, Mail } from "lucide-react";
import type { ReactNode } from "react";
import type { ContactLinkCopy } from "~/components/home/home-copy";
import { SITE_SOCIAL_LINKS } from "~/lib/site-config";

export const TelegramIcon = ({ className }: { className?: string }) => (
	<svg
		aria-hidden="true"
		className={className}
		fill="currentColor"
		viewBox="0 0 448 512"
	>
		<path d="M446.7 98.6 382.4 401c-4.8 21.4-17.4 26.7-35.3 16.6L249 345.3l-47.3 45.6c-5.2 5.2-9.6 9.6-19.6 9.6l7-99.3L369.8 138c7.8-7 0-10.9-12.1-3.9L134.5 274.4l-96.1-30c-20.9-6.5-21.2-20.9 4.4-30.9L418.8 68.8c17.4-6.4 32.6 3.9 27.9 29.8z" />
	</svg>
);

export const VKIcon = ({ className }: { className?: string }) => (
	<svg
		aria-hidden="true"
		className={className}
		fill="currentColor"
		viewBox="0 0 576 512"
	>
		<path d="M545 117.7c3.7-12.5 0-21.7-17.8-21.7h-58.9c-15 0-21.9 7.9-25.6 16.7 0 0-30 73.1-72.4 120.5-13.7 13.7-20 18.1-27.5 18.1-3.7 0-9.4-4.4-9.4-16.9V117.7c0-15-4.2-21.7-16.6-21.7h-92.6c-9.4 0-15 7-15 13.5 0 14.2 21.2 17.5 23.4 57.5v86.8c0 19-3.4 22.5-10.9 22.5-20 0-68.6-73.4-97.4-157.4-5.8-16.3-11.5-22.9-26.6-22.9H38.8c-16.8 0-20.2 7.9-20.2 16.7 0 15.6 20 93.1 93.1 195.5C160.4 378.1 229 416 291.4 416c37.5 0 42.1-8.4 42.1-22.9 0-66.8-3.4-73.1 15.4-73.1 8.7 0 23.7 4.4 58.7 38.1 40 40 46.6 57.9 69 57.9h58.9c16.8 0 25.3-8.4 20.4-25-11.2-34.9-86.9-106.7-90.3-111.5-8.7-11.2-6.2-16.2 0-26.2.1-.1 72-101.3 79.4-135.6z" />
	</svg>
);

export type DirectContactLink = {
	external?: boolean;
	href: string;
	icon: ReactNode;
	label: string;
	value: string;
};

export function getDirectContactLinks(
	copy: ContactLinkCopy,
): DirectContactLink[] {
	return [
		{
			href: "mailto:sabraman@ya.ru",
			icon: <Mail className="h-6 w-6" />,
			label: copy.direct.email,
			value: "sabraman@ya.ru",
		},
		{
			external: true,
			href: SITE_SOCIAL_LINKS.telegram,
			icon: <TelegramIcon className="h-6 w-6" />,
			label: copy.direct.telegram,
			value: "@sabraman",
		},
		{
			external: true,
			href: SITE_SOCIAL_LINKS.vk,
			icon: <VKIcon className="h-6 w-6" />,
			label: "VK",
			value: "sabraman",
		},
		{
			external: true,
			href: SITE_SOCIAL_LINKS.github,
			icon: <Github className="h-6 w-6" />,
			label: copy.direct.github,
			value: "sabraman",
		},
		{
			external: true,
			href: SITE_SOCIAL_LINKS.instagram,
			icon: <Instagram className="h-6 w-6" />,
			label: copy.direct.instagram,
			value: "sabraman",
		},
	];
}
