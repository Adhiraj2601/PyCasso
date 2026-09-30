// DualGridView — side-by-side holographic target and player canvases with clean responsive center bridge

import React from 'react';
import type { CellData } from '../engine/puzzles';
import GridDisplay from './GridDisplay';

interface DualGridViewProps {
  targetGrid: CellData[][];
  playerGrid: CellData[][];
  isMatched: boolean;
  accuracy: number;
  hasRun: boolean;
  isRunning: boolean;
}

const DualGridView: React.FC<DualGridViewProps> = ({
  targetGrid,
  playerGrid,
  isMatched,
  accuracy,
  hasRun,
  isRunning,
}) => {
  // Compute filled cell counts
  const targetFilled = targetGrid.flat().filter((c) => c.color !== 'black' || !!c.icon).length;
  const playerFilled = playerGrid.flat().filter((c) => c.color !== 'black' || !!c.icon).length;

  return (
    <div className="dual-grid-section">
      <div className="dual-grid">
        {/* Target Canvas Panel */}
        <GridDisplay
          grid={targetGrid}
          variant="target"
          label="TARGET"
          sublabel="Blueprint Reference"
          filledCount={targetFilled}
        />

        {/* Central Comparison Bridge */}
        <div className="dual-grid__bridge" aria-label={`Match status: ${hasRun ? `${accuracy}%` : 'Not run'}`}>
          {/* Desktop Right Arrow */}
          <div className="bridge-arrow-icon bridge-arrow-icon--h" aria-hidden="true">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="12" x2="20" y2="12" />
              <polyline points="13 5 20 12 13 19" />
            </svg>
          </div>

          {/* Mobile Down Arrow */}
          <div className="bridge-arrow-icon bridge-arrow-icon--v" aria-hidden="true">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="4" x2="12" y2="20" />
              <polyline points="5 13 12 20 19 13" />
            </svg>
          </div>

          <div
            className={`bridge-badge ${
              !hasRun
                ? 'bridge-badge--idle'
                : isMatched
                ? 'bridge-badge--matched'
                : accuracy >= 50
                ? 'bridge-badge--mid'
                : 'bridge-badge--low'
            }`}
          >
            {hasRun ? (
              <>
                <span className="bridge-badge__val">{accuracy}%</span>
                <span className="bridge-badge__txt">{isMatched ? 'MATCH' : 'MATCH'}</span>
              </>
            ) : (
              <span className="bridge-badge__txt">RECREATE</span>
            )}
          </div>
        </div>

        {/* Player Canvas Panel */}
        <GridDisplay
          grid={playerGrid}
          variant="player"
          label="YOUR CANVAS"
          sublabel={
            isRunning
              ? 'Executing code…'
              : isMatched
              ? 'Pattern matched!'
              : 'Interactive Pyodide output'
          }
          filledCount={playerFilled}
          isMatched={isMatched}
          isUpdating={isRunning}
        />
      </div>
    </div>
  );
};

export default DualGridView;
