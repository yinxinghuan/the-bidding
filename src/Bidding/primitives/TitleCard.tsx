import { useEffect } from 'react';
import './TitleCard.less';

interface Props {
  primary: string;
  secondary: string;
  meta?: string;
  bgStill?: string;     // full URL or /public-relative
  durationMs?: number;
  onDone: () => void;
}

export default function TitleCard({
  primary, secondary, meta, bgStill,
  durationMs = 3200, onDone,
}: Props) {
  useEffect(() => {
    const t = window.setTimeout(onDone, durationMs);
    return () => window.clearTimeout(t);
  }, [durationMs, onDone]);

  return (
    <div className="bd-titlecard">
      {bgStill && (
        <div
          className="bd-titlecard__bg"
          style={{ backgroundImage: `url(${bgStill})` }}
          aria-hidden
        />
      )}
      <div className="bd-titlecard__veil" aria-hidden />
      <div className="bd-titlecard__text">
        <div className="bd-titlecard__primary">{primary}</div>
        <div className="bd-titlecard__rule" aria-hidden />
        <div className="bd-titlecard__secondary">{secondary}</div>
        {meta && <div className="bd-titlecard__meta">{meta}</div>}
      </div>
    </div>
  );
}
