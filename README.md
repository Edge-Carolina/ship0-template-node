# Ship 0 — Node/JS

Two tracks in one repo: a gentle **Baseline** that runs in any browser, and an optional **Hard Mode** with real logic + tests.

**Repo name (required):** `edge-f25-ship0-<onyen-or-last-first>`
**Visibility:** Public (or grant org read access).
**Commits:** ≥ 2 with meaningful messages (no giant dump).

---

## Why you’re doing this

* Prove you can run modern JavaScript (ES modules) and manage a tiny project end-to-end.
* Understand **what** each step does (no cargo-cult copy/paste).
* Learn the difference between **DOM code** (talks to the page) vs **pure functions** (testable logic).
* Practice reading error messages, using DevTools, and shipping something that actually persists.

---

## What is Node? What is npm?

* **Node** runs JavaScript outside the browser (we use it here for tooling and tests). Check: `node -v`
* **npm** is Node’s package manager. Check: `npm -v`
* You don’t need a bundler here. The app uses a single `index.html` and `<script type="module">` to load `src/app.js` directly.

## What is `localStorage`?

`localStorage` is a simple key–value store built into the browser and scoped to an **origin** (protocol + host + port).
We save entries to the key `edge_ship_log`. Refreshing the page reads the same key and re-renders your entries.

> It **persists across refreshes and restarts** as long as you stay on the same origin (e.g., always `http://localhost:PORT`).

## ES Modules in the browser

`<script type="module">` lets you use modern imports like:

```js
import { add } from "./logic.js";
```

This works in current browsers without extra tooling.

---

## Get the code (fork or template)

Your repo **must** be named exactly:
`edge-f25-ship0-<onyen-or-last-first>`

### A) Use this template (preferred)

1. Open the Ship 0 Node template in the Edge Carolina org.
2. **Use this template** → **Create a new repository**.
3. **Owner:** your personal GitHub account
   **Name:** `edge-f25-ship0-<onyen-or-last-first>`
   **Visibility:** Public (or grant org read access)
4. Create the repository, then clone it:

   ```bash
   # HTTPS
   git clone https://github.com/<you>/edge-f25-ship0-<onyen-or-last-first>.git
   cd edge-f25-ship0-<onyen-or-last-first>

   # Or SSH
   git clone git@github.com:<you>/edge-f25-ship0-<onyen-or-last-first>.git
   ```

### B) Fork (also fine)

1. Fork the template to your personal GitHub.
2. Rename the fork to `edge-f25-ship0-<onyen-or-last-first>`.
3. Clone it (commands above).

### After cloning

* **Baseline:** no install needed. Just open `index.html` (details below).
* **Hard Mode:** create a file named `HARDMODE` at repo root to turn on CI, then:

  ```bash
  npm install --no-audit --no-fund
  npm test
  ```
* **Commit & push (both paths):**

  ```bash
  git add -A
  git commit -m "Ship 0: baseline work"
  git push -u origin main
  ```

---

## Quick Start (90 seconds)

```bash
# Use Node 20.x (repo has .nvmrc)
nvm use  # or install Node 20.x if you don't use nvm

# Baseline (no install): open the file OR serve it
open index.html            # macOS
# xdg-open index.html      # Linux
# start index.html         # Windows

# If you see “Failed to load module script” or any CORS/module errors:
npx http-server .          # then visit the printed http://localhost:XXXX
```

---

## Browser Origin & localStorage (read this)

* `localStorage` **persists** across refreshes and restarts on the **same origin**.
* `file://` is a different origin than `http://localhost`. If you switch, you’ll see different data.
* Some browsers block ES module imports from `file://`. If you get **“Failed to load module script”**, serve with `npx http-server .`.
* Private/Incognito windows use separate storage and may wipe on close.

**Reset app data:** DevTools → Application/Storage → Local Storage → delete `edge_ship_log`,
or run `localStorage.clear()` in the console.

---

## Baseline (Required) — LocalStorage Ship Log

Build a tiny app that lets you add entries and see them persist after a refresh.

**Files you’ll touch**

* `index.html` — the page
* `src/app.js` — DOM wiring (reads/writes via `storage.js`)
* `src/storage.js` — tiny wrapper over `localStorage`
* `src/logic.js` — pure functions; only `add` is used by Baseline

**Run it (no install needed)**

