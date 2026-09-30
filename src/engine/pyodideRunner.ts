// Pyodide runner — loads Python WASM and executes user code safely
// Exposes the pydle() function into the Python global scope

import type { CellData } from './puzzles';
import { createEmptyGrid } from './gameLogic';

// Pyodide type declarations
declare global {
  interface Window {
    loadPyodide: (config?: { indexURL?: string }) => Promise<PyodideInterface>;
  }
}

interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  runPython: (code: string) => unknown;
  globals: {
    set: (name: string, value: unknown) => void;
    get: (name: string) => unknown;
    delete: (name: string) => void;
  };
  setStdout: (config: { batched: (text: string) => void }) => void;
  setStderr: (config: { batched: (text: string) => void }) => void;
  isPyProxy: (obj: unknown) => boolean;
}

let pyodideInstance: PyodideInterface | null = null;
let pyodideLoading: Promise<PyodideInterface> | null = null;

const PYODIDE_CDN = 'https://cdn.jsdelivr.net/pyodide/v0.27.7/full/';
const EXECUTION_TIMEOUT_MS = 3000;

/**
 * Load Pyodide from CDN. Returns the same instance if already loaded.
 */
export async function initPyodide(): Promise<PyodideInterface> {
  if (pyodideInstance) return pyodideInstance;

  if (pyodideLoading) return pyodideLoading;

  pyodideLoading = (async () => {
    // Dynamically load the Pyodide script if not present
    if (!window.loadPyodide) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `${PYODIDE_CDN}pyodide.js`;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Pyodide script'));
        document.head.appendChild(script);
      });
    }

    const pyodide = await window.loadPyodide({
      indexURL: PYODIDE_CDN,
    });

    pyodideInstance = pyodide;
    return pyodide;
  })();

  return pyodideLoading;
}

export interface RunResult {
  playerGrid: CellData[][];
  consoleOutput: string;
  error: string | null;
}

/**
 * Run user Python code with the pydle() function injected.
 * Returns the resulting grid, console output, and any error.
 */
export async function runCode(code: string): Promise<RunResult> {
  const pyodide = await initPyodide();

  const playerGrid = createEmptyGrid(5);
  const consoleLines: string[] = [];
  let error: string | null = null;

  // Capture stdout
  pyodide.setStdout({
    batched: (text: string) => {
      consoleLines.push(text);
    },
  });

  // Capture stderr
  pyodide.setStderr({
    batched: (text: string) => {
      consoleLines.push(`[stderr] ${text}`);
    },
  });

  // Inject the pydle function into Python globals
  const pydleFunction = (x: number, y: number, icon: string = '', color: string = 'black') => {
    // Bounds checking
    const xi = Math.floor(x);
    const yi = Math.floor(y);

    if (xi < 0 || xi > 4 || yi < 0 || yi > 4) {
      consoleLines.push(`⚠ pydle(${x}, ${y}, ...) — coordinates out of bounds (must be 0–4)`);
      return;
    }

    // Set the cell
    playerGrid[xi][yi] = {
      color: String(color).toLowerCase(),
      icon: String(icon).toLowerCase(),
    };
  };

  pyodide.globals.set('pydle', pydleFunction);
  pyodide.globals.set('pydel', pydleFunction); // Alias for common user typo

  // Run with timeout
  try {
    await Promise.race([
      pyodide.runPythonAsync(code),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('⏱ Execution timed out (max 3 seconds). Check for infinite loops.')), EXECUTION_TIMEOUT_MS)
      ),
    ]);
  } catch (err: unknown) {
    if (err instanceof Error) {
      error = err.message;
      // Clean up Python traceback for readability
      const lines = error.split('\n');
      const relevantLines = lines.filter(
        (line) => !line.includes('pyodide') && !line.includes('_pyodide')
      );
      error = relevantLines.length > 0 ? relevantLines.join('\n') : err.message;
    } else {
      error = String(err);
    }
  } finally {
    // Clean up the injected functions
    try {
      pyodide.globals.delete('pydle');
      pyodide.globals.delete('pydel');
    } catch {
      // ignore
    }
  }

  return {
    playerGrid,
    consoleOutput: consoleLines.join('\n'),
    error,
  };
}

/**
 * Check if Pyodide is loaded and ready.
 */
export function isPyodideReady(): boolean {
  return pyodideInstance !== null;
}
