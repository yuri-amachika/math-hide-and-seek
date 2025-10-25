import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { useGameStore } from '../store/useGameStore';
const stepLabels = {
    A: 'ステップA いくつといくつ',
    B: 'ステップB くり上がり/くり下がりなし',
    C: 'ステップC くり下がりと文章題'
};
export const HudPanel = ({ totalCells }) => {
    const { completedCells, stageStep, lastResult } = useGameStore((state) => ({
        completedCells: state.completedCells,
        stageStep: state.stageStep,
        lastResult: state.lastResult
    }));
    const progress = useMemo(() => {
        if (totalCells === 0) {
            return 0;
        }
        return Math.round((completedCells / totalCells) * 100);
    }, [completedCells, totalCells]);
    return (_jsxs("aside", { className: "hud-panel", children: [_jsxs("div", { className: "hud-header", children: [_jsxs("div", { children: [_jsx("div", { className: "hud-title", children: "Number Hunter" }), _jsx("div", { children: stepLabels[stageStep] })] }), _jsxs("div", { className: "answer-display", children: [completedCells, "/", totalCells] })] }), _jsx("div", { className: "progress-bar", "aria-hidden": "true", children: _jsx("div", { className: "progress-fill", style: { width: `${progress}%` } }) }), lastResult === 'correct' && (_jsx("div", { className: "feedback-banner feedback-success", children: "\u3088\u304F\u3067\u304D\u305F\u306D\uFF01\u3064\u304E\u306E\u6570\u5B57\u3092\u3055\u304C\u305D\u3046\u3002" })), lastResult === 'incorrect' && (_jsx("div", { className: "feedback-banner feedback-error", children: "\u3082\u3046\u3044\u3061\u3069\u8003\u3048\u3066\u307F\u3088\u3046\u3002\u30D2\u30F3\u30C8\u3092\u3064\u304B\u3063\u3066\u306D\u3002" })), _jsx("p", { children: "\u6570\u5B57\u3092\u30BF\u30C3\u30D7\u3059\u308B\u3068\u602A\u7269\u304C\u304B\u3051\u3064\u3051\u308B\u3088\u3002 \u30AF\u30A4\u30BA\u306B\u6B63\u89E3\u3057\u3066\u3059\u3079\u3066\u306E\u90E8\u5C4B\u3092\u8D64\u304F\u67D3\u3081\u3088\u3046\u3002" })] }));
};
