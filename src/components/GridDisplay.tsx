// GridDisplay component — renders a 5x5 holographic drafting pad with header, cell counters, and icons

import React from 'react';
import type { CellData } from '../engine/puzzles';
import { getIconComponent, getIconColor } from './GridIcons';

interface GridDisplayProps {
  grid: CellData[][];
  variant: 'target' | 'player';
  label: string;
  sublabel: string;
  filledCount: number;
  isMatched?: boolean;
  isUpdating?: boolean;
}

const GridDisplay: React.FC<GridDisplayProps> = ({
  grid,
  variant,
  label,
  sublabel,
  filledCount,
  isMatched = false,
  isUpdating = false,
}) => {
  const containerClasses = [
    'canvas-panel',
    `canvas-panel--${variant}`,
    isMatched ? 'canvas-panel--matched' : '',
    isUpdating ? 'canvas-panel--updating' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      {/* Panel Header */}
      <div className="canvas-panel__header">
        <div className="canvas-panel__header-left">
          <span className={`canvas-panel__dot canvas-panel__dot--${variant}`} />
          <div className="canvas-panel__titles">
            <span className="canvas-panel__title">{label}</span>
            <span className="canvas-panel__sublabel">{sublabel}</span>
          </div>
        </div>
        <div className="canvas-panel__header-right">
          <span className="canvas-panel__cell-count" title="Filled cells / Total grid size">
            {filledCount} <span className="canvas-panel__cell-count-total">/ 25</span>
          </span>
        </div>
      </div>

      {/* Grid Canvas Wrapper */}
      <div className="canvas-panel__bezel">
        <div className="grid">
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const IconComponent = getIconComponent(cell.icon);
              const iconColor = getIconColor(cell.color);
              const isFilled = cell.color !== 'black' || !!cell.icon;

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`grid-cell grid-cell--${cell.color} ${isFilled ? 'grid-cell--filled' : 'grid-cell--empty'}`}
                  title={`[${rowIndex}, ${colIndex}] ${cell.color}${cell.icon ? ` • ${cell.icon}` : ''}`}
                >
                  {/* Subtle coordinate dot for empty cells */}
                  {!isFilled && <span className="grid-cell__empty-dot" />}

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
    </div>
  );
};

export default GridDisplay;
