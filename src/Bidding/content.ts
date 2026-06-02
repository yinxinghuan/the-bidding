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
        subtitleKey: 'sub.act2.h6',
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
        subtitleKey: 'sub.act4.h15',
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
        subtitleKey: 'sub.act4.h16',
      },
    ],
    examines: ['e11', 'e12', 'e13'],
  },

  5: {
    id: 5,
    titleCard: {
      primaryKey: 'title.act5.primary',
      secondaryKey: 'title.act5.secondary',
      metaKey: 'title.act5.meta',
    },
    hero: 'hero_act5.png',
    hotspots: [
      {
        id: 'act5_h20',
        // Mercer's card position
        top: 70, left: 30, width: 1, height: 1,
        pinX: 50, pinY: 50,
        labelDir: 'right',
        labelKey: 'hot.act5.h20',
        video: 'act5_h20_mercer.mp4',
        endFrame: 'end_act5_h20_mercer.png',
        mutation: {},
        triggersEnding: 'F',  // Mercer → the replacement
      },
      {
        id: 'act5_h21',
        top: 75, left: 45, width: 1, height: 1,
        pinX: 50, pinY: 50,
        labelDir: 'up',
        labelKey: 'hot.act5.h21',
        video: 'act5_h21_antonescu.mp4',
        endFrame: 'end_act5_h21_antonescu.png',
        mutation: {},
        triggersEnding: 'A',  // Antonescu → saved with cost
      },
      {
        id: 'act5_h22',
        top: 80, left: 60, width: 1, height: 1,
        pinX: 50, pinY: 50,
        labelDir: 'left',
        labelKey: 'hot.act5.h22',
        video: 'act5_h22_yuri.mp4',
        endFrame: 'end_act5_h22_yuri.png',
        mutation: {},
        triggersEnding: 'C',  // Yuri → lost both
      },
      {
        id: 'act5_h23',
        top: 70, left: 75, width: 1, height: 1,
        pinX: 50, pinY: 50,
        labelDir: 'left',
        labelKey: 'hot.act5.h23',
        video: 'act5_h23_stefan.mp4',
        endFrame: 'end_act5_h23_stefan.png',
        mutation: {},
        triggersEnding: 'B',  // Stefan → Vance family
      },
      {
        id: 'act5_h24',
        // Paula's body — the choice to stop
        top: 32, left: 50, width: 1, height: 1,
        pinX: 50, pinY: 50,
        labelDir: 'down',
        labelKey: 'hot.act5.h24',
        video: 'act5_h24_stay.mp4',
        endFrame: 'end_act5_h24_stay.png',
        mutation: {},
        triggersEnding: 'D',  // refuse → the mother who knew
      },
      {
        id: 'act5_h25',
        // the 070-01 paper
        top: 60, left: 22, width: 1, height: 1,
        pinX: 50, pinY: 50,
        labelDir: 'right',
        labelKey: 'hot.act5.h25',
        video: 'act5_h25_police.mp4',
        endFrame: 'end_act5_h25_police.png',
        mutation: {},
        triggersEnding: 'E',  // 070-01 → police
      },
    ],
    examines: [],   // no documents in the climax — Elena has them all already
  },
};

export const ENDINGS: Record<string, EndingDef> = {
  A: {
    id: 'A',
    titleKey: 'ending.A.title',
    taglineKey: 'ending.A.tagline',
    epilogueStills: [
      { src: 'stills/epi_a1_paula_icu.png',       captionKey: 'epi.a1' },
      { src: 'stills/epi_a2_andrei_missing.png',  captionKey: 'epi.a2' },
      { src: 'stills/epi_a3_mother_stairwell.png',captionKey: 'epi.a3' },
      { src: 'stills/epi_a4_library_drawer.png',  captionKey: 'epi.a4' },
    ],
    finalCardKey: 'ending.A.final',
  },
  B: {
    id: 'B',
    titleKey: 'ending.B.title',
    taglineKey: 'ending.B.tagline',
    epilogueStills: [
      { src: 'stills/epi_b1_lax_arrivals.png',      captionKey: 'epi.b1' },
      { src: 'stills/epi_b2_carmel_yard.png',       captionKey: 'epi.b2' },
      { src: 'stills/epi_b3_elena_kitchen_empty.png',captionKey: 'epi.b3' },
      { src: 'stills/epi_b4_paula_la_bookstore.png', captionKey: 'epi.b4' },
    ],
    finalCardKey: 'ending.B.final',
  },
  C: {
    id: 'C',
    titleKey: 'ending.C.title',
    taglineKey: 'ending.C.tagline',
    epilogueStills: [
      { src: 'stills/epi_c1_vasilenko_basement.png',captionKey: 'epi.c1' },
      { src: 'stills/epi_c2_belu_grave.png',        captionKey: 'epi.c2' },
      { src: 'stills/epi_c3_carmel_street.png',     captionKey: 'epi.c3' },
      { src: 'stills/epi_c4_elena_library_alone.png',captionKey: 'epi.c4' },
    ],
    finalCardKey: 'ending.C.final',
  },
  D: {
    id: 'D',
    titleKey: 'ending.D.title',
    taglineKey: 'ending.D.tagline',
    epilogueStills: [
      { src: 'stills/epi_d1_paula_arms.png',  captionKey: 'epi.d1' },
      { src: 'stills/epi_d2_monitor_flat.png',captionKey: 'epi.d2' },
      { src: 'stills/epi_d3_belu_grave_2.png',captionKey: 'epi.d3' },
      { src: 'stills/epi_d4_elena_2010.png',  captionKey: 'epi.d4' },
    ],
    finalCardKey: 'ending.D.final',
  },
  E: {
    id: 'E',
    titleKey: 'ending.E.title',
    taglineKey: 'ending.E.tagline',
    epilogueStills: [
      { src: 'stills/epi_e1_police_lights.png',  captionKey: 'epi.e1' },
      { src: 'stills/epi_e2_arrest_headline.png',captionKey: 'epi.e2' },
      { src: 'stills/epi_e3_andrei_apartment.png',captionKey: 'epi.e3' },
      { src: 'stills/epi_e4_paula_grave_3.png',  captionKey: 'epi.e4' },
    ],
    finalCardKey: 'ending.E.final',
  },
  F: {
    id: 'F',
    titleKey: 'ending.F.title',
    taglineKey: 'ending.F.tagline',
    epilogueStills: [
      { src: 'stills/epi_f1_sibiu_clinic_ext.png',captionKey: 'epi.f1' },
      { src: 'stills/epi_f2_paula_smock.png',     captionKey: 'epi.f2' },
      { src: 'stills/epi_f3_donor_document.png',  captionKey: 'epi.f3' },
      { src: 'stills/epi_f4_sibiu_demolition.png',captionKey: 'epi.f4' },
    ],
    finalCardKey: 'ending.F.final',
  },
};

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
