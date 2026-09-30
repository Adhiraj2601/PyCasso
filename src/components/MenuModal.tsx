// MenuModal.tsx — Hamburger menu drawer with puzzle archive, search filter, how to play, and stats

import React, { useState, useEffect, useMemo } from 'react';
import { PUZZLES } from '../engine/puzzles';
import type { Puzzle } from '../engine/puzzles';
import { loadProgress } from '../engine/gameLogic';
import PaletteLogo from './PaletteLogo';
import { StarIcon, HeartIcon, SnowflakeIcon, MoonIcon } from './GridIcons';

interface MenuModalProps {
  currentPuzzleId: number;
  onSelectPuzzle: (puzzle: Puzzle) => void;
  onClose: () => void;
}

const COLORS = [
  { name: 'white', hex: '#f5f5f5', border: '#bbb' },
  { name: 'black', hex: '#1a1a1a', border: '#444' },
  { name: 'blue', hex: '#3498db' },
  { name: 'orange', hex: '#e67e22' },
  { name: 'red', hex: '#e74c3c' },
  { name: 'green', hex: '#2ecc71' },
  { name: 'yellow', hex: '#f1c40f' },
  { name: 'purple', hex: '#9b59b6' },
  { name: 'pink', hex: '#e91e8a' },
  { name: 'cyan', hex: '#1abc9c' },
  { name: 'gray', hex: '#7f8c8d' },
  { name: 'brown', hex: '#8b4513' },
];

