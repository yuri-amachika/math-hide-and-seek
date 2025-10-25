import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const overlayVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
};
const buildInitialTokens = (problem) => {
    if (!problem || !problem.total) {
        return [];
    }
    const total = problem.total;
    const knownLeft = problem.knownPart ?? 0;
    return Array.from({ length: total }).map((_, index) => (index < knownLeft ? 'left' : 'right'));
};
export const QuestionOverlay = ({ problem, visible, onSubmit, onClose }) => {
    const [answer, setAnswer] = useState('');
    const [tokens, setTokens] = useState(() => buildInitialTokens(problem));
    useEffect(() => {
        setAnswer('');
        setTokens(buildInitialTokens(problem));
    }, [problem]);
    const rightCount = useMemo(() => tokens.filter((token) => token === 'right').length, [tokens]);
    const expectedAnswer = problem?.kind === 'decomposition' ? rightCount : Number(answer || 0);
    const handleDigitPress = (value) => {
        setAnswer((prev) => {
            const next = prev.length >= 2 ? value : `${prev}${value}`;
            return next.replace(/^0+(\d)/, '$1');
        });
    };
    const handleRemove = () => {
        setAnswer((prev) => prev.slice(0, -1));
    };
    const handleClear = () => setAnswer('');
    const handleSubmit = () => {
        if (!problem) {
            return;
        }
        const expected = problem.kind === 'decomposition' ? rightCount : Number(answer);
        const isCorrect = expected === problem.answer;
        onSubmit(isCorrect);
    };
    const updateToken = (index) => {
        setTokens((prev) => prev.map((token, idx) => {
            if (idx !== index)
                return token;
            return token === 'left' ? 'right' : 'left';
        }));
    };
    const instruction = useMemo(() => {
        if (!problem)
            return '';
        if (problem.kind === 'decomposition') {
            return 'おはじきをタッチすると左右が入れかわるよ。右の数がこたえになるよ。';
        }
        if (problem.kind === 'addition') {
            return '数字ボタンをタップして答えを入力しよう。';
        }
        return '絵をイメージしながら数字ボタンで答えよう。';
    }, [problem]);
    return (_jsx(AnimatePresence, { children: visible && problem && (_jsx(motion.div, { className: "overlay-backdrop", initial: "hidden", animate: "visible", exit: "hidden", children: _jsxs(motion.div, { className: "overlay-card", variants: overlayVariants, initial: "hidden", animate: "visible", exit: "hidden", children: [_jsx("div", { className: "overlay-heading", children: problem.prompt }), _jsx("div", { className: "overlay-subtext", children: problem.question }), problem.secondaryPrompt && _jsx("div", { className: "story-note", children: problem.secondaryPrompt }), _jsx("div", { className: "story-note", children: instruction }), problem.kind === 'decomposition' && (_jsxs("div", { className: "token-board", children: [_jsx("div", { children: "\u5DE6\u306E\u30C1\u30FC\u30E0" }), _jsx("div", { className: "token-row", children: tokens.map((assignment, index) => (_jsx("button", { type: "button", className: `token ${assignment === 'left' ? 'token-left' : 'token-right'}`, onClick: () => updateToken(index), children: assignment === 'left' ? 'L' : 'R' }, `token-${index}`))) }), _jsxs("div", { children: ["\u53F3\u306E\u30C1\u30FC\u30E0: ", rightCount, "\u3053"] })] })), problem.kind !== 'decomposition' && (_jsx("div", { className: "answer-display", "aria-live": "polite", children: answer === '' ? '？' : answer })), _jsxs("div", { className: "answer-pad", children: [digits.map((digit) => (_jsx("button", { type: "button", className: "answer-button", onClick: () => handleDigitPress(digit), children: digit }, digit))), _jsx("button", { type: "button", className: "answer-button", onClick: handleRemove, children: "\u232B" }), _jsx("button", { type: "button", className: "answer-button", onClick: handleClear, children: "\u30AF\u30EA\u30A2" })] }), _jsxs("div", { className: "overlay-actions", children: [_jsx("button", { type: "button", className: "primary-button", onClick: handleSubmit, children: "\u3053\u305F\u3048\u3042\u308F\u305B" }), _jsx("button", { type: "button", className: "secondary-button", onClick: onClose, children: "\u307E\u305F\u3042\u3068\u3067" })] })] }) })) }));
};
