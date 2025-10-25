import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { NumberGrid } from './components/NumberGrid';
import { MonsterSprite } from './components/MonsterSprite';
import { QuestionOverlay } from './components/QuestionOverlay';
import { HudPanel } from './components/HudPanel';
import { useGameStore } from './store/useGameStore';
import { useFeedbackSounds } from './hooks/useFeedbackSounds';
const DEFAULT_MONSTER_CELL = 8;
const selectGameSlice = (state) => ({
    cells: state.cells,
    activeCellId: state.activeCellId,
    currentProblem: state.currentProblem,
    isLocked: state.isLocked,
    markResult: state.markResult,
    selectCell: state.selectCell,
    resetActive: state.resetActive
});
const totalCellsSelector = (state) => state.cells.length;
function App() {
    const game = useGameStore(selectGameSlice);
    const totalCells = useGameStore(totalCellsSelector);
    const { playSuccess, playError } = useFeedbackSounds();
    const [monsterTargetId, setMonsterTargetId] = useState(DEFAULT_MONSTER_CELL);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const activeCell = useMemo(() => {
        if (game.activeCellId == null) {
            return null;
        }
        return game.cells.find((cell) => cell.id === game.activeCellId) ?? null;
    }, [game.activeCellId, game.cells]);
    const monsterDestination = activeCell?.id ?? monsterTargetId;
    const handleCellSelect = (cellId) => {
        game.selectCell(cellId);
        setOverlayVisible(false);
        setMonsterTargetId(cellId);
    };
    const handleMonsterArrive = () => {
        setOverlayVisible(true);
    };
    const handleSubmit = (isCorrect) => {
        if (isCorrect) {
            playSuccess();
            game.markResult('correct');
        }
        else {
            playError();
            game.markResult('incorrect');
        }
        setOverlayVisible(false);
    };
    const handleClose = () => {
        game.resetActive();
        setOverlayVisible(false);
        setMonsterTargetId((prev) => prev);
    };
    return (_jsxs("div", { className: "app-shell", children: [_jsxs("div", { className: "map-stage", children: [_jsx(NumberGrid, { cells: game.cells, isLocked: game.isLocked, onSelect: handleCellSelect }), _jsx(MonsterSprite, { cells: game.cells, targetCellId: monsterDestination, onArrive: handleMonsterArrive })] }), _jsx(HudPanel, { totalCells: totalCells }), _jsx(AnimatePresence, { children: _jsx(QuestionOverlay, { problem: game.currentProblem, visible: overlayVisible && !!game.currentProblem, onSubmit: handleSubmit, onClose: handleClose }) })] }));
}
export default App;
