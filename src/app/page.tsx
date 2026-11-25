import type { ReactNode } from 'react';
import {
  CursorClick,
  HandPointing,
  KeyReturn,
  LockSimple,
  Target,
} from '@phosphor-icons/react/dist/ssr';
import { Nav } from '@/components/Nav';
import { ShareNotice } from '@/components/ShareNotice';
import { Reveal } from '@/components/Reveal';
import { DownloadButton, Kbd } from '@/components/ui';
import { asset } from '@/lib/site';
import {
  LookScene,
  ModesScene,
  PeekScene,
  SelectScene,
  TabsScene,
} from '@/components/mock/interactive';
import {
  CaptureScene,
  FollowScene,
  HeroScene,
  MenuScene,
  PrivacyScene,
} from '@/components/mock/scenes';
import { cx } from '@/components/mock/primitives';

type Feature = {
  id: string;
  after?: ReactNode;
  title: string;
  body: ReactNode;
  hint?: string;
  mock: ReactNode;
  wide?: boolean;
};

const features: Feature[] = [
  {
    id: 'privacy',
    title: 'Cover what’s private before you share',
    body: 'Chats, notifications, your inbox, customer data, API keys in a terminal. Blur them or cover them with a solid color before anyone in the meeting sees them.',
    mock: <PrivacyScene />,
  },
  {
    id: 'select',
    title: 'Drag an area or click a window',
    body: (
      <>
        Press <Kbd>⇧</Kbd> <Kbd>⌘</Kbd> <Kbd>F</Kbd> in any app and the screen
        turns into a screenshot style editor. Drag up to six areas, or press
        Space and click a window to cover it exactly.
      </>
    ),
    hint: 'Drag on the screen to add an area, drag an area to move it, or switch to the window tool and click a window.',
    mock: <SelectScene />,
  },
  {
    id: 'modes',
    title: 'Spotlight one thing or hide a few',
    body: 'Blur everything except the video you’re watching, or blur only the distracting parts, like a sidebar full of recommendations.',
    hint: 'Switch the mode below the screen.',
    mock: <ModesScene />,
  },
  {
    id: 'look',
    title: 'Live blur or a solid color',
    body: 'The blur updates in real time, so video underneath stays blurred while it plays. Or cover the area in black, white, gray, red or blue, with square or rounded corners.',
    hint: 'Try the style, strength and corners, then click another channel: the focus belongs to #finance only.',
    mock: <LookScene />,
  },
  {
    id: 'follow',
    title: 'It follows the window and the page',
    body: 'Areas move with the window and scale when you resize it. When the page scrolls, the cover stays on what it hides: it scrolls out of view with that content and comes back with it.',
    mock: <FollowScene />,
  },
  {
    id: 'tabs',
    title: 'Every window and tab keeps its own focus',
    body: 'Switch apps or tabs and the effect switches with them, each with its own look. The browser tab strip stays sharp and clickable.',
    hint: 'Click the tabs in the browser.',
    mock: <TabsScene />,
  },
  {
    id: 'peek',
    title: 'Check what’s underneath, then cover it again',
    body: (
      <>
        Tap <Kbd>⇧</Kbd> <Kbd>⌘</Kbd> <Kbd>C</Kbd> to toggle, or hold it to look
        while pressed. Only the window in front is uncovered. Every other window
        keeps its focus.
      </>
    ),
    hint: 'Hold the button below the screen.',
    mock: <PeekScene />,
  },
  {
    id: 'capture',
    title: 'Viewers see the blur, not your controls',
    body: 'The toolbar, frames and ✕ / ✎ buttons are excluded from capture, so the meeting only sees the effect.',
    mock: <CaptureScene />,
    after: <ShareNotice as='h3' />,
    wide: true,
  },
  {
    id: 'menu-bar',
    title: 'Out of the way until you need it',
    body: 'Blinders lives in the menu bar and stays out of your Dock unless you want it there. Shortcuts, launch at login and the Dock icon are in Settings.',
    mock: <MenuScene />,
  },
];

const steps = [
  {
    icon: HandPointing,
    title: 'Press ⇧⌘F',
    body: 'From any app. The screen dims and the editing toolbar appears at the bottom.',
  },
  {
    icon: CursorClick,
    title: 'Drag an area or click a window',
    body: 'Pick a mode and a look. The effect previews live while you edit.',
  },
  {
    icon: KeyReturn,
    title: 'Press Enter',
    body: 'The focus is applied. Keep working: clicks and typing pass straight through.',
  },
];

