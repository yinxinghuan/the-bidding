import './SceneTitle.less';

interface Props {
  primary: string;
  secondary?: string;
  meta?: string;
  cycleKey: string | number;
}

// Editorial-style scene header: a serif-italic title, a hairline rule, a
// sans-serif body, and a tiny typewriter location/time stamp underneath.
// Persistent (no auto-fade). Backdrop is a soft top-down gradient instead
// of a hard card, so it reads as cinematography rather than as a UI panel.
export default function SceneTitle({ primary, secondary, meta, cycleKey }: Props) {
  return (
    <div key={cycleKey} className="bd-scenetitle" aria-hidden>
      <div className="bd-scenetitle__inner">
        <div className="bd-scenetitle__primary">{primary}</div>
        <div className="bd-scenetitle__rule" aria-hidden />
        {secondary && <div className="bd-scenetitle__secondary">{secondary}</div>}
        {meta && <div className="bd-scenetitle__meta">{meta}</div>}
      </div>
    </div>
  );
}
