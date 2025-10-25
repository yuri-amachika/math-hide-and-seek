import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { GridCell } from '../types/game';
import { MonsterOption } from '../config/gameAssets';

interface MonsterSpriteProps {
  cells: GridCell[];
  targetCellId: number;
  onArrive: () => void;
  selectedMonster: MonsterOption;
}

// グリッド設定: 5列×3行
// .monster-layerは.map-gridと同じサイズに設定済み
// gapはCSS変数から取得（レスポンシブ対応）
const GRID_CONFIG = {
  cols: 5,
  rows: 3
};

const getGridGap = (): number => {
  // CSSから実際のgap値を取得
  if (typeof window !== 'undefined') {
    const width = window.innerWidth;
    if (width <= 400) return 6;
    if (width <= 640) return 8;
    if (width <= 960) return 10;
  }
  return 12; // デスクトップデフォルト
};

const offsetFor = (cell: GridCell | undefined) => {
  if (!cell) {
    return { top: '50%', left: '50%' };
  }
  
  const gap = getGridGap();
  
  // セルの実際の幅と高さを計算（gap込み）
  // グリッドは gap を除いた空間を均等分割する
  const cellWidth = `(100% - ${gap * (GRID_CONFIG.cols - 1)}px) / ${GRID_CONFIG.cols}`;
  const cellHeight = `(100% - ${gap * (GRID_CONFIG.rows - 1)}px) / ${GRID_CONFIG.rows}`;
  
  // セルの中心位置を計算: (cellSize + gap) * position + cellSize / 2
  const left = `calc((${cellWidth} + ${gap}px) * ${cell.col} + (${cellWidth}) / 2)`;
  const top = `calc((${cellHeight} + ${gap}px) * ${cell.row} + (${cellHeight}) / 2)`;
  
  return { top, left };
};

export const MonsterSprite = ({ cells, targetCellId, onArrive, selectedMonster }: MonsterSpriteProps) => {
  const targetCell = useMemo(() => cells.find((cell) => cell.id === targetCellId), [cells, targetCellId]);
  const { top, left } = offsetFor(targetCell);

  const monsterContent = selectedMonster.imagePath ? (
    <img
      src={selectedMonster.imagePath}
      alt={selectedMonster.altText}
      className="monster-image"
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
  ) : (
    <span className="monster-face" role="img" aria-label={selectedMonster.altText}>
      {selectedMonster.fallbackEmoji}
    </span>
  );

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
        {monsterContent}
      </motion.div>
    </div>
  );
};
