import type { ReactNode } from "react";
import { DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
import { cx } from "./mock/primitives";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg outline-none transition-[transform,background-color,color] duration-300 ease-brand hover:-translate-y-px active:translate-y-px active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

export function DownloadButton({ size = "md", className }: { size?: "sm" | "md"; className?: string }) {
  return (
    <a
      href={site.downloadUrl}
      className={cx(base, "bg-ink text-canvas hover:bg-accent hover:text-on-accent", size === "md" ? "button-sm label-mono px-4 py-3" : "button-xsm label-mono px-3 py-2", className)}
    >
      <DownloadSimple size={size === "md" ? 16 : 14} weight="bold" aria-hidden />
      Download for Mac
    </a>
  );
}

export function GhostLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className={cx(base, "button-sm label-mono px-4 py-3 text-muted hover:bg-surface hover:text-ink")}>
      {children}
    </a>
  );
}

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="caption-3 inline-grid min-w-6 place-items-center rounded-md border border-line-strong bg-surface px-1 font-mono text-ink">
      {children}
    </kbd>
  );
}
