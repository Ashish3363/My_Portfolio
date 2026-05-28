import MilkyWay from '../MilkyWay/MilkyWay.jsx';

/**
 * Fixed full-viewport scene backdrop.
 *
 * Layers (back → front):
 *   1. Solid ink color
 *   2. Subtle grid lines (very faint)
 *   3. Milky Way galaxy with continuous forward motion + warp streaks
 *   4. Light gradient veil to preserve text legibility
 *      (kept lighter than before so the galaxy reads bright)
 */
// eslint-disable-next-line no-unused-vars
export default function BrainBackdrop({ progress }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />

      <div className="absolute inset-0">
        <MilkyWay />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-ink/30 to-ink/70" />
    </div>
  );
}
