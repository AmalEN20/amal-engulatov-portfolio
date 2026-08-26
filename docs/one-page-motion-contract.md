# Amal Portfolio — one-page motion contract

## 1. Narrative purpose and legible information

The page must identify Amal Engulatov as a full-stack developer and digital product builder, show two verified projects, explain concrete capabilities and education, and provide two verified connection paths: GitHub and the existing contact form. Every resting frame must remain readable. There is no portrait, loader message, decorative illustration, invented history, metric, client, résumé, email, LinkedIn, or live-project URL.

## 2. Entry sequence and timing hierarchy

Cold load uses one CSS-owned sequence. `Amal` and `Engulatov` rise from word masks first. The role follows while the second name word is still settling. Bio, availability, compact anchors, and the first divider enter as blocks with 70–90ms overlap. Total meaningful identity entry stays below 1.3 seconds. The start transform is approximately `translateY(112%)` for name words and `translateY(18–24px)` for supporting blocks; the target easing is an original strong deceleration curve.

The sequence is gated only by an early capability flag. If JavaScript is disabled, blocked, or hydration fails, the flag is absent and server-rendered content is visible immediately. There is no curtain, body lock, navigation delay, React timer, or hydration-owned completion state.

## 3. Scroll interval and stopped frames

- Start: the identity group is complete and the first divider establishes the reading column.
- Middle: `Selected Work` rows enter as complete semantic groups; title, responsibility, summary, stack, and available action remain readable together.
- Late: capabilities and education use the same restrained block rhythm, with no pinning or competing parallax.
- End: Connect and the form rest as an ordinary document section with stable labels, controls, and actions.

On supporting browsers, below-fold section headings and row groups use a shallow CSS view-timeline translation/fade. The default, unsupported, and failure states are fully visible. No content depends on crossing a JavaScript threshold.

## 4. Exit and reverse behavior

The one-page document has no page-local route exit. Anchor navigation is immediate and native. CSS view-timeline enhancement reverses continuously with scroll without threshold flicker; stopped frames keep complete readable groups. Legacy URLs redirect to section anchors. Back/Forward must restore the expected URL/anchor without replaying a React intro or trapping focus.

## 5. Layer ownership

- Semantic structure, content, lists, links, form controls: server-rendered DOM.
- Word masks, block reveals, hover/focus feedback, dividers, optional view progress: CSS.
- Cold-load capability flag: a tiny inline script that makes no content or navigation decisions.
- Contact submission: the existing `ContactForm` and Formspree contract, unchanged.
- Metadata/social card: Next.js metadata and server-rendered `ImageResponse`.
- Canvas, WebGL, SVG choreography, video, Lenis, GSAP, observers, timers, scroll listeners, and RAF: not used.

## 6. Desktop, mobile, and reduced-motion variants

- Desktop 1440×900: one centered column, maximum readable width around 700px, compact and consistent section rhythm, project rows with two-column metadata where useful.
- Mobile 390×844 and 430×932: 20px side padding, single-column project details, wrapped actions, native touch scroll, safe word masks, and at least 44px interactive targets.
- Reduced motion: all transforms and animations are removed; content renders at its final state; native scroll and immediate anchor navigation remain.

## 7. Performance budget and cleanup owner

No client animation dependency, media request, persistent frame loop, observer, listener, body lock, or WebGL context is introduced. Animations use transform, opacity, and scale only. Font ownership remains the existing Geist Sans and Geist Mono registration. The browser owns CSS animation cleanup; the contact component owns only its existing form state.

## 8. Acceptance checks

- One semantic H1 with the complete accessible name; visual fragments cannot alter it.
- Content remains visible with JavaScript disabled and after simulated hydration failure.
- No clipped descenders at entry end; long words wrap safely at 390px and 430px.
- Cold load, refresh, middle, final, slow/fast/stop/reverse frames are intentional.
- Hover and `:focus-visible` feedback are visible; keyboard order follows document order.
- Skip link, headings, lists, labels, live form status, and real links remain semantic.
- Anchors, duplicate clicks, legacy redirects, and Back/Forward work without a route curtain.
- Reduced motion has no decorative delay, hidden content, autoplay media, inertia, or scroll lock.
- No horizontal overflow at 390px or 430px.
- No console/hydration errors; metadata, Open Graph, Twitter image, lint, TypeScript, and production build pass.
