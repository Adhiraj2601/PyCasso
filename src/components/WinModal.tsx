// WinModal — celebration modal shown on 100% match with next puzzle action

import React, { useEffect, useState } from 'react';

interface WinModalProps {
  accuracy: number;
  attempts: number;
  puzzleId: number;
  puzzleTitle: string;
  onClose: () => void;
  onNextPuzzle: () => void;
  canGoNext: boolean;
}

// Confetti piece component with gentle physics
const ConfettiPiece: React.FC<{ index: number }> = ({ index }) => {
  const colors = ['#6366f1', '#a855f7', '#10b981', '#f59e0b', '#38bdf8', '#ec4899', '#14b8a6'];
  const style: React.CSSProperties = {
    left: `${Math.random() * 100}%`,
    backgroundColor: colors[index % colors.length],
    width: `${6 + Math.random() * 6}px`,
    height: `${6 + Math.random() * 8}px`,
    borderRadius: Math.random() > 0.5 ? '50%' : '2px',
    animationDuration: `${1.6 + Math.random() * 2}s`,
    animationDelay: `${Math.random() * 0.4}s`,
  };

  return <div className="confetti-piece" style={style} />;
};

const WinModal: React.FC<WinModalProps> = ({
  accuracy,
  attempts,
  puzzleId,
  puzzleTitle,
  onClose,
  onNextPuzzle,
  canGoNext,
}) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = async () => {
    const text = `🎨 Pycasso #${puzzleId}: "${puzzleTitle}"\n✓ Solved in ${attempts} attempt${attempts !== 1 ? 's' : ''}!\nMatch: ${accuracy}%\nTry it: https://py-casso.vercel.app/`;

    try {
      if (navigator.share) {
        await navigator.share({ text });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // User cancelled share
    }
  };

  return (
    <>
      {/* Gentle celebratory particle effect */}
      {showConfetti && (
        <div className="confetti-container">
          {Array.from({ length: 32 }).map((_, i) => (
            <ConfettiPiece key={i} index={i} />
          ))}
        </div>
      )}

      {/* Modal overlay */}
      <div className="modal-overlay" onClick={onClose}>
        <div className="win-modal" onClick={(e) => e.stopPropagation()}>
          <div className="win-modal__trophy">
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
            </svg>
          </div>

          <div className="win-modal__badge">MISSION COMPLETE</div>
          <h2 className="win-modal__title">Pattern Recreated!</h2>
          <p className="win-modal__subtitle">
            You successfully drafted <strong>{puzzleTitle}</strong> in the Python sandbox.
          </p>

          <div className="win-modal__stats">
            <div className="win-stat-card">
              <span className="win-stat-card__val">100%</span>
              <span className="win-stat-card__lbl">Accuracy</span>
            </div>
            <div className="win-stat-card">
              <span className="win-stat-card__val">{attempts}</span>
              <span className="win-stat-card__lbl">Attempts</span>
            </div>
            <div className="win-stat-card">
              <span className="win-stat-card__val">#{puzzleId}</span>
              <span className="win-stat-card__lbl">Puzzle ID</span>
            </div>
          </div>

          <div className="win-modal__actions">
            {canGoNext && (
              <button
                className="win-btn win-btn--primary"
                onClick={onNextPuzzle}
              >
                <span>Next Puzzle</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            )}

            <button className="win-btn win-btn--secondary" onClick={handleShare}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              <span>{copied ? 'Copied to Clipboard!' : 'Share Result'}</span>
            </button>

            <button className="win-btn win-btn--ghost" onClick={onClose}>
              Review Code
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WinModal;
