// AccuracyBar — displays match percentage after running code

import React from 'react';

interface AccuracyBarProps {
  accuracy: number;
  visible: boolean;
}

const AccuracyBar: React.FC<AccuracyBarProps> = ({ accuracy, visible }) => {
  if (!visible) return null;

  const fillClass =
    accuracy >= 80
      ? 'accuracy-bar__fill--high'
      : accuracy >= 40
        ? 'accuracy-bar__fill--mid'
        : 'accuracy-bar__fill--low';

  return (
    <div className="accuracy-bar">
      <div className="accuracy-bar__label">
        <span>Match Accuracy</span>
        <span>{accuracy}%</span>
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
