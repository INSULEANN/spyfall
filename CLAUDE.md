# Board game T baan — notes for Claude

Thai party board-game website (formerly "Spyfall Thai"). Many online multiplayer games in shared rooms, with a voice room. The UI is entirely in Thai.

## Working with this user
- **Reply in Thai.** Keep reports short. Test only what changed (the user cares about usage quota).
- **Commit and push only when the user says so** (usually "Commit แล้ว push"). Commit directly on `main`. End every commit message with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Leave `.claude/` untracked.
- New games must be **original games in a genre** (own Thai name, theme and art). Never a renamed copy of a specific commercial game.
- **Art:** hand-drawn SVG is preferred. Generated images were rejected as off-theme, except the checkpoint game's `cp_*` cards (keep those). Card art lives in `src/cardart.jsx` (boom / curse / dig) and in `CARD_ART` inside `src/deal.jsx`.

## Stack and deploy
- Vite + React 18 + Firebase Realtime Database (project `spyfall-3a10a`), with plain CSS (mobile-first). Icons come from `lucide-react`.
- `npm run dev` / `npm run build`. A push to `main` is auto-deployed to Firebase Hosting by GitHub Actions (`.github/workflows/`).
- `firebase.json` sets cache headers (`/assets/**` immutable, `/cards/**` 30 days). Firebase is on the free Spark plan: keep assets small (WebP, SVG) and avoid video.
- **`APP_VERSION` in `src/main.jsx` must be bumped on every change that affects play.** Rooms block players whose version differs from the version in the room.

## Code map
- `src/main.jsx`: the app shell, plus:
  - the `GAMES` registry and `COPY`
  - rooms, lobby and `startGame`
  - render blocks for each game type
  - `APP_VERSION`
- Game modules, one file each:
  - pure logic functions plus a React screen and an optional `...Lobby`
  - games: `werewolf.jsx`, `explore.jsx`, `cake.jsx`, `boom.jsx`, `curse.jsx`, `tam.jsx`, `deal.jsx`, `checkpoint.jsx`, `clue.jsx`, `undercover.jsx` (SPY, type `uc`), `insider.jsx` (type `ins`), `dig.jsx`, `snake.jsx`, and `pics.jsx` (type `pic`; disabled with `soon:true` because it has no art yet)
- `src/ui.jsx`: shared UI pieces:
  - `Avatar`, `Figure`, `PlayerGrid`, `WhoDone`, `Phase`, `Outcome`, `Leaderboard`
  - `HostBar` (host skip/kick), `TimerRing`
  - **`ActionSheet`**: center-screen pop-up for any required action, with a timer
- `src/char.jsx`: the egg-shaped character system and editor. The outfit is saved in localStorage and in `players/{id}/look`.
- `src/cards.jsx`: `CardFace` (card frame), plus `CARD_SETS` / `CardImg` (image with SVG fallback, preloaded per game).
- Other files:
  - `src/sfx.js`: synthesized Web Audio sound effects, per-theme sounds and `FILMS`
  - `src/music.js`: background music
  - `src/intro.jsx`: SVG intro/ending scenes (no video)
- Visual files:
  - `src/themes.css`: per-game theme `[data-theme="<id>"]`
  - `src/art.jsx`: the `SCENES` hub card art
  - `src/stages.jsx`, `src/wolffx.jsx`: in-game scenes and animations
- `src/voice.jsx`: WebRTC voice room, using Firebase only for signaling.

## Adding a new typed game (checklist)
1. **Module.** Create `src/<game>.jsx`:
   - `make<Game>Round(ids, settings, number, t0, hist)`
   - action functions `(cur, me, ..., now)` that mutate `cur.round` and return `cur`, or return `undefined` to abort the transaction
   - `<game>Tick` for timeouts, plus a host force/kick
   - the screen component, wrapping every action in `runTransaction(ref(db, 'rooms/'+code), …)`
   - template: `src/insider.jsx`
2. **Wire it into `src/main.jsx`:**
   - import the module
   - add a `GAMES` entry (`id`, `type`, `min`, `max`, `blurb`, `lead`, `pills`, `how`) and a `COPY` entry
   - add a `startGame` branch with `badHist: nextHist([...bad ids])`; `pickBad` in `src/rand.js` lowers the chance of the same villain twice in a row
   - add a lobby block and a game block (copy the `G.type==='ins'` blocks)
   - add the type to **both** `[...].includes(G.type)` exclusion lists
3. **Visuals:** add a theme in `src/themes.css` and a hub scene in `src/art.jsx` (`SCENES`).
4. **Game flow:**
   - Required player actions go in an `ActionSheet` with a timer.
   - Timeouts must auto-advance so the game never stalls; every client calls the tick inside a transaction.
5. **Finish:** bump `APP_VERSION`.

## Testing (keep it quick)
- **Logic fuzz test.** Write a small `.mjs` that imports the module and plays random actions thousands of times, checking that games finish and invariants hold. Bundle it with:
  `npx esbuild test.mjs --bundle --platform=node --format=esm --alias:firebase/database=scripts/fbstub.js --loader:.css=empty --outfile=out.mjs && node out.mjs`
- **Browser test.**
  - Use the preview server `vite2` from `.claude/launch.json` (it can fall back to port 5174). Create a room in the UI.
  - To add bots, import the Firebase module URL found in `performance.getEntriesByType('resource')` (the name contains `firebase_database.js`). Then call `update(ref(getDatabase(),'rooms/CODE/players/b1'), {id:'b1', name:'บอท1', av:3, online:true, v:APP_VERSION})`.
  - Drive bots by importing `/src/<game>.jsx` and calling its action functions inside `runTransaction`.
  - Editing a `.jsx` file reloads the page; the room code is resumed from sessionStorage.
  - The browser pane is often hidden, so hover before every screenshot.
  - To check card art quickly, render a gallery of components into a fixed `div` instead of playing a whole game.
- When Python or Bash heredocs choke on JSX or Thai text, write the edit script to a file and run it with `python -I`.

## Other notes
- `NOTES.md` holds an older human-written project log (only up to v1.28).
- Higgsfield image generation is on the free plan with almost no credits left. Don't plan around it.
