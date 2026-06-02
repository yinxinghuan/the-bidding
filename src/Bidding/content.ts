// The Bidding — declarative act content. ACT 1 only for the pilot batch.
// Each hotspot is (videoToPlay, stateMutation). Engine reads this and dispatches.

import type { ActDef, ExamineDef, EndingDef } from './types';

export const EXAMINES: Record<string, ExamineDef> = {
  // ACT 1
  e1: { id: 'e1', src: 'stills/exam_e1_appointment_list.png', captionKey: 'exam.e1', unlockedInActs: [1] },
  e2: { id: 'e2', src: 'stills/exam_e2_paula_ecg.png',        captionKey: 'exam.e2', unlockedInActs: [1] },
  e3: { id: 'e3', src: 'stills/exam_e3_payment.png',          captionKey: 'exam.e3', unlockedInActs: [1] },
  e4: { id: 'e4', src: 'stills/exam_e4_paula_sleeping.png',   captionKey: 'exam.e4', unlockedInActs: [1] },
  // ACT 2 — Mercer's documents on the table
  e5: { id: 'e5', src: 'stills/exam_e5_mercer_license.png',   captionKey: 'exam.e5', unlockedInActs: [2] },
  e6: { id: 'e6', src: 'stills/exam_e6_hungarian_donor.png',  captionKey: 'exam.e6', unlockedInActs: [2] },
  e7: { id: 'e7', src: 'stills/exam_e7_sibiu_clinic.png',     captionKey: 'exam.e7', unlockedInActs: [2] },
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
        // bedroom door (back-left of frame). Label flows DOWN so it doesn't
        // collide with the bedroom interior visible behind the pin.
        top: 35, left: 60, width: 1, height: 1,
        pinX: 50, pinY: 50,
        labelDir: 'down',
        labelKey: 'hot.act1.h1',
        video: 'act1_h1_hide.mp4',
        endFrame: 'end_act1_h1_hidden.png',
        mutation: { caution: +10, mercy: +5 },
      },
      {
        id: 'act1_h2',
        // Paula's chair area / bedroom interior. Label LEFT to clear Elena.
        top: 55, left: 65, width: 1, height: 1,
        pinX: 50, pinY: 50,
        labelDir: 'left',
        labelKey: 'hot.act1.h2',
        startFrame: 'stills/start_act1_h2_at_chair.png',
        video: 'act1_h2_dress.mp4',
        endFrame: 'end_act1_h2_dressed.png',
        mutation: { caution: -5, mercy: -5 },
      },
      {
        id: 'act1_h3',
        // door crack zone (lower mid). Label RIGHT.
        top: 75, left: 35, width: 1, height: 1,
        pinX: 50, pinY: 50,
        labelDir: 'right',
        labelKey: 'hot.act1.h3',
        startFrame: 'stills/start_act1_h3_at_door.png',
        video: 'act1_h3_glimpse.mp4',
        endFrame: 'end_act1_h3_glimpse.png',
        mutation: {},
      },
    ],
    examines: ['e1', 'e2', 'e3', 'e4'],
  },

  2: {
    id: 2,
    titleCard: {
      primaryKey: 'title.act2.primary',
      secondaryKey: 'title.act2.secondary',
      metaKey: 'title.act2.meta',
      bgStill: 'stills/title_act1_bg.png',
    },
    hero: 'hero_act2.png',
    hotspots: [
      {
        id: 'act2_h4',
        // Elena's hands at the table center → "ring" choice
        top: 70, left: 50, width: 1, height: 1,
        pinX: 50, pinY: 50,
        labelDir: 'down',
        labelKey: 'hot.act2.h4',
        video: 'act2_h4_agree.mp4',
        endFrame: 'end_act2_h4_agree.png',
        mutation: { caution: -15, mercerLocked: true },
      },
      {
        id: 'act2_h5',
        // Elena's body / her chair → "wait" choice. Label flows RIGHT.
        top: 45, left: 25, width: 1, height: 1,
        pinX: 50, pinY: 50,
        labelDir: 'right',
        labelKey: 'hot.act2.h5',
        video: 'act2_h5_wait.mp4',
        endFrame: 'end_act2_h5_wait.png',
        mutation: { caution: +5, timeLeft: -15 },
      },
      {
        id: 'act2_h6',
        // Mercer's face → "probe" choice. Label flows LEFT (Mercer is at right edge).
        top: 40, left: 78, width: 1, height: 1,
        pinX: 50, pinY: 50,
        labelDir: 'left',
        labelKey: 'hot.act2.h6',
        video: 'act2_h6_probe.mp4',
        endFrame: 'end_act2_h6_probe.png',
        mutation: { caution: +25, mercy: +10 },
      },
    ],
    examines: ['e5', 'e6', 'e7'],
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
