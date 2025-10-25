import { motion } from 'framer-motion';
import { gameAssets, MonsterOption } from '../config/gameAssets';

interface MonsterSelectionModalProps {
  visible: boolean;
  onSelect: (monster: MonsterOption) => void;
}

const cardVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

export const MonsterSelectionModal = ({ visible, onSelect }: MonsterSelectionModalProps) => {
  if (!visible) return null;

  return (
    <div className="overlay-backdrop" style={{ zIndex: 100 }}>
      <motion.div
        className="overlay-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{ maxWidth: '600px' }}
      >
        <h2 className="overlay-heading" style={{ textAlign: 'center', marginBottom: '16px' }}>
          かいぶつをえらぼう
        </h2>
        <p className="overlay-subtext" style={{ textAlign: 'center', marginBottom: '24px' }}>
          いっしょにすうじをさがすかいぶつをえらんでね
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '16px',
            marginBottom: '16px'
          }}
        >
          {gameAssets.monsters.map((monster) => (
            <motion.button
              key={monster.id}
              type="button"
              variants={cardVariants}
              initial="idle"
              whileHover="hover"
              whileTap="tap"
              onClick={() => onSelect(monster)}
              style={{
                background: 'linear-gradient(160deg, rgba(32, 38, 56, 0.9), rgba(16, 18, 28, 0.95))',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                padding: '20px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                minHeight: '180px',
                justifyContent: 'center'
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 30%, #ff5f7e, #c61844 58%, #690d2f 100%)',
                  border: '3px solid rgba(255, 255, 255, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 20px rgba(255, 59, 94, 0.4)'
                }}
              >
                {monster.imagePath ? (
                  <img
                    src={monster.imagePath}
                    alt={monster.altText}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }}
                  />
                ) : (
                  <span
                    role="img"
                    aria-label={monster.altText}
                    style={{ fontSize: '32px', color: '#ffeaea' }}
                  >
                    {monster.fallbackEmoji}
                  </span>
                )}
              </div>
              <span style={{ fontSize: '16px', fontWeight: '700', color: '#f5f6ff' }}>
                {monster.name}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
