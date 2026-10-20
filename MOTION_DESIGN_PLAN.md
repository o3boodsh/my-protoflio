# Portfolio Motion & Interaction Implementation Plan

**Implementation status:** P0 and P1 complete. Optional P2 effects remain intentionally deferred until they solve a specific usability need.

This plan turns the Task 03 motion blueprint into a staged implementation. It preserves the current content, links, Three.js robot and cloud scenes, and the site's visual identity. No new animation library is planned.

## Principles

- Motion should clarify hierarchy and feedback, not compete with reading or navigation.
- Use one timing language: micro-interactions around 160–220 ms, reveals around 480–620 ms, image reveals around 650–800 ms, and stagger gaps around 60–90 ms.
- Animate opacity and transforms where possible; limit blur to short entrance transitions. Avoid layout-driven animation and endless decorative motion.
- Every hover interaction needs a keyboard or touch equivalent where it conveys information or performs an action.
- Respect `prefers-reduced-motion`; reduce effects on touch and small screens.
- Keep the existing robot implementation and core behavior. Improve its lifecycle and presentation without replacing its Three.js scene.

## Phase 1 — Reliability and motion foundation (P0)

- [x] Audit existing motion selectors and imperative effects against the rendered components.
- [x] Consolidate reusable reveal and interaction timing in CSS variables.
- [x] Ensure scroll reveals work without JavaScript and honor reduced motion.
- [x] Correct event, timer, observer, control, and WebGL cleanup for client effects.
- [x] Pause heavy scene rendering when off-screen or the document is hidden; limit mobile pixel ratio.

**Acceptance:** No leaked animation loops or duplicate canvases after mount/unmount. Sections stay readable with scripts disabled or reduced motion enabled.

## Phase 2 — Purposeful interaction (P1)

- [x] Refine Hero entrance order and keep the headline and calls to action dominant.
- [x] Improve navigation active-section feedback and mobile menu keyboard behavior.
- [x] Give Skills, Projects, Experience, and Contact a consistent but section-appropriate reveal sequence.
- [x] Provide focus/tap counterparts for meaningful hover states.
- [x] Add a restrained experience timeline progression cue.

**Acceptance:** Interaction works by pointer, keyboard, and touch; no content requires hover to access.

## Phase 3 — Dedicated robot experience (P1)

- [x] Move the existing robot mount from the Hero into a dedicated, responsive section without rewriting its Three.js scene.
- [x] Preserve pointer response and wave interaction; provide an accessible explicit wave control and contextual feedback.
- [x] Keep the companion cloud scene in Experience. Scope pointer tracking to the robot area.
- [x] Provide lightweight mobile and reduced-motion behavior.

**Acceptance:** The robot remains interactive, does not trap mobile scrolling, and pauses when not visible.

## Phase 4 — Atmosphere and theme (P1)

- [x] Add a subtle pointer-aware grid/light response only on capable fine-pointer devices.
- [x] Introduce intentionally designed light and dark theme tokens and an accessible theme toggle.
- [x] Adapt surfaces, text, borders, accents, and Three.js lighting to the selected theme without sacrificing contrast.
- [x] Persist the choice while respecting system preference initially.

**Acceptance:** Both themes are readable; reduced-motion and touch devices avoid unnecessary background work.

## Phase 5 — Verification and optional polish (P2)

- [x] Verify desktop, tablet, and mobile layout and input behavior.
- [x] Verify keyboard focus, reduced motion, page visibility, and WebGL fallback.
- [x] Run `npm run build` and fix implementation-related errors.
- [ ] Add advanced effects (magnetism, parallax, image masks) only if a specific interaction gains clarity and performance remains good.

**Acceptance:** Production build passes, and decorative effects never block content or primary actions.

## Scope notes

- Real project screenshots and missing content are separate content tasks. No fabricated images, links, or case studies will be introduced here.
- A separate Education content section belongs to the broader redesign plan; this motion pass will not invent new academic copy.
- The current robot and cloud scenes remain the source of truth. This plan changes their integration and lifecycle, not their identity.
