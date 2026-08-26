# Amal Portfolio — compact Lee-structure / heavy-scroll contract

## 1. Narrative purpose and legible information

The page must identify Amal Engulatov as a full-stack developer and digital product builder through a compact left reading column ordered as `Bio → Notes → Projects → Experiments`. A separate right visual column reuses Amal's existing ASCII/pixel portrait renderer as a personal identity layer. Notes are short working principles, not claims of published articles. Projects remain limited to EVELE STUDIO and Amal AI Studio. Every resting frame must remain readable. There is no section numbering, loader, invented history, metric, client, résumé, email, LinkedIn, or live-project URL.

## 2. Entry sequence and timing hierarchy

Cold load follows the audited Cuberto text mechanics through an original CSS implementation. The two name words begin at approximately `translateY(118%)` inside padded clip masks, stay fully opaque, and settle with a strong deceleration over roughly 1.35 seconds. The second word starts about 90ms after the first. Role and Bio copy use block masks with 70–110ms overlap; Notes, Projects, Experiments, and the footer continue the same hierarchy. Hairline dividers scale from the left with the same easing and overlap the adjacent copy rather than waiting for it to finish.

A tiny fail-open head script arms CSS entry motion only for a fresh navigation or reload, not Back/Forward. It removes the capability flag after the sequence. If the script is blocked, server-rendered content is already in its final state. If hydration fails after the flag is set, CSS animations still complete without a React timer or body lock.

The sequence is gated only by an early capability flag. If JavaScript is disabled, blocked, or hydration fails, the flag is absent and server-rendered content is visible immediately. There is no curtain, body lock, navigation delay, React timer, or hydration-owned completion state.

## 3. Scroll interval and stopped frames

- Start: name, role, and Bio establish the complete identity without a viewport-height hero.
- Middle: Notes use a compact two-column desktop list; Projects use simple title/meta rows with hairline separators.
- Late: Experiments use the same row grammar and remain short enough to scan without a staged reveal.
- End: a minimal footer exposes GitHub and the preserved Contact route.

Desktop/fine-pointer wheel input is smoothed by one Lenis instance. Target feel: a direct initial response followed by approximately 1.0–1.4 seconds of controlled deceleration. The right portrait is fixed to the viewport bottom. Its frame, glyph positions, scale, opacity, and animation state do not depend on scroll progress. No content section is pinned and no content position is scrubbed.

## 4. Exit and reverse behavior

The one-page document has no page-local route exit. Anchor links are handed to the same Lenis owner on desktop and remain native on touch/reduced motion. Reverse input must respond immediately and ease without overshoot. Legacy URLs redirect to stable anchors. Back/Forward must restore the expected URL/anchor without replaying an intro or trapping focus.

## 5. Layer ownership

- Semantic structure, content, lists, links, form controls: server-rendered DOM.
- Layout, hover/focus feedback, dividers, and any shallow entry: CSS.
- Wheel inertia: one client-only Lenis owner in the root layout, one RAF, fine-pointer only.
- Pixel portrait: the existing client Canvas 2D renderer in embedded mode, scoped to the right visual frame; its source asset and sampling algorithm remain local.
- Contact submission: the existing `ContactForm` and Formspree contract, unchanged.
- Metadata/social card: Next.js metadata and server-rendered `ImageResponse`.
- GSAP, ScrollTrigger, WebGL, SVG choreography, video, body locks, and scroll-driven portrait timelines: not used.

## 6. Desktop, mobile, and reduced-motion variants

- Desktop 1440×900: a 600px copy column and a larger frameless pixel silhouette fixed to the bottom-right viewport edge.
- Responsive breakpoint: the visual exists at `1100px` and above; at `1099px` and below it is completely removed, matching the measured Lee breakpoint.
- Mobile 390×844 and 430×932: no portrait or portrait placeholder; content uses 20px side padding, one-column Notes, native touch scroll, and at least 44px interactive targets.
- Reduced motion: Lenis is never created; the portrait renders one static Canvas frame without a continuous RAF; all content is immediately visible.

## 7. Performance budget and cleanup owner

Budget: one Lenis instance/RAF for desktop wheel plus one visible portrait RAF; portrait DPR remains capped at 1.5 desktop and 1.15 coarse pointer, and its IntersectionObserver suspends drawing offscreen. No ScrollTrigger, WebGL, video, body lock, or scroll listener is introduced. `HeavyScroll` owns Lenis cleanup; `AsciiPortrait` owns its Canvas RAF, ResizeObserver, IntersectionObserver, pointer listener, media listener, and cleanup. Native touch is preserved.

## 8. Acceptance checks

- One semantic H1 with the complete accessible name; visual fragments cannot alter it.
- Content remains visible with JavaScript disabled and after simulated hydration failure.
- No clipped descenders at entry end; long words wrap safely at 390px and 430px.
- Bio, Notes, Projects, and Experiments appear in that order with no numeric labels.
- Cold load, refresh, middle, final, slow/fast/abrupt-stop/reverse frames are intentional.
- Desktop wheel decelerates without delaying the initial response; touch and reduced motion stay native.
- The portrait has no visible frame or background, begins at the viewport bottom, never covers copy, never reacts to scroll progress, and stops its RAF under reduced motion or when removed from the route.
- Word masks preserve one semantic accessible name and protect descenders; reduced motion removes transforms and delays.
- Every visible horizontal divider reaches full width without overshoot or a one-pixel final gap.
- Hover and `:focus-visible` feedback are visible; keyboard order follows document order.
- Skip link, headings, lists, labels, live form status, and real links remain semantic.
- Anchors, duplicate clicks, legacy redirects, and Back/Forward work without a route curtain.
- Reduced motion has no decorative delay, hidden content, autoplay media, inertia, or scroll lock.
- No horizontal overflow at 390px or 430px.
- No console/hydration errors; metadata, Open Graph, Twitter image, lint, TypeScript, and production build pass.
