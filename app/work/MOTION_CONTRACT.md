# Projects /work motion contract

## 1. Narrative purpose and legibility

The page introduces Amal's motivation first, then two confirmed projects as usable links. The
opening statement, project titles, categories, years, and link purpose must remain readable at
rest. The visual field stays deliberately white and quiet: no central orb, turbine, wheel, or
cell/grid pattern competes with the work.

## 2. Entry hierarchy

1. The shared route surface resolves into the white page.
2. The compact, centered statement `I like making new things.` rises word by word from clipped
   masks. The five-word reveal uses a 75 ms stagger and completes in about 1.1 seconds. Its scale
   remains deliberately quiet so it introduces the work without behaving like a hero billboard.
3. `Scroll to see` follows as a thin secondary cue after the first statement words are readable.
4. On scroll, the statement recedes as the first wide project card approaches from depth.
5. The second wide card follows with a controlled stagger; both settle into a stable pair.
6. On a fine pointer, hovering either settled card preserves its existing lift and image scale while
   a measured 3.4-second gray highlight loops across only the project title, matching the detail
   metadata loop's linear pacing while retaining left-to-right travel. The overlay fades in and
   out over 220 ms, and pauses at its current frame as soon as the pointer leaves. Keyboard
   `focus-visible` receives the same title response.

The masked text reveal is the one time-based page-entry sequence. It waits behind the shared
first-load curtain or covered route state. The card choreography remains driven only by the
page's normalized scroll progress.

## 3. Scroll interval and stopped frames

The desktop scene is one sticky interval with normalized progress `p` from 0 to 1.

| Beat | Progress | Intentional stopped frame |
| --- | --- | --- |
| Statement | 0.00-0.22 | The complete motivation statement and scroll cue remain readable before receding. |
| Evele Studio | 0.30-0.62 | The studio website approaches from depth and settles into its final position. |
| Amal AI Studio | 0.42-0.74 | The client acquisition OS follows with a restrained stagger. |
| Metadata | 0.70-0.84 | The selected-work label and availability note resolve. |
| Hold | 0.80-1.00 | Both links are stable, focusable, and readable. |

## 4. Exit and reverse behavior

Every value is derived from the same normalized progress, so reverse scroll reconstructs the
sequence without snapping. On project navigation, the cards remain in their current stopped
frame while the existing shared white surface covers them. Any eligible internal-link activation
is captured by the mounted `/work` page before the shared shell handles the route, synchronously
freezing the already-rendered card transforms before the shared scroll reset. The page RAF then
ignores source-scroll updates until unmount. This is a visual-frame lock only:
there is no page-local card fade, recede, scale, exit state machine, or timer. The shared
`SiteShell` alone owns covering, navigation, reveal, body lock, duplicate-click protection, and
focus. The page creates no full-screen transition layer or route timer.

The explicit `Back to projects` control marks a one-time return intent before the shared route
transition starts. When `/work` mounts under the fully covering shared surface, it consumes that
intent and performs one instant position update to the final card hold. Direct visits, navbar visits,
browser Back/Forward, and ordinary `/work` navigation still begin at the intro. This is a destination
position, not a second restoration owner, smooth-scroll instance, timer, or animation loop. Focus
restoration remains owned by the shared shell.

The final-hold return has its own destination entry, coordinated with the existing shared surface:
both cards are already in their final positions under full cover, then a white curtain exposes the
complete frames of both cards from top to bottom together over 840 ms, including border, shadow,
image, and metadata surface. Category/title and year rise as accessible block groups in sync after
the shared curtain begins to clear, and
the final metadata enters through one restrained block mask. These CSS animations pause while
`data-route-content="hidden"` and start only in the shared revealing phase. They do not alter the
ordinary scroll-driven card assembly.

## 5. Layer ownership

- Semantic copy and cards: DOM/CSS.
- Progress mapping: one passive window scroll listener scheduled through one page-owned RAF.
- Route state: existing shared `SiteShell` only.
- Project media: responsive Next.js images sourced from real local project screenshots.
- Entry text: semantic DOM with clipped word/block masks and CSS animations.
- Return card curtains and metadata masks: CSS clipping on each complete card plus semantic DOM block wrappers;
  no new observer, timer, or animation-frame owner.
- Project-title hover: an `aria-hidden` CSS overlay inside the unchanged semantic heading; no
  JavaScript, observer, or additional animation-frame owner. Its highlight travels left to right
  without duplicating the accessible project name.
- No SVG, Canvas, WebGL, video, added smooth-scroll instance, or new motion dependency.
- No decorative sphere, turbine, wheel, page grid, or card cell pattern.

The implementation transfers only the controlled project assembly and reversible spatial pacing
of the reference. It does not copy the reference's signature object, palette, copy, layout,
assets, or brand identity.

## 6. Desktop, mobile, and reduced motion

- Desktop/trackpad: deliberate sticky interval; two landscape cards settle side by side.
- Mobile/touch: shorter interval, native touch scrolling, and the two landscape cards settle
  vertically inside the final frame.
- Reduced motion: no sticky interval, inertia, parallax, pin, or staged reveal. The heading and
  both links render immediately in normal document flow. Project titles remain solid black with no
  looping hover overlay, and the return curtain/text sequence is removed.

## 7. Performance and cleanup

