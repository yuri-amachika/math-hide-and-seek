export type StageStep = 'A' | 'B' | 'C';
export type ProblemKind = 'decomposition' | 'addition' | 'subtraction' | 'word';
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
