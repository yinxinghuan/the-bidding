import { useCallback, useMemo, useState } from 'react';
import './BiddingEngine.less';

import type { Act, Phase, BiddingState, Flags, StateMutation } from './types';
import { ACTS, EXAMINES, INITIAL_STATE, INITIAL_FLAGS } from './content';
import { t } from './i18n';

import HotspotPin from './primitives/HotspotPin';
import ChoiceList from './primitives/ChoiceList';
import ExamineCard from './primitives/ExamineCard';
import ExamineRow from './primitives/ExamineRow';
import SceneTitle from './primitives/SceneTitle';
import VideoStage from './primitives/VideoStage';

const BASE = import.meta.env.BASE_URL;
const stillUrl = (rel: string) => BASE + rel;
const videoUrl = (rel: string) => BASE + 'videos/' + rel;
const frameUrl = (rel: string) => BASE + 'stills/' + rel;

export default function BiddingEngine() {
  const [act, setAct] = useState<Act>(1);
  const [phase, setPhase] = useState<Phase>('idle');   // start on the hero, no black title card
  const [, setState] = useState<BiddingState>(INITIAL_STATE);
  const [, setFlags] = useState<Flags>(INITIAL_FLAGS);
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [examining, setExamining] = useState<string | null>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const currentActDef = ACTS[act];

  const onHotspotClick = useCallback((hotspotId: string) => {
    setActiveHotspot(hotspotId);
    setPhase('playing');
  }, []);

  // Auto-advance after video. No black title card, no continue button — just
  // a seamless cut to the next act's hero, with SceneTitle fading in as overlay.
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
    setPhase('idle');
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

  return (
    <div className="bd-root">
      <div className="bd-stage">
        {/* hero (act background, always rendered behind everything). Fades in
            softly each time the act changes to feel like a real scene cut. */}
        <img
          key={`hero-${act}`}
          className="bd-hero"
          src={heroUrl}
          alt=""
          draggable={false}
        />

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

        {/* In-scene SceneTitle (top-left, fades in then out after ~3s) */}
        {(phase === 'idle' || phase === 'examining') && (
          <SceneTitle
            cycleKey={act}
            primary={t(currentActDef.titleCard.primaryKey)}
            secondary={t(currentActDef.titleCard.secondaryKey)}
            meta={currentActDef.titleCard.metaKey ? t(currentActDef.titleCard.metaKey) : undefined}
          />
        )}

        {/* discreet text-only examine row in the top-right */}
        {phase === 'idle' && currentActDef.examines.length > 0 && (
          <ExamineRow
            items={currentActDef.examines
              .map((eid) => EXAMINES[eid])
              .filter(Boolean)
              .map((def) => ({ id: def.id, shortLabel: t(def.shortKey) }))}
            onPick={onExamineOpen}
          />
        )}

        {/* hotspot pins (idle phase only) */}
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
              onClick={() => onHotspotClick(h.id)}
            />
          );
        })}

        {/* examine card overlay (modal) */}
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

        {/* bottom typewriter ChoiceList — the readable text affordance for the pins */}
        {phase === 'idle' && (
          <ChoiceList
            hint={t(`hint.act${act}`)}
            choices={currentActDef.hotspots.map((h) => ({
              id: h.id,
              label: t(h.labelKey),
              visited: visited.has(h.id),
            }))}
            onPick={onHotspotClick}
          />
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
