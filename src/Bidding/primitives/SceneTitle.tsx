import './SceneTitle.less';

interface Props {
  primary: string;
  secondary?: string;
  meta?: string;
  // re-mount key that triggers a fresh fade-in cycle when the act changes
  cycleKey: string | number;
}

// In-scene title — persistent at top of scene. Animates in on each act
// change. Does NOT fade out (the player needs it as a permanent anchor
// to who/where/when they are).
export default function SceneTitle({ primary, secondary, meta, cycleKey }: Props) {
  return (
    <div key={cycleKey} className="bd-scenetitle" aria-hidden>
      <div className="bd-scenetitle__primary">{primary}</div>
      {secondary && <div className="bd-scenetitle__secondary">{secondary}</div>}
      {meta && <div className="bd-scenetitle__meta">{meta}</div>}
    </div>
  );
}
