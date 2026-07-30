// DualGridView — side-by-side target and player grids

import React from 'react';
import type { CellData } from '../engine/puzzles';
import GridDisplay from './GridDisplay';

interface DualGridViewProps {
  targetGrid: CellData[][];
  playerGrid: CellData[][];
  isMatched: boolean;
}

const DualGridView: React.FC<DualGridViewProps> = ({
  targetGrid,
  playerGrid,
  isMatched,
}) => {
  return (
    <div className="dual-grid">
      <GridDisplay grid={targetGrid} variant="target" />
      <GridDisplay grid={playerGrid} variant="player" isMatched={isMatched} />
    </div>
  );
};

export default DualGridView;
