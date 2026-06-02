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
  labelKey: string;       // i18n key for choice label
  video: string;          // filename in /public/videos/
  endFrame?: string;      // filename in /public/stills/ (fallback if video fails)
  mutation: StateMutation;
  unlockIf?: (state: BiddingState, flags: Flags) => boolean;
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
  captionKey: string;
  unlockedInActs: Act[];  // which acts this card is examinable in
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
  // predicate over the final state + flags
  matches: (state: BiddingState, flags: Flags) => boolean;
  video: string;          // ending video filename
  epilogueStills: { src: string; captionKey: string }[];
}
