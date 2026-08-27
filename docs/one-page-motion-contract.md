# Amal Portfolio — compact Lee-structure / heavy-scroll contract

## 1. Narrative purpose and legible information

The page identifies the owner publicly as `Amal E`, a full-stack developer and digital product builder, through a compact left reading column ordered as `Introduction → Experience → Projects → Education`. The introduction is one uninterrupted identity group: name, role, Seattle location, and a résumé-grounded two-paragraph summary; it has no visible `Bio` label or availability line. Experience contains the user-confirmed Software Engineer role at IHealth and Wellness Foundation (`Aug 2023 — Jul 2026`) and freelance full-stack work (`2025 — Present`). Each record leads with the role; the IHealth organization sits on the same row at the right, while the generic `Independent` label is intentionally omitted. Period/location and responsibilities follow beneath. Education uses the credentials already present in the repository. A separate right visual column reuses Amal's existing ASCII/pixel portrait renderer as a personal identity layer. Notes are omitted until strong material exists. Projects remain limited to EVELE STUDIO and Amal AI Studio. Every resting frame must remain readable. There is no section numbering, loader, invented metric, or unsupported project claim. The confirmed public email is included in the PDF résumé. LinkedIn, GitHub, and Resume follow Education directly without a preceding rule or repeated owner name.

## 2. Entry sequence and timing hierarchy

Cold load follows the audited Cuberto text mechanics through an original CSS implementation. The two name words begin at approximately `translateY(120%)` inside padded clip masks, stay fully opaque, and settle with strong deceleration over roughly 1.25–1.35 seconds. The second word starts about 80–90ms after the first. Every other visible text group—including role, location, résumé summary, organization, position, period, descriptions, project rows, education, and footer links—uses the same padded word-mask grammar with a tighter 20–30ms word stagger. Supporting groups overlap the heading instead of waiting for it to finish. Hairline dividers scale from the left with the same easing and overlap adjacent copy.

This is one document-level entrance, not a collection of viewport reveals. Fixed entry beats begin on the initial page load for the full server-rendered document, including groups below the fold. After the final beat, all words and dividers remain at their completed state. Scrolling down, stopping, reversing, jumping to an anchor, or using Back/Forward never creates, restarts, or reverses a text reveal. There is no `IntersectionObserver`, view timeline, scroll threshold, or section-local animation lifecycle.

A tiny fail-open head script arms CSS entry motion only for a fresh navigation or reload, not Back/Forward. It removes the capability flag only after the longest animation has completed. If the script is blocked, server-rendered content is already in its final state. If hydration fails after the flag is set, finite CSS animations still complete without a React timer or body lock.

The sequence is gated only by an early capability flag. If JavaScript is disabled, blocked, or hydration fails, the flag is absent and server-rendered content is visible immediately. There is no curtain, body lock, navigation delay, React timer, or hydration-owned completion state.

## 3. Scroll interval and stopped frames

- Start: name, role, location, and résumé-grounded summary establish the complete identity without a viewport-height hero or visible Bio label.
- Middle: Experience uses organization-first stacked records; Projects use compact title rows with hairline separators.
- Late: Education uses the same restrained row grammar.
- End: LinkedIn, GitHub, and the PDF Resume follow Education directly in that order, without a footer rule or repeated identity label.

Desktop/fine-pointer wheel input is smoothed by one Lenis instance. Target feel: a direct initial response followed by approximately 1.0–1.4 seconds of controlled deceleration. The right portrait is fixed to the viewport bottom. Its frame, glyph positions, scale, opacity, and animation state do not depend on scroll progress. No content section is pinned and no content position is scrubbed.

The desktop reading column and portrait are treated as two balanced visual masses rather than equal-width boxes. The copy keeps its readable measure while section gaps, row padding, and footer spacing are tightened. The portrait remains bottom-anchored but is reduced so its visible silhouette does not outweigh the complete text column. Mobile keeps the same compact reading rhythm without reserving any space for the removed portrait.

### Project-dialog interaction

