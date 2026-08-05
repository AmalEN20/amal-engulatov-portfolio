# About motion contract

1. **Narrative and legibility** — four equal content cells introduce Amal, the product-building story, education, and current availability. Every heading, paragraph, credential, and action remains readable at rest.
2. **Entry hierarchy** — each semantic heading reveals through clipped word masks from `translateY(116%)`; its supporting block follows from `24px` below. The four cells use a restrained stagger and the same deceleration curve as project-detail entry motion.
3. **Scroll interval** — common desktop and mobile viewports fit the full composition without page travel. On short viewports, existing scene progress owns entry, midpoint, and exit transforms.
4. **Exit and reverse** — scene-owned outer heading and supporting-block wrappers respond to scroll progress and reverse to their exact resting transforms; entry animation runs only on inner wrappers so the two systems do not compete.
5. **Layer ownership** — DOM/CSS owns masks, transforms, opacity, and the monochrome action gradient. `AboutExperience` owns only existing scene progress. `SiteShell` remains the sole route-transition and smooth-scroll owner.
6. **Responsive and reduced motion** — 390px and 430px keep native touch behavior and the same content order. Reduced motion renders every group immediately and freezes the action gradient.
7. **Performance and cleanup** — no new dependency, smooth-scroll instance, observer, or animation frame is added. Entry uses transform/opacity; the small text-only gradient uses background-position.
8. **Acceptance** — verify direct load, internal route entry, final focus, 390px, 430px, short-viewport scroll/reverse, reduced motion, zero horizontal overflow, clean console, lint, TypeScript, and build.
