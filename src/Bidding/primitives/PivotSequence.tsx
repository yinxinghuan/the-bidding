import { useCallback, useEffect, useState } from 'react';
import './PivotSequence.less';

interface Item {
  src: string;
  caption: string;
}

interface Props {
  items: Item[];
  onComplete: () => void;
  autoMs?: number;     // auto-advance after this many ms per item (default 4500)
}

// MID-PIVOT reveal sequence: a series of stills appearing one at a time
// with a Joan-Didion-style caption, dark backdrop. Tap to advance early.
// After the last still, calls onComplete (engine then transitions to ACT 4).
export default function PivotSequence({ items, onComplete, autoMs = 4500 }: Props) {
  const [idx, setIdx] = useState(0);
  const [revealCaption, setRevealCaption] = useState(false);

  const advance = useCallback(() => {
    if (idx >= items.length - 1) {
      onComplete();
    } else {
      setRevealCaption(false);
      setIdx((i) => i + 1);
    }
  }, [idx, items.length, onComplete]);

  useEffect(() => {
    const t1 = window.setTimeout(() => setRevealCaption(true), 700);
    const t2 = window.setTimeout(advance, autoMs);
    return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
  }, [idx, advance, autoMs]);

  if (idx >= items.length) return null;
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
      <div className={`bd-pivot__caption ${revealCaption ? 'is-in' : ''}`}>
        {item.caption}
      </div>
      <div className="bd-pivot__progress" aria-hidden>
        {items.map((_, i) => (
          <span key={i} className={i <= idx ? 'is-on' : ''} />
        ))}
      </div>
    </div>
  );
}
