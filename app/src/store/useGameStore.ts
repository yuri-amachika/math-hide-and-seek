import { create, StateCreator, StoreApi } from 'zustand';
import { createInitialBlueprint } from '../data/problems';
import { CellStatus, GameStateSnapshot, GridCell, HintLevel, Problem, StageStep } from '../types/game';

interface GameStoreState {
  cells: GridCell[];
  problemMap: Record<string, Problem>;
  activeCellId: number | null;
  currentProblem: Problem | null;
  stageStep: StageStep;
  isLocked: boolean;
  completedCells: number;
  lastResult: 'correct' | 'incorrect' | null;
  phase: GamePhase;
  stageProgress: StageProgressMap;
  hintLevel: HintLevel;
  sessionStartTime: number | null;
  sessionDuration: number;
  selectCell: (id: number) => void;
  beginSolving: () => void;
  markResult: (result: 'correct' | 'incorrect') => void;
  resetActive: () => void;
  snapshot: () => GameStateSnapshot;
  getSessionElapsed: () => number;
  isSessionExpired: () => boolean;
}

const blueprint = createInitialBlueprint();

const STAGE_SEQUENCE: StageStep[] = ['A', 'B', 'C'];
const SESSION_LIMIT_MS = 15 * 60 * 1000; // 15 minutes

type GamePhase = 'idle' | 'selecting' | 'solving' | 'resolving' | 'feedback';

type StageProgress = {
  solved: number;
  total: number;
};

type StageProgressMap = Record<StageStep, StageProgress>;

const buildInitialStageProgress = (): StageProgressMap => {
  const counts = STAGE_SEQUENCE.reduce<StageProgressMap>((acc, step) => {
    acc[step] = { solved: 0, total: 0 };
    return acc;
  }, {} as StageProgressMap);

  for (const cell of blueprint.cells) {
    const problem = blueprint.problemMap[cell.problemId];
    if (problem) {
      counts[problem.step].total += 1;
    }
  }

  return counts;
};

const determineNextStage = (progress: StageProgressMap): StageStep => {
  for (const step of STAGE_SEQUENCE) {
    const { solved, total } = progress[step];
    if (total === 0) {
      continue;
    }
    if (solved < total) {
      return step;
    }
  }
  return STAGE_SEQUENCE[STAGE_SEQUENCE.length - 1];
};


export type { GameStoreState };
type GameStoreApi = StoreApi<GameStoreState>;

const store: StateCreator<GameStoreState, [], []> = (
  set: GameStoreApi['setState'],
  get: GameStoreApi['getState']
) => ({
  cells: blueprint.cells,
  problemMap: blueprint.problemMap,
  activeCellId: null,
  currentProblem: null,
  stageStep: 'A',
  isLocked: false,
  completedCells: 0,
  lastResult: null,
  phase: 'idle',
  stageProgress: buildInitialStageProgress(),
  hintLevel: 1,
  sessionStartTime: Date.now(),
  sessionDuration: SESSION_LIMIT_MS,

  selectCell: (id: number) => {
    const state = get();
    if (state.isLocked || state.phase !== 'idle') {
      return;
    }
    const target = state.cells.find((cell: GridCell) => cell.id === id);
    if (!target || target.status === 'solved') {
      return;
    }

    set((prev: GameStoreState) => {
      const nextCells = prev.cells.map((cell) =>
        cell.id === id ? { ...cell, status: 'active' as CellStatus } : cell
      );

      return {
        ...prev,
        cells: nextCells,
        activeCellId: id,
        currentProblem: prev.problemMap[target.problemId],
        isLocked: true,
        lastResult: null,
        phase: 'selecting',
        hintLevel: 1
      };
    });
  },

  beginSolving: () => {
    const state = get();
    if (!state.isLocked || state.phase !== 'selecting') {
      return;
    }

    set((prev: GameStoreState) => ({
      ...prev,
      phase: 'solving'
    }));
  },

  markResult: (result: 'correct' | 'incorrect') => {
    const state = get();
    const { activeCellId } = state;
    if (activeCellId == null) {
      return;
    }

    set((prev: GameStoreState) => {
      const nextCells = prev.cells.map((cell) => {
        if (cell.id !== activeCellId) {
          return cell;
        }
        const status: CellStatus = result === 'correct' ? 'solved' : 'idle';
        return { ...cell, status };
      });

      let nextStageProgress = prev.stageProgress;
      let nextStageStep = prev.stageStep;
      let nextHintLevel: HintLevel = 1;

      if (result === 'correct' && prev.currentProblem) {
        const problemStep = prev.currentProblem.step;
        const progressSnapshot = {
          ...prev.stageProgress,
          [problemStep]: {
            ...prev.stageProgress[problemStep],
            solved: Math.min(
              prev.stageProgress[problemStep].solved + 1,
              prev.stageProgress[problemStep].total
            )
          }
        } as StageProgressMap;

        nextStageProgress = progressSnapshot;
        nextStageStep = determineNextStage(progressSnapshot);
      } else if (result === 'incorrect') {
        const incremented = prev.hintLevel + 1;
        nextHintLevel = (incremented > 3 ? 3 : incremented) as HintLevel;
      }

      return {
        ...prev,
        cells: nextCells,
        completedCells: result === 'correct' ? prev.completedCells + 1 : prev.completedCells,
        activeCellId: null,
        currentProblem: null,
        isLocked: false,
        lastResult: result,
        phase: result === 'correct' ? 'resolving' : 'feedback',
        stageProgress: nextStageProgress,
        stageStep: nextStageStep,
        hintLevel: nextHintLevel
      };
    });
  },

  resetActive: () => {
    set((prev: GameStoreState) => {
      const { activeCellId } = prev;
      const nextCells = activeCellId
        ? prev.cells.map((cell) =>
            cell.id === activeCellId ? { ...cell, status: 'idle' as CellStatus } : cell
          )
        : prev.cells;

      return {
        ...prev,
        cells: nextCells,
        activeCellId: null,
        currentProblem: null,
        isLocked: false,
        phase: 'idle',
        hintLevel: 1
      };
    });
  },

  snapshot: () => {
    const state = get();
    return {
      cells: state.cells,
      activeCellId: state.activeCellId,
      stageStep: state.stageStep,
      completedCells: state.completedCells
    };
  },

  getSessionElapsed: () => {
    const state = get();
    if (!state.sessionStartTime) return 0;
    return Date.now() - state.sessionStartTime;
  },

  isSessionExpired: () => {
    const state = get();
    if (!state.sessionStartTime) return false;
    return Date.now() - state.sessionStartTime >= state.sessionDuration;
  }
});

export const useGameStore = create<GameStoreState>(store);
