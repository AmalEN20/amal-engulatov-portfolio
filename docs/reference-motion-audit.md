# Amal Portfolio — Lee Robinson / Cuberto reference audit

## Scope and conditions

- Audited on 2026-08-25 and re-audited on 2026-08-26 in task-owned Codex in-app Browser sessions.
- Canonical routes: `https://leerob.com/`, `https://leerob.com/vercel`, `https://cuberto.com/`, and `https://cuberto.com/projects/`.
- Desktop: 1440×900 browser emulation. Mobile: exact 390×844 browser emulation through DevTools device metrics; this is not real-iPhone proof.
- Interactions: cold load, slow/fast wheel input, abrupt stop, reverse input, representative hover, internal navigation, Back/Forward, 390px responsive substitution, and `prefers-reduced-motion: reduce`.
- No form submissions, sound, permissions, personal browser state, or external account actions were used.

## Executive judgment

Lee Robinson's current page feels professional because it is edited rather than decorated: a 600px copy column, a short Bio, a two-column Notes list, and plain title/date rows under Blogs. Its desktop image is a separate sticky identity layer, while mobile removes that layer and lets the text own the page. The `Default / Long` control switches from the compact Bio to a much longer version without an animated transition. Amal's new page should transfer the exact information rhythm—`Bio → Notes → Projects → Experiments`—and row density, not Lee's serif, illustration, copy, toggle, or personal brand.

Cuberto's quality comes from one repeated motion grammar: text begins below clipped word masks, adjacent words overlap in time, supporting content follows before the headline spectacle fully completes, and wheel input decelerates into readable stopped frames. For Amal's much shorter, conversion-oriented page, the transferable part is the mask, stagger, easing, overlap, and restrained link feedback. Persistent inertia, large media scenes, video, cursor branding, loader surfaces, and agency-scale choreography would add cost without improving comprehension.

## Evidence ledger

### Observed

- Lee desktop uses roughly a 600px text column alongside a tall sticky visual; the mobile breakpoint removes the visual and preserves a single text column with 20px side padding.
- At 1440×900, Lee's copy begins at 49px, Notes begins around 438px, and Blogs around 697px; the complete default page is only about 1220px tall.
- Lee Notes contains ten short links in two desktop columns and one mobile column. Blog entries are title/date rows separated by hairlines.
- Switching from `Default` to `Long` expands the Bio immediately without a transition; the compact default is the relevant structural reference.
- Lee's right visual is `display: none` through 1099px and becomes visible at exactly 1100px in the audited desktop emulation.
- Lee wheel input stops immediately at the native destination. A 620px wheel input reached the page's available 320.5px scroll range without continued movement.
- Lee links move from muted gray toward a lighter gray on hover over roughly 300ms; dividers remain thin and quiet.
- Cuberto's home H1 enters word by word from below its line box. During one cold load, the first word was already near its resting position while the last word remained about one line below the mask.
- Repeated cold-load sampling on Cuberto home and About observed inner words beginning about 136px below a roughly 113px mask (approximately 120%), staying at opacity 1, and settling near zero over roughly 1.4–1.7 seconds with about 80–100ms neighboring overlap.
- Cuberto wheel input continues after the wheel event and eases to rest: a 620px input sampled at 0, 202.5, 608.5, then 620px over roughly 1.3 seconds. Reverse input eased back without snapping.
- Cuberto mobile replaces the full desktop navigation with a compact menu toggle and changes the hero typography/media proportions.
- With reduced motion emulated, Cuberto still ran the masked intro and autoplay video. The final state was usable, but the path was not motion-free.
- Internal navigation and Back/Forward returned to the expected home/detail routes on both references.

### Confirmed by DOM/CSS/runtime

- Lee ships a Next.js application. The audited H1 had no transform or opacity animation; content links declared color and decoration-color transitions of 300ms.
- Lee's desktop visual is a sticky `aside`; its computed mobile display is `none`.
- Cuberto's H1 keeps one accessible label while visual word fragments are `aria-hidden`. Every word has an outer `overflow: clip` wrapper and a padded inner inline block, protecting final descenders.
- Cuberto's cold-load word transforms were generated inline. At an early sampled frame the words had different positive Y translations; all resolved to `translateY(0)`.
- Cuberto's root carried the `lenis` class, corroborating the observed inertial wheel response. No claim is made that every scene uses Lenis.
- Cuberto home contained DOM/SVG/video layers but no canvas in the audited state. Its shipped public bundle was blocked from direct inspection in the browser, so GSAP/ScrollTrigger are not treated as confirmed implementation details.

