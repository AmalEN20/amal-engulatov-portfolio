# Amal Portfolio — compact Lee-structure / heavy-scroll contract

## 1. Narrative purpose and legible information

The page identifies the owner publicly as `Amal E`, a full-stack developer and digital product builder, through a compact left reading column ordered as `Introduction → Experience → Projects → Education`. The introduction is one uninterrupted identity group: name, role, Seattle location, and a concise first-person summary that truthfully frames Amal as a self-taught developer finding his place amid rapid AI-led change before naming the full-stack products he builds; it has no visible `Bio` label or availability line. Experience contains the user-confirmed Software Engineer role at IHealth and Wellness Foundation (`Aug 2023 — Jul 2026`) and freelance full-stack work (`2025 — Present`). Each record leads with the role; the IHealth organization sits on the same row at the right, while the generic `Independent` label is intentionally omitted. Period/location and responsibilities follow beneath. Education uses the credentials already present in the repository. A separate right visual column reuses Amal's existing ASCII/pixel portrait renderer as a personal identity layer. Notes are omitted until strong material exists. Projects remain limited to EVELE STUDIO and Amal AI Studio. Every resting frame must remain readable. There is no section numbering, invented metric, or unsupported project claim. The confirmed public email is included in the PDF résumé. LinkedIn, GitHub, and Resume follow Education directly without a preceding rule or repeated owner name.

## 2. Entry sequence and timing hierarchy

Cold load restores the approved preloader choreography from the earlier Amal portfolio while adapting its surface and message to the current direction. The sequence is `holding → curtain-exiting → complete`: one fixed white surface owns the centered single-line black message (`Passion to build something new and interesting.`), the existing line entrance, the shared surface-and-copy departure beginning around 1780ms, and complete removal around 3020ms. The message is a child of the moving surface, retains full opacity, and leaves in the same coordinate space as the white field; it cannot fade early or remain floating after the surface edge passes. Instrument Sans is used at a fluid size that preserves one line at 390px, 430px, and desktop widths; the direction and pacing remain Amal's own previous implementation.

The portfolio document underneath is server-rendered in its final resting state from the first frame. When the curtain leaves, the name, supporting copy, section headings, rows, links, and dividers are already fully visible. There is no document-level word reveal, line reveal, stagger, observer, view timeline, scroll threshold, or delayed content entrance after the preloader. Scrolling, anchors, Back/Forward, and returning to the page never replay content animation; the root-layout preloader runs only for a full page load/refresh.

The preloader is fail-open. JavaScript-disabled markup receives a finite CSS fallback that removes visibility and pointer capture, while a small independent watchdog clears the intro lock and removes the surface if hydration or React timers fail. The watchdog is cleanup only and does not own the normal animation. Reduced motion skips the decorative hold and exposes the complete document immediately without scroll lock.

## 3. Scroll interval and stopped frames

- Start: name, role, location, and résumé-grounded summary establish the complete identity without a viewport-height hero or visible Bio label.
- Middle: Experience uses organization-first stacked records; Projects use compact title rows with hairline separators.
- Late: Education uses the same restrained row grammar.
- End: LinkedIn, GitHub, and the PDF Resume follow Education directly in that order, without a footer rule or repeated identity label.

Desktop/fine-pointer wheel input is smoothed by one Lenis instance. Target feel: a direct initial response followed by approximately 1.0–1.4 seconds of controlled deceleration. The right portrait is fixed to the viewport bottom. Its frame, glyph positions, scale, opacity, and animation state do not depend on scroll progress. No content section is pinned and no content position is scrubbed.

The desktop reading column and portrait are treated as two balanced visual masses rather than equal-width boxes. The copy keeps its readable measure while section gaps, row padding, and footer spacing are tightened. The portrait remains bottom-anchored but is reduced so its visible silhouette does not outweigh the complete text column. Mobile keeps the same compact reading rhythm without reserving any space for the removed portrait.

### Project-dialog interaction

Each Projects row is a real button that opens a project-specific native modal dialog. The page and scroll position stay in place. A restrained translucent backdrop fades in first; the centered white panel then reveals from its top edge to its bottom edge like a short curtain. The panel begins with the project title—there is no category/year eyebrow—followed by summary, description, responsibility, stack, and a dedicated actions group. All project information is already in its final state inside the white surface: the panel clip reveals the title, copy, dots, dividers, and actions together as one composition. There are no independent word, block, dot, or rule entrance timelines. The panel is deliberately smaller than the viewport and may scroll internally when its verified content exceeds the available height.

