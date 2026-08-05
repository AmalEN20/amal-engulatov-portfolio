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
frame while the existing shared white surface covers them. There is no page-local card fade,
recede, scale, or exit timer. The shared `SiteShell` alone owns covering, navigation, reveal,
body lock, duplicate-click protection, and focus. The page creates no full-screen transition
layer or route timer.

## 5. Layer ownership

- Semantic copy and cards: DOM/CSS.
- Progress mapping: one passive window scroll listener scheduled through one page-owned RAF.
- Route state: existing shared `SiteShell` only.
- Project media: responsive Next.js images sourced from real local project screenshots.
- Entry text: semantic DOM with clipped word/block masks and CSS animations.
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
  both links render immediately in normal document flow.

## 7. Performance and cleanup

- Transform and opacity only during progress updates; blur resolves to zero during entry.
- No continuous RAF loop; a frame is scheduled only after scroll/resize input.
- Two optimized project screenshots; no shader or video payload is required for the scene.
- One page listener and one resize listener, both removed on unmount.
- Page-attributable motion JavaScript target: under 10 KB compressed.
- Frame target: no avoidable layout reads inside the per-frame card loop.

## 8. Acceptance checks

- Desktop wheel/trackpad: slow, fast, abrupt stop, and reverse.
- Stopped frames at start, middle, 95%, immediate cover trigger, and destination reveal.
- First-load and internal-route entry: statement masks, stagger, scroll cue, and final resting frame.
- 390 px and 430 px browser emulation: no horizontal overflow and native touch behavior.
- Keyboard: card links remain unreachable before the visual handoff and reachable in final hold;
  visible focus is retained.
- Reduced motion: all project information and links are immediately available.
- Repeated project navigation, Back/Forward, scroll reset, focus restoration, and duplicate click.
- Console, lint, production build, and relevant HTML tests.

## Project-detail edit

### Purpose and hierarchy

The detail route confirms the project identity, shows one real screenshot, and gives a concise
summary, description, stack, and source status. It is intentionally one shared compact editorial
template for every project rather than a billboard. `Selected work` and the project year do not
render on detail routes.

Entry order is project name -> image with the adjacent information column. The image follows the
title after one short spacing beat; category/summary, `About the project`, `Built with`, and source
form the compact right column on desktop. The existing shared route surface owns navigation and
page exit. Page-local content uses the existing masked heading and one restrained block reveal.

### Scroll, layers, and variants

- The detail page uses normal document flow with no pin, scrub, parallax, or added smooth-scroll
  owner. Its start, middle, and end frames are all complete reading states and reverse naturally.
- Content, the fixed return link, and its restrained looping label/arrow are DOM/CSS. The screenshot
  is a responsive Next.js image in the main column without a decorative line or frame. There is no SVG, Canvas,
  WebGL, video, or page-local RAF.
- Desktop uses a title plus one `image | information` grid capped at 1120 px. Mobile uses a
  `title -> image -> information` stack, a 16:9 image, native touch scroll, and no overflow.
- Reduced motion removes the content entrance, label loop, and arrow loop while retaining the
  complete page and a visible return link.

### Performance, cleanup, and acceptance

No new JavaScript or continuously scheduled rendering is introduced. The two small looping
effects animate only `transform` on the return label and icon. Acceptance requires desktop,
390 px, and 430 px checks; no horizontal overflow; readable fixed return text; valid stopped and
reverse-scroll frames; keyboard focus; reduced-motion static rendering; console, lint, and build.
