// The Bidding — 5-act state machine types.

export type Act = 1 | 2 | 3 | 4 | 5;

export type Phase =
  | 'title'        // TitleCard for the current act
  | 'idle'         // showing act hero + hotspots, waiting for player
  | 'examining'    // ExamineCard open (modal)
  | 'playing'      // video playing for a hotspot choice
  | 'pivot'        // PivotSequence active (act 3 only)
  | 'ending'       // EpilogueSequence active
  | 'done';        // post-credits, "play again"

export type EndingId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface BiddingState {
  caution: number;        // 0-100, paranoia / scrutiny
  truthAccepted: number;  // 0-100, post-pivot acceptance that Paula isn't biological
  mercy: number;          // 0-100, empathy toward Andrei / Sophia / Paula
  timeLeft: number;       // minutes, decreasing
}

export type StateMutation = Partial<BiddingState> & {
  // path flags
  mercerLocked?: boolean;
  antonescuPath?: boolean;
  yuriPath?: boolean;
  stefanRefused?: boolean;
  pivotTriggered?: boolean;
};

export interface HotspotDef {
  id: string;
  // bounding box on the act hero (% of container)
  top: number; left: number; width: number; height: number;
  // affordance pin position within the bbox (% of bbox)
  pinX?: number; pinY?: number;
  // direction the label flows from the pin (default 'right')
  labelDir?: 'right' | 'left' | 'up' | 'down';
  labelKey: string;       // i18n key for choice label
  // pre-beat start frame: shown for ~200ms before video plays (snap-cut).
  // Required when the beat's opening state ≠ hero composition.
  // See feedback_fmv_5s_one_beat.md "compositional-gap rule".
  startFrame?: string;    // filename in /public/stills/
  video: string;          // filename in /public/videos/
  endFrame?: string;      // filename in /public/stills/ (also fallback if video fails)
  mutation: StateMutation;
  unlockIf?: (state: BiddingState, flags: Flags) => boolean;
  // After this hotspot's video plays, advance to this act number.
  // If omitted, defaults to currentAct + 1.
  // If next act has no asset, engine stays put and shows end-of-pilot stub.
  advanceTo?: Act;
  // Narrative consequence tag. Looked up in i18n as
  //   `title.act{act+1}.secondary.{consequenceKey}` for the next scene's
  // secondary line — makes the cause-and-effect of this choice visible.
  consequenceKey?: string;
  // If true, after this hotspot's video ends the engine plays the MID-PIVOT
  // reveal sequence (PivotSequence primitive) BEFORE advancing to next act.
  triggersPivot?: boolean;
  // For ACT 5 final-decision hotspots: when set, after the video ends the
  // engine routes into the EpilogueSequence for this ending id (A-F).
  triggersEnding?: EndingId;
}

export interface PivotStillDef {
  src: string;
  captionKey: string;
}

export interface Flags {
  mercerLocked: boolean;
  antonescuPath: boolean;
  yuriPath: boolean;
  stefanRefused: boolean;
  pivotTriggered: boolean;
}

export interface ExamineDef {
  id: string;
  src: string;            // filename in /public/stills/
  captionKey: string;     // longer caption shown beneath the expanded image
  shortKey: string;       // short label shown in the inline ExamineRow
  unlockedInActs: Act[];
}

export interface ActDef {
  id: Act;
  titleCard: {
    primaryKey: string;
    secondaryKey: string;
    metaKey?: string;
    bgStill?: string;     // /public/stills/ filename, optional
  };
  hero: string;           // /public/hero_actN.png filename or 'hero.png' for ACT 1
  hotspots: HotspotDef[];
  examines: string[];     // examine IDs available in this act
}

export interface EndingDef {
  id: EndingId;
  titleKey: string;
  taglineKey: string;
  epilogueStills: { src: string; captionKey: string }[];
  finalCardKey: string;
}
