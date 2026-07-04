"use client";

import { Suspense, lazy } from "react";
import {
  ArrowRight,
  ArrowUp,
  Backpack,
  BookOpen,
  Check,
  ClipboardList,
  Compass,
  ExternalLink,
  Gamepad2,
  Gem,
  Gift,
  GraduationCap,
  Hammer,
  Keyboard,
  Layers,
  MessageCircle,
  MessagesSquare,
  Pickaxe,
  Shield,
  Sparkles,
  Ticket,
  TrendingUp,
  Users,
  Wrench,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";
import type { ModuleLinkMap } from "@/lib/buildModuleLinkMap";

// Lazy load heavy components
const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Loading placeholder
const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div
    className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`}
  />
);

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  moduleLinkMap: ModuleLinkMap;
  locale: string;
}

export default function HomePageClient({
  latestArticles,
  moduleLinkMap,
  locale,
}: HomePageClientProps) {
  // Props are retained to preserve the server-shell contract from page.tsx.
  // Internal module links are intentionally disabled on the home page.
  void latestArticles;
  void moduleLinkMap;
  void locale;

  const t = useMessages() as any;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://subterra.wiki";

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Subterra Wiki",
        description:
          "Subterra Wiki covers active codes, ores, layers, pickaxe upgrades, ability cards, crafting recipes, weapons, bosses, and beginner tips for the Roblox 2.5D mining adventure.",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1280,
          height: 720,
          caption: "Subterra - Roblox 2.5D Mining Adventure",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Subterra Wiki",
        alternateName: "Subterra",
        url: siteUrl,
        description:
          "Subterra Wiki resource hub for codes, ores, layers, pickaxe upgrades, ability cards, crafting, bosses, and beginner guides",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1280,
          height: 720,
          caption: "Subterra Wiki - Roblox 2.5D Mining Adventure",
        },
        sameAs: [
          "https://www.roblox.com/games/16817315243/Subterra",
          "https://discord.com/invite/wZ3J4whDPe",
          "https://x.com/PolyworksStudio",
          "https://www.youtube.com/channel/UCxnoxgq9LMmHBTSDJyk26BQ",
        ],
      },
      {
        "@type": "VideoGame",
        name: "Subterra",
        gamePlatform: ["Roblox", "PC", "Mobile", "Console"],
        applicationCategory: "Game",
        genre: ["Mining", "Adventure", "Survival", "RPG"],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 10,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://www.roblox.com/games/16817315243/Subterra",
        },
      },
      {
        "@type": "VideoObject",
        name: "Subterra Game Trailer",
        description:
          "Official Subterra game trailer showcasing the 2.5D Roblox mining adventure by Polyworks Studio.",
        uploadDate: "2025-01-01",
        thumbnailUrl: `${siteUrl}/images/hero.webp`,
        embedUrl: "https://www.youtube.com/embed/4lPxbOLJFVk",
        url: "https://www.youtube.com/watch?v=4lPxbOLJFVk",
      },
    ],
  };

  // Tool card → section id (1:1 with en.json tools.cards order)
  const toolSectionIds = [
    "subterra-codes",
    "subterra-trello-discord",
    "subterra-beginner-guide",
    "subterra-pickaxe-backpack",
  ];

  // Beginner guide step icons (one per step, in order)
  const beginnerStepIcons = [
    GraduationCap,
    Keyboard,
    Pickaxe,
    ArrowUp,
    Layers,
    Hammer,
    Compass,
    Shield,
  ];

  // Official link icons keyed by category
  const linkIconByCategory: Record<string, typeof Gamepad2> = {
    Game: Gamepad2,
    Reference: ClipboardList,
    Community: MessagesSquare,
    "Roblox Community": Users,
    Social: MessageCircle,
    Video: Youtube,
  };

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 广告位 1: 顶部固定横幅 */}
      <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2
                          bg-[hsl(var(--nav-theme)/0.1)]
                          border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6"
            >
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">{t.hero.badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <button
                onClick={() => scrollToSection("subterra-codes")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                <Gift className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href="https://www.roblox.com/games/16817315243/Subterra"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-base md:text-lg transition-colors"
              >
                {t.hero.playOnRobloxCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* Video Section - 紧跟 Hero 之后 */}
      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature
              videoId="4lPxbOLJFVk"
              title="Subterra Game Trailer"
              poster="/images/hero.webp"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid - 4 Navigation Cards */}
      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
            {t.tools.cards.map((card: any, index: number) => {
              const sectionId = toolSectionIds[index];
              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(sectionId)}
                  className="scroll-reveal group rounded-xl border border-border p-4 md:p-6
                             bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12
                                bg-[hsl(var(--nav-theme)/0.1)]
                                flex items-center justify-center
                                group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                transition-colors"
                  >
                    <DynamicIcon
                      name={card.icon}
                      className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="mb-1.5 text-sm md:text-base font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 广告位 2: 首屏内容之后再加载广告 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* 广告位 3: 移动端优先使用方形，桌面端保留横幅 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Module 1: Subterra Codes */}
      <section id="subterra-codes" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-wider text-[hsl(var(--nav-theme-light))] mb-3">
              {t.modules.subterraCodes.eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.subterraCodes.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.subterraCodes.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-3xl mx-auto mt-4">
              {t.modules.subterraCodes.intro}
            </p>
          </div>

          {/* Active Codes */}
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 md:mb-12">
            {t.modules.subterraCodes.activeCodes.map((code: any, index: number) => (
              <div
                key={index}
                className="p-4 md:p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.15)]">
                      <Ticket className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                    </span>
                    <code className="text-base md:text-lg font-bold tracking-wide text-[hsl(var(--nav-theme-light))] truncate">
                      {code.code}
                    </code>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.15)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))] flex-shrink-0">
                    {code.status}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-2 mb-3">
                  {code.rewards.map((reward: string, ri: number) => (
                    <li
                      key={ri}
                      className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-[hsl(var(--nav-theme)/0.08)] border border-[hsl(var(--nav-theme)/0.2)]"
                    >
                      <Gift className="w-3 h-3 text-[hsl(var(--nav-theme-light))]" />
                      {reward}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground">{code.bestFor}</p>
              </div>
            ))}
          </div>

          {/* Redeem Steps */}
          <div className="scroll-reveal mb-10 md:mb-12">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <ClipboardList className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="text-xl md:text-2xl font-bold">
                {t.modules.subterraCodes.redeemTitle}
              </h3>
            </div>
            <ol className="space-y-3 md:space-y-4">
              {t.modules.subterraCodes.redeemSteps.map((step: string, index: number) => (
                <li
                  key={index}
                  className="flex gap-3 md:gap-4 p-4 md:p-5 bg-white/5 border border-border rounded-xl"
                >
                  <div className="flex h-9 w-9 md:h-10 md:w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.15)]">
                    <span className="text-sm md:text-base font-bold text-[hsl(var(--nav-theme-light))]">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground pt-1.5">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Expired Codes */}
          <div className="scroll-reveal p-4 md:p-6 bg-white/[0.03] border border-border rounded-xl">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <X className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-bold text-base md:text-lg">
                {t.modules.subterraCodes.expiredTitle}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {t.modules.subterraCodes.expiredCodes.map((code: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center text-xs px-2.5 py-1 rounded-md bg-white/5 border border-border text-muted-foreground line-through"
                >
                  {code}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 广告位 4: 第一模块之后的阅读停顿位 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      {/* Module 2: Subterra Trello, Discord, Roblox, X, and YouTube */}
      <section
        id="subterra-trello-discord"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-wider text-[hsl(var(--nav-theme-light))] mb-3">
              {t.modules.subterraTrelloAndDiscord.eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.subterraTrelloAndDiscord.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.subterraTrelloAndDiscord.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-3xl mx-auto mt-4">
              {t.modules.subterraTrelloAndDiscord.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.subterraTrelloAndDiscord.links.map((link: any, index: number) => {
              const Icon = linkIconByCategory[link.category] || ExternalLink;
              return (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 md:p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] hover:bg-[hsl(var(--nav-theme)/0.04)] transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.12)] group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                      <Icon className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-bold text-sm md:text-base">{link.label}</h3>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-[hsl(var(--nav-theme-light))] transition-colors flex-shrink-0" />
                      </div>
                      <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.25)] text-[hsl(var(--nav-theme-light))] mb-2">
                        {link.category}
                      </span>
                      <p className="text-sm text-muted-foreground">{link.description}</p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Module 3: Subterra Beginner Guide */}
      <section id="subterra-beginner-guide" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-wider text-[hsl(var(--nav-theme-light))] mb-3">
              {t.modules.subterraBeginnerGuide.eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.subterraBeginnerGuide.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.subterraBeginnerGuide.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-3xl mx-auto mt-4">
              {t.modules.subterraBeginnerGuide.intro}
            </p>
          </div>

          <div className="scroll-reveal space-y-4 md:space-y-5">
            {t.modules.subterraBeginnerGuide.steps.map((step: any, index: number) => {
              const Icon = beginnerStepIcons[index] || BookOpen;
              const items = step.actions || step.controls || [];
              const isControls = !step.actions;
              return (
                <div
                  key={index}
                  className="p-4 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-start gap-3 md:gap-4 mb-3">
                    <span className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.15)]">
                      <Icon className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--nav-theme-light))]">
                          Step {step.step}
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground mb-4 pl-14 md:pl-16">
                    <span className="font-semibold text-foreground/90">Goal: </span>
                    {step.goal}
                  </p>
                  <ul className="space-y-2 pl-14 md:pl-16">
                    {items.map((item: any, ii: number) => (
                      <li key={ii} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                        {isControls ? (
                          <span className="text-sm md:text-base text-muted-foreground">
                            <code className="text-xs md:text-sm font-semibold px-1.5 py-0.5 rounded bg-[hsl(var(--nav-theme)/0.12)] text-[hsl(var(--nav-theme-light))]">
                              {item.input}
                            </code>
                            <span className="ml-2">{item.action}</span>
                          </span>
                        ) : (
                          <span className="text-sm md:text-base text-muted-foreground">{item}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 广告位 5: 第三模块之后的阅读停顿位 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      {/* Module 4: Subterra Pickaxe and Backpack Upgrades */}
      <section
        id="subterra-pickaxe-backpack"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-wider text-[hsl(var(--nav-theme-light))] mb-3">
              {t.modules.subterraPickaxeAndBackpackUpgrades.eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.subterraPickaxeAndBackpackUpgrades.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.subterraPickaxeAndBackpackUpgrades.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-3xl mx-auto mt-4">
              {t.modules.subterraPickaxeAndBackpackUpgrades.intro}
            </p>
          </div>

          {/* Pickaxe table */}
          <div className="scroll-reveal mb-10 md:mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Pickaxe className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="text-xl md:text-2xl font-bold">Pickaxe Tiers</h3>
            </div>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[hsl(var(--nav-theme)/0.1)] text-left">
                    {t.modules.subterraPickaxeAndBackpackUpgrades.pickaxeColumns.map(
                      (col: string, ci: number) => (
                        <th key={ci} className="px-3 py-3 font-semibold whitespace-nowrap">
                          {col}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {t.modules.subterraPickaxeAndBackpackUpgrades.pickaxeRows.map(
                    (row: any, ri: number) => (
                      <tr
                        key={ri}
                        className="border-t border-border align-top hover:bg-white/[0.03]"
                      >
                        <td className="px-3 py-3 font-semibold whitespace-nowrap">
                          {row.tier}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-[hsl(var(--nav-theme-light))] font-semibold">
                          {row.power}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">{row.speed}</td>
                        <td className="px-3 py-3">
                          <div className="flex flex-wrap gap-1">
                            {row.recipe.map((m: string, mi: number) => (
                              <span
                                key={mi}
                                className="inline-block text-xs px-1.5 py-0.5 rounded bg-white/5 border border-border"
                              >
                                {m}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-3 py-3 text-muted-foreground">{row.priorityNote}</td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Backpack table */}
          <div className="scroll-reveal mb-10 md:mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Backpack className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="text-xl md:text-2xl font-bold">Backpack Tiers</h3>
            </div>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[hsl(var(--nav-theme)/0.1)] text-left">
                    {t.modules.subterraPickaxeAndBackpackUpgrades.backpackColumns.map(
                      (col: string, ci: number) => (
                        <th key={ci} className="px-3 py-3 font-semibold whitespace-nowrap">
                          {col}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {t.modules.subterraPickaxeAndBackpackUpgrades.backpackRows.map(
                    (row: any, ri: number) => (
                      <tr
                        key={ri}
                        className="border-t border-border align-top hover:bg-white/[0.03]"
                      >
                        <td className="px-3 py-3 font-semibold whitespace-nowrap">
                          {row.tier}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-[hsl(var(--nav-theme-light))] font-semibold">
                          {row.inventoryGain}
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex flex-wrap gap-1">
                            {row.recipe.map((m: string, mi: number) => (
                              <span
                                key={mi}
                                className="inline-block text-xs px-1.5 py-0.5 rounded bg-white/5 border border-border"
                              >
                                {m}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-3 py-3 text-muted-foreground">{row.priorityNote}</td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Priority list */}
          <div className="scroll-reveal">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <TrendingUp className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="text-xl md:text-2xl font-bold">
                {t.modules.subterraPickaxeAndBackpackUpgrades.priorityTitle}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.modules.subterraPickaxeAndBackpackUpgrades.priorities.map(
                (p: any, index: number) => {
                  const priorityIcons = [Pickaxe, Backpack, Gem, Zap];
                  const PIcon = priorityIcons[index] || Wrench;
                  return (
                    <div
                      key={index}
                      className="p-4 md:p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.15)]">
                          <PIcon className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                        </span>
                        <h4 className="font-bold text-sm md:text-base">
                          <span className="text-[hsl(var(--nav-theme-light))] mr-1">#{p.priority}</span>
                          {p.title}
                        </h4>
                      </div>
                      <p className="text-sm text-muted-foreground pl-12">{p.description}</p>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">{t.footer.description}</p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://discord.com/invite/wZ3J4whDPe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition inline-flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/PolyworksStudio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition inline-flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@polyworksstudio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition inline-flex items-center gap-1.5"
                  >
                    <Youtube className="w-3.5 h-3.5" />
                    {t.footer.youtube}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.roblox.com/games/16817315243/Subterra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition inline-flex items-center gap-1.5"
                  >
                    <Gamepad2 className="w-3.5 h-3.5" />
                    {t.footer.roblox}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">{t.footer.copyright}</p>
              <p className="text-xs text-muted-foreground">{t.footer.disclaimer}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
