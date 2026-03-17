import { cacheLife, cacheTag } from "next/cache";
import {
	PROJECT_CASE_STUDIES,
	type ProjectCaseStudy,
} from "~/data/project-case-studies";
import {
	PROJECT_BY_SLUG,
	PROJECTS,
	type ProjectCaseStudyRoute,
	type ProjectItem,
	type ProjectSchemaEntityType,
	type ProjectSlug,
} from "~/data/projects";

export type ProjectCaseStudyRouteKind = ProjectCaseStudyRoute;

export type ResolvedCaseStudyRecord = {
	slug: ProjectSlug;
	project: ProjectItem;
	caseStudy: ProjectCaseStudy;
	routeKind: ProjectCaseStudyRouteKind;
	schemaEntityType: ProjectSchemaEntityType;
};

export async function getResolvedCaseStudyRecord(
	slug: string,
): Promise<ResolvedCaseStudyRecord | null> {
	"use cache";
	cacheLife("days");
	cacheTag("projects");
	cacheTag(`project:${slug}`);

	const project = PROJECT_BY_SLUG[slug as ProjectSlug];
	const caseStudy = PROJECT_CASE_STUDIES[slug as ProjectSlug];

	if (!project || !caseStudy) {
		return null;
	}

	return {
		slug: project.slug,
		project,
		caseStudy,
		routeKind: project.caseStudyRoute,
		schemaEntityType: project.schemaEntityType,
	};
}

export async function getGenericCaseStudySlugs(): Promise<ProjectSlug[]> {
	"use cache";
	cacheLife("days");
	cacheTag("projects");

	return PROJECTS.filter((project) => project.caseStudyRoute === "generic").map(
		(project) => project.slug,
	);
}

export async function getRelatedProjectsForSlug(
	slug: ProjectSlug,
): Promise<ProjectItem[]> {
	"use cache";
	cacheLife("days");
	cacheTag("projects");
	cacheTag(`project:${slug}`);

	const currentProject = PROJECT_BY_SLUG[slug];

	if (!currentProject) {
		return [];
	}

	const sameCategoryProjects = PROJECTS.filter(
		(project) =>
			project.slug !== slug && project.category === currentProject.category,
	);

	const seenSlugs = new Set(
		sameCategoryProjects.map((project) => project.slug),
	);
	const featuredProjects = PROJECTS.filter((project) => {
		if (project.slug === slug || !project.isFeaturedWork) {
			return false;
		}

		return !seenSlugs.has(project.slug);
	});

	return [...sameCategoryProjects, ...featuredProjects].slice(0, 4);
}
