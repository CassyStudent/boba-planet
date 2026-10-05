# Prompts to paste into Codex in Visual Studio Code

Open the extracted **boba-planet folder itself** in Visual Studio Code. Open the Codex panel, then paste one prompt at a time. Read what Codex changed before proceeding. You do not need to ask it to recreate the included site.

## Prompt 1 — understand and run the project

```text
Read README.md and docs/01-CONCEPT-AND-RESEARCH.md. This is my school
Scroll World assignment, made only with Codex. Keep the Boba Planet theme.
Inspect the existing HTML/CSS/JS, explain the important files in simple
language, run npm run check, and start the site with npm start. Open the
local preview if browser tools are available. Do not replace this project
with a generic template. Check the four chapters, the ending, navigation,
small-screen layout, and the Read without motion button. Explain that
the included SVG illustrations are a preview, not the required final video.
Check whether this folder is a dedicated Git repository; initialize one
inside this folder if needed. Commit the initial project, without secrets
or generated raw media. Do not invent my Git identity if it is missing.
```

## Prompt 2 — research and make it yours

```text
Read docs/01-CONCEPT-AND-RESEARCH.md. Visit the required oso95/scroll-world
reference and the four additional sites. Inspect their actual scrolling
behaviour where browser access permits and clearly record any inaccessible
pages. Help me add my own screenshots and observations to the research log.
Ask me for one personal design change, then implement it consistently.
Preserve the four-scene story and three-transition production plan.
Explain how my design differs from the reference. Commit this stage.
```

## Prompt 3 — check Magnific (no credits spent)

```text
Read docs/02-MAGNIFIC-PROMPTS.md, then perform only step 0. Use the connected
school Magnific MCP and its real schemas. Verify authentication, credits,
exact model IDs, first/last-frame support, image reference formats, supported
durations and resolutions. Save the findings and official sources in
docs/MODEL-CHECK.md. Estimate the three-clip pilot and complete seven-clip
production separately, including required stills and one possible pilot
retry. Do not generate anything until I choose a concrete spending cap.
Do not use Hermes, Higgsfield or Monid as a fallback.
```

## Prompt 4 — approved pilot only

Replace the bracketed parts before sending:

```text
I approve a maximum of [NUMBER] school credits for the initial Boba Planet
pilot using [EXACT VERIFIED MODEL ID]. Read docs/02-MAGNIFIC-PROMPTS.md.
Create only the A and B anchor images and the garden → connector → kitchen
pilot. Use the documented first/last-frame parameters. Extract the actual
decoded last frame at each step using scripts/media.py; use it as the next
clip's first image. Log prompts, model, settings, job IDs, costs and files.
Do not exceed my cap, retry automatically, or generate the other scenes.
Run the pilot assembly, show both seam pairs and the joined pilot, and
record the problems in docs/TRANSITION-TEST.md. Let me review it before
we produce the rest. Commit the approved plan and test documentation.
```

## Prompt 5 — finish the approved chain

```text
I reviewed and approve the pilot. My additional credit cap is [NUMBER].
Use the same verified model and settings. Follow the remaining prompts in
docs/02-MAGNIFIC-PROMPTS.md to generate the river and cup anchor images,
the kitchen-to-river connector, river scene, river-to-cup connector, and
cup scene. Generate sequentially, using actual decoded boundary frames.
Do not regenerate the approved pilot unless I explicitly request it.
Stop if the next job would exceed my cap. Save production evidence.
Run python scripts/media.py assemble. Keep text in HTML, not in the film.
Confirm that media-config.js points to the real output and that measured
durations drive the scene boundaries. Commit the completed media stage.
```

## Prompt 6 — test the final experience

```text
Test Boba Planet at 1440x900, 390x844 and 360x800. Use Playwright or browser
tools available here. Test slow forward/backward scroll, rapid direction
changes, every boundary, chapter links, recipe CTA and replay. Confirm
currentTime decreases on backward scrolling. Check no black frames, no
stale seek, no console errors, no horizontal overflow, and readable text.
Test reduced-motion before initial load: no video request and all four
static cards. Test missing media, a slow connection, keyboard navigation
and a real phone/iOS Safari when available. Fix issues you can verify.
Document actual results and untested devices in docs/QA.md; do not claim
real-phone tests if only desktop emulation was available. Commit fixes.
Explain the scroll-to-video formula and endpoint matching in simple terms.
```

## Prompt 7 — publish and prepare submission

```text
Audit docs/04-SUBMISSION.md. Confirm that all seven real Magnific clips,
the approved pilot evidence, and a final production video exist. Check
that no school credentials or signed generation URLs are committed.
Use my authenticated GitHub account to create a dedicated boba-planet
repository if one does not exist. Preserve meaningful commit history.
Set up GitHub Pages for the static site or explain a verified alternative
if account settings prevent Pages. Check hosting size limits before push.
Test the actual published URL, including range requests and mobile assets.
Replace README.md's pending repository and live URL fields with verified
real links. List what is ready and what still needs my action; never
invent successful deployment or test results. Do not submit to Canvas.
```

## Optional redesign prompt

```text
Keep Boba Planet's existing code and four-scene structure, but change
[DESCRIBE MY CHANGE]. Update the page, SVG fallback illustrations,
storyboard and Magnific prompts consistently. Tell me which previously
generated clips would become inconsistent before spending any credits.
```