const faq: { q: string; a: string }[] = [
  {
    q: 'Does it work in Zoom, Google Meet and Teams?',
    a: 'Yes, when you share your entire screen or a display. If an app shares a single window or browser tab, it captures that window’s own content, without the cover.',
  },
  {
    q: 'Can people in the meeting see the toolbar or the ✕ / ✎ buttons?',
    a: 'All controls are marked as excluded from capture, so viewers only see the effect. Since macOS 15 some sharing apps ignore that flag and may still show the controls. The blur itself is always captured.',
  },
  {
    q: 'Is a blur enough to hide passwords or keys?',
    a: 'Use Solid color at full opacity, or a strong blur. A light blur can still let large text be read.',
  },
  {
    q: 'Why does live blur need the Screen Recording permission?',
    a: 'Blinders has to see what is underneath the area to blur it, and to notice when the page scrolls. If you don’t grant the permission, the Solid color style still works.',
  },
  {
    q: 'What happens when I scroll the page?',
    a: 'The cover moves with the content it hides. When that content scrolls out of view, the cover goes with it, and it comes back when you scroll back. Headers and toolbars that don’t scroll keep their cover in place. Without the Screen Recording permission, the cover stays at the same spot in the window.',
  },
  {
    q: 'Is anything recorded, saved or uploaded?',
    a: 'No. Frames are processed only locally, in memory, and discarded right away. Nothing is saved or sent anywhere, and no audio is recorded.',
  },
  {
    q: 'Does it need the Accessibility permission?',
    a: 'No. Window positions come from the system window list and the shortcuts are registered without Accessibility access.',
  },
  {
    q: 'Can I still click and type in the blurred apps?',
    a: 'Yes. While a focus is active, the mouse and keyboard pass straight through to the apps underneath. The Dock and the menu bar stay sharp.',
  },
  {
    q: 'Which browsers keep the tab strip sharp?',
    a: 'Chrome, Brave, Edge, Vivaldi, Opera, Firefox and Safari. Tabs are told apart by their title, so opening another page in the same tab hides its focus until you apply it again with ✎.',
  },
  {
    q: 'Can I change the shortcuts?',
    a: 'Yes, in Settings. The defaults are ⇧⌘F to select and ⇧⌘C to peek. They’re global, so ⇧⌘F replaces Find in Files in VS Code and ⇧⌘C replaces Inspect element in Chrome DevTools until you pick different ones.',
  },
  {
    q: 'Does it work with more than one display?',
    a: 'Yes. Each display gets its own overlay, and capture runs only on the displays that need it.',
  },
  {
    q: 'What do I need to run it?',
    a: 'A Mac with macOS 15 or later.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

function SectionHeader({ title, body }: { title: ReactNode; body?: string }) {
  return (
    <div className='mx-auto flex max-w-170 flex-col items-center gap-4 text-center'>
      <h2 className='heading-4 md:heading-2'>{title}</h2>
      {body && <p className='body-3 text-muted'>{body}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main id='main'>
        {/* Hero */}
        <section id='top' className='px-4 pb-24 pt-24'>
          <div className='mx-auto flex max-w-6xl flex-col items-center gap-6 text-center'>
            <h1 className='heading-3 sm:heading-2 md:heading-1 text-hero-gradient max-w-170 pb-1'>
              Share your screen, <br className='hidden sm:block' />
              not your secrets
            </h1>
            <p className='body-3 max-w-170 text-muted'>
              Blinders blurs or covers parts of your Mac screen with one
              shortcut. Hide chats, inboxes and secrets before a meeting, or
              hide the distractions around what you’re watching.
            </p>
            <DownloadButton />
          </div>
          <Reveal className='mx-auto mt-16 max-w-5xl'>
            <HeroScene />
          </Reveal>
        </section>

        {/* Entire screen sharing notice */}
        <section className='px-4 pb-24' aria-label='Screen sharing requirement'>
          <Reveal className='mx-auto max-w-5xl'>
            <ShareNotice />
          </Reveal>
        </section>

        {/* Problem → solution */}
        <section className='border-y border-line bg-surface px-4 py-24'>
          <div className='mx-auto flex max-w-6xl flex-col gap-12'>
            <SectionHeader title='One app for two kinds of noise' />
            <div className='grid gap-4 md:grid-cols-2'>
              {[
                {
                  icon: LockSimple,
                  title: 'Privacy while sharing',
                  body: 'Cover chats, notifications, your inbox, other tabs or customer data before you share your screen in a meeting, a demo or a recording.',
                },
                {
                  icon: Target,
                  title: 'Focus while watching',
                  body: 'Watch a tutorial or a talk without the recommendations sidebar, the background or anything else pulling your attention away.',
                },
              ].map(({ icon: Icon, title, body }) => (
                <Reveal
                  key={title}
                  as='article'
                  className='flex flex-col gap-4 rounded-2xl border border-line bg-raised p-8'
                >
                  <span className='grid size-10 place-items-center rounded-lg bg-line-strong text-accent'>
                    <Icon size={20} weight='duotone' aria-hidden />
                  </span>
                  <h3 className='heading-5'>{title}</h3>
                  <p className='body-3 text-muted'>{body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id='features'
          className='px-4 py-24'
          aria-labelledby='features-title'
        >
          <div className='mx-auto flex max-w-6xl flex-col gap-24'>
            <div className='mx-auto flex max-w-170 flex-col items-center gap-4 text-center'>
              <h2 id='features-title' className='heading-4 md:heading-2'>
                See what it does on a real screen
              </h2>
              <p className='body-3 text-muted'>
                Some of the screens below are interactive. Try them.
              </p>
            </div>

            {features.map((f, i) => (
              <Reveal
                key={f.id}
                as='article'
                className={cx(
                  'grid items-center gap-8 md:gap-16',
                  f.wide
                    ? ''
                    : i % 2 === 1
                      ? 'md:grid-cols-[3fr_2fr]'
                      : 'md:grid-cols-[2fr_3fr]',
                )}
              >
                <div
                  id={f.id}
                  className={cx(
                    'flex flex-col gap-4',
                    f.wide
                      ? 'mx-auto max-w-170 items-center text-center'
                      : i % 2 === 1 && 'md:order-2',
                  )}
                >
                  <h3 className='heading-5 md:heading-4'>{f.title}</h3>
                  <p className='body-3 text-muted'>{f.body}</p>
                  {f.hint && <p className='caption-2 text-faint'>{f.hint}</p>}
                </div>
                <div className={cx(!f.wide && i % 2 === 1 && 'md:order-1')}>
                  {f.mock}
                </div>
                {f.after}
              </Reveal>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id='how-it-works' className='px-4 py-24'>
          <div className='mx-auto flex max-w-6xl flex-col gap-12'>
            <SectionHeader title='Three steps, all from the keyboard' />
            <div className='grid gap-4 md:grid-cols-3'>
              {steps.map(({ icon: Icon, title, body }, i) => (
                <Reveal
                  key={title}
                  as='article'
                  className='flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6'
                >
                  <div className='flex items-center justify-between'>
                    <span className='grid size-10 place-items-center rounded-lg bg-raised text-accent'>
                      <Icon size={20} weight='duotone' aria-hidden />
                    </span>
                    <span className='caption-4 label-mono text-faint'>
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className='heading-6'>{title}</h3>
                  <p className='body-6 text-muted'>{body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          id='faq'
          className='border-t border-line bg-surface px-4 py-24'
        >
          <div className='mx-auto flex max-w-3xl flex-col gap-12'>
            <SectionHeader title='Questions before you install' />
            <div className='flex flex-col gap-2'>
              {faq.map(f => (
                <details
                  key={f.q}
                  className='group rounded-xl border border-line bg-raised'
                >
                  <summary className='title-3 flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl p-4 outline-none transition-colors duration-300 ease-brand hover:bg-line focus-visible:ring-2 focus-visible:ring-accent [&::-webkit-details-marker]:hidden'>
                    {f.q}
                    <span className='relative size-4 shrink-0' aria-hidden>
                      <span className='absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-muted' />
                      <span className='absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rotate-90 rounded-full bg-muted transition-transform duration-500 ease-brand group-open:rotate-0' />
                    </span>
                  </summary>
                  <p className='body-6 px-4 pb-4 text-muted'>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        </section>

        {/* Final CTA */}
        <section id='download' className='px-4 py-24'>
          <Reveal className='mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl border border-line bg-surface px-6 py-16 text-center'>
            <img
              src={asset('/blinders-logo.svg')}
              alt='Blinders app icon'
              className='size-16 rounded-2xl'
            />
            <h2 className='heading-4 md:heading-2 text-hero-gradient max-w-170 pb-1'>
              Share your screen, <br className='hidden sm:block' />
              not your secrets
            </h2>
            <DownloadButton />
          </Reveal>
        </section>
      </main>

      <footer className='border-t border-line px-4 py-12'>
        <div className='mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row'>
          <a
            href='#top'
            className='flex items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent'
          >
            <img
              src={asset('/blinders-logo.svg')}
              alt=''
              className='size-6 rounded-md'
            />
            <span className='title-4 font-display font-bold'>Blinders</span>
          </a>
          <nav aria-label='Footer'>
            <ul className='flex flex-wrap justify-center gap-6'>
              {[
                { href: '#features', label: 'Features' },
                { href: '#faq', label: 'FAQ' },
                { href: asset('/privacy/'), label: 'Privacy' },
              ].map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className='caption-4 label-mono rounded-md text-faint outline-none transition-colors duration-300 ease-brand hover:text-ink focus-visible:ring-2 focus-visible:ring-accent'
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className='caption-4 label-mono text-faint'>© 2026 Blinders</p>
        </div>
      </footer>
    </>
  );
}
