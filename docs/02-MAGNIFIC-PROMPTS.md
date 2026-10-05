# Magnific production — use in order

Do this inside Codex with your school's Magnific MCP connection. This document contains creative prompt text, not executable MCP calls. Real tool names, model identifiers and parameters must be discovered from the connected server. No video has been generated for this kit.

## 0. Inspect the account before generation

Copy this into Codex:

> Inspect my connected Magnific MCP without generating anything. Read the available tool schemas and official model documentation. Check authentication and available credits. Report exact identifiers for the assignment's recommended image models (GPT 2.5, UNI 1.1/Luma, Nano Banana 2) and video models (Seedance 2.5, Minimax H3 Max, Wan 3), if available. Do not treat these display names as API IDs. For each candidate video model verify first AND last image support, accepted image reference format, resolutions, aspect ratios, duration choices, audio options, and credit cost. If a recommended model is absent, report that and propose a compatible alternative for my decision. Save the findings with date and source links in docs/MODEL-CHECK.md. Estimate the first test and full production cost separately. Do not generate or spend credits yet.

Official public documentation: [Magnific MCP](https://www.magnific.com/ai/docs/magnific-mcp), [video generation](https://www.freepik.com/ai/faq/ai-video-generator). Their catalogue may differ from the assignment. Public docs describe start/end-image workflows, but do not establish which model and parameters your account exposes. MCP generation consumes credits; balance/history inspection does not. Avoid auto model selection so the production log can record the actual chosen model.

## 1. Shared style — prepend to every image/video prompt

```text
Boba Planet, a coherent handmade miniature bubble tea world. Oat cream
#FFF8EC, strawberry pink #EAA0B5, soft matcha #8CA66B, cocoa #36251F,
warm biscuit #E8C99D. Matte ceramic landforms, waxy tea leaves, glossy
dark tapioca pearls, translucent strawberry milk. Premium playful food
miniature, softly rounded geometry, clean tactile surfaces, subtle detail.
Soft broad daylight from upper left, warm neutral white balance, consistent
exposure and gentle shadows. 35mm-equivalent lens, slightly elevated view,
enough depth of field to read the world. Landscape 16:9. Keep the important
objects within the centre 60% of the image. No people, hands, writing,
letters, labels, logos, watermark, menu, interface, or baked-in typography.
```

Negative instructions, if the selected model has a negative field; otherwise append: no hard cuts, no flicker, no sudden relighting, no melting structures, no duplicated cups, no changing straw count, no teleportation, no camera roll, no fast zoom, no whip pan. Do not claim these instructions guarantee frame accuracy.

## 2. Design anchor images — initially only A and B

These are candidate scene entrances. Use the shared style and the preceding approved image as a style reference when supported. Generate at a supported 2K/4K landscape size. Save prompts, model, parameters, job IDs and credit cost in docs/PRODUCTION-LOG.csv.

**A — tea garden / `raw/anchors/A-garden.png`**

```text
A miniature tea garden on a gently raised island. Three rounded matcha-green
terraces, repeating small tea plants, oversized leaves framing the edges.
A warm biscuit path winds forward from bottom centre to a strawberry-pink
ceramic arch in the upper centre. Through the arch, a small copper kettle
and pink kitchen wall are visible far away. The camera starts just above
the path, looking forward slightly downward. Garden fills the foreground;
the arch is clearly the destination. Quiet cream atmosphere, no horizon clutter.
```

**B — pearl kitchen / `raw/anchors/B-kitchen.png`**

```text
The other side of the same strawberry-pink garden arch. A small open-air
pearl kitchen made of rounded cream and pink ceramic. A broad copper bowl
slightly right of centre contains glossy cocoa-coloured tapioca pearls.
A low biscuit-coloured channel leads from the bowl toward the back right,
where a ribbon of pink strawberry milk is visible. Keep the arch material,
light direction, scale and camera height consistent with the supplied garden
reference. The camera faces into the kitchen, not back toward the garden.
```

**C — strawberry river / `raw/anchors/C-river.png`** — after the test passes

```text
A winding strawberry-milk river between low oat-cream hills. The same
pearl channel from the kitchen joins the near side of the river. Three
oversized strawberries with green leaves frame the banks. The river bends
gently to the right then continues toward a small round pink plaza in the
distance. Same miniature scale, camera height, lens and upper-left daylight.
Do not introduce a waterfall, a new sky, or different time of day.
```

**D — final plaza / `raw/anchors/D-cup.png`** — after the test passes

```text
A small round strawberry-pink plaza reached by the same milk river. One
clear unbranded tapered bubble tea cup stands at the centre, filled with
strawberry milk tea and dark tapioca pearls at its base. One straight
matcha-green wide straw, one clear flat lid, no lettering. Oversized tea
leaves and two strawberries at the pedestal base. The cup is viewed from
slightly above its midpoint and fits completely inside the frame. Maintain
the exact light, ceramic materials and colour palette of the river reference.
```

## 3. Make the pilot: A → connector → B

Do not generate the remaining scenes yet. Choose the lowest useful supported test resolution and duration, after the user agrees to a specific cost cap. Target scene lengths are five seconds and connectors three seconds, but supported model durations take precedence.

1. Generate `raw/01-garden.mp4` starting from A. Extract its **actual last decoded frame**, not a screenshot from a player: `python scripts/media.py frames raw/01-garden.mp4`.
2. Generate `raw/02-garden-kitchen.mp4` with that extracted last frame as first image and approved B as last image.
3. Extract the connector's actual last frame. Compare it with B. If it drifts unacceptably, revise the connector. If acceptable, use that actual frame as the first image of `raw/03-kitchen.mp4`.
4. Extract the first/last frames of all three clips. Review both adjacent boundary pairs. Also play the complete joined pilot forward and scrub backward. A matching still pair alone does not prove matching camera velocity.
5. Run `python scripts/media.py pilot`. Inspect `media/pilot.mp4`. This does not enable production video mode.
6. Record whether exposure, geometry, colour, camera direction and speed hold across both seams. Fix the pilot before generating the remaining four clips. Save the results in docs/TRANSITION-TEST.md, including actual frames and a short test recording.

**Scene A motion prompt**

```text
Start exactly on the provided first image. One continuous slow forward dolly
along the biscuit garden path. Leaves remain rooted and geometry stays stable.
Approach the pink arch, finishing just before entering it. Keep the copper
kitchen visible through the opening. Constant lens and camera height, no cut
or sideways orbit. End while still moving gently forward, ready to continue
through the arch. Preserve exposure and all visible structural details.
```

**Connector A → B motion prompt**

```text
Match the supplied first image exactly at the start and the supplied last
image exactly at the end. Continue the same slow forward camera motion
through the pink ceramic arch into the pearl kitchen. Move through physical
space; do not dissolve, fade, morph architecture, or cut between locations.
Keep the arch and floor geometry rigid. Reveal the copper bowl naturally
as the camera passes the arch. Match the endpoint lens, scale, light and
framing. Maintain gentle forward motion through the final frame.
```

**Scene B motion prompt**

```text
Start exactly on the provided first image extracted from the connector.
Continue forward into the miniature pearl kitchen. Glide beside the copper
bowl and slowly toward the pearl channel on its right. A few glossy pearls
roll gently along the channel with consistent scale. Keep the same soft
daylight, bowl geometry and lens. End facing down the channel toward the
visible strawberry-milk river, still moving slowly forward. No scene cut.
```

## 4. Remaining four clips — only after pilot approval

**Connector B → C / `raw/04-kitchen-river.mp4`**

Start: actual last frame of `03-kitchen.mp4`. End target: C anchor.

```text
Match the two supplied endpoint images. Continue slowly forward along the
pearl channel as the open-air kitchen recedes behind the camera. The channel
joins the strawberry-milk river. Reveal the cream riverbanks and oversized
strawberries without changing miniature scale. Smooth physical travel, no
cuts or morphing, constant lens, stable upper-left daylight. End with the
camera following the river's first bend and preserve forward velocity.
```

**Scene C / `raw/05-river.mp4`**

Start: actual last frame of connector B → C.

```text
Start exactly on the supplied frame. Float slowly forward above the pink
milk river, following its shallow rightward bend. Pass two oversized
strawberries; the river surface has subtle smooth ripples. Keep landforms
fixed, scale consistent, and the camera level. The small round pink plaza
comes into view ahead. End approaching the plaza, still travelling gently
forward. No splash covering the lens, no sudden depth-of-field change.
```

**Connector C → D / `raw/06-river-cup.mp4`**

Start: actual last frame of scene C. End target: D anchor.

```text
Match both supplied endpoint images. Follow the milk river forward into the
round pink plaza. The single finished bubble tea cup is already standing
there; reveal it through camera travel, never by materialising or morphing
it. Keep the same straw, clear flat lid, pearl shapes and strawberry milk
colour. Gentle continuous dolly to the final supplied cup composition.
No orbit, cut, dissolve, exposure shift, new object, or camera roll.
```

**Scene D / `raw/07-cup.mp4`**

Start: actual last frame of connector C → D.

```text
Begin exactly on the supplied image. Gently approach the finished bubble
tea cup on its miniature pink plaza. A single green straw and flat clear
lid stay completely stable. Show the glossy tapioca pearls through the
clear cup. The camera decelerates gradually and settles into a centred
hero composition for the final second. Preserve the whole cup in frame,
leave quiet cream space around it. No writing, logos, or extra cups.
```

## 5. If a model does not hold endpoints

Do not batch more clips or silently switch to another provider. Check input IDs, upload format, endpoint support and documented settings. Lower camera complexity. Reuse actual output frames sequentially, then repeat the pilot. If it cannot produce an acceptable A → connector → B chain within budget, document the limitation and ask your teacher about an approved model alternative. A crossfade can hide a small exposure discontinuity but does not prove connected scene geometry and is not the intended fix here.

## 6. Finish

Run `python scripts/media.py assemble` after all seven original files exist. This writes the production film, poster, seam-frame pairs and measured timeline config. Do visual seam QA on the normalized files too. The tool never calls Magnific or spends credits.