Opening is finite and interaction-owned: backdrop approximately 680ms, panel approximately 1080ms on desktop and 1180ms on mobile, with a slow-start curtain curve so the surface does not appear almost complete in its first frames. The single clipping surface owns the entire entrance, so no information can lead or lag behind the card. It never depends on page scroll position and does not restart the site preloader. Closing is deliberately sequential: the exact reverse panel clip contracts from bottom to top over approximately 1080ms on desktop and 1180ms on mobile while every child retains full opacity and its final transform; only after that clip reaches 100% does the backdrop begin its existing smooth 700ms fade. A finite close-sequence animation keeps the native top layer alive until the backdrop finishes. Native `dialog.close()` runs only after that full sequence completes (with a timeout used only as a fail-safe), preventing early shadow loss or a last-frame snap. Reopening a project intentionally replays only that dialog's surface entrance.

Verified actions are explicit. EVELE STUDIO exposes `https://evele.studio` and labels its code as private. Amal AI Studio exposes its confirmed GitHub repository and truthfully labels the live site as not published; no guessed deployment URL is rendered.

## 4. Exit and reverse behavior

The one-page document has no page-local route exit. Anchor links are handed to the same Lenis owner on desktop and remain native on touch/reduced motion. Reverse input must respond immediately and ease without overshoot. Legacy URLs redirect to stable anchors. Back/Forward must restore the expected URL/anchor without replaying an intro or trapping focus.

Project dialogs do not change routes or browser history. Escape, backdrop click, and a visually hidden assistive close control request the same finite close sequence; there is no visible Close row consuming card space. Background scrolling is locked only while a dialog is open, then restored exactly. Before Lenis restarts, the global scroll owner synchronizes its internal position to the restored native scroll coordinate, avoiding a post-close snap. Focus returns to the triggering project row after close. Repeated open/close cycles must not leave an animation listener, fail-safe timer, scroll lock, or stale focus target behind.

## 5. Layer ownership

- Semantic structure, content, lists, links, form controls: server-rendered DOM.
- Layout and hover/focus feedback: CSS. Page content and dividers have no entrance animation.
- Cold-load preloader state/timers and intro lock signal: one scoped client component; one CSS surface owns both its white field and black message, plus the no-JS visibility fallback; independent watchdog: one root-layout script.
- Project-dialog semantics, focus containment, Escape behavior, and top-layer backdrop: native HTML `dialog`; its finite panel curtain, delayed backdrop fade, and close-sequence hold: CSS; its animation-completion listener, fail-safe timer, exact body-style restoration, trigger-focus restoration, and lock signal: one scoped client component. The existing `HeavyScroll` owner alone responds to intro/dialog lock signals by stopping, synchronizing, and restarting Lenis.
- Wheel inertia: one client-only Lenis owner in the root layout, one RAF, fine-pointer only.
- Pixel portrait: the existing client Canvas 2D renderer in embedded mode, scoped to the right visual frame; its source asset and sampling algorithm remain local.
- Contact submission: the existing `ContactForm` and Formspree contract, unchanged.
- Metadata/social card: Next.js metadata and server-rendered `ImageResponse`.
- GSAP, ScrollTrigger, WebGL, SVG choreography, video, persistent body locks, and scroll-driven portrait timelines: not used.

## 6. Desktop, mobile, and reduced-motion variants

- Desktop 1440×900: a compact 600px reading column and a reduced frameless pixel silhouette fixed to the bottom-right viewport edge, balanced as visual masses with a narrower inter-column gap.
- Responsive breakpoint: the visual exists at `1100px` and above; at `1099px` and below it is completely removed, matching the measured Lee breakpoint.
- Mobile 390×844 and 430×932: no portrait or portrait placeholder; content uses 20px side padding, native touch scroll, at least 44px interactive targets, and the same single document-level entry while preserving the word-mask grammar.
- Project dialogs: centered and comfortably inset on desktop; on mobile they retain a visible page margin, use the deliberately slower 1180ms curtain in both directions, hold the backdrop until that curtain is fully closed, and cap their internal height below the viewport rather than becoming full-screen.
- Reduced motion: the preloader is skipped, Lenis is never created, the portrait renders one static Canvas frame without a continuous RAF, all document and dialog content is immediately visible, and dialogs open/close without decorative delay.

### Typography comparison variants

Instrument Sans is the production default selected by Amal. Three query-only previews remain available for controlled comparison and reuse identical content, layout, semantics, and motion:

