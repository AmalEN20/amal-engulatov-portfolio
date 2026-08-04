# Amal Portfolio — Shared Agent Contract

## Scope

These instructions apply to the entire repository. Home, Projects/Work, project-detail, About, Contact, and shared-shell tasks must treat this file as the common product and motion contract.

Preserve the existing Amal identity and the current Next.js structure. Do not copy a reference site's branding, layout, assets, copy, typography, or signature visual device. Do not invent experience, results, clients, testimonials, or validation.

## Global motion principle

Motion is part of the information architecture, not optional decoration. Every intentional content group must have a designed entry, readable resting state, and exit response.

- Animate real content groups: headings, supporting copy, media, metadata, lists, controls, and meaningful dividers.
- Use one coherent page-entry sequence. Establish the main heading first, then supporting information and actions with controlled stagger.
- Prefer clipped line/word reveals for expressive headings, block reveals for body copy, and restrained transforms for media and controls.
- Keep one semantic accessible heading or text node. Animated fragments must not break the accessible name.
- Do not animate every character or make unrelated elements move independently merely to satisfy the motion requirement.
- On route exit, the current page must respond immediately as one scene, then be covered by the shared route surface. Do not let page-local exit timers compete with navigation.
- When a section exits because of scrolling, its exit must be linked to scroll progress and reverse cleanly when the user scrolls back.
- Every stopped frame must remain intentional and readable.
- Content must remain available if JavaScript or an animation layer fails.

## Shared route-transition ownership

`app/components/SiteShell.tsx` owns internal navigation and route-transition state. Page tasks must integrate with it rather than creating independent full-screen route loaders.

The required state machine is:

`idle -> covering -> covered -> revealing -> idle`

- The source page reacts first with the shared dim/recede treatment.
- The destination-colored surface covers the source page fully before navigation commits.
- The destination mounts under the fully covered surface.
- The destination surface resolves into the page background; the real Amal logo, navbar, heading, and page content reveal as destination content.
- The first-load intro runs only on a full page load or refresh, never on ordinary internal navigation back to Home.
- Guard repeat clicks, body lock, scroll reset, interruption cleanup, and focus restoration in the shared shell.
- Shared-shell changes belong to the Portfolio/Main task. Page-specific tasks should not fork or replace this architecture.

## Heavy scroll is the site-wide baseline

The portfolio should feel weighty, cinematic, and deliberate on every route. The reference principles come from:

- https://www.nickvelten.nl/
- https://cuberto.com/projects/

Both references use a single smooth-scroll owner and sustained wheel inertia. Transfer the sense of weight, continuity, pacing, and reversible movement only.

For this portfolio, "heavy scroll" means:

- one global scroll owner, not a separate smooth-scroll instance per page or component;
- controlled wheel inertia with a strong but responsive deceleration;
- continuous, deterministic progress that stops in a valid composition and reverses without snapping;
- section choreography driven by real scroll progress rather than delayed timers or threshold-only state changes;
- depth from transform, scale, clipping, parallax, pinning, and pacing—not from input lag;
- text and actions remaining legible while decorative layers move;
- route transitions, menus, and scroll restoration coordinating with the same global owner.

Default architecture when heavy scroll is implemented:

- Prefer a single Lenis instance for desktop/trackpad wheel smoothing if it remains compatible with Next.js route lifecycle.
- Use native touch scrolling by default. Do not smooth or hijack touch without a tested, concrete benefit.
- Use one normalized progress value per long scene and named beats instead of scattered magic numbers.
- Use one owner for each pinned scene and clean it up on route unmount.
- Start with DOM/CSS transforms and opacity; use SVG for paths; add Canvas/WebGL only for a justified signature scene.
- Never use WebGL merely to move flat cards or text.

Heavy must never mean sluggish, trapped, or inaccessible. Users must retain direct control, ordinary wheel/trackpad direction, keyboard navigation, anchor behavior, and usable browser history.

## Required motion contract for every page task

Before implementing a page or major section, record:

1. Narrative purpose and the information that must remain legible.
2. Entry sequence and timing hierarchy.
3. Scroll interval with start, middle, and end frames.
4. Exit behavior and reverse-scroll behavior.
5. Which layer owns each effect: DOM/CSS, SVG, Canvas, WebGL, or video.
6. Desktop, mobile, and reduced-motion variants.
7. Performance budget and cleanup owner.
8. Acceptance checks.

Do not choose a library before this contract exists.

## Mobile and reduced motion

Mobile is a separate edit, not a scaled-down desktop timeline.

- Preserve content order and semantic meaning.
- Shorten pins, reduce simultaneous layers, and remove hover-only dependencies.
- Keep native touch scroll unless explicitly tested otherwise.
- Maintain safe spacing, readable masks, usable touch targets, and zero horizontal overflow at 390px and 430px.
- Under `prefers-reduced-motion: reduce`, render all content immediately, use native scrolling, remove inertia/parallax/pinning, and navigate without decorative route delays.

Reduced motion is a complete usable path, not merely shorter CSS durations.

## Performance boundaries

- Prefer `transform`, `opacity`, and clipping over layout-changing animation.
- Avoid large full-screen blur and expensive continuously animated filters.
- Do not add multiple RAF loops, smooth-scroll instances, or competing observers.
- Gate heavy renderers by viewport/capability and provide a static DOM or image fallback.
- Cap canvas/WebGL DPR and keep at most one active WebGL context unless a reviewed design contract requires otherwise.
- Clean up RAF, observers, listeners, timelines, pins, and rendering contexts on unmount.
- A successful build does not prove smoothness.

## Required QA

For every motion-bearing page or shared motion change, verify:

- desktop wheel/trackpad behavior;
- 390px and 430px layouts with no horizontal overflow;
- start, middle, 95%-complete, and post-swap stopped frames;
- slow scroll, fast scroll, abrupt stop, and reverse scroll;
- repeated internal navigation, browser Back/Forward, and return to Home;
- body lock, scroll restoration, focus restoration, and duplicate-click protection;
- keyboard access and visible focus;
- `prefers-reduced-motion: reduce` as a separate path;
- console errors plus relevant lint/build/tests.

Report browser emulation as emulation, not real-device proof.

## Repository and release boundaries

- Inspect current status before editing and preserve unrelated or user-owned changes.
- Do not delete useful files without necessity.
- Keep the working contact form and its contract intact unless Amal explicitly requests a change.
- Commit, push, pull-request creation, deployment, and production changes require Amal's direct instruction.
