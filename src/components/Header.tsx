// Header component — title bar with navigation, hamburger menu, puzzle info

import React from 'react';
import PaletteLogo from './PaletteLogo';

interface HeaderProps {
  puzzleId: number;
  puzzleTitle: string;
  onPrevDay: () => void;
  onNextDay: () => void;
  canGoNext: boolean;
  onOpenMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({
  puzzleId,
  puzzleTitle,
  onPrevDay,
  onNextDay,
  canGoNext,
  onOpenMenu,
}) => {
  return (
    <header className="header">
      {/* Hamburger menu */}
      <button className="header__menu-btn" onClick={onOpenMenu} aria-label="Menu" title="Menu">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <div className="header__top-bar">
        {/* Previous day arrow */}
        <button
          className="header__nav-btn"
          onClick={onPrevDay}
          aria-label="Previous puzzle"
          title="Previous day"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Logo + Title */}
        <h1 className="header__title">
          <PaletteLogo className="header__logo" size={28} />
          Pycasso #{puzzleId}
        </h1>

        {/* Next day arrow */}
        <button
          className="header__nav-btn"
          onClick={onNextDay}
          disabled={!canGoNext}
          aria-label="Next puzzle"
          title="Next day"
          style={{ opacity: canGoNext ? 1 : 0.3 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Puzzle subtitle */}
      <p className="header__subtitle">{puzzleTitle}</p>

      <hr className="header__divider" />
    </header>
  );
};

export default Header;
