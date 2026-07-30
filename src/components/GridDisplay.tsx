// GridDisplay component — renders a 5x5 grid of colored cells with optional icons

import React from 'react';
import type { CellData } from '../engine/puzzles';
import { getIconComponent, getIconColor } from './GridIcons';

interface GridDisplayProps {
  grid: CellData[][];
  variant: 'target' | 'player';
  isMatched?: boolean;
}

const GridDisplay: React.FC<GridDisplayProps> = ({ grid, variant, isMatched = false }) => {
  const containerClass = [
    'grid-container',
    `grid-container--${variant}`,
    isMatched ? 'grid-container--matched' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClass}>
      <div className="grid">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const IconComponent = getIconComponent(cell.icon);
            const iconColor = getIconColor(cell.color);

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`grid-cell grid-cell--${cell.color}`}
                title={`(${rowIndex}, ${colIndex}) ${cell.color}${cell.icon ? ` + ${cell.icon}` : ''}`}
              >
                {IconComponent && (
                  <div className="grid-cell__icon">
                    <IconComponent color={iconColor} />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default GridDisplay;
