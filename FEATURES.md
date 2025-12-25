# AshReef Labs Portfolio - Feature Notes

## Overview
This changelog captures the interactive systems that make the portfolio feel like a robotics workbench—performance tooling, a cursor-accurate robotic arm, and practical UI guidance that points visitors toward projects and services.

## 1. Performance Monitor Component
**File**: `components/PerformanceMonitor.tsx`

### Highlights
- Real-time FPS counter with color-coded status (green ≥55 FPS, amber 30‑55, red <30)
- Progress bar for a quick health check
- Optional arm telemetry block (joint angles, base rotation, XYZ position) ready for a future data feed
- Toggles with the `P` key and renders as a compact overlay with the terminal aesthetic

---

## 2. Robotic Arm Interaction Upgrades
**File**: `components/RoboticArm3D.tsx`

### What Changed
- Pointer tracking is now global (window-level `pointermove`) so the arm follows the cursor even when UI overlays sit above the canvas.
- Raycasting plane is recalculated every frame to stay aligned with the camera’s forward vector, preventing “dead zones” and keeping movement feel consistent.
- Target positions lerp toward the cursor intersection, yielding smoother curves instead of jittery snaps.
- Plane anchor follows the last target which stabilizes depth calculations without locking the arm to a single Z value.
- Existing IK, gripper animation, and particle burst logic remain intact, giving a tactile response when the gripper fires.

---

## 3. Practical Terminal Commands
**File**: `components/Terminal.tsx`

### Key Updates
- `help` now surfaces the new `services` command instead of pointing to easter eggs.
- `arm` instructions were rewritten to reflect the new cursor tracking and to drop defunct keyboard shortcuts (Shift slow-mo, T teaching mode).
- `services` outlines four engagement tracks (Robotics R&D, AI products, Full-stack delivery, DevOps/Infra) with a call to email `ali@ashreef.com`.
- System shortcuts highlight pragmatic actions (`P` for performance overlay, `Esc` to exit terminal).

---

## 4. Welcome Guide
**File**: `components/WelcomeGuide.tsx`

### Current Step Flow
1. **Welcome** – Positions the site as a robotics-first, production-led portfolio.
2. **Robotic Arm** – Explains cursor + click controls.
3. **Terminal** – Encourages launching the command palette for quick context.
4. **Performance Monitor** – Reminds visitors about the `P` shortcut to see live stats.
5. **Ready to Collaborate** – Directs traffic toward Projects and Contact for real engagements.

The guide still respects first-visit detection with localStorage, includes progress indicators, and can be dismissed at any time.

---

## 5. Page Transitions
**Files**: `components/PageTransition.tsx`, `app/template.tsx`

- Default transition keeps the curtain-style fade/scale combo (400 ms enter / 300 ms exit).
- Alternative slide and glitch variants remain available for experimentation.
- Transitions honor `prefers-reduced-motion` for accessibility.

---

## Keyboard Shortcuts Reference

| Key | Function |
|-----|----------|
| `P` | Toggle Performance Monitor |
| `ESC` | Close terminal |

---

## Component Integration Snapshot (`app/page.tsx`)
```
<div>
  {/* Optional VFX layers */}
  <PerformanceMonitor />
  <WelcomeGuide />
  <HeroSection>
    <RoboticArm3D ... />
  </HeroSection>
  <Terminal />
</div>
```

---

## Discoverability & Next Steps
1. Welcome Guide surfaces core interactions without gimmicks.
2. Terminal doubles as a lightweight profile/offerings explorer.
3. Performance Monitor gives a transparent look at runtime behavior—ideal for technical buyers.
4. Future enhancement: feed live joint data into `PerformanceMonitor` and surface a “Book a Build” CTA near the hero.

---

## File Summary
- `components/PerformanceMonitor.tsx`
- `components/RoboticArm3D.tsx`
- `components/Terminal.tsx`
- `components/WelcomeGuide.tsx`
- `components/PageTransition.tsx`
- `app/page.tsx`

These updates keep the playful robotic arm centerpiece while directing attention to real services, case studies, and performance insight.

