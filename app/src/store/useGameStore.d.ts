import { StoreApi } from 'zustand';
import { GameStateSnapshot, GridCell, Problem, StageStep } from '../types/game';
interface GameStoreState {
    cells: GridCell[];
    problemMap: Record<string, Problem>;
    activeCellId: number | null;
    currentProblem: Problem | null;
    stageStep: StageStep;
    isLocked: boolean;
    completedCells: number;
    lastResult: 'correct' | 'incorrect' | null;
    selectCell: (id: number) => void;
    markResult: (result: 'correct' | 'incorrect') => void;
    resetActive: () => void;
    snapshot: () => GameStateSnapshot;
}
export type { GameStoreState };
export declare const useGameStore: import("zustand").UseBoundStore<StoreApi<GameStoreState>>;