const MenuModal: React.FC<MenuModalProps> = ({
  currentPuzzleId,
  onSelectPuzzle,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'puzzles' | 'howToPlay' | 'stats'>('puzzles');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'solved' | 'unsolved'>('all');

  // Handle Escape key to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Compute stats
  let totalSolved = 0;
  let totalPlayed = 0;
  let totalAttempts = 0;

  PUZZLES.forEach((p) => {
    const prog = loadProgress(p.id);
    if (prog) {
      totalPlayed++;
      if (prog.completed) {
        totalSolved++;
        totalAttempts += prog.attempts;
      }
    }
  });

  const avgAttempts = totalSolved > 0 ? (totalAttempts / totalSolved).toFixed(1) : '0';
  const completionPercentage = Math.round((totalSolved / PUZZLES.length) * 100);

  // Filtered puzzle list
  const filteredPuzzles = useMemo(() => {
    return PUZZLES.filter((p) => {
      const prog = loadProgress(p.id);
      const isSolved = !!prog?.completed;

      if (filterMode === 'solved' && !isSolved) return false;
      if (filterMode === 'unsolved' && isSolved) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return p.title.toLowerCase().includes(q) || String(p.id).includes(q);
    });
  }, [searchQuery, filterMode]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="menu-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="menu-drawer__header">
          <div className="menu-drawer__brand">
            <PaletteLogo className="header__logo" size={26} />
            <div>
              <h2 className="menu-drawer__title">Pycasso Laboratory</h2>
              <span className="menu-drawer__subtitle">Python Pixel Drafting Game</span>
            </div>
          </div>
          <button className="menu-drawer__close-btn" onClick={onClose} aria-label="Close menu" title="Close (Esc)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="menu-drawer__tabs">
          <button
            className={`menu-drawer__tab ${activeTab === 'puzzles' ? 'menu-drawer__tab--active' : ''}`}
            onClick={() => setActiveTab('puzzles')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
            </svg>
            <span>Archive ({PUZZLES.length})</span>
          </button>

          <button
            className={`menu-drawer__tab ${activeTab === 'howToPlay' ? 'menu-drawer__tab--active' : ''}`}
            onClick={() => setActiveTab('howToPlay')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            <span>How to Play & API</span>
          </button>

          <button
            className={`menu-drawer__tab ${activeTab === 'stats' ? 'menu-drawer__tab--active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
            <span>Statistics</span>
          </button>
        </div>

        {/* Content */}
        <div className="menu-drawer__content">
          {/* TAB 1: PUZZLE ARCHIVE */}
          {activeTab === 'puzzles' && (
            <div className="puzzle-archive">
              {/* Overall Progress Bar */}
              <div className="archive-progress">
                <div className="archive-progress__meta">
                  <span>Overall Mastery</span>
                  <span><strong>{totalSolved}</strong> of {PUZZLES.length} Solved ({completionPercentage}%)</span>
                </div>
                <div className="archive-progress__track">
                  <div
                    className="archive-progress__bar"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>

              {/* Controls: Search + Filter Chips */}
              <div className="archive-controls">
                <div className="archive-search">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search puzzle name or #..."
                    className="archive-search__input"
                  />
                  {searchQuery && (
                    <button className="archive-search__clear" onClick={() => setSearchQuery('')}>×</button>
                  )}
                </div>

                <div className="archive-filters">
                  <button
                    className={`archive-filter-btn ${filterMode === 'all' ? 'archive-filter-btn--active' : ''}`}
                    onClick={() => setFilterMode('all')}
                  >
                    All ({PUZZLES.length})
                  </button>
                  <button
                    className={`archive-filter-btn ${filterMode === 'solved' ? 'archive-filter-btn--active' : ''}`}
                    onClick={() => setFilterMode('solved')}
                  >
                    Solved ({totalSolved})
                  </button>
                  <button
                    className={`archive-filter-btn ${filterMode === 'unsolved' ? 'archive-filter-btn--active' : ''}`}
                    onClick={() => setFilterMode('unsolved')}
                  >
                    Unsolved ({PUZZLES.length - totalSolved})
                  </button>
                </div>
              </div>

              {/* Puzzle Cards Grid */}
              <div className="puzzle-archive__grid">
                {filteredPuzzles.length === 0 ? (
                  <div className="archive-empty">No puzzles match your filter.</div>
                ) : (
                  filteredPuzzles.map((p) => {
                    const prog = loadProgress(p.id);
                    const isCurrent = p.id === currentPuzzleId;
                    const isSolved = !!prog?.completed;
                    const targetCells = p.targetGrid.flat().filter((c) => c.color !== 'black' || !!c.icon).length;

                    return (
                      <button
                        key={p.id}
                        className={`puzzle-archive__card ${
                          isCurrent ? 'puzzle-archive__card--current' : ''
                        } ${isSolved ? 'puzzle-archive__card--solved' : ''}`}
                        onClick={() => onSelectPuzzle(p)}
                      >
                        <div className="puzzle-archive__card-top">
                          <span className="puzzle-archive__card-num">#{p.id}</span>
                          {isSolved ? (
                            <span className="puzzle-archive__badge">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              SOLVED
                            </span>
                          ) : isCurrent ? (
                            <span className="puzzle-archive__badge puzzle-archive__badge--active">PLAYING</span>
                          ) : (
                            <span className="puzzle-archive__card-cells">{targetCells} cells</span>
                          )}
                        </div>

                        <div className="puzzle-archive__card-title">{p.title}</div>
                        {prog && prog.attempts > 0 && (
                          <div className="puzzle-archive__card-footer">
                            <span>{prog.attempts} attempt{prog.attempts > 1 ? 's' : ''}</span>
                            {prog.accuracy > 0 && <span>{prog.accuracy}%</span>}
                          </div>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB 2: HOW TO PLAY & API */}
          {activeTab === 'howToPlay' && (
            <div className="how-to-play">
              <div className="guide-card">
                <h3 className="guide-card__title">
                  <span className="guide-card__icon">🎯</span>
                  The Objective
                </h3>
                <p>
                  Pycasso is a Python pixel-art drafting laboratory! Recreate the <strong>Target Pattern</strong> on the left onto <strong>Your Canvas</strong> on the right using standard Python scripts.
                </p>
              </div>

              <div className="guide-card">
                <h3 className="guide-card__title">
                  <span className="guide-card__icon">⚡</span>
                  The API: <code>pydle()</code>
                </h3>
                <div className="code-block">
                  <code>pydle(x, y, symbol="", color="white")</code>
                </div>
                <ul className="guide-list">
                  <li><strong>x, y</strong>: 0 to 4 (5×5 grid coordinates, <code>x</code> = row index, <code>y</code> = column index).</li>
                  <li><strong>symbol</strong>: <code>""</code>, <code>"star"</code>, <code>"heart"</code>, <code>"snowflake"</code>, <code>"moon"</code>.</li>
                  <li><strong>color</strong>: <code>"white"</code>, <code>"black"</code>, <code>"blue"</code>, <code>"orange"</code>, <code>"red"</code>, <code>"green"</code>, <code>"yellow"</code>, <code>"purple"</code>, <code>"pink"</code>, <code>"cyan"</code>, <code>"gray"</code>, <code>"brown"</code>.</li>
                </ul>
              </div>

              <div className="guide-card">
                <h3 className="guide-card__title">
                  <span className="guide-card__icon">🎨</span>
                  Color Palette Reference
                </h3>
                <div className="palette-grid">
                  {COLORS.map((c) => (
                    <div key={c.name} className="palette-chip">
                      <span className="palette-chip__color" style={{ backgroundColor: c.hex, border: c.border ? `1px solid ${c.border}` : 'none' }} />
                      <code>{c.name}</code>
                    </div>
                  ))}
                </div>
              </div>

              <div className="guide-card">
                <h3 className="guide-card__title">
                  <span className="guide-card__icon">✨</span>
                  Available Symbols
                </h3>
                <div className="symbols-palette">
                  <div className="symbols-palette__item">
                    <StarIcon color="#f1c40f" />
                    <code>"star"</code>
                  </div>
                  <div className="symbols-palette__item">
                    <HeartIcon color="#e74c3c" />
                    <code>"heart"</code>
                  </div>
                  <div className="symbols-palette__item">
                    <SnowflakeIcon color="#1abc9c" />
                    <code>"snowflake"</code>
                  </div>
                  <div className="symbols-palette__item">
                    <MoonIcon color="#3498db" />
                    <code>"moon"</code>
                  </div>
                </div>
              </div>

              <div className="guide-card">
                <h3 className="guide-card__title">
                  <span className="guide-card__icon">💡</span>
                  Python Tips & Tricks
                </h3>
                <div className="code-block code-block--example">
                  <pre>
{`# 1. Use nested loops for patterns:
for r in range(5):
    for c in range(5):
        if (r + c) % 2 == 0:
            pydle(r, c, "", "white")

# 2. Coordinates:
# (0, 0) is top-left, (4, 4) is bottom-right.`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: STATS */}
          {activeTab === 'stats' && (
            <div className="stats-view">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-card__value">{totalSolved} / {PUZZLES.length}</div>
                  <div className="stat-card__label">Puzzles Solved</div>
                </div>
                <div className="stat-card">
                  <div className="stat-card__value">{completionPercentage}%</div>
                  <div className="stat-card__label">Mastery Rate</div>
                </div>
                <div className="stat-card">
                  <div className="stat-card__value">{totalPlayed}</div>
                  <div className="stat-card__label">Puzzles Attempted</div>
                </div>
                <div className="stat-card">
                  <div className="stat-card__value">{avgAttempts}</div>
                  <div className="stat-card__label">Avg. Runs / Win</div>
                </div>
                <div className="stat-card">
                  <div className="stat-card__value">{totalAttempts}</div>
                  <div className="stat-card__label">Total Runs</div>
                </div>
                <div className="stat-card">
                  <div className="stat-card__value">5×5</div>
                  <div className="stat-card__label">Matrix Dimensions</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with GitHub Link */}
        <div className="menu-drawer__footer">
          <a
            href="https://github.com/Adhiraj2601/PyCasso"
            target="_blank"
            rel="noopener noreferrer"
            className="menu-drawer__repo-link"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub: Adhiraj2601/PyCasso</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
