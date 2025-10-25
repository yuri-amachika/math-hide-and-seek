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

export const HudPanel = ({ totalCells }: HudPanelProps) => {
  const { completedCells, stageStep, lastResult, stageProgress, phase } = useGameStore((state: GameStoreState) => ({
    completedCells: state.completedCells,
    stageStep: state.stageStep,
    lastResult: state.lastResult,
    stageProgress: state.stageProgress,
    phase: state.phase
  }));

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
      <div className="phase-banner" aria-live="polite">
        <span className={`phase-pill phase-${phase}`}>{phase.toUpperCase()}</span>
        <span>{phaseMessage}</span>
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
