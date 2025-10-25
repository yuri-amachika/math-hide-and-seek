export type StageStep = 'A' | 'B' | 'C';

export type ProblemKind = 'decomposition' | 'addition' | 'subtraction' | 'word';

export type NumberLineVisual = {
  type: 'numberLine';
  start: number;
  end: number;
  pointerStart: number;
  pointerTarget: number;
  mode: 'addition' | 'subtraction';
  labelLeft?: string;
  labelRight?: string;
};

export type TenFrameGroup = {
  title: string;
  filled: number;
  total?: number;
};

export type TenFrameVisual = {
  type: 'tenFrame';
  frames: TenFrameGroup[];
};

export type StoryGroup = {
  label: string;
  count: number;
  color: string;
  icon?: string;
};

export type StoryVisual = {
  type: 'story';
  groups: StoryGroup[];
  caption?: string;
};

export type ProblemVisual = NumberLineVisual | TenFrameVisual | StoryVisual;

export interface Problem {
  id: string;
  step: StageStep;
  kind: ProblemKind;
  prompt: string;
  question: string;
  answer: number;
  total?: number;
  knownPart?: number;
  secondaryPrompt?: string;
  contextImage?: string;
  visual?: ProblemVisual;
}

export type CellStatus = 'idle' | 'active' | 'solved';

export interface GridCell {
  id: number;
  row: number;
  col: number;
  status: CellStatus;
  problemId: string;
}

export interface GameStateSnapshot {
  cells: GridCell[];
  activeCellId: number | null;
  stageStep: StageStep;
  completedCells: number;
}
