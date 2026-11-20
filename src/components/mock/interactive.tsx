"use client";

import { useRef, useState, type ReactNode } from "react";
import { Browser, CHAT_MESSAGES, ChatApp, DASH, Dashboard, Inbox, VIDEO, VideoPage } from "./apps";
import { Badges, Effect, Frame, Screen, Win, cx, pos, type Look, type Rect } from "./primitives";
import { ToolbarMock } from "./toolbar";

const control =
  "cursor-pointer outline-none transition-[transform,background-color,color] duration-300 ease-brand active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent";

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex rounded-xl border border-line bg-surface p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={cx(
            "button-xsm label-mono rounded-lg px-3 py-2",
            control,
            value === o.value ? "bg-ink text-canvas" : "text-muted hover:text-ink",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Controls({ children }: { children: ReactNode }) {
  return <div className="mt-4 flex flex-wrap items-center gap-3">{children}</div>;
}

/* Two modes on the same video page. */
export function ModesScene() {
  const [mode, setMode] = useState<"outside" | "inside">("outside");
  const page = <VideoPage />;
  return (
    <div>
      <Screen label="A video page in the browser. Spotlight mode blurs everything except the player; hide mode blurs only the recommendations sidebar.">
        <Win rect={{ x: 4, y: 5, w: 92, h: 88 }}>
          <Browser tabs={["Lecture 4: Swift concurrency"]} active={0}>
            <div className="absolute inset-0">{page}</div>
            <Effect base={false} content={page} rects={[VIDEO.player]} hidden={mode !== "outside"} bg="#ffffff" look={{ mode: "outside", style: "blur", radius: 7, rounded: true }} />
            <Effect base={false} content={page} rects={[VIDEO.sidebar]} hidden={mode !== "inside"} bg="#ffffff" look={{ mode: "inside", style: "blur", radius: 7, rounded: true }} />
          </Browser>
        </Win>
      </Screen>
      <Controls>
        <Segmented
          label="Mode"
          value={mode}
          onChange={setMode}
          options={[
            { value: "outside", label: "Blur everything except" },
            { value: "inside", label: "Blur only selected" },
          ]}
        />
      </Controls>
    </div>
  );
}

const colors = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#ffffff" },
  { name: "Gray", value: "#808080" },
  { name: "Red", value: "#d92929" },
  { name: "Blue", value: "#1f5cd9" },
];

/* Blur or solid color, intensity and corners. */
export function LookScene() {
  const [style, setStyle] = useState<string>("blur");
  const [amount, setAmount] = useState(60);
  const [rounded, setRounded] = useState(true);
  const [channel, setChannel] = useState("finance");
  const focused = channel === "finance"; // only #finance has a focus
  const color = colors.find((c) => c.name === style);
  const rect: Rect = { x: CHAT_MESSAGES.x + 3, y: 5, w: CHAT_MESSAGES.w - 6, h: 90 };
  const look: Look = color
    ? { mode: "inside", style: "solid", color: color.value, opacity: 0.3 + (amount / 100) * 0.7, rounded }
    : { mode: "inside", style: "blur", radius: 1 + (amount / 100) * 11, rounded };
  return (
    <div>
      <Screen
        label={
          focused
            ? `A chat app on #finance whose messages are covered with ${color ? `solid ${color.name.toLowerCase()}` : "blur"}, ${rounded ? "rounded" : "square"} corners.`
            : `The same chat app on #${channel}, with no focus: the messages are sharp.`
        }
      >
        <Win rect={{ x: 6, y: 6, w: 88, h: 86 }} title={`Chat · #${channel}`}>
          {focused ? (
            <Effect content={<ChatApp channel={channel} onChannel={setChannel} />} rects={[rect]} look={look} bg="#ffffff" />
          ) : (
            <ChatApp channel={channel} onChannel={setChannel} />
          )}
        </Win>
      </Screen>
      <Controls>
        <div role="radiogroup" aria-label="Style" className="inline-flex items-center gap-1 rounded-xl border border-line bg-surface p-1">
          <button
            type="button"
            role="radio"
            aria-checked={style === "blur"}
            onClick={() => setStyle("blur")}
            className={cx("button-xsm label-mono rounded-lg px-3 py-2", control, style === "blur" ? "bg-ink text-canvas" : "text-muted hover:text-ink")}
          >
            Blur
          </button>
          {colors.map((c) => (
            <button
              key={c.name}
              type="button"
              role="radio"
              aria-checked={style === c.name}
              aria-label={`Solid ${c.name.toLowerCase()}`}
              title={c.name}
              onClick={() => setStyle(c.name)}
              className={cx("grid size-8 place-items-center rounded-lg", control, style === c.name ? "bg-line-strong" : "hover:bg-raised")}
            >
              <span className="size-4 rounded-full ring-1 ring-ink/25" style={{ background: c.value }} />
            </button>
          ))}
        </div>
        <label className="flex items-center gap-3 rounded-xl border border-line bg-surface px-3 py-2">
          <span className="caption-4 label-mono text-faint">{color ? "Opacity" : "Strength"}</span>
          <input
            type="range"
            min={0}
            max={100}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-24 cursor-pointer accent-accent"
          />
        </label>
        <Segmented
          label="Corners"
          value={rounded ? "rounded" : "square"}
          onChange={(v) => setRounded(v === "rounded")}
          options={[
            { value: "rounded", label: "Rounded" },
            { value: "square", label: "Square" },
          ]}
        />
      </Controls>
      <p className="caption-4 label-mono mt-3 text-faint" aria-live="polite">
        {focused ? "#finance has its own focus. Other channels stay sharp." : `#${channel} has no focus. Go back to #finance to see it.`}
      </p>
    </div>
  );
}

/* Every tab keeps its own focus and look; the tab strip stays sharp. */
const tabs: { title: string; url: string; page: ReactNode; rects: Rect[]; look: Look; summary: string }[] = [
  {
    title: "Inbox (3)",
    url: "mail.northwind.io/inbox",
    page: <Inbox />,
    rects: [{ x: 0, y: 0, w: 100, h: 100 }],
    look: { mode: "inside", style: "blur", radius: 7, rounded: false },
    summary: "Whole page blurred",
  },
  {
    title: "Customer accounts",
    url: "app.northwind.io/customers",
    page: <Dashboard />,
    rects: [DASH.list],
    look: { mode: "inside", style: "solid", color: "#808080", opacity: 1, rounded: true },
    summary: "Customer list covered in gray",
  },
  {
    title: "Lecture 4: Swift concurrency",
    url: "swiftcourse.dev/lectures/4",
    page: <VideoPage />,
    rects: [VIDEO.player],
    look: { mode: "outside", style: "blur", radius: 7, rounded: true },
    summary: "Everything except the video blurred",
  },
];

export function TabsScene() {
  const [active, setActive] = useState(2);
  const tab = tabs[active];
  return (
    <div>
      <Screen label={`A browser with three tabs, each with its own focus. Current tab: ${tab.title}, ${tab.summary.toLowerCase()}. The tab strip stays sharp.`}>
        <Win rect={{ x: 4, y: 5, w: 92, h: 88 }}>
          <Browser tabs={tabs.map((t) => t.title)} url={tab.url} active={active} onTab={setActive}>
            <Effect key={active} content={tab.page} rects={tab.rects} look={tab.look} bg="#ffffff" />
          </Browser>
        </Win>
      </Screen>
      <div className="mt-4 flex flex-col items-start gap-3">
        <Segmented
          label="Tab"
          value={String(active)}
          onChange={(v) => setActive(Number(v))}
          options={tabs.map((t, i) => ({ value: String(i), label: t.title.split(" (")[0].split(":")[0] }))}
        />
        <span className="caption-4 label-mono text-faint" aria-live="polite">{tab.summary}</span>
      </div>
    </div>
  );
}

/* Peek: hold to look under the cover of the window in front. */
export function PeekScene() {
  const [peek, setPeek] = useState(false);
  const inbox: Rect = { x: 30, y: 10, w: 64, h: 82 };
  const chat: Rect = { x: 4, y: 6, w: 36, h: 60 };
  return (
    <div>
      <Screen label={peek ? "Peeking: the inbox in front is uncovered while the chat behind stays blurred." : "The inbox in front is covered in solid gray and the chat behind it is blurred."}>
        <Win rect={chat} title="Chat · #general">
          <Effect content={<ChatApp compact />} rects={[{ x: 0, y: 0, w: 100, h: 100 }]} look={{ mode: "inside", style: "blur", radius: 7 }} bg="#ffffff" />
        </Win>
        <Win rect={inbox} title="Mail · Inbox">
          <Effect content={<Inbox />} rects={[{ x: 0, y: 0, w: 100, h: 100 }]} hidden={peek} look={{ mode: "inside", style: "solid", color: "#808080", opacity: 1 }} />
        </Win>
        {!peek && <Badges at={{ x: inbox.x + 1, y: inbox.y + 14 }} />}
      </Screen>
      <Controls>
        <button
          type="button"
          aria-pressed={peek}
          onPointerDown={() => setPeek(true)}
          onPointerUp={() => setPeek(false)}
          onPointerLeave={() => setPeek(false)}
          onKeyDown={(e) => (e.key === " " || e.key === "Enter") && setPeek(true)}
          onKeyUp={() => setPeek(false)}
          onBlur={() => setPeek(false)}
          className={cx("button-xsm label-mono flex select-none items-center gap-3 rounded-xl border border-line bg-surface px-3 py-2 text-ink hover:bg-raised", control)}
        >
          Hold to peek
          <span className="flex gap-1" aria-hidden>
            {["⇧", "⌘", "C"].map((k) => (
              <kbd key={k} className="caption-3 grid min-w-6 place-items-center rounded-md border border-line-strong bg-raised px-1 font-mono text-muted">
                {k}
              </kbd>
            ))}
          </span>
        </button>
        <span className="caption-4 label-mono text-faint" aria-live="polite">
          {peek ? "Inbox uncovered. The chat keeps its blur." : "Inbox covered"}
        </span>
      </Controls>
    </div>
  );
}

/* Selecting: drag areas or click a window; the selection is blurred (live preview). */
const WINDOWS: { name: string; rect: Rect }[] = [
  { name: "browser", rect: { x: 4, y: 5, w: 60, h: 74 } },
  { name: "chat", rect: { x: 68, y: 10, w: 28, h: 60 } },
];
const MAX_AREAS = 6;
const clamp = (v: number) => Math.min(100, Math.max(0, v));

export function SelectScene() {
  const [tool, setTool] = useState<"area" | "window">("area");
  const [areas, setAreas] = useState<Rect[]>([{ x: 44.5, y: 25, w: 18.5, h: 52 }]);
  const [draft, setDraft] = useState<Rect | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const draftRef = useRef<Rect | null>(null);
  // Grab offset while moving the selected (last) area.
  const grab = useRef<{ dx: number; dy: number } | null>(null);
  const [overArea, setOverArea] = useState(false);
  const [moving, setMoving] = useState(false);
  const layer = useRef<HTMLDivElement>(null);

  const point = (e: React.PointerEvent) => {
    const r = layer.current!.getBoundingClientRect();
    return { x: clamp(((e.clientX - r.left) / r.width) * 100), y: clamp(((e.clientY - r.top) / r.height) * 100) };
  };
  const windowAt = (p: { x: number; y: number }) =>
    WINDOWS.findIndex(({ rect: w }) => p.x >= w.x && p.x <= w.x + w.w && p.y >= w.y && p.y <= w.y + w.h);
  const add = (r: Rect) => setAreas((a) => [...a, r].slice(-MAX_AREAS));
  const areaAt = (p: { x: number; y: number }) => {
    for (let i = areas.length - 1; i >= 0; i--) {
      const r = areas[i];
      if (p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h) return i;
    }
    return -1;
  };
  // Moves the selected (last) area, kept inside the screen.
  const moveSelected = (dx: number, dy: number, absolute?: { x: number; y: number }) =>
    setAreas((a) => {
      if (!a.length) return a;
      const r = a[a.length - 1];
      const x = Math.min(100 - r.w, Math.max(0, absolute ? absolute.x : r.x + dx));
      const y = Math.min(100 - r.h, Math.max(0, absolute ? absolute.y : r.y + dy));
      return [...a.slice(0, -1), { ...r, x, y }];
    });

  const onDown = (e: React.PointerEvent) => {
    if (tool !== "area") return;
    layer.current!.setPointerCapture(e.pointerId);
    const p = point(e);
    const hit = areaAt(p);
    if (hit >= 0) {
      // Grab an existing area: select it (bring to front) and move it.
      const r = areas[hit];
      setAreas((a) => [...a.filter((_, j) => j !== hit), r]);
      grab.current = { dx: p.x - r.x, dy: p.y - r.y };
      setMoving(true);
      return;
    }
    start.current = p;
  };
  const onMove = (e: React.PointerEvent) => {
    const p = point(e);
    if (tool === "window") {
      const i = windowAt(p);
      setHover(i < 0 ? null : i);
      return;
    }
    if (grab.current) {
      moveSelected(0, 0, { x: p.x - grab.current.dx, y: p.y - grab.current.dy });
      return;
    }
    setOverArea(areaAt(p) >= 0);
    if (!start.current) return;
    const s = start.current;
    draftRef.current = { x: Math.min(s.x, p.x), y: Math.min(s.y, p.y), w: Math.abs(p.x - s.x), h: Math.abs(p.y - s.y) };
    setDraft(draftRef.current);
  };
  const onUp = (e: React.PointerEvent) => {
    if (tool === "area" && start.current) {
      onMove(e); // the last position may not have produced a move event
      const d = draftRef.current;
      if (d && d.w > 3 && d.h > 4) add(d);
    }
    start.current = null;
    grab.current = null;
    setMoving(false);
    draftRef.current = null;
    setDraft(null);
  };
  const onClick = (e: React.MouseEvent) => {
    if (tool !== "window") return;
    const r = layer.current!.getBoundingClientRect();
    const i = windowAt({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    if (i >= 0) setAreas([WINDOWS[i].rect]);
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === " ") {
      e.preventDefault();
      setTool((t) => (t === "area" ? "window" : "area"));
    } else if (e.key === "Delete" || e.key === "Backspace") {
      setAreas((a) => a.slice(0, -1));
    } else if (e.key.startsWith("Arrow")) {
      // Nudge the selected area, like the app (1 pt, ⇧ for 10 pt).
      e.preventDefault();
      const step = e.shiftKey ? 1 : 0.1;
      const d = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
      if (d) moveSelected(d[0], d[1]);
    }
  };

  const rects = draft ? [...areas, draft] : areas;
  const size = (r: Rect) => `${Math.round((r.w / 100) * 1440)} × ${Math.round((r.h / 100) * 876)}`;
  const desktop = (
    <>
      <Win rect={WINDOWS[0].rect}>
        <Browser tabs={["Lecture 4: Swift concurrency"]} active={0}>
          <VideoPage />
        </Browser>
      </Win>
      <Win rect={WINDOWS[1].rect} title="Chat · #general">
        <ChatApp compact />
      </Win>
    </>
  );

  return (
    <div>
      <Screen label="An interactive Blinders editor. Drag on the screen to add areas, or switch to the window tool and click a window. Everything inside the selection is blurred.">
        {rects.length ? (
          <Effect content={desktop} rects={rects} look={{ mode: "inside", style: "blur", radius: 6, rounded: false }} />
        ) : (
          <div className="absolute inset-0">{desktop}</div>
        )}
        <div
          ref={layer}
          tabIndex={0}
          role="application"
          aria-label="Selection area. Drag on an empty spot to add an area, drag an area to move it, arrow keys nudge the selected area, Space switches between the area and window tool, Delete removes the selected area."
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onPointerLeave={() => setHover(null)}
          onClick={onClick}
          onKeyDown={onKey}
          className={cx(
            "absolute inset-0 touch-none outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent",
            tool === "window" ? "cursor-pointer" : moving ? "cursor-grabbing" : overArea ? "cursor-move" : "cursor-crosshair",
          )}
        />
        {tool === "window" && hover !== null && (
          <div className="pointer-events-none absolute rounded-lg bg-brand/25 ring-2 ring-brand" style={pos(WINDOWS[hover].rect)} />
        )}
        <div className="pointer-events-none absolute inset-0">
          {areas.map((r, i) => (
            <Frame
              key={`${i}-${r.x}-${r.y}`}
              rect={r}
              selected={i === areas.length - 1}
              size={i === areas.length - 1 && !draft ? size(r) : undefined}
              onRemove={() => setAreas((a) => a.filter((_, j) => j !== i))}
            />
          ))}
          {draft && <Frame rect={draft} size={size(draft)} />}
        </div>
        {!rects.length && (
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <span className="caption-4 label-mono rounded-full bg-black/70 px-3 py-1 text-white">
              {tool === "area" ? "Drag to select an area" : "Click a window"}
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-3 flex justify-center">
          <ToolbarMock tool={tool} mode="inside" onTool={setTool} onClear={() => setAreas([])} />
        </div>
      </Screen>
      <Controls>
        <Segmented
          label="Selection tool"
          value={tool}
          onChange={(t) => {
            setTool(t);
            setHover(null);
          }}
          options={[
            { value: "area", label: "Drag an area" },
            { value: "window", label: "Click a window" },
          ]}
        />
        <span className="caption-4 label-mono text-faint" aria-live="polite">
          {areas.length} of {MAX_AREAS} areas
        </span>
      </Controls>
    </div>
  );
}
