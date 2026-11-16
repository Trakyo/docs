import type { ZudokuConfig } from "zudoku";
import { ExternalLink, LifeBuoy } from "zudoku/icons";
// Written by scripts/gen-help-nav.mjs before every dev and build (gitignored).
import helpNav from "./help-nav.generated.json";

/**
 * trakyo.io/docs: the Help Center (pages/help/) and the API docs (the rest of
 * pages/, plus the reference generated from the live API spec).
 *
 * The Help Center switches itself on. While pages/help/ holds no published
 * article (a `draft: true` article is left out of production builds), helpNav
 * is empty and the site is exactly the API docs, with the API overview at
 * /docs. Once one article is published, /docs becomes the landing page
 * (hub/home.mdx), the API overview moves to /docs/api-overview, the tab row
 * shows Help Center · API Docs · API Reference with "Contact support" and
 * "Open Trakyo" on its right, and every page gets an "Edit this page" link.
 * No other URL changes either way.
 *
 * Hover colour: accentForeground is the docs blue in both themes, so hovered
 * links and menu items turn blue (Zudoku styles them text-accent-foreground).
 *
 * @see https://zudoku.dev/docs/configuration/overview (config reference)
 * @see https://zudoku.dev/docs/configuration/navigation (tabs, custom paths)
 * @see https://zudoku.dev/docs/configuration/api-reference (apis: file mode)
 * @see https://zudoku.dev/docs/configuration/llms (llmsTxt / publishMarkdown)
 * @see https://zudoku.dev/docs/customization/colors-theme (theming)
 */
const helpCenterLive = helpNav.length > 0;

type Navigation = NonNullable<ZudokuConfig["navigation"]>;

// The API docs' navigation, unchanged from before the Help Center existed.
const apiNavigation = (overviewPath: string, withReference: boolean): Navigation => [
  {
    type: "category",
    label: "Getting started",
    icon: "rocket",
    items: [
      { type: "doc", file: "index", path: overviewPath, label: "Overview" },
      "quickstart",
      "authentication",
      "scopes",
      "agency",
    ],
  },
  {
    type: "category",
    label: "Install",
    icon: "download",
    items: ["install", "install/agents"],
  },
  {
    type: "category",
    label: "Concepts",
    icon: "book-open",
    items: ["attribution", "pagination", "rate-limits", "idempotency", "money", "ids", "freshness"],
  },
  {
    type: "category",
    label: "Guides",
    icon: "book-marked",
    items: ["conversions"],
  },
  // Once the Help Center is live the reference is its own tab (see navigation).
  ...(withReference ? [{ type: "link", to: "/api", label: "API Reference", icon: "code" } as const] : []),
  {
    type: "category",
    label: "Errors",
    icon: "triangle-alert",
    collapsed: true,
    items: [
      "errors",
      "errors/bad_request",
      "errors/unauthorized",
      "errors/forbidden",
      "errors/insufficient_scope",
      "errors/not_found",
      "errors/unknown_lead",
      "errors/unknown_content_item",
      "errors/conflict",
      "errors/qr_code_exists",
      "errors/unprocessable_entity",
      "errors/confirmation_required",
      "errors/invalid_cursor",
      "errors/invalid_date_range",
      "errors/invalid_attribution_mode",
      "errors/unsupported_currency",
      "errors/occurred_at_out_of_window",
      "errors/unknown_conversion",
      "errors/reversal_exceeds_original",
      "errors/currency_mismatch",
      "errors/youtube_read_only",
      "errors/payload_too_large",
      "errors/rate_limit_exceeded",
      "errors/service_unavailable",
      "errors/internal_server_error",
    ],
  },
];

