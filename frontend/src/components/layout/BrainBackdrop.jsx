import Brain from '../Brain/Brain.jsx';

/**
 * Fixed full-viewport backdrop. Layers (back → front):
 *   1. Solid ink color
 *   2. Static brain image (drop your own at /public/brain-bg.jpg or .png)
 *   3. Subtle grid lines
 *   4. The 3D brain canvas (rotates, opens, hue-shifts with scroll)
 *   5. Gradient veil that keeps text readable on top
 *
 * `progress` (0..1) is global scroll progress and drives openness + hue.
 */
export default function BrainBackdrop({ progress }) {
  const hue = 0.55 + progress * 0.2;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Static brain image — drop your file at frontend/public/brain-bg.jpg */}
      <img
        src="/brain-bg.jpg"
        alt=""
        aria-hidden="true"
        onError={(e) => {
          // hide cleanly if the image isn't there yet
          e.currentTarget.style.display = 'none';
        }}
        className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen scale-110 blur-[2px]"
        style={{
          filter:
            'brightness(0.9) contrast(1.05) hue-rotate(180deg) saturate(1.1)',
        }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* 3D rotating brain on top of the image */}
      <div className="absolute inset-0">
        <Brain openness={progress} hue={hue} />
      </div>

      {/* Gradient veil to keep page text legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/55 to-ink/85" />
    </div>
  );
}
