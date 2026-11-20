import type { ReactNode } from "react";
import {
  AppWindow,
  Drop,
  PaintBucket,
  Selection,
  SelectionBackground,
  SelectionInverse,
  Square,
  Trash,
  X,
} from "@phosphor-icons/react/dist/ssr";
import { cx } from "./primitives";

function Tile({ on, children, onClick, label }: { on?: boolean; children: ReactNode; onClick?: () => void; label?: string }) {
  const cls = cx("grid size-6 place-items-center rounded-md", on ? "bg-white/20 text-white" : "text-white/60");
  return onClick ? (
    <button
      type="button"
      aria-label={label}
      aria-pressed={on}
      onClick={onClick}
      className={cx(cls, "cursor-pointer outline-none transition-colors duration-300 ease-brand hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-accent")}
    >
      {children}
    </button>
  ) : (
    <span className={cls}>{children}</span>
  );
}

const Sep = () => <span className="mx-1 h-4 w-px bg-white/15" />;

/** The screenshot-style editing toolbar, as in the app. */
export function ToolbarMock({
  tool = "area",
  mode = "outside",
  style = "blur",
  className,
  onTool,
  onClear,
}: {
  onTool?: (t: "area" | "window") => void;
  onClear?: () => void;
  tool?: "area" | "window";
  mode?: "outside" | "inside";
  style?: "blur" | "solid";
  className?: string;
}) {
  return (
    <div
      className={cx(
        "flex items-center rounded-xl bg-[#1c1c1f]/95 p-1 shadow-2xl shadow-black/50 ring-1 ring-white/10",
        className,
      )}
    >
      <Tile><X size={12} /></Tile>
      <Tile onClick={onClear} label="Remove all areas"><Trash size={12} /></Tile>
      <Sep />
      <Tile on={tool === "area"} onClick={onTool && (() => onTool("area"))} label="Area tool"><Selection size={12} /></Tile>
      <Tile on={tool === "window"} onClick={onTool && (() => onTool("window"))} label="Window tool"><AppWindow size={12} /></Tile>
      <Sep />
      <span className="hidden items-center sm:flex">
        <Tile on={mode === "outside"}><SelectionInverse size={12} /></Tile>
        <Tile on={mode === "inside"}><SelectionBackground size={12} /></Tile>
        <Sep />
      </span>
      <Tile on={style === "blur"}><Drop size={12} /></Tile>
      <Tile on={style === "solid"}><PaintBucket size={12} /></Tile>
      <span className="mx-2 hidden h-1 w-10 rounded-full bg-white/20 sm:block">
        <span className="block h-1 w-3/5 rounded-full bg-white/70" />
      </span>
      <span className="hidden sm:block">
        <Tile><Square size={12} /></Tile>
      </span>
      <span className="caption-3 ml-1 rounded-md bg-brand px-2 py-1 text-white">Focus</span>
    </div>
  );
}
