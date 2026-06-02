import { useCallback, useEffect, useState } from 'react';
import './EpilogueSequence.less';

interface Item {
  src: string;
  caption: string;
}

interface Props {
  endingTitle: string;
  endingTagline: string;
  items: Item[];
  finalCard: string;
  onComplete: () => void;
  autoMs?: number;
}

// Final "what happened next" sequence. 4-5 stills, longer Joan-Didion
// captions, ends with a small title-card naming the ending. Tap to advance.
export default function EpilogueSequence({
  endingTitle, endingTagline, items, finalCard, onComplete, autoMs = 5500,
}: Props) {
  // -1 = the opening ending-name card; 0..n-1 = stills; n = final-card
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
    // Ending title card lingers slightly longer than each still
    const isTitle = idx === -1;
    const isFinal = idx === items.length;
    const dwell = isTitle ? 3200 : isFinal ? 6000 : autoMs;
    const t1 = window.setTimeout(() => setRevealCaption(true), 700);
    const t2 = window.setTimeout(advance, dwell);
    return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
  }, [idx, advance, autoMs, items.length]);

  // Opening ending-name card
  if (idx === -1) {
    return (
      <div className="bd-epi" onPointerDown={(e) => { e.preventDefault(); advance(); }}>
        <div className="bd-epi__titlecard">
          <div className="bd-epi__title-mini">— ending —</div>
          <div className={`bd-epi__title-main ${revealCaption ? 'is-in' : ''}`}>{endingTitle}</div>
          <div className={`bd-epi__title-tagline ${revealCaption ? 'is-in' : ''}`}>{endingTagline}</div>
        </div>
      </div>
    );
  }

  // Final closing card
  if (idx >= items.length) {
    return (
      <div className="bd-epi" onPointerDown={(e) => { e.preventDefault(); advance(); }}>
        <div className="bd-epi__finalcard">
          <div className="bd-epi__final-text">{finalCard}</div>
          <div className="bd-epi__final-sig">— THE BIDDING —</div>
          <div className="bd-epi__final-cta">tap to begin again</div>
        </div>
      </div>
    );
  }

  // Mid-sequence still
  const item = items[idx];
  return (
    <div className="bd-epi" onPointerDown={(e) => { e.preventDefault(); advance(); }}>
      <img
        key={`epi-${idx}`}
        className="bd-epi__img"
        src={item.src}
        alt=""
        draggable={false}
      />
      <div className={`bd-epi__caption ${revealCaption ? 'is-in' : ''}`}>{item.caption}</div>
      <div className="bd-epi__progress" aria-hidden>
        {items.map((_, i) => (
          <span key={i} className={i <= idx ? 'is-on' : ''} />
        ))}
      </div>
    </div>
  );
}
