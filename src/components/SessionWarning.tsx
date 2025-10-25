import { motion, AnimatePresence } from 'framer-motion';

interface SessionWarningProps {
  visible: boolean;
  remainingMinutes: number;
  onContinue: () => void;
  onClose: () => void;
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

export const SessionWarning = ({ visible, remainingMinutes, onContinue, onClose }: SessionWarningProps) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="overlay-backdrop"
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="session-warning-card"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="session-warning-icon" role="img" aria-label="時計">
              ⏰
            </div>
            <h2 className="session-warning-title">プレイじかんのおしらせ</h2>
            <p className="session-warning-message">
              {remainingMinutes > 0
                ? `あと${remainingMinutes}ふんであそべるよ。そろそろひとやすみしようかな？`
                : 'きょうのぼうけんはここまで！またあしたあそぼうね。'}
            </p>
            <div className="session-warning-actions">
              {remainingMinutes > 0 ? (
                <>
                  <button type="button" className="primary-button" onClick={onContinue}>
                    もうすこしあそぶ
                  </button>
                  <button type="button" className="secondary-button" onClick={onClose}>
                    おわりにする
                  </button>
                </>
              ) : (
                <button type="button" className="primary-button" onClick={onClose}>
                  わかった
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
