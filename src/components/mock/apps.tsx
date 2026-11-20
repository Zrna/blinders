import { cx, pos } from "./primitives";

/* Fake app contents for the mockups. Each one fills its parent. */

const avatar = ["bg-[#f59e0b]", "bg-[#10b981]", "bg-[#6366f1]", "bg-[#ec4899]", "bg-[#0ea5e9]"];

/** The message list of <ChatApp> (with its channel sidebar). */
export const CHAT_MESSAGES = { x: 25, y: 0, w: 75, h: 100 };

const CHANNELS: Record<string, { name: string; text: string }[]> = {
  general: [
    { name: "Tomás Herrera", text: "Coffee machine on the third floor is fixed." },
    { name: "Lea Novak", text: "Reminder: all hands moves to Thursday at 11:00." },
    { name: "Daniel Ortiz", text: "Welcome Ivana, who joins the design team today." },
  ],
  finance: [
    { name: "Maja Kovač", text: "Q3 numbers are in. Revenue is up 12.4% on last quarter, details are in the sheet." },
    { name: "Daniel Ortiz", text: "Nice. Can we share it with the board on Friday?" },
    { name: "Priya Raman", text: "Sending the salary bands now. Please don’t forward them outside the team." },
    { name: "Tomás Herrera", text: "Got it, thanks." },
    { name: "Maja Kovač", text: "The call with Harbor Bank moved to 3:30." },
  ],
  design: [
    { name: "Ivana Šimić", text: "New onboarding screens are up for review." },
    { name: "Lea Novak", text: "Love the empty state. Can the button be one size smaller?" },
    { name: "Ivana Šimić", text: "Done, updated the file." },
  ],
  launch: [
    { name: "Priya Raman", text: "Press list is final, 14 outlets." },
    { name: "Marcus Bell", text: "Launch video renders tonight." },
  ],
  random: [
    { name: "Marcus Bell", text: "Who left a cactus on my desk?" },
    { name: "Tomás Herrera", text: "It needed a sunny spot." },
  ],
};
export const CHAT_CHANNELS = Object.keys(CHANNELS);

/**
 * A chat app. With `onChannel`, the channel list is clickable and the
 * messages follow the selected channel.
 */
