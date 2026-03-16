import type { ProjectSlug } from "~/data/projects";
import { ArchTaplinkPage } from "./ArchTaplinkPage";
import type { ProjectPageProps } from "./CaseStudyPrimitives";
import { EsperansaMiniAppPage } from "./EsperansaMiniAppPage";
import { FloristQuizPage } from "./FloristQuizPage";
import { HornyPlacePage } from "./HornyPlacePage";
import { PlonqAiSearchPage } from "./PlonqAiSearchPage";
import { PriceTagPrinterPage } from "./PriceTagPrinterPage";
import { PspBookReaderPage } from "./PspBookReaderPage";
import { SchruteFarmPage } from "./SchruteFarmPage";
import { SmbroPage } from "./SmbroPage";
import { SmokyMarketLoyaltyMiniappPage } from "./SmokyMarketLoyaltyMiniappPage";
import { SmoTgMiniappPage } from "./SmoTgMiniappPage";
import { VaparshopPage } from "./VaparshopPage";
import { VapeMeFastPage } from "./VapeMeFastPage";

type ProjectPageComponent = (props: ProjectPageProps) => React.ReactNode;

export const PROJECT_PAGE_COMPONENTS: Record<
	ProjectSlug,
	ProjectPageComponent
> = {
	"arch-taplink": ArchTaplinkPage,
	"flower-mini-app": EsperansaMiniAppPage,
	"florist-quiz": FloristQuizPage,
	"horny-place": HornyPlacePage,
	"plonq-ai-search": PlonqAiSearchPage,
	"price-tag-printer": PriceTagPrinterPage,
	"psp-book-reader": PspBookReaderPage,
	"schrute-farm": SchruteFarmPage,
	smbro: SmbroPage,
	"smoky-market-loyalty-miniapp": SmokyMarketLoyaltyMiniappPage,
	"smo-tg-miniapp": SmoTgMiniappPage,
	vaparshop: VaparshopPage,
	"vape-me-fast": VapeMeFastPage,
};
