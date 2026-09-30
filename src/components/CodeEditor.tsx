// CodeEditor component — CodeMirror editor + Console tabs + Run button + Shortcuts

import React, { useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';

interface CodeEditorProps {
  code: string;
  onCodeChange: (value: string) => void;
  consoleOutput: string;
  activeTab: 'code' | 'console';
  onTabChange: (tab: 'code' | 'console') => void;
  onRun: () => void;
  onReset: () => void;
  onOpenHelp: () => void;
  isRunning: boolean;
  error: string | null;
  accuracy: number;
  hasRun: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onCodeChange,
  consoleOutput,
  activeTab,
  onTabChange,
  onRun,
  onReset,
  onOpenHelp,
  isRunning,
  error,
  accuracy,
  hasRun,
}) => {
  const handleChange = useCallback(
    (val: string) => {
      onCodeChange(val);
    },
    [onCodeChange]
  );

  // Handle Ctrl+Enter / Cmd+Enter to run
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        onRun();
      }
    },
    [onRun]
  );

  const hasConsoleContent = !!consoleOutput || !!error;

  return (
    <div className="editor-card" onKeyDown={handleKeyDown}>
      {/* Toolbar with tabs, shortcuts, and run button */}
      <div className="editor-card__toolbar">
        {/* Left Tabs */}
        <div className="editor-card__tabs">
          <button
            className={`editor-card__tab ${activeTab === 'code' ? 'editor-card__tab--active' : ''}`}
            onClick={() => onTabChange('code')}
            type="button"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            <span>Python Script</span>
          </button>

          <button
            className={`editor-card__tab ${activeTab === 'console' ? 'editor-card__tab--active' : ''}`}
            onClick={() => onTabChange('console')}
            type="button"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
            <span>Console Output</span>
            {error && <span className="editor-card__tab-badge editor-card__tab-badge--error">!</span>}
            {!error && hasConsoleContent && <span className="editor-card__tab-badge editor-card__tab-badge--dot" />}
          </button>
        </div>

        {/* Center/Right Actions */}
        <div className="editor-card__actions">
          {/* Quick Help */}
          <button
            className="editor-btn editor-btn--ghost"
            onClick={onOpenHelp}
            title="Open API Reference (pydle syntax, colors, symbols)"
            type="button"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span className="editor-btn__label">API Hint</span>
          </button>

          {/* Reset Code */}
          <button
            className="editor-btn editor-btn--ghost"
            onClick={onReset}
            title="Reset code to starter boilerplate"
            type="button"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            <span className="editor-btn__label">Reset</span>
          </button>

          {/* Run Button */}
          <button
            className={`editor-card__run-btn ${isRunning ? 'editor-card__run-btn--running' : ''}`}
            onClick={onRun}
            disabled={isRunning}
            title="Execute Python script in Pyodide WASM (Ctrl+Enter)"
            type="button"
          >
            {isRunning ? (
              <>
                <span className="run-spinner" />
                <span>Running…</span>
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>Run</span>
                <span className="editor-card__kbd-hint">Ctrl+↵</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Body: CodeMirror Editor or Terminal Console */}
      <div className="editor-card__body">
        {activeTab === 'code' ? (
          <CodeMirror
            value={code}
            onChange={handleChange}
            extensions={[python()]}
            theme={oneDark}
            height="230px"
            basicSetup={{
              lineNumbers: true,
              foldGutter: false,
              highlightActiveLine: true,
              autocompletion: true,
              bracketMatching: true,
              indentOnInput: true,
            }}
          />
        ) : (
          <div className="console-panel">
            {isRunning ? (
              <div className="console-panel__running">
                <span className="run-spinner" />
                <span>Executing script in Pyodide WASM sandbox…</span>
              </div>
            ) : !hasConsoleContent && !hasRun ? (
              <div className="console-panel__empty">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 17 10 11 4 5" />
                  <line x1="12" y1="19" x2="20" y2="19" />
                </svg>
                <p>Run your code or press <code>Ctrl+Enter</code> to execute.</p>
                <span className="console-panel__subtext">Standard output and diagnostic messages will appear here.</span>
              </div>
            ) : (
              <div className="console-panel__stream">
                {/* Status banner */}
                {error ? (
                  <div className="console-alert console-alert--error">
                    <div className="console-alert__title">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span>Execution Error</span>
                    </div>
                    <pre className="console-alert__text">{error}</pre>
                  </div>
                ) : (
                  <div className="console-alert console-alert--success">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Script executed successfully • Accuracy: <strong>{accuracy}%</strong></span>
                  </div>
                )}

                {/* Stdout prints */}
                {consoleOutput && (
                  <div className="console-terminal">
                    <div className="console-terminal__header">Standard Output:</div>
                    <pre className="console-terminal__content">{consoleOutput}</pre>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Editor Footer / Status Bar */}
      <div className="editor-card__footer">
        <div className="editor-card__runtime-status">
          <span className="runtime-status-dot" />
          <span>Python 3.12 (Pyodide WASM)</span>
        </div>
        <div className="editor-card__helper-text">
          <span><code>pydle(x, y, symbol, color)</code></span>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
