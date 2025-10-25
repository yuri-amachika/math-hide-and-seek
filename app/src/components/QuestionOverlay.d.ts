import { Problem } from '../types/game';
interface QuestionOverlayProps {
    problem: Problem | null;
    visible: boolean;
    onSubmit: (isCorrect: boolean) => void;
    onClose: () => void;
}
export declare const QuestionOverlay: ({ problem, visible, onSubmit, onClose }: QuestionOverlayProps) => import("react/jsx-runtime").JSX.Element;
export {};
