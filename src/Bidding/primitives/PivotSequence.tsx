import { useCallback, useEffect, useState } from 'react';
import './PivotSequence.less';

interface Item {
  src: string;
  caption: string;
}

interface Props {
  introTitle: string;
  introBody: string;
  introLabel: string;       // i18n "— she remembers —"
  items: Item[];
  closingTitle: string;
  closingBody: string;
  closingLabel: string;     // i18n "— she understands —"
  tapContinueLabel: string; // i18n "› tap to continue"
  onComplete: () => void;
  autoMs?: number;
}

// MID-PIVOT reveal: intro card, then a series of stills, then a closing card.
// Each still WAITS for the image to finish loading before starting the
// auto-advance timer (no more flipping past a blank frame).
// Tap anywhere to advance early.
export default function PivotSequence({
  introTitle, introBody, introLabel,
  items,
  closingTitle, closingBody, closingLabel,
  tapContinueLabel,
  onComplete, autoMs = 6500,
}: Props) {
  const [idx, setIdx] = useState(-1);
  const [revealCaption, setRevealCaption] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const advance = useCallback(() => {
    if (idx >= items.length) {
      onComplete();
      return;
    }
    setRevealCaption(false);
    setImgLoaded(false);
    setIdx((i) => i + 1);
  }, [idx, items.length, onComplete]);

  // Determine the dwell phase
  const isIntro = idx === -1;
  const isClosing = idx === items.length;
  const isStill = !isIntro && !isClosing;

  useEffect(() => {
    // Caption reveal animation start
    const t1 = window.setTimeout(() => setRevealCaption(true), 700);
    return () => window.clearTimeout(t1);
  }, [idx]);

  useEffect(() => {
    // Auto-advance timer — for stills it only starts AFTER the image loads
    if (isStill && !imgLoaded) return;
    const dwell = isIntro ? 4500 : isClosing ? 7000 : autoMs;
    const t = window.setTimeout(advance, dwell);
    return () => window.clearTimeout(t);
  }, [idx, isStill, isIntro, isClosing, imgLoaded, autoMs, advance]);

  if (isIntro) {
    return (
      <div className="bd-pivot" onPointerDown={(e) => { e.preventDefault(); advance(); }}>
        <div className="bd-pivot__intro">
          <div className="bd-pivot__intro-mini">{introLabel}</div>
          <div className={`bd-pivot__intro-title ${revealCaption ? 'is-in' : ''}`}>{introTitle}</div>
          <div className={`bd-pivot__intro-body ${revealCaption ? 'is-in' : ''}`}>{introBody}</div>
          <div className="bd-pivot__continue">{tapContinueLabel}</div>
        </div>
      </div>
    );
  }

  if (isClosing) {
    return (
      <div className="bd-pivot" onPointerDown={(e) => { e.preventDefault(); advance(); }}>
        <div className="bd-pivot__closing">
          <div className="bd-pivot__closing-mini">{closingLabel}</div>
          <div className={`bd-pivot__closing-title ${revealCaption ? 'is-in' : ''}`}>{closingTitle}</div>
          <div className={`bd-pivot__closing-body ${revealCaption ? 'is-in' : ''}`}>{closingBody}</div>
          <div className="bd-pivot__continue">{tapContinueLabel}</div>
        </div>
      </div>
    );
  }

  const item = items[idx];
  return (
    <div className="bd-pivot" onPointerDown={(e) => { e.preventDefault(); advance(); }}>
      <img
        key={`pivot-${idx}`}
        className={`bd-pivot__img ${imgLoaded ? 'is-loaded' : ''}`}
        src={item.src}
        alt=""
        draggable={false}
        onLoad={() => setImgLoaded(true)}
        onError={() => setImgLoaded(true)}
      />
      {!imgLoaded && <div className="bd-pivot__loading">…</div>}
      <div className={`bd-pivot__caption ${revealCaption && imgLoaded ? 'is-in' : ''}`}>
        {item.caption}
      </div>
      <div className="bd-pivot__progress" aria-hidden>
        {items.map((_, i) => (
          <span key={i} className={i <= idx ? 'is-on' : ''} />
        ))}
      </div>
      {imgLoaded && <div className="bd-pivot__continue">{tapContinueLabel}</div>}
    </div>
  );
}