### Technical hypotheses

- Cuberto's inline transforms and strong deceleration are consistent with an imperative timeline system, but the exact library, easing numbers, and per-section trigger implementation are not confirmed.
- Some below-fold word reveals likely use viewport/scroll triggers rather than pure CSS view timelines. The visible behavior transfers without adopting the same runtime.

## Effect catalog

| Effect | Route/state | Purpose | Trigger and frames | Layer/evidence | Cost and risks | Amal adaptation |
|---|---|---|---|---|---|---|
| Minimal reading shell | Lee home | Establish hierarchy and trust | Static resting composition | DOM/CSS, observed and confirmed | Low; Lee's illustration is non-transferable | A ~600px copy column plus Amal's own frameless pixel silhouette at desktop sizes |
| Muted link feedback | Lee home | Preserve flow while signaling action | Hover/focus color shift | CSS, confirmed | Low; subtle focus can become invisible | Neutral color/underline shift plus explicit `:focus-visible` outline |
| Hairline list rows | Lee home | Make dense information scannable | Static; row hover only | DOM/CSS, observed | Low | Project and education rows with honest metadata |
| Word-mask cold entry | Cuberto home | Establish voice and pacing | Words start below masks, overlap, settle | DOM plus inline transforms, observed and confirmed | Medium; hydration failure can strand hidden text | CSS-only time animation gated by a tiny fail-open pre-hydration capability flag |
| Supporting-copy overlap | Cuberto home | Avoid waiting for spectacle | Begins once heading is partly readable | DOM transforms, observed | Low-medium | Role, bio, availability and anchors follow the name with short overlap |
| Inertial wheel | Cuberto home/projects | Add weight and continuity | Wheel impulse eases for about 1.3s | Lenis root marker plus observed response | Medium; can feel sluggish on a short text page | One restrained Lenis owner on desktop/fine pointer only, requested as an Amal-specific adaptation |
| Media reveal/parallax | Cuberto home | Brand spectacle and proof | Scroll-linked clip/scale movement | DOM/video/SVG, observed | High asset/runtime cost | Omit; projects are represented by precise text and verified source links |
| Responsive menu/media edit | Cuberto mobile | Preserve hierarchy on small screens | Breakpoint substitution | DOM/CSS, observed | Medium | Compact anchors, 44px targets, no hidden navigation dependency |
| Reduced-motion path | Both | Vestibular/accessibility control | Media query | Lee is effectively static; Cuberto still animates | Cuberto path remains busy | Amal renders final content immediately and uses native scrolling |

## Implementation implications

The new structure remains semantic DOM/CSS. One Lenis instance is justified only by Amal's explicit heavy-scroll direction; it owns desktop/fine-pointer wheel inertia and one RAF, while touch and reduced motion remain native. The two-column desktop relationship uses Amal's existing pixel portrait Canvas in place of the non-transferable illustration. The canvas is fixed to the viewport bottom, has no visible frame, and receives no scroll progress. The audited word-mask, supporting-copy, and divider reveals are now implemented with CSS; below-fold groups use reversible CSS view timelines where supported. GSAP is not justified because this pass contains no scrubbed scene. WebGL, video, body locks, and threshold observers remain excluded.

The originality boundary is strict: no reference copy, serif pairing, artwork, logo treatment, cursor, media, project layout, or exact easing values are reused. The references influence content density, reading order, mask mechanics, and pacing only.

## Limitations

- Mobile results are browser emulation, not real-device or Safari/iPhone performance proof.
- Trackpad hardware, touch gestures, sound, authenticated areas, and every Cuberto project detail were not tested.
- Cuberto's public JavaScript bundle could not be opened in the in-app Browser, so library attribution beyond the visible `lenis` runtime marker remains unconfirmed.
