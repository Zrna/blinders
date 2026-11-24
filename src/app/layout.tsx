import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { asset, site } from "@/lib/site";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin", "latin-ext"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(new URL(site.url).origin), // Next adds basePath itself
  title: site.title,
  description: site.description,
  applicationName: site.name,
  icons: {
    icon: [
      { url: asset("/favicon.ico"), sizes: "any" },
      { url: asset("/favicon.svg"), type: "image/svg+xml" },
      { url: asset("/favicon-32x32.png"), type: "image/png", sizes: "32x32" },
      { url: asset("/favicon-16x16.png"), type: "image/png", sizes: "16x16" },
    ],
    apple: asset("/apple-touch-icon.png"),
  },
  manifest: asset("/site.webmanifest"),
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f1f0eb",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${hanken.variable} ${bricolage.variable} ${plexMono.variable} antialiased`}>
      <body className="min-h-dvh bg-canvas font-sans text-ink">
        <a
          href="#main"
          className="button-sm label-mono fixed left-4 top-4 z-100 -translate-y-24 rounded-lg bg-ink px-3 py-2 text-canvas outline-none transition-transform duration-300 ease-brand focus-visible:translate-y-0 focus-visible:ring-2 focus-visible:ring-accent"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