const config: ZudokuConfig = {
  basePath: "/docs",
  canonicalUrlOrigin: "https://trakyo.io",

  site: {
    showPoweredBy: false,
    // The SVGs are the full wordmark (mark + "trakyo"), so no title next to it.
    logo: {
      src: { light: "/logo.svg", dark: "/logo-white.svg" },
      alt: "Trakyo",
      width: "100px",
    },
    footer: {
      position: "center",
      // The logo href is ignored (rendered as a bare <img>), so the clickable
      // "Powered by Trakyo" is a column link instead. Unlike site.logo, the
      // footer logo src is NOT basePath-prefixed by Zudoku — full /docs/… paths.
      logo: {
        src: { light: "/docs/logo.svg", dark: "/docs/logo-white.svg" },
        alt: "Trakyo",
        width: "90px",
      },
      columns: [
        {
          position: "center",
          title: "",
          links: [{ label: "Powered by Trakyo", href: "https://trakyo.io" }],
        },
      ],
    },
  },

  metadata: helpCenterLive
    ? {
        title: "%s | Trakyo Docs",
        defaultTitle: "Trakyo Docs",
        description:
          "Trakyo help center and API docs: set up tracking, connect your tools, read your numbers, and build on the Trakyo API.",
        favicon: "/favicon.ico",
      }
    : {
        title: "Trakyo API",
        defaultTitle: "Trakyo API",
        description:
          "Trakyo API documentation — programmatic access to links, metrics, funnel, content, sources, leads, and transactions.",
        favicon: "/favicon.ico",
      },

  theme: {
    // The dashboard's shadcn palette with the docs-blue accent. Two deliberate
    // deviations: primary/ring are the docs blue (the app is neutral), and
    // dark `card` is lifted to 5.5% (vs the app's 3.9%) so cards read as
    // elevated on the near-black background.
    light: {
      background: "hsl(0 0% 100%)",
      foreground: "hsl(0 0% 3.9%)",
      card: "hsl(0 0% 100%)",
      cardForeground: "hsl(0 0% 3.9%)",
      primary: "hsl(228 89% 63%)",
      primaryForeground: "hsl(0 0% 100%)",
      secondary: "hsl(0 0% 96.1%)",
      secondaryForeground: "hsl(0 0% 9%)",
      muted: "hsl(0 0% 96.1%)",
      mutedForeground: "hsl(0 0% 45.1%)",
      accent: "hsl(0 0% 96.1%)",
      accentForeground: "hsl(228 89% 63%)",
      border: "hsl(0 0% 89.8%)",
      ring: "hsl(228 89% 63%)",
    },
    dark: {
      background: "hsl(0 0% 3.9%)",
      foreground: "hsl(0 0% 98%)",
      card: "hsl(0 0% 5.5%)",
      cardForeground: "hsl(0 0% 98%)",
      primary: "hsl(228 89% 66%)",
      primaryForeground: "hsl(0 0% 100%)",
      secondary: "hsl(0 0% 14.9%)",
      secondaryForeground: "hsl(0 0% 98%)",
      muted: "hsl(0 0% 14.9%)",
      mutedForeground: "hsl(0 0% 63.9%)",
      accent: "hsl(0 0% 14.9%)",
      accentForeground: "hsl(228 89% 66%)",
      border: "hsl(0 0% 14.9%)",
      ring: "hsl(228 89% 66%)",
    },
  },

  navigation: helpCenterLive
    ? [
        { type: "doc", file: "home", path: "/", label: "Home", display: "hide" },
        { type: "category", label: "Help Center", icon: "life-buoy", items: helpNav as Navigation },
        { type: "category", label: "API Docs", icon: "book-open", items: apiNavigation("/api-overview", false) },
        { type: "link", to: "/api", label: "API Reference", icon: "code" },
      ]
    : apiNavigation("/", true),

  // Right-hand side of the tab row: where to go when the docs don't answer it.
  slots: helpCenterLive
    ? {
        "top-navigation-side": (
          <div className="flex items-center gap-6 text-sm">
            <a href="mailto:support@trakyo.io" className="flex items-center gap-1.5 text-muted-foreground hover:text-accent-foreground">
              <LifeBuoy size={14} /> Contact support
            </a>
            <a href="https://app.trakyo.io" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-muted-foreground hover:text-accent-foreground">
              Open Trakyo <ExternalLink size={14} />
            </a>
          </div>
        ),
      }
    : undefined,

  apis: {
    type: "file",
    input: "./apis/openapi.json",
    path: "/api",
    options: {
      examplesLanguage: "shell",
      expandAllTags: false,
    },
  },

  docs: {
    // The landing page lives outside pages/ so it is only built once the Help
    // Center is live (its route is "/home", shown at "/" by the nav item above).
    files: helpCenterLive ? ["/pages/**/*.{md,mdx}", "/hub/*.mdx"] : ["/pages/**/*.{md,mdx}"],
    // "Edit this page" opens the file on GitHub, where a writer switches to their
    // own branch before editing (main's editor could only start a new branch).
    ...(helpCenterLive
      ? { defaultOptions: { suggestEdit: { url: "https://github.com/Trakyo/docs/blob/main/{filePath}", text: "Edit this page" } } }
      : {}),
    llms: {
      llmsTxt: true,
      llmsTxtFull: true,
    },
  },

  search: {
    type: "pagefind",
  },
};

export default config;
