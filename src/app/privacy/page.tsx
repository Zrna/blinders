import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Privacy · Blinders",
  description: "How Blinders handles your screen: frames are processed locally, in memory, and never saved or sent.",
};

const sections = [
  {
    title: "Your screen stays on your Mac",
    body: "To blur part of the screen live, Blinders captures what is underneath the blurred area. Frames are processed only locally, in memory, and discarded right away. Nothing is saved or sent anywhere, and no audio is recorded.",
  },
  {
    title: "Permissions",
    body: "Live blur needs the Screen & System Audio Recording permission. Blinders explains why before macOS asks, and the Solid color style works without it. Blinders does not ask for the Accessibility permission.",
  },
  {
    title: "Your selections",
    body: "The areas you select are kept in memory while the app runs. Your settings (mode, style, intensity, color, corners, selection tool and shortcuts) are stored on your Mac in the app’s preferences.",
  },
];

export default function Privacy() {
  return (
    <main id="main" className="px-4 py-24">
      <article className="mx-auto flex max-w-[680px] flex-col gap-8">
        <Link href="/" className="caption-4 label-mono inline-flex w-fit items-center gap-2 rounded-md text-muted outline-none transition-colors duration-300 ease-brand hover:text-ink focus-visible:ring-2 focus-visible:ring-accent">
          <ArrowLeft size={16} aria-hidden />
          Blinders
        </Link>
        <h1 className="heading-3 md:heading-2 text-hero-gradient pb-1">Privacy</h1>
        {sections.map((s) => (
          <section key={s.title} className="flex flex-col gap-3">
            <h2 className="heading-6">{s.title}</h2>
            <p className="body-3 text-muted">{s.body}</p>
          </section>
        ))}
      </article>
    </main>
  );
}
