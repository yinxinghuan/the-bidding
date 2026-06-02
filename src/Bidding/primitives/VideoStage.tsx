import { useEffect, useRef, useState } from 'react';
import './VideoStage.less';

interface Props {
  videoSrc: string;       // /public-relative
  posterSrc: string;      // for the black-flash window before first decoded frame
  fallbackImg?: string;   // shown if <video> errors
  onEnded: () => void;    // called once the video has played + hold elapsed
  holdMs?: number;
}

const FADE_MS = 700;

export default function VideoStage({
  videoSrc, posterSrc, fallbackImg,
  onEnded, holdMs = 1800,
}: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [exiting, setExiting] = useState(false);
  const [errored, setErrored] = useState(false);

  const endTimerRef = useRef<number | null>(null);
  const fadeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const v = ref.current; if (!v) return;
    const handleEnded = () => {
      // hold for holdMs, then fade out, then call onEnded
      endTimerRef.current = window.setTimeout(() => {
        setExiting(true);
        fadeTimerRef.current = window.setTimeout(onEnded, FADE_MS);
      }, holdMs);
    };
    const handleError = () => { setErrored(true); window.setTimeout(onEnded, 1800); };
    v.addEventListener('ended', handleEnded);
    v.addEventListener('error', handleError);
    v.play().catch(() => {/* autoplay blocked — wait for user gesture */});
    return () => {
      v.removeEventListener('ended', handleEnded);
      v.removeEventListener('error', handleError);
      if (endTimerRef.current) window.clearTimeout(endTimerRef.current);
      if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current);
    };
  }, [videoSrc, holdMs, onEnded]);

  if (errored && fallbackImg) {
    return <img className="bd-vstage bd-vstage--fallback" src={fallbackImg} alt="" />;
  }

  return (
    <video
      ref={ref}
      className={`bd-vstage ${exiting ? 'is-exiting' : ''}`}
      src={videoSrc}
      poster={posterSrc}
      autoPlay
      playsInline
      preload="auto"
    />
  );
}
