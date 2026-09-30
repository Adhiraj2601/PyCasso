// PuzzleInfoBar component — compact info display below the header with title, instructions, and metrics

import React from 'react';

interface PuzzleInfoBarProps {
  puzzleId: number;
  puzzleTitle: string;
  targetFilledCount: number;
  playerFilledCount: number;
  attempts: number;
  onResetCode: () => void;
  onOpenApiHelp: () => void;
}

const PuzzleInfoBar: React.FC<PuzzleInfoBarProps> = ({
  puzzleId,
  puzzleTitle,
  targetFilledCount,
  playerFilledCount,
  attempts,
  onResetCode,
  onOpenApiHelp,
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
          <h2 className="puzzle-info-bar__title">{puzzleTitle}</h2>
          <span className={`puzzle-info-bar__tier ${tier.color}`}>{tier.label}</span>
        </div>
        <p className="puzzle-info-bar__instruction">
          Recreate the target pattern on your canvas using Python <code>pydle(x, y, symbol, color)</code>.
        </p>
      </div>

      <div className="puzzle-info-bar__meta">
        <div className="puzzle-info-bar__metrics">
          <div className="metric-chip" title="Target non-empty cell count">
            <span className="metric-chip__label">Target Cells</span>
            <span className="metric-chip__value metric-chip__value--target">{targetFilledCount} / 25</span>
          </div>
          <div className="metric-chip" title="Currently filled cells on player canvas">
            <span className="metric-chip__label">Canvas Cells</span>
            <span className="metric-chip__value metric-chip__value--player">{playerFilledCount} / 25</span>
          </div>
          <div className="metric-chip" title="Total code executions on this puzzle">
            <span className="metric-chip__label">Runs</span>
            <span className="metric-chip__value">{attempts}</span>
          </div>
        </div>

        <div className="puzzle-info-bar__actions">
          <button
            className="info-action-btn"
            onClick={onOpenApiHelp}
            title="View quick API reference and syntax tips"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span>API Cheat Sheet</span>
          </button>
          <button
            className="info-action-btn info-action-btn--reset"
            onClick={onResetCode}
            title="Reset code editor back to starter template"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            <span>Reset Code</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PuzzleInfoBar;
