# Boba Planet — creative direction and research

## Status

This is a production plan plus a working illustrated prototype. Magnific imagery, seven generated videos, transition approval, a remote GitHub repository and a published final URL are still outstanding. Do not present the SVG preview as the completed video assignment.

## Subject, audience, purpose

A fictional bubble tea brand takes a visitor through an imaginary miniature world inside its signature strawberry milk tea. Audience: students and young adults who enjoy playful food brands. Purpose: turn an ordinary drink into a short, memorable ingredient journey. Message: “A tiny world in every sip.” The ending reveals the signature recipe and invites a replay; there is no fake shop or checkout.

## Research log — 5 sources

Reviewed 5 October 2026. These are research notes from published pages and reference source code, not claims that every animation was tested on every device. Before submitting, visit each site yourself, capture a screenshot, and add your own observation below it.

| Reference | Observed design principle | Our interpretation / use | Avoid |
|---|---|---|---|
| [oso95/scroll-world](https://github.com/oso95/scroll-world/tree/main), including its skill and scrub engine | A connected pre-rendered journey with scene clips and connectors; endpoint continuity matters | Seven ordered video segments; extract real decoded boundary frames; drive time from scroll | Copying its brand, default layout, or generation backend |
| [Apple AirPods Pro](https://www.apple.com/airpods-pro/) | Product storytelling broken into concise feature sections, with prominent product imagery | Keep each ingredient beat short, then reveal one memorable finished cup | Apple's product claims, assets, or exact presentation |
| [The Pudding: Are Pop Lyrics Getting More Repetitive?](https://pudding.cool/2017/05/song-repetition/) | An interactive explanation builds a complex idea through smaller examples | One main message per chapter; keep readable text in HTML | Too many ideas or interactive controls per scene |
| [Josh Worth: If the Moon Were Only 1 Pixel](https://www.joshworth.com/dev/pixelspace/pixelspace_solarsystem.html) | Travel distance and sparse text make the scale of the solar system experiential | Scrolling is the act of travelling; short messages mark arrivals | Long, empty stretches with no visual reward |
| [Campo Santo: Firewatch](https://www.firewatchgame.com/) | A cohesive illustrated landscape establishes the game's atmosphere | Layered landscape depth and a limited colour family | Borrowing its landscape art or calling parallax a replacement for video |

The first source is the required reference; the other four are additional references. Snow Fall was considered but its page was inaccessible during this research, so it is not counted. Dynamic scroll behaviour requires personal browser inspection; the source review does not certify animation performance.

## Visual identity

| Token | Hex | Use |
|---|---|---|
| Oat cream | `#FFF8EC` | Page, mist, negative space |
| Cocoa | `#36251F` | Type, pearls, final section |
| Strawberry | `#EAA0B5` | River, architecture, cup |
| Berry | `#993C59` | Emphasis, focus rings |
| Matcha | `#8CA66B` | Tea leaves, straw, hills |
| Biscuit | `#E8C99D` | Paths, warm structures |

Typography: Georgia italic and regular for expressive large headings, Arial/Helvetica for navigation and reading text. Both are system font stacks, so the prototype needs no font downloads. Keep long copy at 14–18px, eyebrow labels short, and text out of generated footage.

Final film art direction: a handmade miniature world with matte ceramic hills, waxy leaves, glossy tapioca, frosted pink glass and translucent milky water. Soft, broad light from upper left; gentle shadows; no dramatic lighting change between clips. Camera: a slow continuous forward dolly with a slight downward view, approximately a 35mm lens. No cuts, reverse camera travel, whip pans, orbit, or sudden focal-length changes. Keep critical objects in the centre 60% of a 16:9 frame.

The included SVGs are original vector art for layout, fallback and storyboard use. Final image prompts translate their colours and composition into a three-dimensional miniature film. They are not generated endpoint frames.

## Story and timing target

| Segment | Target time | What happens | HTML text |
|---|---|---|---|
| 01 Garden | 0–5s | Fly through tea terraces toward a pink arch | A tiny world. A very good sip. |
| 02 Connector | 5–8s | Pass through the arch into the pearl kitchen | Let the journey breathe |
| 03 Kitchen | 8–13s | Glide past a copper bowl and pearl channel | Small pearls. Big personality. |
| 04 Connector | 13–16s | Follow the channel to the strawberry river | Let the journey breathe |
| 05 River | 16–21s | Follow the curve of pink milk and berries | Take the sweet way. |
| 06 Connector | 21–24s | Follow the river toward a cup on a small plaza | Let the journey breathe |
| 07 Cup | 24–29s | Approach the clear finished cup and settle | Your world. To go. |

Target is 29 seconds (4 × 5 + 3 × 3). Durations must follow the chosen model's supported values; the build uses measured clip durations, not these estimates. No extra mobile generation is planned. Mobile uses the same complete landscape image in a contained panel, without cropping; a native portrait film is optional future work and needs a separate budget.

## Technical plan

Plain HTML, CSS and JavaScript. No frontend dependencies. A Node static server supplies byte ranges locally. A single joined, silent H.264 MP4 avoids swapping video elements at every seam. Use 1920×1080 at 30 fps if the account supports it; draft at the lowest useful supported resolution. Generate source stills at a supported 2K/4K 16:9 size.

The sticky stage stays in view while four HTML sections pass. Normalized scroll progress maps to `currentTime`; reversing scroll decreases the target. Only one seek is allowed in flight. A completed seek picks up the most recent target, avoiding an endless request queue. Each clip is normalized and encoded with short GOPs (a keyframe every six frames). Faststart moves MP4 metadata to the beginning. Measured segment durations drive chapter boundaries.

The static illustration stays visible while video loads or if playback fails. No black loading screen. Preload the one compressed journey only when motion mode is active; estimate its real payload after encoding, aiming below roughly 25 MB rather than assuming a guaranteed bitrate. Test actual seek latency under throttling. Reduced-motion users get four static illustrated cards, no video request, and ordinary readable scrolling. A manual button offers the same mode. With JavaScript disabled, CSS reveals the four illustrated sections.

## Your personal decisions to add

Record why you chose bubble tea, one change you made to this proposed direction, which transition needed revision, and what you learned about video scrubbing. Include your own research screenshots and real test results; do not invent process evidence.
