import { GridCell, Problem } from '../types/game';
export interface GameBlueprint {
    cells: GridCell[];
    problemMap: Record<string, Problem>;
}
export declare const createInitialBlueprint: () => GameBlueprint;
