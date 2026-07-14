# Amal Engulatov Portfolio — Foundation Plan

## Goal

Create a premium, motion-led portfolio for an AI Software Engineer. The site borrows the confidence, scale, and pacing of editorial developer portfolios without copying Dennis Snellenberg’s composition, identity, imagery, or interactions.

## Visual direction

- Warm black and off-white base with one electric lime accent.
- Oversized editorial typography and generous negative space.
- AI-specific visual language: systems, active states, interfaces, and signal grids.
- Motion should clarify hierarchy: line reveals, smooth scrolling, restrained parallax, hover depth, and directional page transitions.

## Information architecture

- **Home:** positioning, selected work, concise about/contact close.
- **Work:** project index and individual case studies.
- **About:** story, principles, capabilities, and experience.
- **Contact:** availability, email, LinkedIn, GitHub, and location/time zone.

## Technical architecture

- Next.js App Router + TypeScript.
- Tailwind CSS v4 for utilities and design tokens; global CSS for the art-directed layout.
- GSAP + ScrollTrigger for orchestrated scroll animation.
- Lenis for smooth scrolling.
- Motion for fullscreen navigation and future route transitions.
- Reusable client components inside `app/components`; route-level server components remain lightweight.

## Delivery stages

1. **Foundation:** design tokens, metadata, responsive shell, motion setup.
2. **Home v1:** hero, navigation, selected project, contact close.
3. **Content:** Work/About/Contact routes and full Customer Success Agent case study.
4. **Polish:** transition system, hover previews, accessibility, performance, responsive QA.
5. **Launch:** analytics, social preview, custom domain, production deployment.

## Content needed next

- Confirmed email, LinkedIn, and GitHub URLs.
- 3–5 sentences describing Amal’s background and target roles.
- Customer Success Agent screenshots/demo, stack, business problem, decisions, and measurable results.
- Two additional projects or placeholders with clear roles and outcomes.
