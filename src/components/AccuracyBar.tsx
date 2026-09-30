// AccuracyBar — persistent diagnostics bar with zero layout shift and clear feedback

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
  const isComplete = accuracy === 100;
  const fillClass =
    accuracy >= 80
      ? 'accuracy-bar__fill--high'
      : accuracy >= 40
      ? 'accuracy-bar__fill--mid'
      : 'accuracy-bar__fill--low';

  const diffCount = Math.abs(targetCount - playerCount);
  let hint = '';

  if (!visible) {
    hint = `Target blueprint requires ${targetCount} filled cells • Press Run (Ctrl+↵) to test your code`;
  } else if (isComplete) {
    hint = '✨ All 25 cells match the reference blueprint perfectly!';
  } else if (playerCount < targetCount) {
    hint = `Canvas has ${playerCount} cells (${diffCount} fewer than target). Check coordinates or missing loops.`;
  } else if (playerCount > targetCount) {
    hint = `Canvas has ${playerCount} cells (${diffCount} more than target). Some cells need clearing or black color.`;
  } else {
    hint = `Cell count matches (${playerCount} cells), but colors or symbols differ at some coordinates.`;
  }

  return (
    <div className={`accuracy-bar-card ${visible ? 'accuracy-bar-card--active' : 'accuracy-bar-card--idle'}`}>
      <div className="accuracy-bar-card__top">
        <div className="accuracy-bar-card__left">
          <span className="accuracy-bar-card__title">
            {visible ? 'Match Diagnostics' : 'Ready'}
          </span>
          <span className="accuracy-bar-card__hint">{hint}</span>
        </div>
        <div className="accuracy-bar-card__score">
          <span className={`accuracy-bar-card__val ${isComplete ? 'accuracy-bar-card__val--complete' : ''}`}>
            {visible ? `${accuracy}%` : '—'}
          </span>
        </div>
      </div>

      <div className="accuracy-bar__track">
        <div
          className={`accuracy-bar__fill ${visible ? fillClass : ''}`}
          style={{ width: visible ? `${accuracy}%` : '0%' }}
        />
      </div>
    </div>
  );
};

export default AccuracyBar;
