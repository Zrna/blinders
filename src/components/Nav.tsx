"use client";

import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { cx } from "./mock/primitives";
import { DownloadButton } from "./ui";
import { asset } from "@/lib/site";

const focus = "outline-none focus-visible:ring-2 focus-visible:ring-accent";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);

  // Mark the section in view as the current nav item.
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav
          aria-label="Main"
          className="flex w-full max-w-3xl items-center gap-2 rounded-2xl border border-line bg-surface/70 p-2 backdrop-blur-xl md:w-auto"
        >
          <a href="#top" className={cx("flex items-center gap-2 rounded-lg px-2 py-1", focus)}>
            <img src={asset("/blinders-logo.svg")} alt="" className="size-6 rounded-md" />
            <span className="title-3 font-display font-bold">Blinders</span>
          </a>
          <ul className="hidden items-center md:flex">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  aria-current={current === n.href ? "location" : undefined}
                  className={cx(
                    "caption-4 label-mono rounded-lg px-3 py-2 transition-colors duration-300 ease-brand",
                    current === n.href ? "text-ink" : "text-faint hover:text-ink",
                    focus,
                  )}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="ml-auto flex items-center gap-2 md:ml-2">
            <DownloadButton size="sm" className="hidden sm:inline-flex" />
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
              className={cx("relative grid size-8 place-items-center rounded-lg hover:bg-raised md:hidden", focus)}
            >
              <span
                className={cx(
                  "absolute h-0.5 w-4 rounded-full bg-ink transition-transform duration-500 ease-brand",
                  open ? "rotate-45" : "-translate-y-1",
                )}
              />
              <span
                className={cx(
                  "absolute h-0.5 w-4 rounded-full bg-ink transition-transform duration-500 ease-brand",
                  open ? "-rotate-45" : "translate-y-1",
                )}
              />
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 bg-canvas/90 px-4 pt-24 backdrop-blur-2xl md:hidden"
      >
        <ul className="flex flex-col gap-2">
          {[...nav, { href: "#download", label: "Download" }].map((n, i) => (
            <li
              key={n.href}
              className="motion-safe:animate-[menu-in_500ms_var(--ease-brand)_both]"
              style={{ animationDelay: `${Math.min(i * 60, 400)}ms` }}
            >
              <a
                href={n.href}
                onClick={() => setOpen(false)}
                aria-current={current === n.href ? "location" : undefined}
                className={cx("heading-4 block rounded-lg py-2", current === n.href ? "text-ink" : "text-faint", focus)}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
