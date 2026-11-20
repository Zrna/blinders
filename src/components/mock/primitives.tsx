import type { CSSProperties, ReactNode } from "react";
import { PencilSimple, X } from "@phosphor-icons/react/dist/ssr";

/** A rectangle in percent of its parent. */
export type Rect = { x: number; y: number; w: number; h: number };

export const pos = (r: Rect): CSSProperties => ({
  left: `${r.x}%`,
  top: `${r.y}%`,
  width: `${r.w}%`,
  height: `${r.h}%`,
});

const inset = (r: Rect, radius: number) =>
  `inset(${r.y}% ${100 - r.x - r.w}% ${100 - r.y - r.h}% ${r.x}% round ${radius}px)`;

export function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

/** A Mac display: bezel, flat wallpaper, menu bar. */
export function Screen({
  children,
  menubar,
  className,
  label,
}: {
  children: ReactNode;
  menubar?: ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cx("rounded-2xl border border-ink bg-ink p-2 shadow-xl shadow-ink/10", className)}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-[#2b3150]">
        <div className="absolute inset-x-0 top-0 z-30 flex h-6 items-center justify-between bg-black/35 px-3">
          <div className="caption-4 flex items-center gap-3 text-white/85">
            <span className="size-2 rounded-full bg-white/70" />
            <span className="hidden sm:inline">File</span>
            <span className="hidden sm:inline">Edit</span>
            <span className="hidden md:inline">View</span>
            <span className="hidden md:inline">Window</span>
          </div>
          <div className="flex items-center gap-2">
            {menubar}
            <img src="/favicon.svg" alt="" className="size-3.5" />
            <span className="caption-4 text-white/85">Thu 10:24</span>
          </div>
        </div>
        <div className="absolute inset-0 top-6">{children}</div>
      </div>
    </div>
  );
}

/** A red "sharing" pill for the menu bar. */
export function SharingPill() {
  return (
    <span className="caption-3 flex items-center gap-1 rounded-full bg-[#e5484d] px-2 text-white">
      <span className="size-1.5 rounded-full bg-white" />
      Sharing
    </span>
  );
}

/** A macOS window with traffic lights. */
export function Win({
  rect,
  title,
  children,
  dark,
  className,
  style,
}: {
  rect?: Rect;
  title?: string;
  children: ReactNode;
  dark?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cx(
        "flex flex-col overflow-hidden rounded-lg shadow-2xl shadow-black/40",
        rect && "absolute",
        dark ? "bg-[#1e1e22] ring-1 ring-white/10" : "bg-[#f4f4f6]",
        className,
      )}
      style={{ ...(rect ? pos(rect) : {}), ...style }}
    >
      <div
        className={cx(
          "relative flex h-6 shrink-0 items-center gap-1 px-2",
          dark ? "bg-[#2a2a2f]" : "bg-[#e6e6ea]",
        )}
      >
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
        {title && (
          <span
            className={cx(
              "caption-4 absolute inset-x-12 truncate text-center",
              dark ? "text-white/60" : "text-black/50",
            )}
          >
            {title}
          </span>
        )}
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  );
}

export type Look = {
  mode: "outside" | "inside";
  style: "blur" | "solid";
  /** blur radius in px */
  radius?: number;
  color?: string;
  /** solid color opacity, 0..1 */
  opacity?: number;
  rounded?: boolean;
};

/**
 * Renders `content` with the Blinders effect: blurred or covered
 * everywhere except `rects` (outside) or only inside `rects` (inside).
 */
export function Effect({
  content,
  rects,
  look,
  hidden,
  bg = "#2b3150",
  base = true,
}: {
  content: ReactNode;
  rects: Rect[];
  look: Look;
  hidden?: boolean;
  /** what shows behind the content (wallpaper or page color) */
  bg?: string;
  /** render the sharp content underneath (off when stacking effects) */
  base?: boolean;
}) {
  const r = look.rounded ? 10 : 0;
  const radius = look.radius ?? 8;
  const fx =
    look.style === "blur" ? (
      <div
        className="absolute inset-0"
        style={{ background: bg, filter: `blur(${radius * 1.5}px)`, transform: "scale(1.04)" }}
        aria-hidden
      >
        {content}
      </div>
    ) : (
      <div className="absolute inset-0" style={{ background: look.color, opacity: look.opacity ?? 1 }} aria-hidden />
    );

  const fade = cx(
    "pointer-events-none absolute inset-0 transition-opacity duration-500 ease-brand",
    hidden ? "opacity-0" : "opacity-100",
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {base && <div className="absolute inset-0">{content}</div>}
      {look.mode === "outside" ? (
        <div className={fade} inert>
          <div className="absolute inset-0 overflow-hidden">{fx}</div>
          {rects.map((rect, i) => (
            <div key={i} className="absolute inset-0" style={{ clipPath: inset(rect, r) }} aria-hidden>
              {content}
            </div>
          ))}
        </div>
      ) : (
        <div className={fade} inert>
          {rects.map((rect, i) => (
            <div key={i} className="absolute inset-0 overflow-hidden" style={{ clipPath: inset(rect, r) }}>
              {fx}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** The ✕ / ✎ buttons next to an active focus. */
export function Badges({ at, className }: { at: { x: number; y: number }; className?: string }) {
  return (
    <div
      className={cx("absolute z-20 flex -translate-y-full gap-1 pb-1", className)}
      style={{ left: `${at.x}%`, top: `${at.y}%` }}
    >
      <span className="grid size-5 place-items-center rounded-full bg-black/75 text-white ring-1 ring-white/20">
        <X size={10} weight="bold" />
      </span>
      <span className="grid size-5 place-items-center rounded-full bg-black/75 text-white ring-1 ring-white/20">
        <PencilSimple size={10} weight="bold" />
      </span>
    </div>
  );
}

/** An editing frame with resize handles. */
export function Frame({ rect, size, selected = true, onRemove }: { rect: Rect; size?: string; selected?: boolean; onRemove?: () => void }) {
  const handles = [
    "left-0 top-0", "left-1/2 top-0", "right-0 top-0",
    "left-0 top-1/2", "right-0 top-1/2",
    "left-0 bottom-0", "left-1/2 bottom-0", "right-0 bottom-0",
  ];
  return (
    <div className="absolute z-10" style={pos(rect)}>
      <div className={cx("absolute inset-0 rounded-sm border", selected ? "border-white" : "border-white/60")} />
      {selected &&
        handles.map((h) => (
          <span
            key={h}
            className={cx(
              "absolute size-2 rounded-full border border-black/30 bg-white",
              h,
              h.includes("right") ? "translate-x-1/2" : h.includes("left-1/2") ? "-translate-x-1/2" : "-translate-x-1/2",
              h.includes("bottom") ? "translate-y-1/2" : "-translate-y-1/2",
            )}
          />
        ))}
      {onRemove ? (
        <button
          type="button"
          aria-label="Remove area"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={onRemove}
          className="pointer-events-auto absolute left-0 top-0 grid size-5 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-black/80 text-white ring-1 ring-white/30 outline-none transition-transform duration-300 ease-brand hover:scale-110 focus-visible:ring-2 focus-visible:ring-accent"
        >
          <X size={10} weight="bold" />
        </button>
      ) : (
        <span className="absolute -top-2 left-0 grid size-4 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black/80 text-white ring-1 ring-white/30">
          <X size={8} weight="bold" />
        </span>
      )}
      {size && (
        <span className="caption-4 absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full whitespace-nowrap rounded-md bg-black/75 px-2 text-white">
          {size}
        </span>
      )}
    </div>
  );
}
