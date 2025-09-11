# Ship 0 — Node/JS

Two tracks in one repo: a gentle **Baseline** that runs in any browser, and an optional **Hard Mode** with real logic + tests.

**Branch name (required):** `<firstname-lastname>`
**Commits:** ≥ 2 with meaningful messages (no giant dump).

---

## Why you’re doing this

* Prove you can run modern JavaScript (ES modules) and manage a tiny project end-to-end.
* Understand **what** each step does (no cargo-cult copy/paste).
* Learn the difference between **DOM code** (talks to the page) vs **pure functions** (testable logic).
* Practice reading error messages, using DevTools, and shipping something that actually persists.

---

## Get the code

You’ll work directly from the shared repository. Don’t fork or template. 

1. Clone the starter repo:

   ```bash
   git clone https://github.com/Edge-Carolina/ship0-template-node.git
   cd ship0-template-node
   ```
      
  or use the built in "Clone a Github Repo" on a newly opened window.
  
2. Create a new branch named with your first and last name (lowercase, dash separated):

   ```bash
   git checkout -b <firstname-lastname>
   ```

   Example:

   ```bash
   git checkout -b weston-voglesonger
   ```

3. Verify your branch:

   ```bash
   git branch
   ```

---

## Working on your branch

As you make changes:

```bash
# Stage your changes
git add -A

# Commit with a clear message
git commit -m "Ship 0: baseline work"

# Push your branch to GitHub
git push -u origin <firstname-lastname>
```

All of your work for Ship 0 should be done **only** on your `<firstname-lastname>` branch. Do not commit to `main`.

---

## What is Node? What is npm?

* **Node** runs JavaScript outside the browser (we use it here for tooling and tests). Check: `node -v`
* **npm** is Node’s package manager. Check: `npm -v`
* You don’t need a bundler here. The app uses a single `index.html` and `<script type="module">` to load `src/app.js` directly.

---

## What is `localStorage`?

`localStorage` is a simple key–value store built into the browser and scoped to an **origin** (protocol + host + port).
We save entries to the key `edge_ship_log`. Refreshing the page reads the same key and re-renders your entries.

It **persists across refreshes and restarts** as long as you stay on the same origin (e.g., always `http://localhost:PORT`).

---

## ES Modules in the browser

`<script type="module">` lets you use modern imports like:

```js
import { add } from "./logic.js";
```

This works in current browsers without extra tooling.

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

## Baseline (Required) — LocalStorage Ship Log

Build a tiny app that lets you add entries and see them persist after a refresh.

**Files you’ll touch**

* `index.html` — the page
* `src/app.js` — DOM wiring (reads/writes via `storage.js`)
* `src/storage.js` — tiny wrapper over `localStorage`
* `src/logic.js` — pure functions; only `add` is used by Baseline

**Run it**

1. Serve the repo locally (not `file://`):

   ```bash
   npx http-server . -p 8080
   ```

   Then open [http://localhost:8080](http://localhost:8080)

2. Type an entry → **Add Entry**.

3. Refresh the page. Your entries should still be there (same origin).

4. Verify newest-first ordering.

**Pass (Baseline) if all true**

* You can add entries and they **persist** after refresh.
* Entries render **newest-first**.
* `public/screenshot.png` exists (or embed a screenshot in README).
* Work lives on your `<firstname-lastname>` branch.
* ≥ 2 commits with meaningful messages.

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
* Correct branch name; ≥ 2 meaningful commits.

**Hard Mode (if opted in)**

* `HARDMODE` file at repo root.
* `npm test` passes locally.
* CI is green on GitHub.

---

## Common Pitfalls & Fixes

* **“Failed to load module script” / CORS** → Serve locally:
  `npx http-server .` and use the provided `http://localhost:…`
* **Different data after refresh** → You changed origin (`file://` vs `http://localhost`). Stick to one.
* **Tests fail with “module not found”** → Run `npm install` **in this repo**, then `npm test`.
* **Nothing renders** → DevTools → Console. If `JSON.parse` errors or `null`, your storage is empty/corrupt. Clear it and try again.

---

## Screenshot Evidence

* Save a screenshot at `public/screenshot.png` (or embed in the README).
* Show ≥ 2 entries on screen.
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