1. **IMPORTANT**: Due to ES modules, you must use a web server (not file:// protocol):
   ```bash
   npx http-server . -p 8080
   ```
   Then open http://localhost:8080
   
2. Type an entry → **Add Entry**.
3. Refresh the page. Your entries should still be there (same origin).
4. Verify newest-first ordering.

**Pass (Baseline) if all true**

* You can add entries and they **persist** after refresh.
* Entries render **newest-first**.
* `public/screenshot.png` exists (or embed a screenshot in README).
* Repo name matches: `edge-f25-ship0-<onyen-or-last-first>`.
* **≥ 2 commits** with meaningful messages.

---

## Hard Mode (Optional, Scored) — Structure + Tests

Implement real features with testable logic. Write **pure functions** in `src/logic.js`. Optionally wire UI in `src/app.js`.

**Features to implement (logic first)**

* **Delete**: remove an entry by its timestamp `t`.
* **Edit**: update an entry’s text (must be trimmed and non-empty).
* **Filter**: return entries that include a query substring (case-insensitive).

**Tests**

* Test runner: **Vitest**
* Tests live in `tests/logic.test.js`
* Run:

  ```bash
  npm install --no-audit --no-fund
  npm test
  ```

**Opt-in CI for Hard Mode**

* Create an empty `HARDMODE` file at repo root when ready.
* Our GitHub Action runs `npm install` + `npm test`.
  No `HARDMODE` file = Baseline checks only.

**(Optional) Wire the UI**

* Add **Delete** buttons (use `t` as the identifier).
* Add **Edit** (inline or dialog).
* Add **Search** that filters as you type using your `filterByQuery`.

---

## Exact Pass Criteria (what graders actually check)

**Baseline**

* Add → refresh → entries persist (same origin).
* Newest entry renders first.
* `public/screenshot.png` exists (or screenshot embedded in README).
* Correct repo name; ≥ 2 meaningful commits.

**Hard Mode (if opted in)**

* `HARDMODE` file at repo root.
* `npm test` passes locally.
* CI is green on GitHub.

---

## Common Pitfalls & Fixes

* **“Failed to load module script” / CORS** when double-clicking `index.html`
  → Serve locally: `npx http-server .` and use the provided `http://localhost:…`
* **Different data after refresh**
  → You changed origin (`file://` vs `http://localhost`). Stick to one.
* **Tests fail with “module not found”**
  → Run `npm install` **in this repo**; then `npm test`.
* **Nothing renders**
  → DevTools → Console. If `JSON.parse` errors or `null`, your storage is empty/corrupt. Clear it and try again.

---

## Node & Tooling

* Repo pins Node in `.nvmrc`. Use `nvm use` if you have it.
* If you don’t use nvm, install **Node 20.x LTS**.
* `npm install --no-audit --no-fund` is **only** required for Hard Mode/tests.

---

## Screenshot Evidence

* Save a screenshot at `public/screenshot.png` (or embed in the README).
* Show **≥ 2 entries** on screen.
* If using a local server, the URL bar should show `http://localhost:…` so TAs know you weren’t on a blocked `file://` origin.

---

## Submission

* Repo URL
* Screenshot (path or link)
* Minutes spent + biggest blocker
* Difficulty rating (1–5)
* AI attestation per the form
* (Hard Mode) confirm CI is green

Submit here: **[https://forms.gle/5eHpZjkAZJcH4ipf7](https://forms.gle/5eHpZjkAZJcH4ipf7)**

---

## Conceptual checkpoints (for yourself)

* What’s the difference between **DOM code** and **pure functions**?
* Why is **localStorage** good enough here, and when would you need a backend?
* How does `type="module"` change imports in the browser?
* Why test logic **without** a browser?

---

## Troubleshooting (extra)

* **CORS Error**: If you see "Access to script... has been blocked by CORS policy", you MUST use a web server. ES modules don't work with `file://` protocol:
  ```bash
  npx http-server . -p 8080
  ```
  Then open http://localhost:8080 (not the file directly)

* If the page won't open with double-click, serve it:

  ```bash
  npx http-server .
  ```
* If tests hang, try:

  ```bash
  npm test -- --reporter=verbose
  ```
* If some global tools (Tailwind, PostCSS, etc.) leak into tests, run:

  ```bash
  npx vitest run --config /dev/null
  ```
