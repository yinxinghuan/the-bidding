import { useEffect, useRef, useState } from 'react';
import './Prologue.less';

interface Props {
  paragraphs: string[];
  ctaLabel: string;
  bgImageSrc?: string;     // atmospheric background still
  onDone: () => void;
}

// Atmospheric opening: a Romanian-New-Wave still in the background, very
// gently zooming, with the typewriter paragraphs revealed sequentially on
// top. Tap to skip ahead. Replaces the pure-text black-page opening.
export default function Prologue({ paragraphs, ctaLabel, bgImageSrc, onDone }: Props) {
  const [revealed, setRevealed] = useState(1);
  const timers = useRef<number[]>([]);

  useEffect(() => {
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
      timers.current.forEach(window.clearTimeout);
      setRevealed(paragraphs.length);
      return;
    }
    onDone();
  };

  return (
    <div className="bd-prologue" onPointerDown={onTap}>
      {bgImageSrc && (
        <div
          className="bd-prologue__bg"
          style={{ backgroundImage: `url(${bgImageSrc})` }}
          aria-hidden
        />
      )}
      <div className="bd-prologue__veil" aria-hidden />
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
