// AccuracyBar — displays match percentage and cell mismatch diagnostics after running code

import React from 'react';

interface AccuracyBarProps {
  accuracy: number;
  visible: boolean;
  targetCount?: number;
  playerCount?: number;
}

const AccuracyBar: React.FC<AccuracyBarProps> = ({
  accuracy,
  visible,
  targetCount = 0,
  playerCount = 0,
}) => {
  if (!visible) return null;

  const isComplete = accuracy === 100;
  const fillClass =
    accuracy >= 80
      ? 'accuracy-bar__fill--high'
      : accuracy >= 40
      ? 'accuracy-bar__fill--mid'
      : 'accuracy-bar__fill--low';

  const diffCount = Math.abs(targetCount - playerCount);
  let hint = '';
  if (isComplete) {
    hint = '✨ All 25 cells match the target blueprint perfectly!';
  } else if (playerCount < targetCount) {
    hint = `Canvas has ${playerCount} filled cells (${diffCount} fewer than target). Check missing coordinates.`;
  } else if (playerCount > targetCount) {
    hint = `Canvas has ${playerCount} filled cells (${diffCount} more than target). Some cells need clearing or black color.`;
  } else {
    hint = `Cell count matches (${playerCount} cells), but colors or symbols differ at some coordinates.`;
  }

  return (
    <div className="accuracy-bar-card">
      <div className="accuracy-bar-card__top">
        <div className="accuracy-bar-card__left">
          <span className="accuracy-bar-card__title">Pattern Match Rate</span>
          <span className="accuracy-bar-card__hint">{hint}</span>
        </div>
        <div className="accuracy-bar-card__score">
          <span className={`accuracy-bar-card__val ${isComplete ? 'accuracy-bar-card__val--complete' : ''}`}>
            {accuracy}%
          </span>
        </div>
      </div>

      <div className="accuracy-bar__track">
        <div
          className={`accuracy-bar__fill ${fillClass}`}
          style={{ width: `${accuracy}%` }}
        />
      </div>
    </div>
  );
};

export default AccuracyBar;