export function ChatApp({
  compact,
  channel = "finance",
  onChannel,
}: {
  compact?: boolean;
  channel?: string;
  onChannel?: (c: string) => void;
}) {
  const msgs = CHANNELS[channel] ?? CHANNELS.finance;
  return (
    <div className="flex h-full bg-white">
      {!compact && (
        <div className="flex w-1/4 flex-col gap-2 overflow-hidden bg-[#3f1d4b] p-2">
          <span className="caption-3 truncate text-white">Northwind</span>
          <div className="flex flex-col gap-1">
            {CHAT_CHANNELS.map((c) => {
              const cls = cx(
                "caption-5 truncate rounded-sm px-1 text-left transition-colors duration-300 ease-brand",
                c === channel ? "bg-white/15 text-white" : "text-white/60",
              );
              return onChannel ? (
                <button
                  key={c}
                  type="button"
                  aria-pressed={c === channel}
                  onClick={() => onChannel(c)}
                  className={cx(cls, "cursor-pointer outline-none hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-accent")}
                >
                  # {c}
                </button>
              ) : (
                <span key={c} className={cls}># {c}</span>
              );
            })}
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 overflow-hidden p-3">
        {msgs.map((m, i) => (
          <div key={i} className="flex gap-2">
            <span className={cx("size-4 shrink-0 rounded-md", avatar[i % avatar.length])} />
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="caption-3 truncate text-black/80">{m.name}</span>
              <span className="caption-5 text-black/60">{m.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Regions of <Dashboard>, in percent of its parent. */
export const DASH = {
  kpis: { x: 3, y: 4, w: 94, h: 15 },
  chart: { x: 3, y: 23, w: 94, h: 45 },
  list: { x: 3, y: 72, w: 94, h: 24 },
};

export function Dashboard() {
  const bars = [38, 52, 44, 61, 57, 72, 66, 81, 75, 88, 79, 93];
  return (
    <div className="absolute inset-0 bg-white">
      <div className="absolute grid grid-cols-3 gap-2" style={pos(DASH.kpis)}>
        {[
          { label: "Revenue", value: "$482.3k", c: "#4675db" },
          { label: "Active users", value: "18,904", c: "#10b981" },
          { label: "Churn", value: "2.1%", c: "#f59e0b" },
        ].map((k) => (
          <div key={k.label} className="flex min-w-0 flex-col justify-center rounded-md bg-[#f1f3f8] px-2">
            <span className="caption-5 truncate text-black/50">{k.label}</span>
            <span className="caption-3 truncate" style={{ color: k.c }}>{k.value}</span>
          </div>
        ))}
      </div>
      <div className="absolute flex items-end gap-1 rounded-md bg-[#f1f3f8] p-2" style={pos(DASH.chart)}>
        {bars.map((h, i) => (
          <span key={i} className="flex-1 rounded-sm bg-[#4675db]" style={{ height: `${h}%`, opacity: 0.5 + i / 24 }} />
        ))}
      </div>
      <div className="absolute flex flex-col justify-around overflow-hidden" style={pos(DASH.list)}>
        {[
          ["Lumen Health", "ana.petrovic@lumen.health", "$12,480"],
          ["Harbor Bank", "j.weber@harborbank.com", "$9,215"],
          ["Northwind Payroll", "billing@northwind.io", "$7,930"],
        ].map(([name, email, amount]) => (
          <div key={name} className="caption-5 grid grid-cols-[30%_1fr_auto] gap-2 text-black/60">
            <span className="truncate text-black/80">{name}</span>
            <span className="truncate">{email}</span>
            <span>{amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** A terminal printing secrets. `cover` hides the value column with a solid color. */
export function Terminal({ cover }: { cover?: string }) {
  const rows: [string, string][] = [
    ["DATABASE_URL", "postgres://admin:7f3kQ9@db.internal:5432"],
    ["STRIPE_SECRET_KEY", "sk_live_51Hc2kLq8ZpXv0aT4m"],
    ["OPENAI_ORG", "org_9c1Tq0aLx2"],
    ["SENTRY_DSN", "https://e81f4c2b@o4507.ingest"],
    ["AWS_SECRET", "wJalrXUtnFEMI/K7MDENG/bPx"],
  ];
  return (
    <div className="flex h-full flex-col gap-1 overflow-hidden bg-[#1e1e22] p-3 font-mono">
      <span className="caption-5 text-[#7ee787]">~/app $ cat .env</span>
      <div className="relative grid grid-cols-[45%_55%] gap-y-1">
        {rows.map(([k, v]) => (
          <span key={k} className="contents">
            <span className="caption-5 truncate text-[#79c0ff]">{k}=</span>
            <span className="caption-5 truncate text-white/80">{v}</span>
          </span>
        ))}
        {cover && <span className="absolute -inset-y-1 left-[44%] right-0 rounded-md" style={{ background: cover }} />}
      </div>
      <span className="caption-5 text-[#7ee787]">
        ~/app $ <span className="inline-block h-3 w-1.5 translate-y-0.5 bg-white/70" />
      </span>
    </div>
  );
}

export function Inbox() {
  const rows = [
    { from: "Northwind Payroll", subject: "Your payslip for October is ready" },
    { from: "Dr. Elena Marsh", subject: "Lab results from your visit on Tuesday" },
    { from: "Harbor Bank", subject: "Statement for account ending 4417" },
    { from: "Jonas Weber", subject: "Re: apartment viewing on Saturday" },
    { from: "Lumen Health", subject: "Appointment reminder: Nov 24, 9:15" },
    { from: "Ana Petrović", subject: "Photos from the weekend" },
    { from: "Kestrel Insurance", subject: "Your policy renewal documents" },
  ];
  return (
    <div className="flex h-full flex-col overflow-hidden bg-white">
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-2 border-b border-black/5 px-3 py-1">
          <span className={cx("size-1.5 shrink-0 rounded-full", i < 2 ? "bg-[#4675db]" : "bg-transparent")} />
          <span className="caption-3 w-1/3 shrink-0 truncate text-black/80">{r.from}</span>
          <span className="caption-5 min-w-0 truncate text-black/60">{r.subject}</span>
        </div>
      ))}
    </div>
  );
}

const recommended = [
  "Ten Xcode tricks you probably missed",
  "SwiftUI layout in twenty minutes",
  "Why my app got rejected (again)",
  "Building a menu bar app from scratch",
  "Core Image filters explained",
];

/** Regions of <VideoPage>, in percent of the page. */
export const VIDEO = {
  player: { x: 3, y: 4, w: 62, h: 52 },
  details: { x: 3, y: 66, w: 62, h: 32 },
  sidebar: { x: 68, y: 5, w: 29, h: 91 },
};

/** A video page: player, title and description, recommendations sidebar. */
export function VideoPage() {
  const thumbs = ["bg-[#f59e0b]", "bg-[#ec4899]", "bg-[#10b981]", "bg-[#6366f1]", "bg-[#0ea5e9]"];
  return (
    <div className="absolute inset-0 bg-white">
      <div className="absolute overflow-hidden rounded-md bg-[#14161f]" style={pos(VIDEO.player)}>
        <div className="absolute inset-x-[22%] bottom-0 top-[30%] rounded-t-full bg-[#4675db]/70" />
        <div className="absolute left-[38%] top-[10%] h-[34%] w-[24%] rounded-full bg-[#f2c6a0]" />
        <div className="absolute inset-x-2 bottom-2 h-1 rounded-full bg-white/30">
          <div className="h-1 w-2/5 rounded-full bg-[#e5484d]" />
        </div>
      </div>
      <div className="absolute flex flex-col" style={pos({ x: 3, y: 58, w: 62, h: 7 })}>
        <span className="caption-3 truncate text-black/85">Lecture 4: Swift concurrency, async and await in practice</span>
      </div>
      <div className="absolute flex flex-col gap-1 overflow-hidden" style={pos(VIDEO.details)}>
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#e5484d] text-white">
            <span className="caption-3">S</span>
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="caption-3 truncate text-black/85">Swift School</span>
            <span className="caption-5 truncate text-black/50">214K subscribers</span>
          </span>
          <span className="caption-3 ml-auto shrink-0 rounded-full bg-black/85 px-2 text-white">Subscribe</span>
        </div>
        <p className="caption-5 min-h-0 overflow-hidden rounded-md bg-[#f2f2f2] px-2 py-1 text-black/60">
          <span className="caption-4 text-black/80">48,213 views · 3 days ago</span> We rewrite a networking layer with async and await, then make it safe with task groups and actors.
        </p>
      </div>
      <div className="absolute flex flex-col justify-between" style={pos(VIDEO.sidebar)}>
        {thumbs.map((t, i) => (
          <div key={i} className="flex h-[17%] gap-2">
            <span className={cx("h-full w-1/2 shrink-0 rounded-sm", t)} />
            <span className="caption-5 line-clamp-2 min-w-0 flex-1 text-black/70">{recommended[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Browser chrome: tab strip and address bar above `children`. */
export function Browser({
  tabs,
  active,
  onTab,
  url = "swiftcourse.dev/lectures/4",
  children,
}: {
  url?: string;
  tabs: string[];
  active: number;
  onTab?: (i: number) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 gap-1 bg-[#e6e6ea] px-2 pt-1">
        {tabs.map((t, i) => {
          const cls = cx(
            "caption-4 min-w-0 flex-1 truncate rounded-t-md px-2 py-1 text-left transition-colors duration-300 ease-brand",
            i === active ? "bg-white text-black/80" : "text-black/50 hover:bg-white/50",
          );
          return onTab ? (
            <button
              key={t}
              type="button"
              onClick={() => onTab(i)}
              aria-pressed={i === active}
              className={cx(cls, "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand")}
            >
              {t}
            </button>
          ) : (
            <span key={t} className={cls}>{t}</span>
          );
        })}
      </div>
      <div className="flex shrink-0 items-center gap-2 bg-white px-2 py-1">
        <span className="caption-5 flex-1 truncate rounded-full bg-[#f1f1f4] px-2 text-black/50">{url}</span>
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  );
}
