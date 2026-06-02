import { useEffect, useState } from 'react';
import './SceneTitle.less';

interface Props {
  primary: string;
  secondary?: string;
  meta?: string;
  // re-mount key that triggers a fresh fade-in cycle when the act changes
  cycleKey: string | number;
}

// In-scene title overlay. Sits in the upper-left of the scene as small
// typewriter text, fades in on mount, holds for ~3 seconds, then fades out.
// Replaces the previous full-screen black TitleCard.
export default function SceneTitle({ primary, secondary, meta, cycleKey }: Props) {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in');
  useEffect(() => {
    setPhase('in');
    const tHold = window.setTimeout(() => setPhase('hold'), 600);
    const tOut  = window.setTimeout(() => setPhase('out'), 3600);
    return () => { window.clearTimeout(tHold); window.clearTimeout(tOut); };
  }, [cycleKey]);

  return (
    <div
      key={cycleKey}
      className={`bd-scenetitle bd-scenetitle--${phase}`}
      aria-hidden
    >
      <div className="bd-scenetitle__primary">{primary}</div>
      {secondary && <div className="bd-scenetitle__rule" />}
      {secondary && <div className="bd-scenetitle__secondary">{secondary}</div>}
      {meta && <div className="bd-scenetitle__meta">{meta}</div>}
    </div>
  );
}
