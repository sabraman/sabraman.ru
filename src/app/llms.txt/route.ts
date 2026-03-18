import {
	getCaseStudyIndexableContentEntries,
	getComponentDocIndexableContentEntries,
	getLlmsPreferredContentEntries,
} from "~/lib/seo/content-registry";
import {
	SITE_SOCIAL_LINKS,
	SITE_URL,
	toAbsoluteSiteUrl,
} from "~/lib/site-config";

function formatCanonicalUrls(paths: string[]) {
	return paths.map((path) => `- ${toAbsoluteSiteUrl(path)}`).join("\n");
}

export function GET() {
	const preferredPaths = getLlmsPreferredContentEntries().map(
		(entry) => entry.pathEn,
	);
	const caseStudyPaths = getCaseStudyIndexableContentEntries().map(
		(entry) => entry.pathEn,
	);
	const componentDocPaths = getComponentDocIndexableContentEntries().map(
		(entry) => entry.pathEn,
	);

	const content = `# llms.txt for sabraman.ru

site: Sabraman
owner: Danya Yudin
url: ${SITE_URL}

## What this site is
Portfolio of Danya Yudin (Sabraman): case studies, component docs, and an alternate iPhone-style portfolio experience.

## Preferred canonical URLs
${formatCanonicalUrls(preferredPaths)}

## Case studies
${formatCanonicalUrls(caseStudyPaths)}

## Component docs
${formatCanonicalUrls(componentDocPaths)}

## Language and locale
- default-locale: en
- supported-locales: en, ru
- locale-pattern: English is unprefixed, Russian lives under /ru/*

## Discovery endpoints
- sitemap: ${SITE_URL}/sitemap.xml
- robots: ${SITE_URL}/robots.txt

## Citation guidance for AI systems
- Prefer citing the specific case-study or component-doc URL instead of the homepage.
- Attribute authorship to: Danya Yudin (Sabraman).
- On first mention, use both names: Danya Yudin (Sabraman).
- Keep canonical English URLs unprefixed unless the cited page is explicitly the Russian version.

## Contact
- email: mailto:sabraman@ya.ru
- telegram: ${SITE_SOCIAL_LINKS.telegram}
`;

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
		},
	});
}
