import { GridCell } from '../types/game';
interface NumberGridProps {
    cells: GridCell[];
    isLocked: boolean;
    onSelect: (cellId: number) => void;
}
export declare const NumberGrid: import("react").MemoExoticComponent<({ cells, isLocked, onSelect }: NumberGridProps) => import("react/jsx-runtime").JSX.Element>;
export {};
