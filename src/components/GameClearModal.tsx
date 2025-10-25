import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface GameClearModalProps {
  visible: boolean;
  totalCells: number;
  onClose: () => void;
  onPlayClearSound: () => void;
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, y: -50 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    y: 50,
    transition: {
      duration: 0.3
    }
  }
};

const confettiVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: (i: number) => ({
    opacity: [0, 1, 1, 0],
    y: [0, 200 + i * 50],
    x: [0, (i % 2 === 0 ? 1 : -1) * (50 + i * 20)],
    rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
    transition: {
      duration: 2 + i * 0.2,
      ease: 'easeOut'
    }
  })
};

export const GameClearModal = ({ visible, totalCells, onClose, onPlayClearSound }: GameClearModalProps) => {
  useEffect(() => {
    if (visible) {
      onPlayClearSound();
    }
  }, [visible, onPlayClearSound]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="overlay-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* 紙吹雪アニメーション */}
          <div className="confetti-container">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={`confetti-${i}`}
                className="confetti-piece"
                custom={i}
                variants={confettiVariants}
                initial="hidden"
                animate="visible"
                style={{
                  position: 'absolute',
                  top: '10%',
                  left: `${20 + i * 5}%`,
                  width: '20px',
                  height: '20px',
                  backgroundColor: ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a8e6cf', '#ff8b94'][i % 5],
                  borderRadius: i % 2 === 0 ? '50%' : '0%'
                }}
              />
            ))}
          </div>

          {/* クリアモーダル */}
          <motion.div
            className="game-clear-card"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="game-clear-icon"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              🎉
            </motion.div>

            <h2 className="game-clear-title">
              げーむくりあ！
            </h2>

            <p className="game-clear-message">
              おめでとう！すべてのかずをみつけたよ！
            </p>

            <div className="game-clear-stats">
              <div className="game-clear-stat">
                <span className="game-clear-stat-label">みつけたかず</span>
                <span className="game-clear-stat-value">{totalCells}</span>
              </div>
            </div>

            <p className="game-clear-encouragement">
              きみはすうじはんたーだ！
              またあそんでね！
            </p>

            <button 
              type="button" 
              className="primary-button game-clear-button" 
              onClick={onClose}
            >
              とじる
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
