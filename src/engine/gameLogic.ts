// Game logic: daily puzzle selection, validation, localStorage persistence

import { PUZZLES } from './puzzles';
import type { Puzzle, CellData } from './puzzles';

/**
 * Simple hash function for deterministic puzzle selection from a date string.
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Format a Date to YYYY-MM-DD string
 */
export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Get the puzzle for a specific date. Uses a deterministic hash to pick from
 * the puzzle pool, so each day always yields the same puzzle.
 */
export function getDailyPuzzle(date: Date): Puzzle {
  const dateStr = formatDate(date);
  const hash = hashString(dateStr);
  const index = hash % PUZZLES.length;
  return PUZZLES[index];
}

/**
 * Get a puzzle by navigating offset days from a reference date.
 */
export function getPuzzleByOffset(referenceDate: Date, offsetDays: number): { puzzle: Puzzle; date: Date } {
  const newDate = new Date(referenceDate);
  newDate.setDate(newDate.getDate() + offsetDays);
  return { puzzle: getDailyPuzzle(newDate), date: newDate };
}

/**
 * Create an empty 5x5 grid filled with black cells.
 */
export function createEmptyGrid(size: number = 5): CellData[][] {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({ color: 'black', icon: '' }))
  );
}

/**
 * Validate the player's grid against the target grid.
 * Returns accuracy as a percentage (0–100).
 */
export function validateGrid(playerGrid: CellData[][], targetGrid: CellData[][]): number {
  const size = targetGrid.length;
  let matches = 0;
  let total = 0;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      total++;
      const target = targetGrid[row][col];
      const player = playerGrid[row]?.[col];

      if (!player) continue;

      const colorMatch = target.color.toLowerCase() === player.color.toLowerCase();
      const iconMatch = (target.icon || '').toLowerCase() === (player.icon || '').toLowerCase();

      if (colorMatch && iconMatch) {
        matches++;
      }
    }
  }

  return Math.round((matches / total) * 100);
}

// --- localStorage persistence ---

interface ProgressData {
  puzzleId: number;
  code: string;
  attempts: number;
  completed: boolean;
  accuracy: number;
  completedAt?: string;
}

const STORAGE_KEY = 'pycasso_progress';

function getAllProgress(): Record<string, ProgressData> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveProgress(puzzleId: number, code: string, attempts: number, completed: boolean, accuracy: number): void {
  const all = getAllProgress();
  all[String(puzzleId)] = {
    puzzleId,
    code,
    attempts,
    completed,
    accuracy,
    completedAt: completed ? new Date().toISOString() : undefined,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function loadProgress(puzzleId: number): ProgressData | null {
  const all = getAllProgress();
  return all[String(puzzleId)] || null;
}

export function isCompleted(puzzleId: number): boolean {
  const progress = loadProgress(puzzleId);
  return progress?.completed || false;
}
