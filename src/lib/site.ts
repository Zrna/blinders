/** GitHub Pages serves the site under /blinders. Set to "" for a custom domain. */
export const basePath = "/blinders";

/** Prefixes a path in public/ with the base path (plain <a> and <img> don't get it automatically). */
export const asset = (path: string) => `${basePath}${path}`;

export const site = {
  name: "Blinders",
  url: `https://zrna.github.io${basePath}`, // TODO: custom domain later
  title: "Blinders: blur parts of your Mac screen while you share it",
  description:
    "Blinders is a macOS menu bar app that blurs or covers parts of your screen. Hide chats, tabs and customer data before you share your screen, or hide distractions while you watch.",
  // Notarized build from ../blinders-app/tools/release.sh --website
  downloadUrl: asset("/download/Blinders.dmg"),
  requirements: "macOS 15 or later",
};

export const nav = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#faq", label: "FAQ" },
];
