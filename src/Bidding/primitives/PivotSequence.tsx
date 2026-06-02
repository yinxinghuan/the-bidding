import { useCallback, useEffect, useState } from 'react';
import './PivotSequence.less';

interface Item {
  src: string;
  caption: string;
}

interface Props {
  introTitle: string;
  introBody: string;
  items: Item[];
  closingTitle: string;
  closingBody: string;
  onComplete: () => void;
  autoMs?: number;
}

// MID-PIVOT reveal: an intro card explaining what Elena is doing, then a
// series of stills with captions, then a closing card with the realization.
// Tap to advance early.
export default function PivotSequence({
  introTitle, introBody, items, closingTitle, closingBody, onComplete, autoMs = 6500,
}: Props) {
  // -1 = intro card; 0..n-1 = stills; n = closing card; n+1 = done
  const [idx, setIdx] = useState(-1);
  const [revealCaption, setRevealCaption] = useState(false);

  const advance = useCallback(() => {
    if (idx >= items.length) {
      onComplete();
      return;
    }
    setRevealCaption(false);
    setIdx((i) => i + 1);
  }, [idx, items.length, onComplete]);

  useEffect(() => {
    const isIntro = idx === -1;
    const isClosing = idx === items.length;
    const dwell = isIntro ? 4500 : isClosing ? 7000 : autoMs;
    const t1 = window.setTimeout(() => setRevealCaption(true), 700);
    const t2 = window.setTimeout(advance, dwell);
    return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
  }, [idx, advance, autoMs, items.length]);

  if (idx === -1) {
    return (
      <div className="bd-pivot" onPointerDown={(e) => { e.preventDefault(); advance(); }}>
        <div className="bd-pivot__intro">
          <div className="bd-pivot__intro-mini">— she remembers —</div>
          <div className={`bd-pivot__intro-title ${revealCaption ? 'is-in' : ''}`}>{introTitle}</div>
          <div className={`bd-pivot__intro-body ${revealCaption ? 'is-in' : ''}`}>{introBody}</div>
        </div>
      </div>
    );
  }

  if (idx >= items.length) {
    return (
      <div className="bd-pivot" onPointerDown={(e) => { e.preventDefault(); advance(); }}>
        <div className="bd-pivot__closing">
          <div className="bd-pivot__closing-mini">— she understands —</div>
          <div className={`bd-pivot__closing-title ${revealCaption ? 'is-in' : ''}`}>{closingTitle}</div>
          <div className={`bd-pivot__closing-body ${revealCaption ? 'is-in' : ''}`}>{closingBody}</div>
        </div>
      </div>
    );
  }

  const item = items[idx];
  return (
    <div className="bd-pivot" onPointerDown={(e) => { e.preventDefault(); advance(); }}>
      <img
        key={`pivot-${idx}`}
        className="bd-pivot__img"
        src={item.src}
        alt=""
        draggable={false}
      />
      <div className={`bd-pivot__caption ${revealCaption ? 'is-in' : ''}`}>{item.caption}</div>
      <div className="bd-pivot__progress" aria-hidden>
        {items.map((_, i) => (
          <span key={i} className={i <= idx ? 'is-on' : ''} />
        ))}
      </div>
    </div>
  );
}
