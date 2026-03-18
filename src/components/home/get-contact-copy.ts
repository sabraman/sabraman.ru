import type { NamespaceMessages } from "~/i18n/get-messages";
import type { ContactLinkCopy } from "./home-copy";

export function getContactCopy(
	messages: NamespaceMessages<"contact">,
): ContactLinkCopy {
	return {
		direct: {
			telegram: messages.direct.telegram,
			email: messages.direct.email,
			github: messages.direct.github,
			instagram: messages.direct.instagram,
		},
	};
}
