import { GridCell } from '../types/game';
interface MonsterSpriteProps {
    cells: GridCell[];
    targetCellId: number;
    onArrive: () => void;
}
export declare const MonsterSprite: ({ cells, targetCellId, onArrive }: MonsterSpriteProps) => import("react/jsx-runtime").JSX.Element;
export {};
