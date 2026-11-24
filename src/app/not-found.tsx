import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { asset } from "@/lib/site";

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-dvh place-items-center px-4">
      <div className="flex max-w-[680px] flex-col items-center gap-6 text-center">
        <div className="relative">
          <img src={asset("/blinders-logo.svg")} alt="" className="size-16 rounded-2xl blur-sm" />
        </div>
        <h1 className="heading-3 md:heading-2 text-hero-gradient pb-1">This page is behind the blinders</h1>
        <p className="body-3 text-muted">The page you’re looking for doesn’t exist or has moved.</p>
        <Link
          href="/"
          className="button-sm label-mono inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-3 text-canvas outline-none transition-[transform,background-color] duration-300 ease-brand hover:bg-accent hover:text-on-accent active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          <ArrowLeft size={18} weight="bold" aria-hidden />
          Back to the home page
        </Link>
      </div>
    </main>
  );
}
