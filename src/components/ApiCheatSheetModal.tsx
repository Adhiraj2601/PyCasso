// ApiCheatSheetModal.tsx — Quick reference overlay for pydle() API, colors, and symbols

import React from 'react';
import { StarIcon, HeartIcon, SnowflakeIcon, MoonIcon } from './GridIcons';

interface ApiCheatSheetModalProps {
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

const ApiCheatSheetModal: React.FC<ApiCheatSheetModalProps> = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="api-modal" onClick={(e) => e.stopPropagation()}>
        <div className="api-modal__header">
          <div className="api-modal__title-group">
            <span className="api-modal__icon">⚡</span>
            <h3>Pycasso API Cheat Sheet</h3>
          </div>
          <button className="api-modal__close-btn" onClick={onClose} aria-label="Close API reference">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="api-modal__body">
          {/* Function Signature */}
          <div className="api-section">
            <h4 className="api-section__title">Drawing Function</h4>
            <div className="api-code-block">
              <code>pydle(x, y, symbol="", color="white")</code>
            </div>
            <p className="api-section__desc">
              Paints cell at coordinate <code>(x, y)</code> with the specified <code>color</code> and optional <code>symbol</code>.
            </p>
          </div>

          {/* Coordinate System */}
          <div className="api-section">
            <h4 className="api-section__title">Coordinates (5×5 Grid)</h4>
            <div className="api-coords-demo">
              <div className="coord-chip">Top-Left: (0, 0)</div>
              <div className="coord-chip">Center: (2, 2)</div>
              <div className="coord-chip">Bottom-Right: (4, 4)</div>
            </div>
            <p className="api-section__desc">
              <code>x</code> is row (0 to 4 from top to bottom), <code>y</code> is column (0 to 4 from left to right).
            </p>
          </div>

          {/* Supported Colors */}
          <div className="api-section">
            <h4 className="api-section__title">Available Colors</h4>
            <div className="api-colors-grid">
              {COLORS.map((c) => (
                <div key={c.name} className="color-pill" title={`"${c.name}"`}>
                  <span
                    className="color-pill__swatch"
                    style={{
                      backgroundColor: c.hex,
                      border: c.border ? `1px solid ${c.border}` : 'none',
                    }}
                  />
                  <code className="color-pill__name">{c.name}</code>
                </div>
              ))}
            </div>
          </div>

          {/* Supported Symbols */}
          <div className="api-section">
            <h4 className="api-section__title">Available Symbols</h4>
            <div className="api-symbols-grid">
              <div className="symbol-pill">
                <StarIcon color="#f1c40f" />
                <code>"star"</code>
              </div>
              <div className="symbol-pill">
                <HeartIcon color="#e74c3c" />
                <code>"heart"</code>
              </div>
              <div className="symbol-pill">
                <SnowflakeIcon color="#1abc9c" />
                <code>"snowflake"</code>
              </div>
              <div className="symbol-pill">
                <MoonIcon color="#3498db" />
                <code>"moon"</code>
              </div>
              <div className="symbol-pill">
                <span className="symbol-pill__empty">∅</span>
                <code>"" (none)</code>
              </div>
            </div>
          </div>

          {/* Quick Examples */}
          <div className="api-section">
            <h4 className="api-section__title">Common Python Patterns</h4>
            <div className="api-code-snippet">
              <pre>
{`# Fill entire grid blue
for x in range(5):
    for y in range(5):
        pydle(x, y, "", "blue")

# Draw diagonal with stars
for i in range(5):
    pydle(i, i, "star", "yellow")`}
              </pre>
            </div>
          </div>
        </div>

        <div className="api-modal__footer">
          <button className="api-modal__btn" onClick={onClose}>
            Got it, Back to Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiCheatSheetModal;
