import './HotspotPin.less';

interface Props {
  // position within the act hero, 0-100%
  x: number; y: number;
  label: string;
  visited?: boolean;
  onClick: () => void;
}

// A small breathing dot + label tooltip. Tap & Tell-style affordance.
// Placement: x/y are the center of the pin in % of the stage.
export default function HotspotPin({ x, y, label, visited, onClick }: Props) {
  return (
    <button
      className={`bd-pin ${visited ? 'is-visited' : ''}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      onPointerDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      aria-label={label}
    >
      <span className="bd-pin__rings" aria-hidden>
        <i /><i /><i />
      </span>
      <span className="bd-pin__dot" aria-hidden />
      <span className="bd-pin__label">{label}</span>
    </button>
  );
}
