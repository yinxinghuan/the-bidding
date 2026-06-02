import './ChoiceList.less';

interface Choice {
  id: string;
  label: string;
  visited?: boolean;
  disabled?: boolean;
}

interface Props {
  choices: Choice[];
  onPick: (id: string) => void;
  hint?: string;
}

// Bottom row of typewriter-style choice buttons. Used when hotspots aren't
// spatial (e.g. ACT 3 dialogue) or as a redundant choice surface alongside pins.
export default function ChoiceList({ choices, onPick, hint }: Props) {
  return (
    <div className="bd-choices">
      {hint && <div className="bd-choices__hint">{hint}</div>}
      <ul className="bd-choices__list">
        {choices.map((c) => (
          <li key={c.id}>
            <button
              className={`bd-choices__btn ${c.visited ? 'is-visited' : ''}`}
              disabled={c.disabled}
              onPointerDown={(e) => {
                if (c.disabled) return;
                e.preventDefault();
                e.stopPropagation();
                onPick(c.id);
              }}
            >
              <span className="bd-choices__caret">›</span>
              <span className="bd-choices__label">{c.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
