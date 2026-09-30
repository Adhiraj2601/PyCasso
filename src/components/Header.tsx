// Header component — compact top navigation bar with brand, puzzle index, and drawer trigger

import React from 'react';
import PaletteLogo from './PaletteLogo';

interface HeaderProps {
  puzzleId: number;
  totalPuzzles: number;
  isSolved: boolean;
  onPrevDay: () => void;
  onNextDay: () => void;
  canGoNext: boolean;
  onOpenMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({
  puzzleId,
  totalPuzzles,
  isSolved,
  onPrevDay,
  onNextDay,
  canGoNext,
  onOpenMenu,
}) => {
  return (
    <header className="header">
      <div className="header__inner">
        {/* Left: Menu & Archive Button */}
        <div className="header__left">
          <button
            className="header__menu-btn"
            onClick={onOpenMenu}
            aria-label="Open menu and puzzle archive"
            title="Browse all puzzles, stats, and how to play"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <span className="header__menu-text">Archive & Guide</span>
          </button>
        </div>

        {/* Center: Brand & Puzzle ID */}
        <div className="header__center">
          <div className="header__brand">
            <PaletteLogo className="header__logo" size={24} />
            <span className="header__brand-title">Pycasso</span>
            <span className="header__id-pill">#{puzzleId}</span>
          </div>
        </div>

        {/* Right: Solved Status & Navigation Controls */}
        <div className="header__right">
          <div className={`header__status-badge ${isSolved ? 'header__status-badge--solved' : ''}`}>
            {isSolved ? (
              <>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Solved</span>
              </>
            ) : (
              <>
                <span className="header__status-dot" />
                <span>In Progress</span>
              </>
            )}
          </div>

          <div className="header__nav-group">
            <button
              className="header__nav-btn"
              onClick={onPrevDay}
              aria-label="Previous puzzle"
              title="Previous puzzle (Ctrl+Left)"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <span className="header__counter">
              {puzzleId} <span className="header__counter-total">/ {totalPuzzles}</span>
            </span>
            <button
              className="header__nav-btn"
              onClick={onNextDay}
              disabled={!canGoNext}
              aria-label="Next puzzle"
              title="Next puzzle (Ctrl+Right)"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
