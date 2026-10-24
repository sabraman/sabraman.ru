import type { ProjectSlug } from "~/data/projects";
import { ArchTaplinkPage } from "./ArchTaplinkPage";
import type { ProjectPageProps } from "./CaseStudyPrimitives";
import { FlowerMiniAppPage } from "./FlowerMiniAppPage";
import { HornyPlacePage } from "./HornyPlacePage";
import { LunariaSearchEcosystemPage } from "./LunariaSearchEcosystemPage";
import { PlonqAiSearchPage } from "./PlonqAiSearchPage";
import { PriceTagPrinterPage } from "./PriceTagPrinterPage";
import { PspBookReaderPage } from "./PspBookReaderPage";
import { SchruteFarmPage } from "./SchruteFarmPage";
import { SmbroPage } from "./SmbroPage";
import { SmokyMarketLoyaltyMiniappPage } from "./SmokyMarketLoyaltyMiniappPage";
import { VaparshopPage } from "./VaparshopPage";
import { SleepoffPage } from "./SleepoffPage";
import { SpritefusionPixelSnapperPage } from "./SpritefusionPixelSnapperPage";

type ProjectPageComponent = (props: ProjectPageProps) => React.ReactNode;

export const PROJECT_PAGE_COMPONENTS: Record<
	ProjectSlug,
	ProjectPageComponent
> = {
	"arch-taplink": ArchTaplinkPage,
	"flower-mini-app": FlowerMiniAppPage,
	"horny-place": HornyPlacePage,
	"lunaria-search-ecosystem": LunariaSearchEcosystemPage,
	"plonq-ai-search": PlonqAiSearchPage,
	"price-tag-printer": PriceTagPrinterPage,
	"psp-book-reader": PspBookReaderPage,
	"schrute-farm": SchruteFarmPage,
	smbro: SmbroPage,
	"smoky-market-loyalty-miniapp": SmokyMarketLoyaltyMiniappPage,
	vaparshop: VaparshopPage,
	sleepoff: SleepoffPage,
	"spritefusion-pixel-snapper": SpritefusionPixelSnapperPage,
};
