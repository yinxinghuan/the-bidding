import { useCallback, useEffect, useState } from 'react';
import './EpilogueSequence.less';

interface Item {
  src: string;
  caption: string;
}

interface Props {
  endingTitle: string;
  endingTagline: string;
  endingLabel: string;       // i18n "— ending —"
  items: Item[];
  finalCard: string;
  brandSig: string;          // i18n "— THE BIDDING —"
  beginAgainLabel: string;   // i18n "tap to begin again"
  tapContinueLabel: string;  // i18n "› tap to continue"
  onComplete: () => void;
  autoMs?: number;
}

// Final "what happened next" sequence. 4-5 stills, longer captions.
// Each still WAITS for its image to finish loading before starting the
// auto-advance timer. Tap anywhere to advance early.
export default function EpilogueSequence({
  endingTitle, endingTagline, endingLabel,
  items,
  finalCard, brandSig, beginAgainLabel, tapContinueLabel,
  onComplete, autoMs = 5500,
}: Props) {
  // -1 = the opening ending-name card; 0..n-1 = stills; n = final-card
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

  const isTitle = idx === -1;
  const isFinal = idx === items.length;
  const isStill = !isTitle && !isFinal;

  useEffect(() => {
    const t = window.setTimeout(() => setRevealCaption(true), 700);
    return () => window.clearTimeout(t);
  }, [idx]);

  useEffect(() => {
    // Auto-advance: for stills, only after image loads
    if (isStill && !imgLoaded) return;
    const dwell = isTitle ? 3500 : isFinal ? 7000 : autoMs;
    const t = window.setTimeout(advance, dwell);
    return () => window.clearTimeout(t);
  }, [idx, isStill, isTitle, isFinal, imgLoaded, autoMs, advance]);

  if (isTitle) {
    return (
      <div className="bd-epi" onPointerDown={(e) => { e.preventDefault(); advance(); }}>
        <div className="bd-epi__titlecard">
          <div className="bd-epi__title-mini">{endingLabel}</div>
          <div className={`bd-epi__title-main ${revealCaption ? 'is-in' : ''}`}>{endingTitle}</div>
          <div className={`bd-epi__title-tagline ${revealCaption ? 'is-in' : ''}`}>{endingTagline}</div>
          <div className="bd-epi__continue">{tapContinueLabel}</div>
        </div>
      </div>
    );
  }

  if (isFinal) {
    return (
      <div className="bd-epi" onPointerDown={(e) => { e.preventDefault(); advance(); }}>
        <div className="bd-epi__finalcard">
          <div className="bd-epi__final-text">{finalCard}</div>
          <div className="bd-epi__final-sig">{brandSig}</div>
          <div className="bd-epi__final-cta">{beginAgainLabel}</div>
        </div>
      </div>
    );
  }

  const item = items[idx];
  return (
    <div className="bd-epi" onPointerDown={(e) => { e.preventDefault(); advance(); }}>
      <img
        key={`epi-${idx}`}
        className={`bd-epi__img ${imgLoaded ? 'is-loaded' : ''}`}
        src={item.src}
        alt=""
        draggable={false}
        onLoad={() => setImgLoaded(true)}
        onError={() => setImgLoaded(true)}
      />
      {!imgLoaded && <div className="bd-epi__loading">…</div>}
      <div className={`bd-epi__caption ${revealCaption && imgLoaded ? 'is-in' : ''}`}>
        {item.caption}
      </div>
      <div className="bd-epi__progress" aria-hidden>
        {items.map((_, i) => (
          <span key={i} className={i <= idx ? 'is-on' : ''} />
        ))}
      </div>
      {imgLoaded && <div className="bd-epi__continue">{tapContinueLabel}</div>}
    </div>
  );
}
