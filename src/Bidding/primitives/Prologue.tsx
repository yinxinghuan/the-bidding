import { useEffect, useRef, useState } from 'react';
import './Prologue.less';

interface Props {
  paragraphs: string[];
  ctaLabel: string;
  onDone: () => void;
}

// Black-background opening that grounds the player in the situation before
// the first scene. Paragraphs reveal sequentially with a soft typewriter
// fade; player taps anywhere to skip ahead to the next paragraph, or to
// begin once all are shown.
export default function Prologue({ paragraphs, ctaLabel, onDone }: Props) {
  const [revealed, setRevealed] = useState(1);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    // auto-reveal paragraphs at a comfortable pace
    paragraphs.forEach((_, i) => {
      if (i === 0) return;
      const t = window.setTimeout(() => {
        setRevealed((r) => (r > i ? r : i + 1));
      }, 1800 * i);
      timers.current.push(t);
    });
    return () => { timers.current.forEach(window.clearTimeout); timers.current = []; };
  }, [paragraphs]);

  const onTap = () => {
    if (revealed < paragraphs.length) {
      // reveal all remaining
      timers.current.forEach(window.clearTimeout);
      setRevealed(paragraphs.length);
      return;
    }
    onDone();
  };

  return (
    <div className="bd-prologue" onPointerDown={onTap}>
      <div className="bd-prologue__inner">
        {paragraphs.slice(0, revealed).map((p, i) => (
          <p key={i} className="bd-prologue__p" style={{ animationDelay: `${i * 0.05}s` }}>{p}</p>
        ))}
        {revealed >= paragraphs.length && (
          <div className="bd-prologue__cta">{ctaLabel}</div>
        )}
      </div>
    </div>
  );
}