- `?type=geist`: Geist Sans + Geist Mono, the neutral precision/control variant.
- `?type=instrument`: Instrument Sans for interface and display text, Geist Mono for metadata, with a slightly warmer geometric rhythm; this is also the fallback for `/` and unknown query values.
- `?type=plex`: IBM Plex Sans Condensed only for selected display moments, Geist Sans for body text, and Geist Mono for metadata, producing a more editorial/technical hierarchy.

There is no visible public font switcher and no route duplication. Preview families are registered once in the shared root layout; Instrument Sans is preloaded for the selected production path, while the comparison-only family remains non-preloaded. The selected token is applied on the existing portfolio root. Query values outside the allowlist fall back to Instrument Sans.

## 7. Performance budget and cleanup owner

Budget: one Lenis instance/RAF for desktop wheel plus one visible portrait RAF; portrait DPR remains capped at 1.5 desktop and 1.15 coarse pointer, and its IntersectionObserver suspends drawing offscreen. Preloader and dialog motion are finite CSS animations only. No content-entry observer, view timeline, ScrollTrigger, GSAP, WebGL, video, or additional scroll owner is introduced. `SiteIntro` owns two normal timers and an intro-lock signal; the root watchdog owns one self-clearing timeout; `HeavyScroll` owns Lenis cleanup plus intro/dialog lock event listeners; `AsciiPortrait` owns its Canvas RAF, ResizeObserver, IntersectionObserver, pointer listener, media listener, and cleanup. The project-dialog component owns one temporary `animationend` listener, at most one fail-safe close timer, and a temporary page scroll lock, and restores all of them on close or unmount. Native touch is preserved outside the dialog; dialog overflow is native.

## 8. Acceptance checks

- One semantic H1 with the complete accessible name; visual fragments cannot alter it.
- Content remains visible with JavaScript disabled and after simulated hydration failure.
- No clipped descenders at entry end; long words wrap safely at 390px and 430px.
- Introduction, Experience, Projects, and Education appear in that order with no Bio label, availability line, Notes, or numeric labels.
- Cold load and refresh render the white preloader with one unwrapped black message, then preserve the approved hold, shared surface-and-message curtain exit, and final removal; the message never fades independently or remains outside the white surface.
- Every page text fragment and divider is in its final state beneath the preloader and remains static after reveal; below-fold content never waits for scroll.
- Desktop wheel decelerates without delaying the initial response; touch and reduced motion stay native.
- The portrait has no visible frame or background, begins at the viewport bottom, never covers copy, never reacts to scroll progress, and stops its RAF under reduced motion or when removed from the route.
- The preloader is decorative and hidden from assistive technology; real page text remains semantic and unfragmented. Reduced motion skips the preloader.
- Every visible horizontal divider reaches full width without overshoot or a one-pixel final gap.
- Hover and `:focus-visible` feedback are visible; keyboard order follows document order.
- The final divider and repeated `Amal E` label are absent; footer actions start immediately after Education.
- IHealth aligns to the right of `Software Engineer`; `Independent` is not rendered above the freelance role, including at 390px and 430px.
- Geist, Instrument, and Plex preview URLs preserve content order, masks, dialog typography, focus targets, and zero horizontal overflow; the default `/` and invalid query values render Instrument Sans.
- At the dialog's 5%, 50%, and 95% stopped frames, every visible title/copy/dot/rule is revealed only by the white panel's single clip; no child animation or delayed element exists.
- Both project rows open their own verified content in a centered, non-full-screen white dialog; the backdrop is moderate, the top-down panel reveal finishes cleanly, and supporting text is never left clipped.
- Closing keeps all child text, dots, dividers, and actions fully opaque while the panel clip reverses; the backdrop remains at full strength until the card is fully clipped, then fades smoothly before native top-layer removal, with no last-frame snap, flash, or stale Lenis coordinate.
- EVELE's live link and private-source state are truthful; Amal AI Studio's repository link is truthful and its missing public deployment is stated rather than invented.
- Project dialogs support keyboard activation, Escape, backdrop close, an assistive hidden close action, focus containment, trigger-focus restoration, repeated open/close, internal overflow, and no background scroll; no visible Close row remains.
- Skip link, headings, lists, labels, live form status, and real links remain semantic.
- Anchors, duplicate clicks, legacy redirects, and Back/Forward work without a route curtain.
- Reduced motion has no decorative delay, hidden content, autoplay media, inertia, or scroll lock.
- No horizontal overflow at 390px or 430px.
- No console/hydration errors; metadata, Open Graph, Twitter image, lint, TypeScript, and production build pass.
