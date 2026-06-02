import './HotspotPin.less';

interface Props {
  x: number; y: number;
  label: string;
  visited?: boolean;
  onClick: () => void;
}

// Small pulsing dot on the scene. The choice label only shows on
// hover/focus; the persistent text affordance lives in the bottom ChoiceList.
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
        <i /><i />
      </span>
      <span className="bd-pin__dot" aria-hidden />
      <span className="bd-pin__label">{label}</span>
    </button>
  );
}
