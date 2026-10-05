Live website: https://cassystudent.github.io/boba-planet/

# Boba Planet

A bubble tea scroll story: tea garden → pearl kitchen → strawberry river → finished cup.

**GitHub repository:** PENDING — replace with your real dedicated repository URL.

**Live website:** PENDING — replace with the verified public website URL.

**Current status:** The supplied `1005.mp4` is installed as the full sticky background, with forward/reverse scroll scrubbing and the existing page content above it. The optimized silent film is 1920×1080, 30 fps, 13.7 seconds and approximately 9.1 MB. Desktop and mobile-sized browser checks are recorded in docs/QA.md. GitHub publishing is still pending. The Magnific production documents below remain the original assignment plan, not verified provenance for the supplied film.

## Supplied-video update

`media/journey.mp4` is a seek-optimized copy of the user's CapCut export; the original was left unchanged. Keyframes are spaced six frames apart, B-frames and audio are removed, and faststart is enabled. The video never calls `play()`; scroll position selects the target timestamp, including on reverse travel. Seeking catches up to the latest position and then stops. Mobile uses `object-fit: cover` to fill the background, so the sides of landscape footage are cropped. The original typography and copy sit above a cream readability overlay.

The four chapter proportions preserve the existing page spacing. They are not inferred scene cuts in the supplied film. The video's full measured duration maps to the full sticky travel distance. A reduced-motion reading mode remains available.

To re-encode another source, use `scripts/optimize-background.ps1 -InputVideo 'PATH_TO_ORIGINAL.mp4'` with a full FFmpeg installation. Do not run the older seven-clip assembly command unless intentionally replacing the supplied film.

## Start here

1. Extract the ZIP and open this **boba-planet** folder in Visual Studio Code.
2. Open a terminal in this folder and run `npm start` (Node.js required; no npm packages need installing).
3. Visit `http://localhost:4173` for the page and `http://localhost:4173/guide.html` for the visual guide.
4. Open [the numbered Codex prompts](docs/03-CODEX-PROMPTS.md) and paste Prompt 1 into the Codex panel.
5. Use the Magnific prompts only after checking your school account's available models and spending cap.

You can double-click index.html to inspect the illustrated page without a server, but use the local server for video and browser testing. Run `npm run check` for JavaScript syntax checks. Stop the server with Ctrl+C.

## Files

| File | Purpose |
|---|---|
| index.html | All four chapters, readable copy, navigation and ending |
| styles.css | Colours, typography, desktop/mobile layout and reading mode |
| app.js | Scroll-to-time mapping, seek coalescing, chapter progress, fallback |
| media-config.js | Production film URL and segment durations; preview initially |
| assets/*.svg | Four original vector scenes plus a favicon |
| guide.html | Visual storyboard and quick-start guide |
| docs/01-CONCEPT-AND-RESEARCH.md | Concept, visual identity, technical plan and five sources |
| docs/02-MAGNIFIC-PROMPTS.md | Shared style, four anchor prompts, seven motion prompts, pilot workflow |
| docs/03-CODEX-PROMPTS.md | Seven sequential prompts for Codex in VS Code |
| docs/04-SUBMISSION.md | Requirements, commits and publication checklist |
| docs/PRODUCTION-LOG.csv | Empty generation record with pending clip rows |
| docs/QA.md | Actual prototype test results and remaining tests |
| scripts/serve.cjs | Local server with MP4 byte-range responses |
| scripts/media.py | Frame extraction, pilot, normalization, concatenation and timeline |

## Connect Magnific to Codex

If the school has already configured Magnific, use that connection. Otherwise follow your school's account instructions and the [official Magnific MCP guide](https://www.magnific.com/ai/docs/magnific-mcp). Its published endpoint is `https://mcp.magnific.com`.

Codex's CLI and IDE extension share MCP configuration. If the Codex CLI is available, the general HTTP setup is:

```sh
codex mcp add magnific --url https://mcp.magnific.com
codex mcp list
```

Complete the provider's authentication flow with your school account. If OAuth is offered by the server, use the supported Codex login flow; never paste account secrets into source code or a chat prompt. This kit has not authenticated or verified a school connection.

Alternatively merge (do not overwrite your existing configuration) the following section into your Codex `config.toml` through Codex settings:

```toml
[mcp_servers.magnific]
url = "https://mcp.magnific.com"
```

Configuration sources: [OpenAI MCP configuration example](https://developers.openai.com/learn/docs-mcp), [Codex MCP documentation](https://developers.openai.com/codex/mcp). VS Code's Copilot MCP configuration is distinct; use Codex for this assignment.

## Generate and attach the real film

Install Python 3 and FFmpeg with ffprobe if not already present. Follow the production guide in order. The first test is only three clips; do not spend credits on all seven before checking it.

```sh
python scripts/media.py frames raw/01-garden.mp4
python scripts/media.py pilot
python scripts/media.py assemble
```

The assembly script expects the exact seven raw filenames documented in raw/README.md. It writes media/journey.mp4, media/poster.jpg, and a fresh media-config.js. It keeps audio out, normalizes all videos to matching resolution/fps/codec, and measures the actual durations. Reload the site after assembly. The video engine uses the true video duration, never an assumed 29 seconds.

## How it works — explain this in class

`progress = clamp((scrollY - journeyTop) / (journeyHeight - viewportHeight), 0, 1)`

`targetTime = progress × (videoDuration - oneFrame)`

Moving down increases progress; moving up decreases it. The video stays paused and JavaScript seeks to the requested moment. A requestAnimationFrame callback updates only when scrolling or resizing. If a seek is already running, the newest target replaces older targets, then runs on `seeked`.

The film contains four scenes and three connectors, joined into one file. For each connector, its first image comes from the actual last decoded frame of the preceding scene. Its end is directed toward the next approved anchor. The next scene starts from the connector's actual last decoded frame. This is a workflow for improving continuity, not a guarantee; visually inspect every seam.

## Adaptation from the assignment reference

The [reference skill](https://github.com/oso95/scroll-world/tree/main) informed the endpoint-matching concept and scene/connector structure. Our browser engine and artwork were written for this project, not copied from the reference. Replace provider-specific generation with verified Magnific MCP calls; retain local ffmpeg/ffprobe preparation. Use a single joined film and original food-world art direction. Follow the assignment's Codex/Magnific requirements even if the current upstream skill recommends another backend.

## Accessibility and limitations

Text is semantic HTML, with one h1, named chapters, keyboard focus styles, a skip link and a replay link. OS reduced-motion preference selects static reading mode before video loading. Users can switch manually. Small screens use contained landscape film instead of cropping; native portrait video is not included. Failed video loading keeps the illustration visible. The preview crossfades SVGs, which is intentionally not a substitute for connected generated videos.

## Publish

Use a dedicated repository and commit the real stages as you complete them. This is a static site and works with GitHub Pages or another static host. See docs/04-SUBMISSION.md and Prompt 7. Do not use placeholder URLs as submission links. Keep large raw masters and private credentials out of Git. The included local repository history, if present, is only the starting history; continue committing your own work.
