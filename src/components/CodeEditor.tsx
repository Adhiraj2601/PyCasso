// CodeEditor component — CodeMirror editor + Console tabs + Run button

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
  isRunning: boolean;
  error: string | null;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onCodeChange,
  consoleOutput,
  activeTab,
  onTabChange,
  onRun,
  isRunning,
  error,
}) => {
  const handleChange = useCallback(
    (val: string) => {
      onCodeChange(val);
    },
    [onCodeChange]
  );

  // Handle Ctrl+Enter to run
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        onRun();
      }
    },
    [onRun]
  );

  return (
    <div className="editor-card" onKeyDown={handleKeyDown}>
      {/* Toolbar with tabs and run button */}
      <div className="editor-card__toolbar">
        <button
          className={`editor-card__tab ${activeTab === 'code' ? 'editor-card__tab--active' : ''}`}
          onClick={() => onTabChange('code')}
        >
          Code
        </button>
        <button
          className={`editor-card__tab ${activeTab === 'console' ? 'editor-card__tab--active' : ''}`}
          onClick={() => onTabChange('console')}
        >
          Console
        </button>
        <button
          className={`editor-card__run-btn ${isRunning ? 'editor-card__run-btn--running' : ''}`}
          onClick={onRun}
          disabled={isRunning}
          title="Run code (Ctrl+Enter)"
        >
          {isRunning ? 'Running…' : 'Run >'}
        </button>
      </div>

      {/* Body: either editor or console */}
      <div className="editor-card__body">
        {activeTab === 'code' ? (
          <CodeMirror
            value={code}
            onChange={handleChange}
            extensions={[python()]}
            theme={oneDark}
            height="240px"
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
          <div className={`console ${!consoleOutput && !error ? 'console--empty' : ''}`}>
            {!consoleOutput && !error ? (
              'Run your code to see output here…'
            ) : (
              <>
                {consoleOutput && <div>{consoleOutput}</div>}
                {error && <div className="console__error">{error}</div>}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
