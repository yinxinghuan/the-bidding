// The Bidding — declarative act content. ACT 1 only for the pilot batch.
// Each hotspot is (videoToPlay, stateMutation). Engine reads this and dispatches.

import type { ActDef, ExamineDef, EndingDef } from './types';

export const EXAMINES: Record<string, ExamineDef> = {
  e1: { id: 'e1', src: 'stills/exam_e1_appointment_list.png', captionKey: 'exam.e1', unlockedInActs: [1] },
  e2: { id: 'e2', src: 'stills/exam_e2_paula_ecg.png',        captionKey: 'exam.e2', unlockedInActs: [1] },
  e3: { id: 'e3', src: 'stills/exam_e3_payment.png',          captionKey: 'exam.e3', unlockedInActs: [1] },
  e4: { id: 'e4', src: 'stills/exam_e4_paula_sleeping.png',   captionKey: 'exam.e4', unlockedInActs: [1] },
};

export const ACTS: Record<number, ActDef> = {
  1: {
    id: 1,
    titleCard: {
      primaryKey: 'title.act1.primary',
      secondaryKey: 'title.act1.secondary',
      metaKey: 'title.act1.meta',
      bgStill: 'stills/title_act1_bg.png',
    },
    hero: 'hero.png',
    hotspots: [
      {
        id: 'act1_h1',
        // bedroom door area (in the hero, the door is to the LEFT/center-back). approximate.
        top: 30, left: 8, width: 25, height: 45,
        pinX: 60, pinY: 40,
        labelKey: 'hot.act1.h1',
        video: 'act1_h1_hide.mp4',
        endFrame: 'end_act1_h1_hidden.png',
        mutation: { caution: +10, mercy: +5 },
      },
      {
        id: 'act1_h2',
        // Paula's chair area / bedroom interior
        top: 40, left: 35, width: 30, height: 35,
        pinX: 50, pinY: 60,
        labelKey: 'hot.act1.h2',
        video: 'act1_h2_dress.mp4',
        endFrame: 'end_act1_h2_dressed.png',
        mutation: { caution: -5, mercy: -5 },
      },
      {
        id: 'act1_h3',
        // the door crack (between two positions)
        top: 30, left: 8, width: 50, height: 22,
        pinX: 30, pinY: 50,
        labelKey: 'hot.act1.h3',
        video: 'act1_h3_glimpse.mp4',
        endFrame: 'end_act1_h3_glimpse.png',
        mutation: {},
      },
    ],
    examines: ['e1', 'e2', 'e3', 'e4'],
  },
};

export const ENDINGS: Record<string, EndingDef> = {};  // populated in ACT 5 batch

// State init
export const INITIAL_STATE = {
  caution: 0,
  truthAccepted: 0,
  mercy: 0,
  timeLeft: 300,
};

export const INITIAL_FLAGS = {
  mercerLocked: false,
  antonescuPath: false,
  yuriPath: false,
  stefanRefused: false,
  pivotTriggered: false,
};
