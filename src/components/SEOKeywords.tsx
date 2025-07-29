"use client";

import { useEffect } from "react";

export function SEOKeywords() {
	useEffect(() => {
		// Add structured data for better SEO
		const structuredData = {
			"@context": "https://schema.org",
			"@type": "Person",
			name: "Danya Yudin",
			alternateName: ["Даня Юдин", "Sabraman", "Картон"],
			description:
				"Creative Designer and Early-Stage Developer known as Sabraman and Картон",
			url: "https://sabraman.ru",
			sameAs: [
				"https://t.me/sabraman",
				"https://github.com/sabraman",
				"https://instagram.com/sabraman",
				"https://x.com/1sabraman",
				"https://vk.com/sabraman",
			],
			jobTitle: "Creative Designer & Early-Stage Developer",
			knowsAbout: [
				"Visual Design",
				"Branding",
				"Application Development",
				"Telegram Bots",
				"UI/UX Design",
				"Next.js",
				"React",
				"Картон",
				"Sabraman",
			],
		};

		// Add the structured data to the page
		const script = document.createElement("script");
		script.type = "application/ld+json";
		script.text = JSON.stringify(structuredData);
		document.head.appendChild(script);

		return () => {
			document.head.removeChild(script);
		};
	}, []);

	return (
		<div className="sr-only" aria-hidden="true">
			{/* SEO-optimized content for search engines */}
			<h1>
				Sabraman - Danya Yudin (Даня Юдин) - Creative Designer & Developer
			</h1>
			<h2>Картон - Creative Designer and Early-Stage Developer</h2>
			<h3>Даня Юдин - Sabraman - Картон - Portfolio</h3>

			<p>
				Sabraman, also known as Danya Yudin (Даня Юдин) and Картон, is a
				Creative Designer and Early-Stage Developer specializing in visual
				design, branding, and application development. Based in Saint
				Petersburg, Russia, Sabraman creates innovative digital solutions
				including Telegram bots, web applications, and UI/UX designs.
			</p>
			<p>
				Картон (Sabraman) - Danya Yudin (Даня Юдин) - Creative Designer and
				Early-Stage Developer with expertise in visual design, branding, and
				application development. Specializing in Telegram bots, web
				applications, and UI/UX design in Saint Petersburg, Russia.
			</p>
			<p>
				Даня Юдин (Danya Yudin) - Sabraman - Картон - Creative Designer and
				Early-Stage Developer. Expert in visual design, branding, and
				application development. Creating innovative digital solutions including
				Telegram bots and web applications in Saint Petersburg, Russia.
			</p>
			<p>
				Картон (Sabraman) - Danya Yudin (Даня Юдин) - Creative Designer and
				Early-Stage Developer. Specializing in visual design, branding, and
				application development. Expert in Telegram bots, web applications, and
				UI/UX design based in Saint Petersburg, Russia.
			</p>

			{/* Additional SEO content for better keyword density */}
			<div>
				<h4>Sabraman Portfolio - Danya Yudin (Даня Юдин)</h4>
				<p>
					Sabraman portfolio showcases the work of Danya Yudin (Даня Юдин), also
					known as Картон, a creative designer and early-stage developer from
					Saint Petersburg, Russia. Specializing in visual design, branding, and
					application development.
				</p>

				<h4>Картон - Creative Designer Saint Petersburg</h4>
				<p>
					Картон (Sabraman) - Danya Yudin (Даня Юдин) is a creative designer and
					developer based in Saint Petersburg, Russia. Expert in visual design,
					branding, and application development.
				</p>

				<h4>Даня Юдин - Sabraman - Developer Portfolio</h4>
				<p>
					Даня Юдин (Danya Yudin) - Sabraman portfolio featuring creative design
					and development work. Specializing in Telegram bots, web applications,
					and UI/UX design in Saint Petersburg, Russia.
				</p>
			</div>
		</div>
	);
}
