# Ship 0 — Node/JS

**Two tracks in one repo:** a gentle **Baseline** that runs in any browser, and an optional **Hard Mode** with real logic + tests.

## Why you’re doing this
- Prove you can run modern JavaScript (ES modules) and manage a tiny project.
- Understand **what** each step does: no cargo-cult copy/paste.
- Learn the difference between **DOM code** and **pure functions** (the latter are testable).

---

## What is Node? What is npm?
- **Node** is JavaScript outside the browser (a runtime). We use it for tooling and tests. Check it with `node -v`.
- **npm** is Node’s package manager. It installs dev tools (like test runners). Check it with `npm -v`.
- You don’t need a bundler here. The app uses a single `index.html` and a `<script type="module">` to load `src/app.js` directly.

## What is localStorage?
A simple key–value store built into the browser. We save entries to the key `edge_ship_log`. When you refresh, your entries are still there.

## ES Modules in the browser
The `<script type="module">` tag lets you `import` from files like `import { add } from "./logic.js"`. This is standard in modern browsers.

---

## Baseline (Required) — LocalStorage Ship Log
Build a tiny app where you can add entries and see them persist after a page refresh.

**Files you’ll touch**
- `index.html` — the page
- `src/app.js` — DOM wiring (reads/writes localStorage via `storage.js`)
- `src/storage.js` — tiny wrapper over localStorage
- `src/logic.js` — pure functions; only `add` is used by Baseline

**Run it (no install needed)**
1) Open `index.html` (double-click) — or from a terminal:
   - macOS: `open index.html`
   - Linux: `xdg-open index.html`
   - Windows: `start index.html`
2) Type an entry → **Add Entry** → refresh the page; your entries should remain.

**Pass (Baseline) if all true**
- Add entries and they **persist** after refresh.
- Entries render newest‑first.
- Screenshot saved at `public/screenshot.png` (or embed in README).
- **≥2 commits** with meaningful messages.
- Repo name: `edge-f25-ship0-<onyen-or-last-first>`.

Paste your screenshot path or link here:
- `public/screenshot.png`

---

## Hard Mode (Optional, Scored) — Structure + Tests
Implement real features with testable logic. You’ll write **pure functions** in `src/logic.js` and (optionally) wire UI in `src/app.js`.

**Features to implement (logic first)**
- **Delete**: remove an entry by its timestamp `t`.
- **Edit**: update an entry’s text (must be trimmed and non‑empty).
- **Filter**: return entries that include a query substring (case‑insensitive).

**Tests**
- We use **Vitest** (a fast test runner). Tests live in `tests/logic.test.js`.
- Run tests:
  ```bash
  npm install --no-audit --no-fund
  npm test
  ```
- You pass if tests are **green** locally and on CI.

**Opt‑in CI for Hard Mode**
- Create an empty file named **`HARDMODE`** at the repo root when you’re ready.
- Our GitHub Action will then run `npm install` and `npm test`. No `HARDMODE` file = Baseline checks only.

**(Optional) Wire the UI**
- Add a **Delete** button next to each entry (use the `t` field as the identifier).
- Add an **Edit** button or inline editing.
- Add a **Search** input that filters as you type (use your `filterByQuery` function).

---

## Conceptual checkpoints (answer to yourself)
- What’s the difference between **DOM code** and **pure functions**?
- Why is **localStorage** good enough here, and when would you need a backend?
- How does `type="module"` change the way you import files in the browser?
- What’s the value of testing logic without a browser?

---

## Troubleshooting
- If the page won't open with double‑click, serve it with any static server:
  ```bash
  npx http-server .
  ```
- If `npm test` fails with "module not found," ensure you ran `npm install` in the repo folder.
- If your tests hang, run `npm test -- --reporter=verbose`.
- If `npm test` fails with PostCSS/Tailwind errors, try running tests in a clean directory or use:
  ```bash
  npx vitest run --config /dev/null
  ```

---

## What to submit
- Repo URL
- Screenshot
- Minutes spent + biggest blocker
- Difficulty rating (1–5)
- AI attestation per the form

Submit [here](https://forms.gle/5eHpZjkAZJcH4ipf7)
