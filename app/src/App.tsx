import { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { NumberGrid } from './components/NumberGrid';
import { MonsterSprite } from './components/MonsterSprite';
import { QuestionOverlay } from './components/QuestionOverlay';
import { HudPanel } from './components/HudPanel';
import { useGameStore, type GameStoreState } from './store/useGameStore';
import { useFeedbackSounds } from './hooks/useFeedbackSounds';
import type { GridCell } from './types/game';

const DEFAULT_MONSTER_CELL = 8;

const selectGameSlice = (state: GameStoreState) => ({
  cells: state.cells,
  activeCellId: state.activeCellId,
  currentProblem: state.currentProblem,
  isLocked: state.isLocked,
  markResult: state.markResult,
  selectCell: state.selectCell,
  resetActive: state.resetActive,
  beginSolving: state.beginSolving
});

const totalCellsSelector = (state: GameStoreState) => state.cells.length;

function App() {
  const game = useGameStore(selectGameSlice);
  const totalCells = useGameStore(totalCellsSelector);
  const { playSuccess, playError } = useFeedbackSounds();
  const [monsterTargetId, setMonsterTargetId] = useState<number>(DEFAULT_MONSTER_CELL);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const activeCell = useMemo(() => {
    if (game.activeCellId == null) {
      return null;
    }
  return game.cells.find((cell: GridCell) => cell.id === game.activeCellId) ?? null;
  }, [game.activeCellId, game.cells]);

  const monsterDestination = activeCell?.id ?? monsterTargetId;

  const handleCellSelect = (cellId: number) => {
    game.selectCell(cellId);
    setOverlayVisible(false);
    setMonsterTargetId(cellId);
  };

  const handleMonsterArrive = () => {
    game.beginSolving();
    setOverlayVisible(true);
  };

  const handleSubmit = (isCorrect: boolean) => {
    if (isCorrect) {
      playSuccess();
      game.markResult('correct');
    } else {
      playError();
      game.markResult('incorrect');
    }
    setOverlayVisible(false);
    game.resetActive();
  };

  const handleClose = () => {
    game.resetActive();
    setOverlayVisible(false);
  setMonsterTargetId((prev: number) => prev);
  };

  return (
    <div className="app-shell">
      <div className="map-stage">
        <NumberGrid cells={game.cells} isLocked={game.isLocked} onSelect={handleCellSelect} />
        <MonsterSprite cells={game.cells} targetCellId={monsterDestination} onArrive={handleMonsterArrive} />
      </div>
      <HudPanel totalCells={totalCells} />
      <AnimatePresence>
        <QuestionOverlay
          problem={game.currentProblem}
          visible={overlayVisible && !!game.currentProblem}
          onSubmit={handleSubmit}
          onClose={handleClose}
        />
      </AnimatePresence>
    </div>
  );
}

export default App;