Each Projects row is a real button that opens a project-specific native modal dialog. The page and scroll position stay in place. A restrained translucent backdrop fades in first; the centered white panel then reveals from its top edge to its bottom edge like a short curtain. The panel begins with the project title—there is no category/year eyebrow—followed by summary, description, responsibility, stack, and a dedicated actions group. The project title uses a clipped word reveal; supporting copy and actions enter as calm masked blocks with controlled overlap rather than a busy per-line cascade. The panel is deliberately smaller than the viewport and may scroll internally when its verified content exceeds the available height.

Opening is finite and interaction-owned: backdrop approximately 480ms, panel approximately 820ms, content beginning once the panel has visibly established itself. It never depends on page scroll position and does not restart the document entrance. Closing reverses the panel and backdrop over approximately 520ms. Native `dialog.close()` runs only after the CSS exit animation completes (with a timeout used only as a fail-safe), preventing top-layer removal one frame before the curtain/backdrop settles. Reopening a project intentionally replays only that dialog's local entrance.

Verified actions are explicit. EVELE STUDIO exposes `https://evele.studio` and labels its code as private. Amal AI Studio exposes its confirmed GitHub repository and truthfully labels the live site as not published; no guessed deployment URL is rendered.

## 4. Exit and reverse behavior

The one-page document has no page-local route exit. Anchor links are handed to the same Lenis owner on desktop and remain native on touch/reduced motion. Reverse input must respond immediately and ease without overshoot. Legacy URLs redirect to stable anchors. Back/Forward must restore the expected URL/anchor without replaying an intro or trapping focus.

Project dialogs do not change routes or browser history. Escape, the visible Close control, and a backdrop click request the same finite close sequence. Background scrolling is locked only while a dialog is open, then restored exactly. Before Lenis restarts, the global scroll owner synchronizes its internal position to the restored native scroll coordinate, avoiding a post-close snap. Focus returns to the triggering project row after close. Repeated open/close cycles must not leave an animation listener, fail-safe timer, scroll lock, or stale focus target behind.

## 5. Layer ownership

- Semantic structure, content, lists, links, form controls: server-rendered DOM.
- Layout, hover/focus feedback, all word masks, and divider entry: CSS.
- Project-dialog semantics, focus containment, Escape behavior, and top-layer backdrop: native HTML `dialog`; its finite curtain and content reveals: CSS; its animation-completion listener, fail-safe timer, exact body-style restoration, trigger-focus restoration, and lock signal: one scoped client component. The existing `HeavyScroll` owner alone responds to that signal by stopping, synchronizing, and restarting Lenis.
- Wheel inertia: one client-only Lenis owner in the root layout, one RAF, fine-pointer only.
- Pixel portrait: the existing client Canvas 2D renderer in embedded mode, scoped to the right visual frame; its source asset and sampling algorithm remain local.
- Contact submission: the existing `ContactForm` and Formspree contract, unchanged.
- Metadata/social card: Next.js metadata and server-rendered `ImageResponse`.
- GSAP, ScrollTrigger, WebGL, SVG choreography, video, persistent body locks, and scroll-driven portrait timelines: not used.

## 6. Desktop, mobile, and reduced-motion variants

- Desktop 1440×900: a compact 600px reading column and a reduced frameless pixel silhouette fixed to the bottom-right viewport edge, balanced as visual masses with a narrower inter-column gap.
- Responsive breakpoint: the visual exists at `1100px` and above; at `1099px` and below it is completely removed, matching the measured Lee breakpoint.
- Mobile 390×844 and 430×932: no portrait or portrait placeholder; content uses 20px side padding, native touch scroll, at least 44px interactive targets, and the same single document-level entry while preserving the word-mask grammar.
- Project dialogs: centered and comfortably inset on desktop; on mobile they retain a visible page margin, use a shorter curtain, and cap their internal height below the viewport rather than becoming full-screen.
- Reduced motion: Lenis is never created; the portrait renders one static Canvas frame without a continuous RAF; all document and dialog content is immediately visible, and dialogs open/close without decorative delay.

### Typography comparison variants

