import { useMemo } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import {
  Code2,
  Database,
  CloudCog,
  GitBranch,
  TerminalSquare,
  Boxes,
  Globe2,
  ShieldCheck,
  Sparkles,
  Cpu,
  Rocket as RocketIcon,
  Layers as LayersIcon,
  ArrowUpRight,
} from "lucide-react";

/**
 * ============================================================================
 * ORBIT HERO BANNER — v5 (bug fix + simplified, w-full everywhere)
 * ============================================================================
 *
 * Built with: React 19, Tailwind CSS v4, daisyUI v5 (for the
 * `base-100` / `base-content` / `primary` / `success` color tokens
 * below — they're daisyUI v5's CSS variables), and Motion v13 (the
 * package used to be called "framer-motion"; we import it as
 * "motion/react", which is the current package name).
 *
 * WHAT THIS FILE CONTAINS (read this first if you're new to the codebase)
 * ----------------------------------------------------------------------
 * A hero section built from THREE circles laid out in a CSS Grid:
 *
 *      [ Stat Circle ]   [   Orbit Circle   ]   [ Stat Circle ]
 *
 * This component does NOT add its own outer spacing (no margin, no
 * padding, no max-width). That's on purpose — you told us the parent
 * component already wraps this in something like:
 *
 *      <div className="max-w-7xl mx-auto w-11/12 my-8">
 *        <Banner />
 *      </div>
 *
 * so this file only worries about what happens INSIDE that box.
 *
 * WHAT CHANGED IN THIS PASS
 * ---------------------------
 * 1. BUG FIX — the center text used to drift off-center on some
 *    screens. Explained in detail right above `TitlePanel` below, but
 *    the short version: we were mixing a Tailwind CSS class for
 *    centering with a Motion-driven tilt effect, and they were both
 *    fighting to control the same `transform` CSS property. Fixed by
 *    doing the centering INSIDE Motion's own `style` prop instead of a
 *    Tailwind class, so there's only one thing controlling the
 *    transform, and it always keeps the text perfectly centered.
 * 2. The glow is back on the "Innovative Solutions" text (a soft
 *    blurred copy of the text sits behind the real text, and its
 *    brightness gently breathes forever) — while the text itself still
 *    only scales up on hover, no border or shadow appears anywhere in
 *    that panel.
 * 3. Every circle (the orbit AND both stat cards) is sized with just
 *    `w-full aspect-square` — no more separate width classes per
 *    breakpoint. The CSS Grid columns already control how wide each
 *    circle's column is, so `w-full` inside that column is all the
 *    sizing logic we need, and it naturally lines up with any other
 *    `w-full` component elsewhere on the page.
 *
 * REUSABLE BUILDING BLOCKS (small components defined below)
 * -----------------------------------------------------------
 * - SnakeBorder     → a thin ring with a glowing "comet" that races
 *                      around it forever (used on icons + stat circles).
 * - OrbitPath        → the dashed circular track an orbit ring rides on.
 * - OrbitRing        → one ring of orbiting icons (there are three).
 * - CircleStatCard   → a circular stat card that floats gently in place.
 * - TitlePanel       → the interactive center "planet" with glowing text.
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// 1. STATIC DATA
// ---------------------------------------------------------------------------
// Keeping data separate from markup makes it easy for a beginner to swap
// icons or copy without touching any layout code below.

const INNER_RING_ICONS = [Code2, TerminalSquare, GitBranch, ShieldCheck];
const MIDDLE_RING_ICONS = [Database, Globe2, CloudCog, Boxes];
const OUTER_RING_ICONS = [RocketIcon, Sparkles, Cpu, LayersIcon];

const LEFT_STAT = {
  icon: RocketIcon,
  label: "Sprint Velocity",
  value: "82%",
  trend: "+24% this week",
};

const RIGHT_STAT = {
  icon: LayersIcon,
  label: "Project Overview",
  value: "$38.5k",
  trend: "+18.2% delivered",
};

// A soft, colored glow used ONLY on hover for icons/cards — never shown
// at rest. Applied through Motion so it eases in and out smoothly
// instead of snapping on and off.
const HOVER_GLOW_SHADOW = "0 12px 40px -8px var(--color-primary)";

// ---------------------------------------------------------------------------
// 2. SMALL HELPERS
// ---------------------------------------------------------------------------

// Percentage-based circular layout for icons riding on a ring.
// `radius` (0–50) controls how far from the container's center the ring
// sits. 50 is the very edge of the circle.
function buildRingPositions(count, radius, offsetDeg = 0) {
  return Array.from({ length: count }, (_, i) => {
    const angle = ((360 / count) * i + offsetDeg) * (Math.PI / 180);
    return {
      x: 50 + radius * Math.cos(angle),
      y: 50 + radius * Math.sin(angle),
    };
  });
}

// ---------------------------------------------------------------------------
// 3. REUSABLE PIECES
// ---------------------------------------------------------------------------

/**
 * SnakeBorder
 * A thin ring with a bright "comet" (a short glowing arc with a fading
 * tail) that endlessly races around it — like a snake chasing its own
 * tail, forever. Most of the ring stays dim; only the travelling comet
 * is bright at any given moment.
 *
 * HOW IT WORKS
 *   1. A faint static ring (`border border-base-content/15`) is drawn
 *      first, so the circle's shape always reads even when the comet
 *      is on the far side.
 *   2. A conic-gradient — mostly transparent, with one bright arc near
 *      the end of its sweep — spins on top of that, forever. Because
 *      it's mostly transparent, the faint static ring shows through
 *      everywhere except where the bright comet currently is.
 *
 * HOW TO USE IT: drop it as the FIRST child inside a `relative` wrapper
 * that owns the border-radius you want it to follow. Everything after
 * it in that wrapper should be inset by a couple of pixels with a solid
 * background, so this reads as a thin ring instead of a solid disc.
 */
