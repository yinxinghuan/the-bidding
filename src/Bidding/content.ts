// The Bidding — declarative act content. ACT 1 only for the pilot batch.
// Each hotspot is (videoToPlay, stateMutation). Engine reads this and dispatches.

import type { ActDef, ExamineDef, EndingDef, PivotStillDef } from './types';

export const EXAMINES: Record<string, ExamineDef> = {
  // ACT 1
  e1: { id: 'e1', src: 'stills/exam_e1_appointment_list.png', captionKey: 'exam.e1', shortKey: 'short.e1', unlockedInActs: [1] },
  e2: { id: 'e2', src: 'stills/exam_e2_paula_ecg.png',        captionKey: 'exam.e2', shortKey: 'short.e2', unlockedInActs: [1] },
  e3: { id: 'e3', src: 'stills/exam_e3_payment.png',          captionKey: 'exam.e3', shortKey: 'short.e3', unlockedInActs: [1] },
  e4: { id: 'e4', src: 'stills/exam_e4_paula_sleeping.png',   captionKey: 'exam.e4', shortKey: 'short.e4', unlockedInActs: [1] },
  // ACT 2 — Mercer's documents on the table
  e5: { id: 'e5', src: 'stills/exam_e5_mercer_license.png',   captionKey: 'exam.e5', shortKey: 'short.e5', unlockedInActs: [2] },
  e6: { id: 'e6', src: 'stills/exam_e6_hungarian_donor.png',  captionKey: 'exam.e6', shortKey: 'short.e6', unlockedInActs: [2] },
  e7: { id: 'e7', src: 'stills/exam_e7_sibiu_clinic.png',     captionKey: 'exam.e7', shortKey: 'short.e7', unlockedInActs: [2] },
  // ACT 3 — Antonescu's documents
  e8: { id: 'e8', src: 'stills/exam_e8_securitate_list.png',  captionKey: 'exam.e8', shortKey: 'short.e8', unlockedInActs: [3] },
  e9: { id: 'e9', src: 'stills/exam_e9_andrei_school_photo.png', captionKey: 'exam.e9', shortKey: 'short.e9', unlockedInActs: [3] },
  e10:{ id: 'e10',src: 'stills/exam_e10_antonescu_card.png',  captionKey: 'exam.e10',shortKey: 'short.e10',unlockedInActs: [3] },
  // ACT 4 — Stefan's Vance family file
  e11:{ id: 'e11',src: 'stills/exam_e11_vance_family.png',    captionKey: 'exam.e11',shortKey: 'short.e11',unlockedInActs: [4] },
  e12:{ id: 'e12',src: 'stills/exam_e12_sophia_recent.png',   captionKey: 'exam.e12',shortKey: 'short.e12',unlockedInActs: [4] },
  e13:{ id: 'e13',src: 'stills/exam_e13_adoption_papers.png', captionKey: 'exam.e13',shortKey: 'short.e13',unlockedInActs: [4] },
};

