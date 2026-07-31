// MenuModal.tsx — Hamburger menu side drawer with puzzle selector, how to play, and stats

import React, { useState } from 'react';
import { PUZZLES } from '../engine/puzzles';
import type { Puzzle } from '../engine/puzzles';
import { loadProgress } from '../engine/gameLogic';

interface MenuModalProps {
  currentPuzzleId: number;
  onSelectPuzzle: (puzzle: Puzzle) => void;
  onClose: () => void;
}

const MenuModal: React.FC<MenuModalProps> = ({
  currentPuzzleId,
  onSelectPuzzle,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'puzzles' | 'howToPlay' | 'stats'>('puzzles');

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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="menu-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="menu-drawer__header">
          <div className="menu-drawer__brand">
            <svg className="header__logo" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="12" height="12" rx="2" fill="#6366f1" />
              <rect x="18" y="2" width="12" height="12" rx="2" fill="#818cf8" />
              <rect x="2" y="18" width="12" height="12" rx="2" fill="#818cf8" />
              <rect x="18" y="18" width="12" height="12" rx="2" fill="#6366f1" />
            </svg>
            <h2>Pycasso Menu</h2>
          </div>
          <button className="menu-drawer__close-btn" onClick={onClose} aria-label="Close menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
            </svg>
            <span>Puzzles ({PUZZLES.length})</span>
          </button>
          <button
            className={`menu-drawer__tab ${activeTab === 'howToPlay' ? 'menu-drawer__tab--active' : ''}`}
            onClick={() => setActiveTab('howToPlay')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>
            <span>How to Play</span>
          </button>
          <button
            className={`menu-drawer__tab ${activeTab === 'stats' ? 'menu-drawer__tab--active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="20" x2="18" y2="10"/>
              <line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
            <span>Stats</span>
          </button>
        </div>

        {/* Content */}
        <div className="menu-drawer__content">
          {activeTab === 'puzzles' && (
            <div className="puzzle-archive">
              <p className="menu-drawer__section-desc">Select any puzzle from the Pycasso collection:</p>
              <div className="puzzle-archive__grid">
                {PUZZLES.map((p) => {
                  const prog = loadProgress(p.id);
                  const isCurrent = p.id === currentPuzzleId;
                  const isSolved = prog?.completed;

                  return (
                    <button
                      key={p.id}
                      className={`puzzle-archive__card ${isCurrent ? 'puzzle-archive__card--current' : ''} ${isSolved ? 'puzzle-archive__card--solved' : ''}`}
                      onClick={() => onSelectPuzzle(p)}
                    >
                      <div className="puzzle-archive__card-num">#{p.id}</div>
                      <div className="puzzle-archive__card-title">{p.title}</div>
                      {isSolved && <span className="puzzle-archive__badge">SOLVED</span>}
                      {isCurrent && !isSolved && (
                        <span className="puzzle-archive__badge puzzle-archive__badge--active">PLAYING</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'howToPlay' && (
            <div className="how-to-play">
              <h3 className="how-to-play__heading">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
                Goal
              </h3>
              <p>
                Write Python code to reproduce the <strong>Target Grid</strong> pattern on the left onto your <strong>Player Grid</strong> on the right.
              </p>

              <h3 className="how-to-play__heading">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                API Reference
              </h3>
              <div className="code-block">
                <code>pydle(x, y, symbol="", color="white")</code>
              </div>
              <ul>
                <li>
                  <strong>x, y</strong>: 0 to 4 (grid coordinates from top-left)
                </li>
                <li>
                  <strong>color</strong>: <code>"white"</code>, <code>"black"</code>, <code>"red"</code>, <code>"blue"</code>, <code>"green"</code>, <code>"yellow"</code>, <code>"orange"</code>, <code>"purple"</code>, <code>"pink"</code>, <code>"cyan"</code>, <code>"gray"</code>, <code>"brown"</code>
                </li>
                <li>
                  <strong>symbol</strong>: <code>""</code>, <code>"star"</code>, <code>"heart"</code>, <code>"snowflake"</code>, <code>"moon"</code>
                </li>
              </ul>         
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="stats-view">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-card__value">
                    {totalSolved} / {PUZZLES.length}
                  </div>
                  <div className="stat-card__label">Puzzles Solved</div>
                </div>
                <div className="stat-card">
                  <div className="stat-card__value">{totalPlayed}</div>
                  <div className="stat-card__label">Puzzles Attempted</div>
                </div>
                <div className="stat-card">
                  <div className="stat-card__value">{avgAttempts}</div>
                  <div className="stat-card__label">Avg. Attempts / Win</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
