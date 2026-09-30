// Pycasso — Main App Component
// Orchestrates puzzle state, Pyodide execution, game logic, and responsive UI composition

import { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import PuzzleInfoBar from './components/PuzzleInfoBar';
import DualGridView from './components/DualGridView';
import CodeEditor from './components/CodeEditor';
import AccuracyBar from './components/AccuracyBar';
import WinModal from './components/WinModal';
import MenuModal from './components/MenuModal';
import ApiCheatSheetModal from './components/ApiCheatSheetModal';
import HamsterLoader from './components/HamsterLoader';
import {
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
  const [puzzle, setPuzzle] = useState<Puzzle>(PUZZLES[0]);

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
  const [showApiModal, setShowApiModal] = useState<boolean>(false);

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
        setLoadingMessage('Loading Python WASM environment…');
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

  // Keyboard navigation for puzzles: Ctrl/Cmd + ArrowLeft / ArrowRight
  useEffect(() => {
    const handleGlobalKeys = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowLeft') {
        e.preventDefault();
        navigatePuzzle(-1);
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowRight') {
        e.preventDefault();
        navigatePuzzle(1);
      }
    };
    window.addEventListener('keydown', handleGlobalKeys);
    return () => window.removeEventListener('keydown', handleGlobalKeys);
  }, [navigatePuzzle]);

  const canGoNext = true; // Circular navigation across all 31 puzzles

  // Reset code handler
  const handleResetCode = useCallback(() => {
    setCode(puzzle.defaultCode);
    setPlayerGrid(createEmptyGrid(5));
    setAccuracy(0);
    setHasRun(false);
    setError(null);
    setConsoleOutput('');
  }, [puzzle.defaultCode]);

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

  // Compute filled cell counts for the info bar & diagnostics
  const targetFilledCount = useMemo(() => {
    return puzzle.targetGrid.flat().filter((c) => c.color !== 'black' || !!c.icon).length;
  }, [puzzle.targetGrid]);

  const playerFilledCount = useMemo(() => {
    return playerGrid.flat().filter((c) => c.color !== 'black' || !!c.icon).length;
  }, [playerGrid]);

  // --- Loading screen ---
  if (!pyodideReady) {
    return (
      <div className="loading-screen">
        <div className="loading-screen__title">Pycasso</div>
        <HamsterLoader />
        <p className="loading-screen__text">{loadingMessage}</p>
      </div>
    );
  }

  // --- Main UI ---
  return (
    <div className="app">
      {/* 1. Compact Header */}
      <Header
        puzzleId={puzzle.id}
        totalPuzzles={PUZZLES.length}
        isSolved={hasWon}
        onPrevDay={() => navigatePuzzle(-1)}
        onNextDay={() => navigatePuzzle(1)}
        canGoNext={canGoNext}
        onOpenMenu={() => setShowMenu(true)}
      />

      {/* 2. Unified Puzzle Info Bar */}
      <PuzzleInfoBar
        puzzleId={puzzle.id}
        puzzleTitle={puzzle.title}
        targetFilledCount={targetFilledCount}
        playerFilledCount={playerFilledCount}
        attempts={attempts}
      />

      {/* 3. Central Dual Canvases (Visual Core) */}
      <DualGridView
        targetGrid={puzzle.targetGrid}
        playerGrid={playerGrid}
        isMatched={hasWon}
        accuracy={accuracy}
        hasRun={hasRun}
        isRunning={isRunning}
      />

      {/* 4. Match Feedback & Accuracy Diagnostics */}
      <AccuracyBar
        accuracy={accuracy}
        visible={hasRun}
        targetCount={targetFilledCount}
        playerCount={playerFilledCount}
      />

      {/* 5. Unified Code Editor & Terminal */}
      <CodeEditor
        code={code}
        onCodeChange={setCode}
        consoleOutput={consoleOutput}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onRun={handleRun}
        onReset={handleResetCode}
        onOpenHelp={() => setShowApiModal(true)}
        isRunning={isRunning}
        error={error}
        accuracy={accuracy}
        hasRun={hasRun}
      />

      {/* Victory Celebration Modal */}
      {showWinModal && (
        <WinModal
          accuracy={accuracy}
          attempts={attempts}
          puzzleId={puzzle.id}
          puzzleTitle={puzzle.title}
          onClose={() => setShowWinModal(false)}
          onNextPuzzle={() => {
            setShowWinModal(false);
            navigatePuzzle(1);
          }}
          canGoNext={canGoNext}
        />
      )}

      {/* Menu / Puzzle Archive Drawer */}
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

      {/* Quick API Reference Modal */}
      {showApiModal && (
        <ApiCheatSheetModal onClose={() => setShowApiModal(false)} />
      )}
    </div>
  );
}

export default App;
