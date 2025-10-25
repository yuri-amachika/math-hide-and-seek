import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { GridCell } from '../types/game';

interface MonsterSpriteProps {
  cells: GridCell[];
  targetCellId: number;
  onArrive: () => void;
}

const CELL_SIZE = {
  width: 1 / 5,
  height: 1 / 3
};

const offsetFor = (cell: GridCell | undefined) => {
  if (!cell) {
    return { top: '50%', left: '50%' };
  }
  const left = `${(cell.col + 0.5) * CELL_SIZE.width * 100}%`;
  const top = `${(cell.row + 0.5) * CELL_SIZE.height * 100}%`;
  return { top, left };
};

export const MonsterSprite = ({ cells, targetCellId, onArrive }: MonsterSpriteProps) => {
  const targetCell = useMemo(() => cells.find((cell) => cell.id === targetCellId), [cells, targetCellId]);
  const { top, left } = offsetFor(targetCell);

  return (
    <div className="monster-layer">
      <motion.div
        className="monster-sprite"
        animate={{ top, left }}
        initial={{ top, left }}
        transition={{ type: 'spring', stiffness: 180, damping: 26 }}
        onAnimationComplete={onArrive}
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <span className="monster-face" role="img" aria-label="monster">
          👾
        </span>
      </motion.div>
    </div>
  );
};
