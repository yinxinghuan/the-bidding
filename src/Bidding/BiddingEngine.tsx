import { useCallback, useMemo, useState } from 'react';
import './BiddingEngine.less';

import type { Act, Phase, BiddingState, Flags, StateMutation } from './types';
import { ACTS, EXAMINES, INITIAL_STATE, INITIAL_FLAGS, PIVOT_STILLS, ENDINGS } from './content';
import type { EndingId } from './types';
import { t } from './i18n';

import HotspotPin from './primitives/HotspotPin';
import ChoiceList from './primitives/ChoiceList';
import ExamineCard from './primitives/ExamineCard';
import ExamineRow from './primitives/ExamineRow';
import SceneTitle from './primitives/SceneTitle';
import VideoStage from './primitives/VideoStage';
import Prologue from './primitives/Prologue';
import PivotSequence from './primitives/PivotSequence';
import EpilogueSequence from './primitives/EpilogueSequence';

const BASE = import.meta.env.BASE_URL;
const stillUrl = (rel: string) => BASE + rel;
const videoUrl = (rel: string) => BASE + 'videos/' + rel;
const frameUrl = (rel: string) => BASE + 'stills/' + rel;

export default function BiddingEngine() {
  const [showPrologue, setShowPrologue] = useState(true);
  const [act, setAct] = useState<Act>(1);
  const [phase, setPhase] = useState<Phase>('idle');
  const [, setState] = useState<BiddingState>(INITIAL_STATE);
  const [, setFlags] = useState<Flags>(INITIAL_FLAGS);
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [examining, setExamining] = useState<string | null>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  // Narrative consequence tag from the previously played hotspot — used to
  // render a SceneTitle secondary line that explains the cause-and-effect.
  const [lastConsequence, setLastConsequence] = useState<string | null>(null);
  // Which ending the player has triggered (null until ACT 5 choice)
  const [endingId, setEndingId] = useState<EndingId | null>(null);

  const currentActDef = ACTS[act];

  const onHotspotClick = useCallback((hotspotId: string) => {
    setActiveHotspot(hotspotId);
    setPhase('playing');
  }, []);

  const onVideoEnded = useCallback(() => {
    if (!currentActDef || !activeHotspot) return;
    const def = currentActDef.hotspots.find((h) => h.id === activeHotspot);
    if (!def) return;

    applyMutation(def.mutation, setState, setFlags);
    setVisited((prev) => {
      const next = new Set(prev); next.add(activeHotspot!); return next;
    });
    setActiveHotspot(null);
    if (def.consequenceKey) setLastConsequence(def.consequenceKey);

    // If this hotspot triggers the mid-pivot, divert into the PivotSequence
    // BEFORE auto-advancing. The sequence handles its own onComplete which
    // then advances to the next act.
    if (def.triggersPivot) {
      setFlags((prev) => ({ ...prev, pivotTriggered: true }));
      setPhase('pivot');
      return;
    }

    // ACT 5 final-decision hotspots route into the EpilogueSequence for the
    // chosen ending.
    if (def.triggersEnding) {
      setEndingId(def.triggersEnding);
      setPhase('ending');
      return;
    }

    const nextAct = (def.advanceTo ?? (act + 1)) as Act;
    if (nextAct > 5 || !ACTS[nextAct]) {
      setPhase('done');
      return;
    }
    setAct(nextAct);
    setVisited(new Set());
    setPhase('idle');
  }, [activeHotspot, currentActDef, act]);

  const onEndingComplete = useCallback(() => {
    // Restart the game on tap of the final card
    setEndingId(null);
    setLastConsequence(null);
    setVisited(new Set());
    setExamining(null);
    setActiveHotspot(null);
    setState(INITIAL_STATE);
    setFlags(INITIAL_FLAGS);
    setAct(1);
    setShowPrologue(true);
    setPhase('idle');
  }, []);

  const onPivotComplete = useCallback(() => {
    const nextAct = (act + 1) as Act;
    if (nextAct > 5 || !ACTS[nextAct]) {
      setPhase('done');
      return;
    }
    setAct(nextAct);
    setVisited(new Set());
    setPhase('idle');
  }, [act]);

  const onExamineOpen = useCallback((examineId: string) => {
    setExamining(examineId);
    setPhase('examining');
  }, []);

  const onExamineClose = useCallback(() => {
    setExamining(null);
    setPhase('idle');
  }, []);

  const heroUrl = useMemo(() => stillUrl(currentActDef.hero), [currentActDef]);

  if (showPrologue) {
    return (
      <Prologue
        paragraphs={[
          t('prologue.p1'),
          t('prologue.p2'),
          t('prologue.p3'),
          t('prologue.p4'),
          t('prologue.p5'),
        ]}
        ctaLabel={t('prologue.cta')}
        bgImageSrc={stillUrl('stills/title_act1_bg.png')}
        onDone={() => setShowPrologue(false)}
      />
    );
  }

  return (
    <div className="bd-root">
      <div className="bd-stage">
        <img
          key={`hero-${act}`}
          className="bd-hero"
          src={heroUrl}
          alt=""
          draggable={false}
        />

        {phase === 'playing' && activeHotspot && (() => {
          const def = currentActDef.hotspots.find((h) => h.id === activeHotspot);
          if (!def) return null;
          const poster = def.startFrame ? stillUrl(def.startFrame) : heroUrl;
          const subtitle = def.subtitleKey ? t(def.subtitleKey) : undefined;
          return (
            <VideoStage
              videoSrc={videoUrl(def.video)}
              posterSrc={poster}
              fallbackImg={def.endFrame ? frameUrl(def.endFrame) : heroUrl}
              onEnded={onVideoEnded}
              subtitle={subtitle}
            />
          );
        })()}

        {(phase === 'idle' || phase === 'examining') && (() => {
          // If the previous scene's choice tagged a consequence, prefer the
          // consequence-tagged secondary line for THIS scene's title.
          const base = currentActDef.titleCard.secondaryKey;
          let secondary = t(base);
          if (lastConsequence) {
            const keyed = `${base}.${lastConsequence}`;
            const tk = t(keyed);
            if (tk !== keyed) secondary = tk;
          }
          const examineItems = currentActDef.examines
            .map((eid) => EXAMINES[eid])
            .filter(Boolean)
            .map((def) => ({ id: def.id, shortLabel: t(def.shortKey) }));
          return (
            <SceneTitle
              cycleKey={act}
              primary={t(currentActDef.titleCard.primaryKey)}
              secondary={secondary}
              meta={currentActDef.titleCard.metaKey ? t(currentActDef.titleCard.metaKey) : undefined}
              examines={
                phase === 'idle' && examineItems.length > 0
                  ? <ExamineRow items={examineItems} onPick={onExamineOpen} headLabel={t('ui.docs')} />
                  : undefined
              }
            />
          );
        })()}

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

        {/* Mid-pivot reveal — intro + 5 evidence stills + closing realization */}
        {phase === 'pivot' && (
          <PivotSequence
            introTitle={t('pivot.intro.title')}
            introBody={t('pivot.intro.body')}
            introLabel={t('ui.pivot_remembers')}
            items={PIVOT_STILLS.map((p) => ({
              src: stillUrl(p.src),
              caption: t(p.captionKey),
            }))}
            closingTitle={t('pivot.closing.title')}
            closingBody={t('pivot.closing.body')}
            closingLabel={t('ui.pivot_understands')}
            tapContinueLabel={t('ui.tap_continue')}
            onComplete={onPivotComplete}
          />
        )}

        {/* Ending epilogue */}
        {phase === 'ending' && endingId && (() => {
          const ed = ENDINGS[endingId]; if (!ed) return null;
          return (
            <EpilogueSequence
              endingTitle={t(ed.titleKey)}
              endingTagline={t(ed.taglineKey)}
              endingLabel={t('ui.ending_label')}
              items={ed.epilogueStills.map((s) => ({
                src: stillUrl(s.src),
                caption: t(s.captionKey),
              }))}
              finalCard={t(ed.finalCardKey)}
              brandSig={t('ui.brand_sig')}
              beginAgainLabel={t('ui.tap_begin_again')}
              tapContinueLabel={t('ui.tap_continue')}
              onComplete={onEndingComplete}
            />
          );
        })()}

        {phase === 'done' && (
          <div className="bd-tbc">
            <div className="bd-tbc__inner">
              <div className="bd-tbc__title">{t('tbc.title')}</div>
              <div className="bd-tbc__body">{t('tbc.body')}</div>
              <div className="bd-tbc__note">{t('tbc.note')}</div>
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
