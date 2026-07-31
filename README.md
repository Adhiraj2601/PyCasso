# PyCasso

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Python-Pyodide-3776AB?logo=python&logoColor=white" alt="Pyodide">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
</p>

PyCasso is a browser-based programming puzzle game where players recreate pixel art by writing Python. Instead of drawing directly, players write code that controls the canvas. Python executes entirely in the browser using **Pyodide**, allowing puzzles to run locally without requiring a backend.

The project combines a React interface, an in-browser Python runtime, and a modular puzzle engine to create an interactive coding experience focused on learning through visual programming.

---

## Architecture

```text
                  User
                    │
                    ▼
        ┌─────────────────────┐
        │      React UI       │
        │ Components & State  │
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │     CodeMirror      │
        │   Python Editor     │
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │      Pyodide        │
        │ Python Runtime      │
        │    (WebAssembly)    │
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │     Grid Engine     │
        │ Validation & Logic  │
        └──────────┬──────────┘
                   │
                   ▼
             Pixel Canvas
```

---

## Features

- Execute Python entirely in the browser with Pyodide
- Interactive pixel-art puzzles
- Code editor powered by CodeMirror 6
- Puzzle validation with scoring
- Console output and runtime error reporting
- Progress persistence using browser storage

---

## Interesting implementation techniques

- **Client-side Python execution** using **Pyodide**, enabling Python to run in the browser through **WebAssembly**.
- **Lazy runtime initialization**, loading the Python interpreter only when the user first executes code.
- **CDN-based runtime loading**, downloading Pyodide on first use instead of bundling a large runtime into the application.
- **JavaScript ↔ Python interoperability**, exposing JavaScript functions to Python for manipulating the puzzle grid.
- **Persistent state** using the **Web Storage API** for saving progress.
- **React Hooks** to separate runtime initialization, UI state, and puzzle logic.
- **Controlled CodeMirror editor** integrated with React state.
- **Execution timeout protection** to prevent long-running user programs.
- **Modular engine architecture** that keeps UI, runtime, and puzzle logic independent.

---

## Technologies

### Framework

- React 19
- TypeScript
- Vite

### Python Runtime

- **Pyodide** — https://pyodide.org/

The application loads the Pyodide runtime from the official CDN the first time Python code is executed. After initialization, the runtime is reused for subsequent executions to reduce startup overhead.

### Tooling

- ESLint
- Oxlint
- TypeScript Project References

---

## Core project files

| File | Description |
|------|-------------|
| [`src/components/CodeEditor.tsx`](./src/components/CodeEditor.tsx) | Python editor, execution controls, and keyboard shortcuts |
| [`src/engine/pyodideRunner.ts`](./src/engine/pyodideRunner.ts) | Loads and manages the Pyodide runtime and executes user programs |
| [`src/engine/gameLogic.ts`](./src/engine/gameLogic.ts) | Puzzle validation, scoring, and game state management |
| [`src/engine/puzzles.ts`](./src/engine/puzzles.ts) | Puzzle definitions and daily challenge data |

---

## External libraries

| Library | Purpose |
|---------|---------|
| [Pyodide](https://pyodide.org/) | Browser-based CPython runtime built on WebAssembly |
| [CodeMirror 6](https://codemirror.net/) | Extensible code editor |
| [@uiw/react-codemirror](https://github.com/uiwjs/react-codemirror) | React integration for CodeMirror |
| [@codemirror/lang-python](https://github.com/codemirror/lang-python) | Python syntax highlighting |
| [@codemirror/theme-one-dark](https://github.com/codemirror/theme-one-dark) | One Dark editor theme |

---

## Project structure

```text
.
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── engine/
│   ├── hooks/
│   └── utils/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── eslint.config.js
```

### Directory overview

| Directory | Description |
|-----------|-------------|
| [`public/`](./public) | Static assets served directly by Vite |
| [`src/components/`](./src/components) | React UI components including the editor, canvas, dialogs, and layout |
| [`src/engine/`](./src/engine) | Puzzle definitions, validation, game logic, and the Pyodide execution layer |
| [`src/assets/`](./src/assets) | Images, icons, and other static resources |
| [`src/hooks/`](./src/hooks) | Custom React hooks |
| [`src/utils/`](./src/utils) | Shared helper functions |

---

## Execution flow

```text
Write Python
      │
      ▼
CodeMirror
      │
      ▼
Pyodide Runtime
      │
      ▼
Grid Engine
      │
      ▼
Canvas Update
      │
      ▼
Validation & Score
```

---

## Design principles

- **Local-first execution** — User programs run entirely inside the browser.
- **Modular architecture** — Runtime, puzzle logic, and UI remain independent.
- **Browser-native experience** — No backend is required for code execution.
- **Fast iteration** — The Python runtime is initialized once and reused throughout the session.

---

## Why PyCasso?

PyCasso demonstrates how modern web technologies can provide a complete Python programming environment without relying on server-side execution. By combining React, Pyodide, and a modular puzzle engine, the project delivers an interactive platform where users can write, execute, and debug Python while solving visual programming challenges.

The separation between the UI and the execution engine also makes the project straightforward to extend with additional puzzle types, game mechanics, or programming languages in the future.
