import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Problem } from '../types/game';
import { ProblemVisualizer } from './ProblemVisualizer';

interface QuestionOverlayProps {
  problem: Problem | null;
  visible: boolean;
  onSubmit: (isCorrect: boolean) => void;
  onClose: () => void;
}

type TokenAssignment = 'left' | 'right';

const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

const overlayVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
};

const buildInitialTokens = (problem: Problem | null): TokenAssignment[] => {
  if (!problem || !problem.total) {
    return [];
  }
  const total = problem.total;
  return Array.from({ length: total }).map(() => 'left');
};

export const QuestionOverlay = ({ problem, visible, onSubmit, onClose }: QuestionOverlayProps) => {
  const [answer, setAnswer] = useState('');
  const [tokens, setTokens] = useState<TokenAssignment[]>(() => buildInitialTokens(problem));

  useEffect(() => {
    setAnswer('');
    setTokens(buildInitialTokens(problem));
  }, [problem]);

  const rightCount = useMemo(
    () => tokens.filter((token: TokenAssignment) => token === 'right').length,
    [tokens]
  );

  const expectedAnswer = problem?.kind === 'decomposition' ? rightCount : Number(answer || 0);

  const handleDigitPress = (value: string) => {
    setAnswer((prev: string) => {
      const next = prev.length >= 2 ? value : `${prev}${value}`;
      return next.replace(/^0+(\d)/, '$1');
    });
  };

  const handleRemove = () => {
    setAnswer((prev: string) => prev.slice(0, -1));
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

  const updateToken = (index: number) => {
    setTokens((prev: TokenAssignment[]) =>
      prev.map((token: TokenAssignment, idx: number) => {
        if (idx !== index) return token;
        return token === 'left' ? 'right' : 'left';
      })
    );
  };

  const instruction = useMemo(() => {
    if (!problem) return '';
    if (problem.kind === 'decomposition') {
      return 'おはじきをたっちしてさゆうにならべかえてみよう。みぎにいるかずがこたえになるよ。';
    }
    if (problem.visual?.type === 'numberLine') {
      return 'すらいだーでかいぶつをうごかして、ごーるにつくまでになんますすむかかんがえてみよう。';
    }
    if (problem.visual?.type === 'tenFrame') {
      return '１０のまとまりをみながら、いくつあるかまとめてかぞえよう。';
    }
    if (problem.visual?.type === 'story') {
      return 'おはなしにそってぐるーぷのかずをいめーじし、すうじぼたんでこたえをにゅうりょくしよう。';
    }
    if (problem.kind === 'addition') {
      return 'すうじぼたんをたっぷしてこたえをにゅうりょくしよう。';
    }
    return 'えをいめーじしながらすうじぼたんでこたえよう。';
  }, [problem]);

  return (
    <AnimatePresence>
      {visible && problem && (
        <motion.div className="overlay-backdrop" initial="hidden" animate="visible" exit="hidden">
          <motion.div className="overlay-card" variants={overlayVariants} initial="hidden" animate="visible" exit="hidden">
            <div className="overlay-heading">{problem.prompt}</div>
            <div className="overlay-subtext">{problem.question}</div>
            {problem.secondaryPrompt && <div className="story-note">{problem.secondaryPrompt}</div>}

            {problem.visual && (
              <div className="overlay-visual">
                <ProblemVisualizer problem={problem} />
              </div>
            )}

            <div className="story-note">{instruction}</div>

            {problem.kind === 'decomposition' && (
              <div className="token-board">
                <div>ひだりのちーむ</div>
                <div className="token-row">
                  {tokens.map((assignment: TokenAssignment, index: number) => (
                    <button
                      key={`token-${index}`}
                      type="button"
                      className={`token ${assignment === 'left' ? 'token-left' : 'token-right'}`}
                      onClick={() => updateToken(index)}
                    >
                      {assignment === 'left' ? 'L' : 'R'}
                    </button>
                  ))}
                </div>
                <div>みぎのちーむ: {rightCount}こ</div>
              </div>
            )}

            {problem.kind !== 'decomposition' && (
              <div className="answer-display" aria-live="polite">
                {answer === '' ? '？' : answer}
              </div>
            )}

            <div className="answer-pad">
              {digits.map((digit) => (
                <button key={digit} type="button" className="answer-button" onClick={() => handleDigitPress(digit)}>
                  {digit}
                </button>
              ))}
              <button type="button" className="answer-button" onClick={handleRemove}>
                ⌫
              </button>
              <button type="button" className="answer-button" onClick={handleClear}>
                クリア
              </button>
            </div>

            <div className="overlay-actions">
              <button type="button" className="primary-button" onClick={handleSubmit}>
                こたえあわせ
              </button>
              <button type="button" className="secondary-button" onClick={onClose}>
                またあとで
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
