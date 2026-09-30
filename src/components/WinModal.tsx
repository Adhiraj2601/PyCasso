// WinModal — celebration modal shown on 100% match

import React, { useEffect, useState } from 'react';

interface WinModalProps {
  accuracy: number;
  attempts: number;
  puzzleTitle: string;
  onClose: () => void;
}

// Confetti piece component
const ConfettiPiece: React.FC<{ index: number }> = ({ index }) => {
  const colors = ['#6c5ce7', '#a29bfe', '#2ecc71', '#f39c12', '#e74c3c', '#3498db', '#e91e8a', '#1abc9c'];
  const style: React.CSSProperties = {
    left: `${Math.random() * 100}%`,
    backgroundColor: colors[index % colors.length],
    width: `${6 + Math.random() * 8}px`,
    height: `${6 + Math.random() * 8}px`,
    borderRadius: Math.random() > 0.5 ? '50%' : '2px',
    animationDuration: `${1.5 + Math.random() * 2}s`,
    animationDelay: `${Math.random() * 0.5}s`,
  };

  return <div className="confetti-piece" style={style} />;
};

const WinModal: React.FC<WinModalProps> = ({
  accuracy,
  attempts,
  puzzleTitle,
  onClose,
}) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = async () => {
    const text = `Pycasso — ${puzzleTitle}\nSolved in ${attempts} attempt${attempts !== 1 ? 's' : ''}!\n${accuracy}% accuracy`;
    
    try {
      if (navigator.share) {
        await navigator.share({ text });
      } else {
        await navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
      }
    } catch {
      // User cancelled share
    }
  };

  return (
    <>
      {/* Confetti */}
      {showConfetti && (
        <div className="confetti-container">
          {Array.from({ length: 40 }).map((_, i) => (
            <ConfettiPiece key={i} index={i} />
          ))}
        </div>
      )}

      {/* Modal overlay */}
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal__icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
              <path d="M4 22h16"/>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
            </svg>
          </div>
          <h2 className="modal__title">Puzzle Complete!</h2>
          <p className="modal__message">
            You've successfully recreated the <strong>{puzzleTitle}</strong> pattern!
          </p>

          <div className="modal__stats">
            <div className="modal__stat">
              <div className="modal__stat-value">{accuracy}%</div>
              <div className="modal__stat-label">Accuracy</div>
            </div>
            <div className="modal__stat">
              <div className="modal__stat-value">{attempts}</div>
              <div className="modal__stat-label">Attempts</div>
            </div>
          </div>

          <div className="modal__actions">
            <button className="modal__btn modal__btn--primary" onClick={handleShare}>
              Share
            </button>
            <button className="modal__btn modal__btn--secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WinModal;
