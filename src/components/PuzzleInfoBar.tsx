// PuzzleInfoBar component — high-signal mission briefing bar with title, difficulty tier, instructions, and telemetry

import React from 'react';

interface PuzzleInfoBarProps {
  puzzleId: number;
  puzzleTitle: string;
  targetFilledCount: number;
  playerFilledCount: number;
  attempts: number;
}

const PuzzleInfoBar: React.FC<PuzzleInfoBarProps> = ({
  puzzleId,
  puzzleTitle,
  targetFilledCount,
  playerFilledCount,
  attempts,
}) => {
  // Determine a category / difficulty tier based on puzzle ID
  const getTier = (id: number) => {
    if (id <= 8) return { label: 'Novice Lab', color: 'badge--blue' };
    if (id <= 18) return { label: 'Intermediate Matrix', color: 'badge--indigo' };
    if (id <= 26) return { label: 'Advanced Synthesis', color: 'badge--purple' };
    return { label: 'Master Architect', color: 'badge--amber' };
  };

  const tier = getTier(puzzleId);

  return (
    <div className="puzzle-info-bar">
      <div className="puzzle-info-bar__main">
        <div className="puzzle-info-bar__heading-row">
          <span className="puzzle-info-bar__id">Day #{puzzleId}</span>
          <h2 className="puzzle-info-bar__title">{puzzleTitle}</h2>
          <span className={`puzzle-info-bar__tier ${tier.color}`}>{tier.label}</span>
        </div>
        <p className="puzzle-info-bar__instruction">
          Recreate the target blueprint using Python <code>pydle(x, y, symbol, color)</code>
        </p>
      </div>

      <div className="puzzle-info-bar__metrics">
        <div className="metric-chip" title="Target non-empty cells to match">
          <span className="metric-chip__label">Target</span>
          <span className="metric-chip__value metric-chip__value--target">{targetFilledCount}/25</span>
        </div>
        <div className="metric-chip" title="Currently filled cells on your canvas">
          <span className="metric-chip__label">Canvas</span>
          <span className="metric-chip__value metric-chip__value--player">{playerFilledCount}/25</span>
        </div>
        <div className="metric-chip" title="Total code executions on this puzzle">
          <span className="metric-chip__label">Runs</span>
          <span className="metric-chip__value">{attempts}</span>
        </div>
      </div>
    </div>
  );
};

export default PuzzleInfoBar;
