import { useEffect, useMemo, useState } from 'react';
import type {
  NumberLineVisual,
  Problem,
  ProblemVisual,
  StoryGroup,
  StoryVisual,
  TenFrameGroup,
  TenFrameVisual
} from '../types/game';

const isNumberLine = (visual: ProblemVisual): visual is NumberLineVisual => visual.type === 'numberLine';
const isTenFrame = (visual: ProblemVisual): visual is TenFrameVisual => visual.type === 'tenFrame';
const isStory = (visual: ProblemVisual): visual is StoryVisual => visual.type === 'story';

const NumberLineVisualizer = ({ visual }: { visual: NumberLineVisual }) => {
  const [position, setPosition] = useState<number>(visual.pointerStart);

  useEffect(() => {
    setPosition(visual.pointerStart);
  }, [visual.pointerStart, visual.start, visual.end]);

  const ticks = useMemo(() => {
    const length = visual.end - visual.start;
    return Array.from({ length: length + 1 }, (_, idx) => visual.start + idx);
  }, [visual.end, visual.start]);

  const totalSpan = visual.end - visual.start || 1;
  const difference = Math.abs(position - visual.pointerStart);
  const targetDifference = Math.abs(visual.pointerTarget - visual.pointerStart);
  const reachedTarget = position === visual.pointerTarget;

  return (
    <div className="visual-card number-line-visual">
      <div className="number-line-header">
        <span>{visual.labelLeft ?? 'すたーと'}</span>
        <span>{visual.labelRight ?? 'ごーる'}</span>
      </div>
      <div className="number-line-axis" role="group" aria-label="すうちょくせん">
        {ticks.map((value) => {
          const isCurrent = value === position;
          const isTarget = value === visual.pointerTarget;
          const isStart = value === visual.pointerStart;
          return (
            <div
              className={[
                'number-line-tick',
                isCurrent ? 'number-line-tick-current' : '',
                isTarget ? 'number-line-tick-target' : '',
                isStart ? 'number-line-tick-start' : ''
              ]
                .filter(Boolean)
                .join(' ')}
              key={value}
            >
              <span className="number-line-mark" />
              <span className="number-line-label">{value}</span>
            </div>
          );
        })}
        <div
          className="number-line-target-span"
          style={{
            left: `${((Math.min(visual.pointerStart, visual.pointerTarget) - visual.start) / totalSpan) * 100}%`,
            width: `${(targetDifference / totalSpan) * 100}%`
          }}
        />
        <div
          className="number-line-current-span"
          style={{
            left: `${((Math.min(position, visual.pointerStart) - visual.start) / totalSpan) * 100}%`,
            width: `${(difference / totalSpan) * 100}%`
          }}
        />
      </div>
      <input
        className="number-line-slider"
        type="range"
        min={visual.start}
        max={visual.end}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-valuemin={visual.start}
        aria-valuemax={visual.end}
        aria-valuenow={position}
        aria-label="すうちょくせんのすらいだー"
      />
      <div className="number-line-feedback">
        <div>
          {visual.mode === 'addition' ? 'すすんだかず' : 'もどったかず'}: {difference}
          <span className="number-line-target-hint">（めあては {targetDifference}）</span>
        </div>
        <div className={reachedTarget ? 'number-line-reached' : ''}>
          {reachedTarget ? 'ごーるについたよ！' : 'ごーるのいちをめでおってみよう'}
        </div>
      </div>
    </div>
  );
};

const TenFrameVisualizer = ({ visual }: { visual: TenFrameVisual }) => {
  const renderFrame = (frame: TenFrameGroup, index: number) => {
    const total = frame.total ?? 10;
    const squares = Array.from({ length: total }, (_, idx) => idx < frame.filled);
    return (
      <div className="ten-frame" key={`${frame.title}-${index}`}>
        <div className="ten-frame-title">{frame.title}</div>
        <div className="ten-frame-grid">
          {squares.map((filled, idx) => (
            <div
              key={idx}
              className={['ten-frame-cell', filled ? 'ten-frame-cell-filled' : 'ten-frame-cell-empty'].join(' ')}
            />
          ))}
        </div>
        <div className="ten-frame-count">{frame.filled}こ</div>
      </div>
    );
  };

  return <div className="visual-card ten-frame-visual">{visual.frames.map(renderFrame)}</div>;
};

const StoryVisualizer = ({ visual }: { visual: StoryVisual }) => {
  const renderGroup = (group: StoryGroup) => (
    <div className="story-card" key={group.label}>
      <div className="story-icon" aria-hidden="true">
        {group.icon ?? '👥'}
      </div>
      <div className="story-body">
        <div className="story-label" style={{ color: group.color }}>
          {group.label}
        </div>
        <div className="story-count">{group.count}こ</div>
      </div>
    </div>
  );

  return (
    <div className="visual-card story-visual">
      <div className="story-grid">{visual.groups.map(renderGroup)}</div>
      {visual.caption && <div className="story-caption">{visual.caption}</div>}
    </div>
  );
};

interface ProblemVisualizerProps {
  problem: Problem;
}

export const ProblemVisualizer = ({ problem }: ProblemVisualizerProps) => {
  const { visual } = problem;
  if (!visual) {
    return null;
  }

  if (isNumberLine(visual)) {
    return <NumberLineVisualizer visual={visual} />;
  }

  if (isTenFrame(visual)) {
    return <TenFrameVisualizer visual={visual} />;
  }

  if (isStory(visual)) {
    return <StoryVisualizer visual={visual} />;
  }

  return null;
};
