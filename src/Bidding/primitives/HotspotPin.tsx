import './HotspotPin.less';

interface Props {
  x: number; y: number;          // pin position within stage, 0-100%
  label: string;
  visited?: boolean;
  // direction the label extends from the pin. 'right' is default.
  // 'left' for pins near the right edge so the label stays on-screen.
  // 'up'/'down' for tighter compositions where horizontal flow doesn't fit.
  labelDir?: 'right' | 'left' | 'up' | 'down';
  onClick: () => void;
}

// Pill-shaped affordance: a small pulsing dot + always-visible typewriter label
// next to it, combined into one tappable element. Replaces the old "small dot
// + hover-only tooltip" pattern, which was invisible on mobile.
export default function HotspotPin({
  x, y, label, visited, labelDir = 'right', onClick,
}: Props) {
  return (
    <button
      className={`bd-pin bd-pin--${labelDir} ${visited ? 'is-visited' : ''}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      onPointerDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      aria-label={label}
    >
      <span className="bd-pin__indicator" aria-hidden>
        <span className="bd-pin__pulse" />
        <span className="bd-pin__pulse bd-pin__pulse--delayed" />
        <span className="bd-pin__dot" />
      </span>
      <span className="bd-pin__label">
        <span className="bd-pin__caret" aria-hidden>›</span>
        <span className="bd-pin__text">{label}</span>
      </span>
    </button>
  );
}
