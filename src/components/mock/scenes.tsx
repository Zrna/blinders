import { Bell, Check } from "@phosphor-icons/react/dist/ssr";
import { Browser, CHAT_MESSAGES, ChatApp, DASH, Dashboard, Inbox, Terminal, VIDEO, VideoPage } from "./apps";
import { Badges, Effect, Frame, Screen, SharingPill, Win, type Rect } from "./primitives";
import { ToolbarMock } from "./toolbar";

const blur = { mode: "inside", style: "blur", radius: 8, rounded: true } as const;

/* Hero: sharing a dashboard while the chat app and its notification stay blurred. */
export function HeroScene() {
  const blurAll: Rect[] = [{ x: 0, y: 0, w: 100, h: 100 }];
  return (
    <Screen
      label="A Mac desktop being shared: the revenue report is sharp while the messages in the chat app and its notification are blurred."
      menubar={<SharingPill />}
    >
      <Win rect={{ x: 4, y: 6, w: 58, h: 86 }}>
        <Browser tabs={["Q3 revenue report"]} url="app.northwind.io/reports/q3" active={0}>
          <Dashboard />
        </Browser>
      </Win>
      <Win rect={{ x: 66, y: 26, w: 30, h: 66 }} title="Chat · #finance">
        <Effect content={<ChatApp compact />} rects={blurAll} look={{ ...blur, radius: 9, rounded: false }} bg="#ffffff" />
        <Badges at={{ x: 4, y: 14 }} />
      </Win>
      <div className="absolute flex items-start gap-2 rounded-lg bg-white/95 p-2 shadow-xl" style={{ left: "66%", top: "5%", width: "30%", height: "16%" }}>
        <span className="grid size-6 shrink-0 place-items-center rounded-md bg-[#3f1d4b] text-white">
          <Bell size={12} weight="fill" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="caption-4 flex justify-between gap-2 text-black/50">
            <span className="truncate">Chat</span>
            <span>now</span>
          </span>
          <span className="flex flex-col" style={{ filter: "blur(4px)" }} aria-hidden>
            <span className="caption-3 truncate text-black/80">Maja Kovač</span>
            <span className="caption-5 truncate text-black/60">Here is the salary sheet you asked for</span>
          </span>
        </span>
      </div>
    </Screen>
  );
}

/* Privacy: secrets in a terminal covered with solid color, inbox blurred. */
export function PrivacyScene() {
  return (
    <Screen label="A terminal whose secret values are covered with a solid gray block, next to a blurred inbox." menubar={<SharingPill />}>
      <Win rect={{ x: 44, y: 30, w: 52, h: 62 }} title="Mail · Inbox">
        <Effect content={<Inbox />} rects={[{ x: 0, y: 0, w: 100, h: 100 }]} look={{ ...blur, rounded: false }} bg="#ffffff" />
      </Win>
      <Win rect={{ x: 4, y: 8, w: 54, h: 52 }} title="Terminal · zsh" dark>
        <Terminal cover="#5a5a60" />
      </Win>
    </Screen>
  );
}

/* Follows the window: the window drifts and shrinks, its blur goes with it. */
export function FollowScene() {
  return (
    <Screen label="A browser window moving and shrinking across the desktop while its blurred sidebar stays attached to it.">
      <div className="absolute animate-window-drift" style={{ left: "6%", top: "6%", width: "64%", height: "82%" }}>
        <Win className="h-full w-full">
          <Browser tabs={["Lecture 4: Swift concurrency"]} active={0}>
            <Effect content={<VideoPage />} rects={[VIDEO.sidebar]} look={blur} bg="#ffffff" />
            <Badges at={{ x: VIDEO.sidebar.x, y: VIDEO.sidebar.y + 6 }} />
          </Browser>
        </Win>
      </div>
    </Screen>
  );
}

/* Controls stay private: your screen vs. what viewers see. */
function CaptureDesktop({ withControls }: { withControls?: boolean }) {
  return (
    <>
      <Win rect={{ x: 4, y: 5, w: 92, h: 76 }}>
        <Browser tabs={["Customer accounts"]} url="app.northwind.io/customers" active={0}>
          <Effect content={<Dashboard />} rects={[DASH.list]} look={{ mode: "inside", style: "blur", radius: 5, rounded: false }} bg="#ffffff" />
          {withControls && <Frame rect={DASH.list} />}
        </Browser>
      </Win>
      {withControls && (
        <div className="absolute inset-x-0 bottom-1 flex scale-75 justify-center">
          <ToolbarMock mode="inside" />
        </div>
      )}
    </>
  );
}

export function CaptureScene() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <figure className="flex flex-col gap-3">
        <Screen label="Your screen while editing: the customer list is blurred, and the frame, handles and toolbar are visible.">
          <CaptureDesktop withControls />
        </Screen>
        <figcaption className="caption-4 label-mono text-faint">On your screen</figcaption>
      </figure>
      <figure className="flex flex-col gap-3">
        <Screen label="What viewers of the screen share see: the customer list blurred, with no frame and no toolbar." menubar={<SharingPill />}>
          <CaptureDesktop />
        </Screen>
        <figcaption className="caption-4 label-mono text-faint">What viewers see</figcaption>
      </figure>
    </div>
  );
}

/* Menu bar: the Blinders menu while focus is active. */
export function MenuScene() {
  const items: { label: string; key?: string; check?: boolean; sep?: boolean }[] = [
    { label: "Edit Selection…", key: "⇧⌘F" },
    { label: "Peek", key: "⇧⌘C" },
    { label: "Turn Off All (2 windows)" },
    { label: "", sep: true },
    { label: "Launch at Login", check: true },
    { label: "Screen Recording Permission", check: true },
    { label: "Show Icon in Dock" },
    { label: "Settings", key: "⌘," },
  ];
  const chat: Rect = { x: 8, y: 10, w: 44, h: 78 };
  return (
    <Screen label="The Blinders menu bar menu with Edit Selection, Peek, Turn Off All, Launch at Login and Settings.">
      <Win rect={chat} title="Chat · #support">
        <Effect content={<ChatApp />} rects={[CHAT_MESSAGES]} look={{ ...blur, rounded: false }} bg="#ffffff" />
      </Win>
      <div className="absolute right-[10%] top-1 flex w-56 max-w-[60%] flex-col rounded-lg bg-[#2a2a2e]/95 p-1 shadow-2xl shadow-black/50 ring-1 ring-white/10">
        {items.map((it, i) =>
          it.sep ? (
            <span key={i} className="mx-2 my-1 h-px bg-white/10" />
          ) : (
            <span
              key={i}
              className={`caption-5 flex items-center gap-2 rounded-md px-2 py-0.5 text-white/85 ${i === 0 ? "bg-brand text-white" : ""}`}
            >
              <span className="w-3">{it.check && <Check size={10} weight="bold" />}</span>
              <span className="flex-1 truncate">{it.label}</span>
              {it.key && <span className="text-white/50">{it.key}</span>}
            </span>
          ),
        )}
      </div>
    </Screen>
  );
}
