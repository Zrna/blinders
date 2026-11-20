import { CheckCircle, Monitor, XCircle } from "@phosphor-icons/react/dist/ssr";

/** Prominent note: the cover is only captured when the entire screen is shared. */
export function ShareNotice({ as: Heading = "h2" }: { as?: "h2" | "h3" }) {
  return (
    <div role="note" className="grid gap-6 rounded-2xl bg-ink p-6 text-canvas md:grid-cols-[auto_1fr] md:p-8">
      <span className="grid size-12 place-items-center rounded-xl bg-accent text-on-accent">
        <Monitor size={24} weight="duotone" aria-hidden />
      </span>
      <div className="flex flex-col gap-4">
        <p className="caption-4 label-mono text-canvas/60">Important</p>
        <Heading className="heading-5 md:heading-4">Share your entire screen, not a window or tab</Heading>
        <p className="body-3 max-w-[680px] text-canvas/75">
          Blinders works when you share your entire screen (or a whole display) in Zoom, Google Meet, Teams or any other app. If you share a single window, app or browser tab, viewers see it without the blur.
        </p>
        <ul className="flex flex-wrap gap-3">
          <li className="body-5 flex items-center gap-2 rounded-lg bg-canvas/10 px-3 py-2">
            <CheckCircle size={20} weight="fill" className="text-[#3fb950]" aria-hidden />
            Entire screen: viewers see the blur
          </li>
          <li className="body-5 flex items-center gap-2 rounded-lg bg-canvas/10 px-3 py-2">
            <XCircle size={20} weight="fill" className="text-[#f85149]" aria-hidden />
            Single window, app or tab: no blur
          </li>
        </ul>
      </div>
    </div>
  );
}
