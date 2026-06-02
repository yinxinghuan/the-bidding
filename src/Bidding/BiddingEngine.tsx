import { useCallback, useMemo, useState } from 'react';
import './BiddingEngine.less';

import type { Act, Phase, BiddingState, Flags, StateMutation } from './types';
import { ACTS, EXAMINES, INITIAL_STATE, INITIAL_FLAGS } from './content';
import { t } from './i18n';

import TitleCard from './primitives/TitleCard';
import HotspotPin from './primitives/HotspotPin';
import ExamineCard from './primitives/ExamineCard';
import VideoStage from './primitives/VideoStage';

const BASE = import.meta.env.BASE_URL;
const stillUrl = (rel: string) => BASE + rel;
const videoUrl = (rel: string) => BASE + 'videos/' + rel;
const frameUrl = (rel: string) => BASE + 'stills/' + rel;

export default function BiddingEngine() {
  const [act, setAct] = useState<Act>(1);
  const [phase, setPhase] = useState<Phase>('title');
  const [, setState] = useState<BiddingState>(INITIAL_STATE);
  const [, setFlags] = useState<Flags>(INITIAL_FLAGS);
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [examining, setExamining] = useState<string | null>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const currentActDef = ACTS[act];

  const onTitleDone = useCallback(() => setPhase('idle'), []);

  const onHotspotClick = useCallback((hotspotId: string) => {
    setActiveHotspot(hotspotId);
    setPhase('playing');
  }, []);

  // When the video for a choice ends, AUTO-ADVANCE to the next act in the
  // story. No continue button — the cinematic flow carries you forward.
  // If the next act hasn't been authored yet, we show a soft end-of-pilot stub.
  const onVideoEnded = useCallback(() => {
    if (!currentActDef || !activeHotspot) return;
    const def = currentActDef.hotspots.find((h) => h.id === activeHotspot);
    if (!def) return;

    applyMutation(def.mutation, setState, setFlags);
    setVisited((prev) => {
      const next = new Set(prev); next.add(activeHotspot!); return next;
    });
    setActiveHotspot(null);

    const nextAct = (def.advanceTo ?? (act + 1)) as Act;
    if (nextAct > 5 || !ACTS[nextAct]) {
      setPhase('done');
      return;
    }
    setAct(nextAct);
    setVisited(new Set());
    setPhase('title');
  }, [activeHotspot, currentActDef, act]);

  const onExamineOpen = useCallback((examineId: string) => {
    setExamining(examineId);
    setPhase('examining');
  }, []);

  const onExamineClose = useCallback(() => {
    setExamining(null);
    setPhase('idle');
  }, []);

  const heroUrl = useMemo(() => stillUrl(currentActDef.hero), [currentActDef]);

  if (phase === 'title') {
    return (
      <div className="bd-root">
        <TitleCard
          primary={t(currentActDef.titleCard.primaryKey)}
          secondary={t(currentActDef.titleCard.secondaryKey)}
          meta={currentActDef.titleCard.metaKey ? t(currentActDef.titleCard.metaKey) : undefined}
          bgStill={currentActDef.titleCard.bgStill ? stillUrl(currentActDef.titleCard.bgStill) : undefined}
          onDone={onTitleDone}
        />
      </div>
    );
  }

  return (
    <div className="bd-root">
      <div className="bd-stage">
        {/* hero (act background, always rendered behind everything) */}
        <img className="bd-hero" src={heroUrl} alt="" draggable={false} />

        {/* video plays on top when active */}
        {phase === 'playing' && activeHotspot && (() => {
          const def = currentActDef.hotspots.find((h) => h.id === activeHotspot);
          if (!def) return null;
          const poster = def.startFrame ? stillUrl(def.startFrame) : heroUrl;
          return (
            <VideoStage
              videoSrc={videoUrl(def.video)}
              posterSrc={poster}
              fallbackImg={def.endFrame ? frameUrl(def.endFrame) : heroUrl}
              onEnded={onVideoEnded}
            />
          );
        })()}

        {/* hotspot pins (idle phase only) — pill labels, no bottom choice bar */}
        {phase === 'idle' && currentActDef.hotspots.map((h) => {
          const pinX = h.left + (h.width  * (h.pinX ?? 50) / 100);
          const pinY = h.top  + (h.height * (h.pinY ?? 50) / 100);
          return (
            <HotspotPin
              key={h.id}
              x={pinX}
              y={pinY}
              label={t(h.labelKey)}
              visited={visited.has(h.id)}
              labelDir={h.labelDir}
              onClick={() => onHotspotClick(h.id)}
            />
          );
        })}

        {/* examine card overlay */}
        {phase === 'examining' && examining && (() => {
          const def = EXAMINES[examining];
          if (!def) return null;
          return (
            <ExamineCard
              src={stillUrl(def.src)}
              caption={t(def.captionKey)}
              onClose={onExamineClose}
            />
          );
        })()}

        {/* discreet examine row in the top-left corner */}
        {phase === 'idle' && currentActDef.examines.length > 0 && (
          <div className="bd-examine-bar">
            {currentActDef.examines.map((eid) => {
              const def = EXAMINES[eid]; if (!def) return null;
              return (
                <button
                  key={eid}
                  className="bd-examine-bar__btn"
                  onPointerDown={(e) => {
                    e.preventDefault(); e.stopPropagation();
                    onExamineOpen(eid);
                  }}
                  aria-label={t(def.captionKey)}
                >
                  <img src={stillUrl(def.src)} alt="" draggable={false} />
                </button>
              );
            })}
          </div>
        )}

        {phase === 'done' && (
          <div className="bd-done">
            <div className="bd-done__inner">
              <div className="bd-done__title">— end of pilot —</div>
              <div className="bd-done__sub">ACT 3-5 and endings still to come.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function applyMutation(
  m: StateMutation,
  setState: React.Dispatch<React.SetStateAction<BiddingState>>,
  setFlags: React.Dispatch<React.SetStateAction<Flags>>,
) {
  setState((prev) => ({
    ...prev,
    caution:        clamp((prev.caution        + (m.caution        ?? 0))),
    truthAccepted:  clamp((prev.truthAccepted  + (m.truthAccepted  ?? 0))),
    mercy:          clamp((prev.mercy          + (m.mercy          ?? 0))),
    timeLeft:       Math.max(0, prev.timeLeft  + (m.timeLeft       ?? 0)),
  }));
  setFlags((prev) => ({
    mercerLocked:    m.mercerLocked    ?? prev.mercerLocked,
    antonescuPath:   m.antonescuPath   ?? prev.antonescuPath,
    yuriPath:        m.yuriPath        ?? prev.yuriPath,
    stefanRefused:   m.stefanRefused   ?? prev.stefanRefused,
    pivotTriggered:  m.pivotTriggered  ?? prev.pivotTriggered,
  }));
}

function clamp(v: number) { return Math.max(0, Math.min(100, v)); }
