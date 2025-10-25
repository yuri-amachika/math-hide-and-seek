import { create } from 'zustand';
import { createInitialBlueprint } from '../data/problems';
const blueprint = createInitialBlueprint();
const store = (set, get) => ({
    cells: blueprint.cells,
    problemMap: blueprint.problemMap,
    activeCellId: null,
    currentProblem: null,
    stageStep: 'A',
    isLocked: false,
    completedCells: 0,
    lastResult: null,
    selectCell: (id) => {
        const state = get();
        if (state.isLocked) {
            return;
        }
        const target = state.cells.find((cell) => cell.id === id);
        if (!target || target.status === 'solved') {
            return;
        }
        set((prev) => {
            const nextCells = prev.cells.map((cell) => cell.id === id ? { ...cell, status: 'active' } : cell);
            return {
                ...prev,
                cells: nextCells,
                activeCellId: id,
                currentProblem: prev.problemMap[target.problemId],
                isLocked: true,
                lastResult: null
            };
        });
    },
    markResult: (result) => {
        const state = get();
        const { activeCellId } = state;
        if (activeCellId == null) {
            return;
        }
        set((prev) => {
            const nextCells = prev.cells.map((cell) => {
                if (cell.id !== activeCellId) {
                    return cell;
                }
                const status = result === 'correct' ? 'solved' : 'idle';
                return { ...cell, status };
            });
            return {
                ...prev,
                cells: nextCells,
                completedCells: result === 'correct' ? prev.completedCells + 1 : prev.completedCells,
                activeCellId: null,
                currentProblem: null,
                isLocked: false,
                lastResult: result
            };
        });
    },
    resetActive: () => {
        const state = get();
        const { activeCellId } = state;
        if (activeCellId == null) {
            return;
        }
        set((prev) => {
            const nextCells = prev.cells.map((cell) => cell.id === activeCellId ? { ...cell, status: 'idle' } : cell);
            return {
                ...prev,
                cells: nextCells,
                activeCellId: null,
                currentProblem: null,
                isLocked: false
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
    }
});
export const useGameStore = create(store);