function SnakeBorder({ rounded = "rounded-full", duration = 3.5, reverse = false }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${rounded}`}>
      {/* Faint base ring — keeps the shape visible at all times */}
      <div className={`absolute inset-0 ${rounded} border border-base-content/15`} />

      {/* The comet: bright near the end of the sweep, transparent everywhere
          else, so only a short glowing "snake" is ever visible at once. */}
      <div className={`absolute inset-0 overflow-hidden ${rounded}`}>
        <motion.div
          className="absolute inset-[-50%]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, transparent 265deg, color-mix(in oklch, var(--color-primary) 55%, transparent) 320deg, white 345deg, var(--color-primary) 360deg)",
          }}
          animate={{ rotate: reverse ? -360 : 360 }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}

/**
 * OrbitPath
 * The dashed circular "track" that shows where an orbit ring travels.
 * `inset` should match the radius used for that ring's icon positions
 * (the formula is simply `inset = 50 - radius`, in percent).
 */
function OrbitPath({ inset }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute rounded-full" style={{ inset }}>
      {/* soft glow sitting behind the crisp dashed line */}
      <motion.div
        animate={{ opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full border-2 border-primary/30 blur-[3px]"
      />
      {/* the crisp dashed line itself */}
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-base-content/30" />
    </div>
  );
}

/**
 * OrbitRing
 * One ring of orbiting icon "moons". The whole ring spins together, and
 * each icon counter-rotates by the same amount so it stays upright the
 * whole time it travels.
 *
 * Every icon node:
 *   - Has a SnakeBorder racing around it, 100% of the time (not just
 *     on hover).
 *   - Scales up AND gains a soft colored shadow on hover — there is NO
 *     shadow while it's just orbiting at rest.
 */
function OrbitRing({ icons, positions, duration, direction, nodeSizeClass }) {
  return (
    // pointer-events-none on the rotating wrapper lets hover/clicks pass
    // through the empty parts of the ring instead of blocking whatever
    // ring is drawn underneath it.
    <motion.div
      className="pointer-events-none absolute inset-0"
      style={{ transformOrigin: "50% 50%" }}
      animate={{ rotate: direction * 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {icons.map((Icon, i) => (
        <div
          key={i}
          className="pointer-events-auto absolute"
          style={{
            left: `${positions[i].x}%`,
            top: `${positions[i].y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <motion.div
            style={{ transformOrigin: "50% 50%" }}
            animate={{ rotate: direction * -360 }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              whileHover={{ scale: 1.3, boxShadow: HOVER_GLOW_SHADOW }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 14 }}
              className={`group/node relative rounded-2xl ${nodeSizeClass}`}
            >
              {/* Always-on snake border — races around 100% of the time */}
              <SnakeBorder rounded="rounded-2xl" duration={3} reverse={direction < 0} />
              <div className="relative z-10 m-[1.5px] flex h-[calc(100%-3px)] w-[calc(100%-3px)] items-center justify-center rounded-[inherit] bg-base-100 text-base-content/55 group-hover/node:text-primary">
                <Icon className="h-1/2 w-1/2" strokeWidth={2} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}

/**
 * CircleStatCard
 * A perfect circle showing one stat, with a gentle up-and-down float and
 * an always-on SnakeBorder racing around its edge. On hover it scales
 * slightly and gains a soft colored shadow — there is NO shadow while
 * it's just sitting/floating.
 *
 * Sizing note: this is just `w-full aspect-square`. It doesn't pick its
 * own width — whatever grid column it's placed in decides that, which
 * is what keeps it lined up with every other `w-full` element on the
 * page (including the orbit circle next to it).
 */
function CircleStatCard({ stat, delay = 0 }) {
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      {/* Gentle continuous float */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
        className="relative aspect-square w-full"
      >
        {/* Soft ambient glow behind the circle — a blur, not a shadow */}
        <motion.div
          aria-hidden="true"
          animate={{ opacity: [0.25, 0.5, 0.25], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay }}
          className="absolute -inset-3 -z-10 rounded-full bg-primary/25 blur-xl"
        />

        <motion.div
          whileHover={{ scale: 1.05, boxShadow: HOVER_GLOW_SHADOW }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          className="group/card relative h-full w-full overflow-hidden rounded-full"
        >
          {/* Always-on snake border — races around 100% of the time */}
          <SnakeBorder rounded="rounded-full" duration={4.5} />

          {/* Shimmer sweep on hover */}
          <motion.span
            aria-hidden="true"
            initial={{ x: "-120%" }}
            whileHover={{ x: "120%" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-0 z-20 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-base-content/10 to-transparent"
          />

          {/* Inset content circle — this inset is what turns the racing
              comet behind it into a thin ring instead of a solid disc. */}
          <div className="relative z-10 m-[2px] flex h-[calc(100%-4px)] w-[calc(100%-4px)] flex-col items-center justify-center gap-1.5 rounded-full bg-base-100/95 px-5 text-center backdrop-blur-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon size={16} strokeWidth={2} />
            </div>
            <p className="text-[10px] font-medium text-base-content/45">{stat.label}</p>
            <p className="text-xl font-bold text-base-content sm:text-2xl">{stat.value}</p>
            <p className="flex items-center gap-1 text-[10px] font-medium text-success">
              <ArrowUpRight size={11} /> {stat.trend}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/**
 * TitlePanel
 * The center "planet" — no border, no running border, no box-shadow, at
 * rest OR on hover. Two things make it feel alive instead:
 *
 *   1. INTERACTIVE TILT — move your mouse over the panel and it tilts
 *      slightly toward your cursor in 3D, like a physical card.
 *   2. GLOWING TEXT — "Innovative Solutions" glows constantly (a soft
 *      blurred copy of the text sits behind the real text, breathing
 *      brightness forever), and the text itself scales up on hover.
 *
 * -------------------------------------------------------------------
 * THE BUG WE FIXED HERE (worth understanding if you're new to Motion)
 * -------------------------------------------------------------------
 * The previous version centered this panel with Tailwind's
 * `-translate-x-1/2 -translate-y-1/2` classes, and ALSO gave it a tilt
 * using Motion's `rotateX` / `rotateY` in the `style` prop.
 *
 * The problem: both of those are trying to control the exact same CSS
 * property, `transform`. Motion components always compute and own the
 * full `transform` value themselves whenever you use a Motion-managed
 * property like `rotateX`. So the moment we added the tilt, Motion
 * rebuilt `transform` from scratch using only x, y, rotateX, rotateY —
 * completely ignoring the Tailwind class. Our centering offset quietly
 * disappeared, and the panel drifted off-center.
 *
 * The fix: stop centering with a Tailwind class, and instead give
 * Motion the centering offset directly, as `x: "-50%"` and `y: "-50%"`
 * in the SAME `style` object as the tilt. Now there's only one system
 * (Motion) computing `transform`, from ALL the pieces at once (x, y,
 * rotateX, rotateY) — so centering and tilting always agree, on every
 * screen size, every time.
 */
function TitlePanel() {
  // Raw cursor offset from the panel's center, in pixels. `useMotionValue`
  // is just a Motion box that can hold a number and update extremely
  // fast (every animation frame) without re-rendering React.
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Turn that pixel offset into a small rotation angle. Moving the mouse
  // 60px right of center tilts the panel 8 degrees one way; 60px left
  // tilts it the other way. Vertical movement tilts the opposite axis —
  // together that makes the panel feel like it's facing your cursor.
  const rotateX = useTransform(cursorY, [-60, 60], [8, -8]);
  const rotateY = useTransform(cursorX, [-60, 60], [-8, 8]);

  function handleMouseMove(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    cursorX.set(event.clientX - bounds.left - bounds.width / 2);
    cursorY.set(event.clientY - bounds.top - bounds.height / 2);
  }

  function handleMouseLeave() {
    // Relax back to flat when the cursor leaves.
    cursorX.set(0);
    cursorY.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // Centering (x, y) AND tilting (rotateX, rotateY) live together in
      // one style object, so Motion builds one consistent `transform`
      // from all four values every frame — see the big comment above.
      style={{ x: "-50%", y: "-50%", rotateX, rotateY, transformPerspective: 700 }}
      className="absolute left-1/2 top-1/2 z-10 flex aspect-square w-[30%] min-w-28 flex-col items-center justify-center gap-1 rounded-full text-center"
    >
      {/* Glowing text block — the ONLY thing in this panel that lights
          up or reacts to hover. No border, no shadow, anywhere here. */}
      <div className="relative px-4">
        {/* Blurred duplicate sitting behind the real text — this is what
            creates the constant glow "on top of" the words. Its
            opacity breathes gently forever, independent of hover. */}
        <motion.p
          aria-hidden="true"
          animate={{ opacity: [0.45, 0.9, 0.45] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-0 select-none text-[13px] font-bold leading-tight tracking-tight text-primary blur-md sm:text-base md:text-lg"
        >
          Innovative Solutions
        </motion.p>

        {/* The real, readable text. `whileHover` scales ONLY this
            element — not the circle, not any border, nothing else. */}
        <motion.p
          whileHover={{ scale: 1.12 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="relative cursor-default text-[13px] font-bold leading-tight tracking-tight text-base-content sm:text-base md:text-lg"
        >
          Innovative <span className="text-primary">Solutions</span>
        </motion.p>
      </div>

      <p className="hidden max-w-[85%] text-[10px] font-medium leading-snug text-base-content/50 sm:block sm:text-[11px]">
        Scalable engineering to grow your business 🚀
      </p>
    </motion.div>
  );
}

/**
 * OrbitCircle
 * The center "planet" (`TitlePanel`) with THREE rings of orbiting icons
 * travelling around it (inner, middle, outer). This component never
 * clips its own children, so the outer ring's icons — which sit right
 * at the edge — are always fully visible instead of being cut off.
 *
 * Sizing note: same as the stat cards — `w-full aspect-square`. Its
 * grid column is wider than the stat cards' columns (see `Banner`
 * below), which is the ONLY reason this circle renders bigger. No
 * separate width classes needed here.
 */
function OrbitCircle() {
  // Three distinct radii so all three rings are genuinely concentric
  // instead of stacking on top of each other. The matching OrbitPath
  // `inset` for a given radius is always `50 - radius` (in percent).
  const innerPositions = useMemo(() => buildRingPositions(4, 22, -45), []);
  const middlePositions = useMemo(() => buildRingPositions(4, 36, 20), []);
  const outerPositions = useMemo(() => buildRingPositions(4, 47, 0), []);

  return (
    <div className="relative aspect-square w-full">
      {/* Dashed orbit-path guides — one per ring, inset = 50 - radius */}
      <OrbitPath inset="28%" />
      <OrbitPath inset="14%" />
      <OrbitPath inset="3%" />

      {/* Inner ring — smallest icons, fastest spin, closest to center */}
      <OrbitRing
        icons={INNER_RING_ICONS}
        positions={innerPositions}
        duration={16}
        direction={1}
        nodeSizeClass="h-9 w-9 sm:h-10 sm:w-10"
      />
      {/* Middle ring — medium icons, medium speed, spins the other way */}
      <OrbitRing
        icons={MIDDLE_RING_ICONS}
        positions={middlePositions}
        duration={26}
        direction={-1}
        nodeSizeClass="h-11 w-11 sm:h-12 sm:w-12"
      />
      {/* Outer ring — biggest icons, slowest spin, rides right on the
          circle's edge so the icons visibly float over the orbit line */}
      <OrbitRing
        icons={OUTER_RING_ICONS}
        positions={outerPositions}
        duration={38}
        direction={1}
        nodeSizeClass="h-14 w-14 sm:h-16 sm:w-16"
      />

      {/* Interactive, glowing-text-only center panel — see TitlePanel
          above for exactly what it does, and how the centering bug
          was fixed. */}
      <TitlePanel />
    </div>
  );
}

// ---------------------------------------------------------------------------
// 4. THE BANNER — puts the three circles into a responsive grid
// ---------------------------------------------------------------------------

function Banner() {
  return (
    // No margin, padding, or max-width classes here — that's handled by
    // whatever wraps this component. `relative` is only here so the
    // ambient glow below has something to position itself against, and
    // `w-full` so this fills whatever width its parent gives it.
    //
    // No `overflow-hidden` either: the outer ring's icons sit right at
    // the edge of the orbit circle, and clipping this section would
    // cut them off.
    <section className="relative w-full">
      {/* Ambient background glow, sits behind everything */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      {/*
        THE RESPONSIVE GRID
        --------------------
        - grid-cols-1                   → mobile & tablet: everything
          stacks in ONE column, and since every circle is `w-full`,
          they all end up the same width as their shared column.
        - lg:grid-cols-[1fr_1.5fr_1fr]   → large screens (1024px+):
          three columns, but the MIDDLE one is 1.5x wider than the
          side ones. Because every circle is just `w-full` of its own
          column, that single grid definition is 100% of what makes
          the orbit circle bigger than the two stat circles — no
          separate width classes to keep in sync.

        The `order-*` classes below control the stacking order on
        mobile without a second copy of the markup: the orbit shows
        first on small screens, then the two stat circles. On large
        screens, `lg:order-*` restores left-card / orbit / right-card
        order.
      */}
      <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.5fr_1fr] lg:gap-8">
        <div className="order-2 lg:order-1">
          <CircleStatCard stat={LEFT_STAT} delay={0.2} />
        </div>

        <div className="order-1 lg:order-2">
          <OrbitCircle />
        </div>

        <div className="order-3 lg:order-3">
          <CircleStatCard stat={RIGHT_STAT} delay={0.35} />
        </div>
      </div>
    </section>
  );
}

export default Banner;