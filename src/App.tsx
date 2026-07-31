// Pycasso — Main App Component
// Orchestrates puzzle state, Pyodide execution, and UI composition

import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import DualGridView from './components/DualGridView';
import CodeEditor from './components/CodeEditor';
import AccuracyBar from './components/AccuracyBar';
import WinModal from './components/WinModal';
import MenuModal from './components/MenuModal';
import {
  getDailyPuzzle,
  createEmptyGrid,
  validateGrid,
  saveProgress,
  loadProgress,
} from './engine/gameLogic';
import { initPyodide, runCode, isPyodideReady } from './engine/pyodideRunner';
import { PUZZLES } from './engine/puzzles';
import type { CellData, Puzzle } from './engine/puzzles';

function App() {
  // --- Puzzle state ---
  const [puzzle, setPuzzle] = useState<Puzzle>(() => getDailyPuzzle(new Date()));

  // --- Game state ---
  const [playerGrid, setPlayerGrid] = useState<CellData[][]>(() => createEmptyGrid(5));
  const [code, setCode] = useState<string>(puzzle.defaultCode);
  const [consoleOutput, setConsoleOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [hasRun, setHasRun] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [showWinModal, setShowWinModal] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  // --- UI state ---
  const [activeTab, setActiveTab] = useState<'code' | 'console'>('code');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [pyodideReady, setPyodideReady] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('Initializing Python runtime…');

  // --- Initialize Pyodide on mount ---
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoadingMessage('Loading Python runtime…');
        await initPyodide();
        if (!cancelled) {
          setPyodideReady(true);
        }
      } catch (err) {
        console.error('Failed to load Pyodide:', err);
        if (!cancelled) {
          setLoadingMessage('Failed to load Python runtime. Please refresh.');
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // --- Load saved progress when puzzle changes ---
  useEffect(() => {
    const progress = loadProgress(puzzle.id);
    if (progress) {
      setCode(progress.code);
      setAttempts(progress.attempts);
      if (progress.completed) {
        setHasWon(true);
      }
    } else {
      setCode(puzzle.defaultCode);
      setAttempts(0);
      setHasWon(false);
    }
    setPlayerGrid(createEmptyGrid(5));
    setAccuracy(0);
    setHasRun(false);
    setConsoleOutput('');
    setError(null);
    setShowWinModal(false);
    setActiveTab('code');
  }, [puzzle]);

  // --- Navigate puzzles ---
  const navigatePuzzle = useCallback(
    (offset: number) => {
      const currentIndex = PUZZLES.findIndex((p) => p.id === puzzle.id);
      const nextIndex = (currentIndex + offset + PUZZLES.length) % PUZZLES.length;
      setPuzzle(PUZZLES[nextIndex]);
    },
    [puzzle.id]
  );

  const canGoNext = true; // Seamless circular navigation across all 31 puzzles

  // --- Run code ---
  const handleRun = useCallback(async () => {
    if (!isPyodideReady() || isRunning) return;

    setIsRunning(true);
    setError(null);
    setConsoleOutput('');
    setHasRun(true);

    try {
      const result = await runCode(code);

      setPlayerGrid(result.playerGrid);
      setConsoleOutput(result.consoleOutput);
      setError(result.error);

      // Validate
      const acc = validateGrid(result.playerGrid, puzzle.targetGrid);
      setAccuracy(acc);

      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (acc === 100 && !result.error) {
        setHasWon(true);
        setShowWinModal(true);
        saveProgress(puzzle.id, code, newAttempts, true, acc);
      } else {
        saveProgress(puzzle.id, code, newAttempts, false, acc);
      }

      // Switch to console tab if there's output or error
      if (result.consoleOutput || result.error) {
        setActiveTab('console');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setActiveTab('console');
    } finally {
      setIsRunning(false);
    }
  }, [code, puzzle, attempts, isRunning]);

  // --- Loading screen ---
  if (!pyodideReady) {
    return (
      <div className="loading-screen">
        <div className="loading-screen__title">🎨 Pycasso</div>
        <div className="loading-screen__bar-container">
          <div className="loading-screen__bar" />
        </div>
        <p className="loading-screen__text">{loadingMessage}</p>
      </div>
    );
  }

  // --- Main UI ---
  return (
    <div className="app">
      <Header
        puzzleId={puzzle.id}
        puzzleTitle={puzzle.title}
        onPrevDay={() => navigatePuzzle(-1)}
        onNextDay={() => navigatePuzzle(1)}
        canGoNext={canGoNext}
        onOpenMenu={() => setShowMenu(true)}
      />

      <DualGridView
        targetGrid={puzzle.targetGrid}
        playerGrid={playerGrid}
        isMatched={hasWon}
      />

      <AccuracyBar accuracy={accuracy} visible={hasRun} />

      <CodeEditor
        code={code}
        onCodeChange={setCode}
        consoleOutput={consoleOutput}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onRun={handleRun}
        isRunning={isRunning}
        error={error}
      />

      {showWinModal && (
        <WinModal
          accuracy={accuracy}
          attempts={attempts}
          puzzleTitle={puzzle.title}
          onClose={() => setShowWinModal(false)}
        />
      )}

      {showMenu && (
        <MenuModal
          currentPuzzleId={puzzle.id}
          onSelectPuzzle={(selectedPuzzle) => {
            setPuzzle(selectedPuzzle);
            setShowMenu(false);
          }}
          onClose={() => setShowMenu(false)}
        />
      )}
    </div>
  );
}

export default App;
