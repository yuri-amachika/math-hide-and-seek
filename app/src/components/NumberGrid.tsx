import { memo } from 'react';
import { motion } from 'framer-motion';
import { GridCell } from '../types/game';

interface NumberGridProps {
  cells: GridCell[];
  isLocked: boolean;
  onSelect: (cellId: number) => void;
}

const cellVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.03 },
  pressed: { scale: 0.96 }
};

const statusClassName = (status: GridCell['status']) => {
  if (status === 'solved') return 'grid-cell grid-cell-solved';
  if (status === 'active') return 'grid-cell grid-cell-active';
  return 'grid-cell grid-cell-idle';
};

export const NumberGrid = memo(({ cells, isLocked, onSelect }: NumberGridProps) => (
  <div className="map-grid">
    {cells.map((cell) => (
      <motion.button
        key={cell.id}
        type="button"
        className={statusClassName(cell.status)}
        whileHover={!isLocked && cell.status === 'idle' ? cellVariants.hover : undefined}
        whileTap={!isLocked && cell.status === 'idle' ? cellVariants.pressed : undefined}
        onClick={() => onSelect(cell.id)}
        disabled={isLocked || cell.status === 'solved'}
      >
        {cell.id}
      </motion.button>
    ))}
  </div>
));

NumberGrid.displayName = 'NumberGrid';