- Transform and opacity only during progress updates; blur resolves to zero during entry.
- No continuous RAF loop; a frame is scheduled only after scroll/resize input.
- Two optimized project screenshots; no shader or video payload is required for the scene.
- One page scroll listener, one resize listener, and one capture-phase internal-link listener, all
  removed on unmount. The route listener performs no animation and only freezes the current frame
  before the shared shell's synchronous scroll reset.
- Page-attributable motion JavaScript target: under 10 KB compressed.
- Frame target: no avoidable layout reads inside the per-frame card loop.

## 8. Acceptance checks

- Desktop wheel/trackpad: slow, fast, abrupt stop, and reverse.
- Stopped frames at start, middle, 95%, immediate cover trigger, and destination reveal.
- First-load and internal-route entry: statement masks, stagger, scroll cue, and final resting frame.
- 390 px and 430 px browser emulation: no horizontal overflow and native touch behavior.
- Keyboard: card links remain unreachable before the visual handoff and reachable in final hold;
  visible focus is retained, and title feedback matches pointer hover without replacing the focus
  outline.
- Fine-pointer hover: the card lift and image scale remain intact; the title loop starts only while
  hovered, fades both ways, and stops immediately after pointer exit.
- Reduced motion: all project information and links are immediately available.
- Repeated project navigation, Back/Forward, scroll reset, focus restoration, and duplicate click.
- Detail `Back to projects`: destination mounts at the final two-card hold under cover, with no
  visible intro flash; both curtains and masked metadata finish in a stable readable frame; a later
  direct `/work` visit starts at the intro because the marker is consumed.
- Navigation from the final hold through every navbar destination: cards remain pixel-still from
  pointer activation until the shared cover fully hides `/work`.
- Console, lint, production build, and relevant HTML tests.

## Project-detail edit

### Purpose and hierarchy

The detail route confirms the project identity, shows one real screenshot, and gives a concise
summary, description, stack, and source status. It is intentionally one shared compact editorial
template for every project rather than a billboard. `Selected work` and the project year do not
render on detail routes.

Entry order is project name -> image with the adjacent information column. The project name rises
word by word from its existing semantic masks. The image follows with a fast white curtain reveal
that exposes it from top to bottom, plus a restrained scale settle. `Back to projects`, category/summary, `About the project`,
`Built with`, and source each rise as compact masked blocks with a 52 ms stagger, so every text
group participates without turning the page into character-by-character motion. The existing
shared route surface owns navigation and page exit.

### Scroll, layers, and variants

- The detail page uses normal document flow with no pin, scrub, parallax, or added smooth-scroll
  owner. Its start, middle, and end frames are all complete reading states and reverse naturally.
- Content, the fixed return link, and its restrained looping label are DOM/CSS. The screenshot is a
  responsive Next.js image in the main column without a decorative line or frame. Its curtain is a
  CSS pseudo-element; there is no SVG, Canvas, WebGL, video, or new animation dependency.
- Desktop uses a title plus one `image | information` grid capped at 1120 px. Mobile uses a
  `title -> image -> information` stack, a 16:9 image, native touch scroll, and no overflow.
- On desktop the image owns the shared row height. The information column ends at the image bottom
  and becomes a keyboard-focusable native scroll region only when its content is taller. A single
  page-owned RAF moves that region at 7.5 px/s, eases its velocity through each direction change,
  and waits only 80 ms after the final wheel, touch, pointer, or keyboard input before resuming from
  the user's position, so the continuation feels immediate. It carries `data-lenis-prevent` so the
  shared smooth-scroll owner yields input.
- The native scrollbar is visually hidden; scrolling remains available by wheel, touch, and keys.
- The RAF starts immediately on desktop when real overflow exists and the shared route enters its
  readable `revealing` phase. Direct loads wait only for the shared first-load curtain to leave.
  Resize, intro, and route observers update the range, and the component removes its RAF,
  observers, and listeners on unmount.
- On mobile the information region returns to ordinary document flow with visible overflow; there
  is no nested scroll container or trapped touch gesture.
- `Back to projects` contains no arrow. Its only loop is a gray highlight crossing the text from
  left to right. The complete utility-metadata group uses a softer version of that loop while
  retaining its original 48%-black gray tone: project category, `About the project`, `Built with`,
  and `Source`. Technology names and repository link/status remain solid black values beneath their
  gray labels. Project names and body copy remain solid. `Back to projects` uses the same gray
  treatment. Reduced motion removes the content entrance, auto-scroll, and gradient loops while
  retaining the complete page with the same gray-label/black-value hierarchy.

Entry duration stays below roughly 1.25 seconds after the shared surface begins revealing. All
initial states use animation fill modes rather than JavaScript-applied hiding, so content remains
available if the client motion layer fails. The image curtain and text blocks pause while the
shared first-load or route cover owns the viewport, then resume as one coherent destination entry.

### Performance, cleanup, and acceptance

Page-attributable motion adds one small client component and at most one conditional RAF; it does
not add another Lenis or page-level scroll owner. The return-label loop is CSS-only. Acceptance requires desktop,
390 px, and 430 px checks; no horizontal overflow; readable fixed return text; valid stopped and
reverse-scroll frames; keyboard focus; reduced-motion static rendering; console, lint, and build.
Desktop acceptance also checks that the information column and image bottoms match, wheel and
keyboard scrolling reach the hidden metadata, manual input pauses the automation, idle resumes it,
the endpoint turn is gradual, and reverse input returns the region to its start.