// ─── Mid-pivot reveal sequence (after any ACT 3 choice) ──────────────────
export const PIVOT_STILLS: PivotStillDef[] = [
  { src: 'stills/pivot_r1_polizu_id.png',       captionKey: 'pivot.r1' },
  { src: 'stills/pivot_r2_hospital_photo.png',  captionKey: 'pivot.r2' },
  { src: 'stills/pivot_r3_medical_chart.png',   captionKey: 'pivot.r3' },
  { src: 'stills/pivot_r4_stefan_letter.png',   captionKey: 'pivot.r4' },
  { src: 'stills/pivot_r5_birth_registry.png',  captionKey: 'pivot.r5' },
];

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
        top: 35, left: 60, width: 1, height: 1,
        pinX: 50, pinY: 50,
        labelDir: 'down',
        labelKey: 'hot.act1.h1',
        video: 'act1_h1_hide.mp4',
        endFrame: 'end_act1_h1_hidden.png',
        mutation: { caution: +10, mercy: +5 },
        consequenceKey: 'hidden',     // → title.act2.secondary.hidden
      },
      {
        id: 'act1_h2',
        top: 55, left: 65, width: 1, height: 1,
        pinX: 50, pinY: 50,
        labelDir: 'left',
        labelKey: 'hot.act1.h2',
        startFrame: 'stills/start_act1_h2_at_chair.png',
        video: 'act1_h2_dress.mp4',
        endFrame: 'end_act1_h2_dressed.png',
        mutation: { caution: -5, mercy: -5 },
        consequenceKey: 'seated',     // → title.act2.secondary.seated
      },
      {
        id: 'act1_h3',
        top: 75, left: 35, width: 1, height: 1,
        pinX: 50, pinY: 50,
        labelDir: 'right',
        labelKey: 'hot.act1.h3',
        startFrame: 'stills/start_act1_h3_at_door.png',
        video: 'act1_h3_glimpse.mp4',
        endFrame: 'end_act1_h3_glimpse.png',
        mutation: {},
        consequenceKey: 'glimpse',    // → title.act2.secondary.glimpse
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

  3: {
    id: 3,
    titleCard: {
      primaryKey: 'title.act3.primary',
      secondaryKey: 'title.act3.secondary',
      metaKey: 'title.act3.meta',
    },
    hero: 'hero_act3.png',
    hotspots: [
      {
        id: 'act3_h7',
        // Antonescu's coat pocket — where the photo will fall from
        top: 50, left: 78, width: 1, height: 1,
        pinX: 50, pinY: 50,
        labelDir: 'left',
        labelKey: 'hot.act3.h7',
        video: 'act3_h7_refuse.mp4',
        endFrame: 'end_act3_h7_refuse.png',
        mutation: { mercy: +30, caution: +10 },
        triggersPivot: true,
      },
      {
        id: 'act3_h8',
        // The Securitate page on the table
        top: 70, left: 50, width: 1, height: 1,
        pinX: 50, pinY: 50,
        labelDir: 'down',
        labelKey: 'hot.act3.h8',
        video: 'act3_h8_sign.mp4',
        endFrame: 'end_act3_h8_sign.png',
        mutation: { caution: -15, truthAccepted: +10 },
        triggersPivot: true,
      },
      {
        id: 'act3_h9',
        // Elena's body / her side
        top: 45, left: 25, width: 1, height: 1,
        pinX: 50, pinY: 50,
        labelDir: 'right',
        labelKey: 'hot.act3.h9',
        video: 'act3_h9_counter.mp4',
        endFrame: 'end_act3_h9_counter.png',
        mutation: { caution: +25, mercy: -10 },
        triggersPivot: true,
      },
    ],
    examines: ['e8', 'e9', 'e10'],
  },

  4: {
    id: 4,
    titleCard: {
      primaryKey: 'title.act4.primary',
      secondaryKey: 'title.act4.secondary',
      metaKey: 'title.act4.meta',
    },
    hero: 'hero_act4.png',
    hotspots: [
      {
        id: 'act4_h13',
        // door of the apartment (offscreen left) — Elena pointing there
        top: 50, left: 12, width: 1, height: 1,
        pinX: 50, pinY: 50,
        labelDir: 'right',
        labelKey: 'hot.act4.h13',
        video: 'act4_h13_push.mp4',
        endFrame: 'end_act4_h13_push.png',
        mutation: { truthAccepted: -30, mercy: -20 },
      },
      {
        id: 'act4_h14',
        // the manila folder on the table
        top: 68, left: 50, width: 1, height: 1,
        pinX: 50, pinY: 50,
        labelDir: 'down',
        labelKey: 'hot.act4.h14',
        video: 'act4_h14_folder.mp4',
        endFrame: 'end_act4_h14_folder.png',
        mutation: { truthAccepted: +20 },
      },
      {
        id: 'act4_h15',
        // Stefan's face — Elena leans in to ask
        top: 45, left: 78, width: 1, height: 1,
        pinX: 50, pinY: 50,
        labelDir: 'left',
        labelKey: 'hot.act4.h15',
        video: 'act4_h15_ask.mp4',
        endFrame: 'end_act4_h15_ask.png',
        mutation: { truthAccepted: +25, mercy: +15 },
      },
      {
        id: 'act4_h16',
        // Elena's own body — declaring the truth
        top: 38, left: 32, width: 1, height: 1,
        pinX: 50, pinY: 50,
        labelDir: 'right',
        labelKey: 'hot.act4.h16',
        video: 'act4_h16_declare.mp4',
        endFrame: 'end_act4_h16_declare.png',
        mutation: { truthAccepted: +40, mercy: +30, stefanRefused: true },
      },
    ],
    examines: ['e11', 'e12', 'e13'],
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