The production default remains Geist while Amal chooses a direction. Three query-only local previews reuse identical content, layout, semantics, and motion:

- `?type=geist`: Geist Sans + Geist Mono, the neutral precision/control variant.
- `?type=instrument`: Instrument Sans for interface and display text, Geist Mono for metadata, with a slightly warmer geometric rhythm.
- `?type=plex`: IBM Plex Sans Condensed only for selected display moments, Geist Sans for body text, and Geist Mono for metadata, producing a more editorial/technical hierarchy.

There is no visible public font switcher and no route duplication. Preview families are registered once in the shared root layout with preload disabled; the selected token is applied on the existing portfolio root. Query values outside the allowlist fall back to Geist.

## 7. Performance budget and cleanup owner

Budget: one Lenis instance/RAF for desktop wheel plus one visible portrait RAF; portrait DPR remains capped at 1.5 desktop and 1.15 coarse pointer, and its IntersectionObserver suspends drawing offscreen. Entry motion is finite CSS animation only. No entry observer, view timeline, ScrollTrigger, GSAP, WebGL, video, or additional scroll owner is introduced. The head bootstrap owns one self-clearing timeout; `HeavyScroll` owns Lenis cleanup plus one dialog-lock event listener; `AsciiPortrait` owns its Canvas RAF, ResizeObserver, IntersectionObserver, pointer listener, media listener, and cleanup. The project-dialog component owns one temporary `animationend` listener, at most one fail-safe close timer, and a temporary page scroll lock, and restores all of them on close or unmount. Native touch is preserved outside the dialog; dialog overflow is native.

## 8. Acceptance checks

- One semantic H1 with the complete accessible name; visual fragments cannot alter it.
- Content remains visible with JavaScript disabled and after simulated hydration failure.
- No clipped descenders at entry end; long words wrap safely at 390px and 430px.
- Introduction, Experience, Projects, and Education appear in that order with no Bio label, availability line, Notes, or numeric labels.
- Cold load, refresh, middle, final, slow/fast/abrupt-stop/reverse frames are intentional.
- Every below-fold text fragment and divider has already reached its final transform before it is later scrolled into view; no scroll-triggered replay occurs.
- Desktop wheel decelerates without delaying the initial response; touch and reduced motion stay native.
- The portrait has no visible frame or background, begins at the viewport bottom, never covers copy, never reacts to scroll progress, and stops its RAF under reduced motion or when removed from the route.
- Word masks preserve one semantic accessible name and protect descenders; reduced motion removes transforms and delays.
- Every visible horizontal divider reaches full width without overshoot or a one-pixel final gap.
- Hover and `:focus-visible` feedback are visible; keyboard order follows document order.
- The final divider and repeated `Amal E` label are absent; footer actions start immediately after Education.
- IHealth aligns to the right of `Software Engineer`; `Independent` is not rendered above the freelance role, including at 390px and 430px.
- Geist, Instrument, and Plex preview URLs preserve content order, masks, dialog typography, focus targets, and zero horizontal overflow; the default `/` remains Geist until Amal chooses.
- Both project rows open their own verified content in a centered, non-full-screen white dialog; the backdrop is moderate, the top-down panel reveal finishes cleanly, and supporting text is never left clipped.
- Closing completes the curtain and backdrop before native top-layer removal; the restored page does not jump, flash, or resume Lenis from a stale coordinate.
- EVELE's live link and private-source state are truthful; Amal AI Studio's repository link is truthful and its missing public deployment is stated rather than invented.
- Project dialogs support keyboard activation, Escape, visible Close, backdrop close, focus containment, trigger-focus restoration, repeated open/close, internal overflow, and no background scroll.
- Skip link, headings, lists, labels, live form status, and real links remain semantic.
- Anchors, duplicate clicks, legacy redirects, and Back/Forward work without a route curtain.
- Reduced motion has no decorative delay, hidden content, autoplay media, inertia, or scroll lock.
- No horizontal overflow at 390px or 430px.
- No console/hydration errors; metadata, Open Graph, Twitter image, lint, TypeScript, and production build pass.
