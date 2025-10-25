import { useMemo } from 'react';
import { useGameStore, type GameStoreState } from '../store/useGameStore';
import type { StageStep } from '../types/game';

interface HudPanelProps {
  totalCells: number;
}

const stepLabels: Record<string, string> = {
  A: 'すてっぷA いくつといくつ',
  B: 'すてっぷB くりあがり・くりさがりなし',
  C: 'すてっぷC くりさがりとぶんしょうだい'
};

const formatTime = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const HudPanel = ({ totalCells }: HudPanelProps) => {
  const { completedCells, stageStep, lastResult, stageProgress, phase, hintLevel, getSessionElapsed, sessionDuration } = useGameStore((state: GameStoreState) => ({
    completedCells: state.completedCells,
    stageStep: state.stageStep,
    lastResult: state.lastResult,
    stageProgress: state.stageProgress,
    phase: state.phase,
    hintLevel: state.hintLevel,
    getSessionElapsed: state.getSessionElapsed,
    sessionDuration: state.sessionDuration
  }));

  const elapsed = getSessionElapsed();
  const remaining = Math.max(0, sessionDuration - elapsed);
  const remainingFormatted = formatTime(remaining);

  const progress = useMemo(() => {
    if (totalCells === 0) {
      return 0;
    }
    return Math.round((completedCells / totalCells) * 100);
  }, [completedCells, totalCells]);

  const phaseMessage = useMemo(() => {
    switch (phase) {
      case 'selecting':
        return 'かいぶつがにおいをたどりちゅう…つぎのへやがあかくそまるかも。';
      case 'solving':
        return 'せいげんじかんないにひらめこう！ずやひんとでさくせんをたててね。';
      case 'resolving':
        return 'ないすきゃっち！つかまえたじゅうにんをきろくちゅう。';
      case 'feedback':
        return 'もうひといき。ひんとをみなおしてつぎはせいこうさせよう。';
      default:
        return 'きになるへやをえらんで、かくれたじゅうにんたちをみつけだそう。';
    }
  }, [phase]);

  const stageSummaries = useMemo(() => {
    const order: StageStep[] = ['A', 'B', 'C'];
    return order.map((step) => {
      const snapshot = stageProgress[step];
      const percent = snapshot?.total ? Math.round((snapshot.solved / snapshot.total) * 100) : 0;
      return {
        step,
        label: stepLabels[step],
        solved: snapshot?.solved ?? 0,
        total: snapshot?.total ?? 0,
        percent
      };
    });
  }, [stageProgress]);

  return (
    <aside className="hud-panel">
      <div className="hud-header">
        <div>
          <div className="hud-title">Number Hunter</div>
          <div>{stepLabels[stageStep]}</div>
        </div>
        <div className="answer-display">{completedCells}/{totalCells}</div>
      </div>
      <div className="session-timer" aria-live="polite">
        ⏱️ のこり: {remainingFormatted}
      </div>
      <div className="phase-banner" aria-live="polite">
        <span className={`phase-pill phase-${phase}`}>{phase.toUpperCase()}</span>
        <span>{phaseMessage}</span>
        {phase === 'solving' && hintLevel > 1 && (
          <span className="hint-indicator"> ヒントレベル: {hintLevel}/3</span>
        )}
      </div>
      <div className="progress-bar" aria-hidden="true">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="stage-tracker">
        {stageSummaries.map(({ step, label, solved, total, percent }) => (
          <div key={step} className={`stage-card ${stageStep === step ? 'stage-card-active' : ''}`}>
            <div className="stage-card-header">
              <span className="stage-card-label">{label}</span>
              <span className="stage-card-count">{solved}/{total}</span>
            </div>
            <div className="stage-progress-bar">
              <div className="stage-progress-fill" style={{ width: `${percent}%` }} />
            </div>
          </div>
        ))}
      </div>
      {lastResult === 'correct' && (
        <div className="feedback-banner feedback-success">よくできたね！つぎのかずをさがそう。</div>
      )}
      {lastResult === 'incorrect' && (
        <div className="feedback-banner feedback-error">もういちどかんがえてみよう。ひんとをつかってね。</div>
      )}
      <p>
        すうじをたっぷするとかいぶつがかけつけるよ。
        くいずにせいかいしてすべてのへやをあかくそめよう。
      </p>
    </aside>
  );
};
