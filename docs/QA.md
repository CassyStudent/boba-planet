# Video background verification — 6 October 2026

Source: user-provided CapCut export 1005.mp4. Original preserved. Published asset: media/journey.mp4, 1920×1080 H.264, 30 fps, 13.7 seconds, 9,061,933 bytes, silent, six-frame GOP, no B-frames, faststart. Source file was 16,110,818 bytes with audio.

## Passed in the Codex in-app Chromium browser

- Desktop viewport 1440×900 and phone-sized viewport 390×844: video fills the entire sticky stage, text stays above the footage, no horizontal page overflow.
- Forward scroll at mobile scrollY=2500: expected time 6.529078285 seconds; actual currentTime 6.529078 seconds; paused=true.
- Reverse from the same position to scrollY=2050: actual currentTime 5.353844 seconds; paused=true. It did not reset to zero.
- Rechecked without scrolling later: currentTime remained exactly 5.353844 seconds.
- Chapter 3 on desktop: currentTime 7.538709 seconds, paused=true, existing title and copy remain readable above the full background.
- End of journey: currentTime 13.666666 seconds, the last 30 fps frame of the 13.7-second video. No end-of-stream blank frame.
- Replay returns to currentTime 0 with paused=true.
- Manual Read without motion: all four static cards displayed; video src removed. No video clock runs in either mode.
- Server byte-range request bytes=100-199: HTTP 206, matching Content-Range, exactly 100 bytes returned.
- Entire optimized video decoded using FFmpeg without decode errors.
- JavaScript syntax check: npm run check passed.

## Implementation decisions

No autoplay, loop, reverse playbackRate or play() clock. Scroll progress maps directly to a seek target. Only one seek runs at a time; when it completes, a requestAnimationFrame update uses the newest scroll position. There is no easing tail that continues moving after scrolling stops beyond completing the requested decode. Geometry is cached and refreshed by resize/ResizeObserver, using the actual sticky stage height to keep mobile address-bar changes from corrupting the range.

The video is object-fit:cover. Landscape footage therefore crops at the sides on portrait phones, as necessary for the requested full-background design. Existing chapter spacing is preserved; text timing is proportional, not matched to newly detected video cuts. The source film's content was not regenerated or editorially changed.

## Not verified

Physical iPhone/iOS Safari, Android hardware, battery/data-saver behaviour, throttled-network performance, and final public-host performance. No claim is made that these were tested. OS reduced-motion detection remains in the code; the manual equivalent was exercised in this browser. The seven-clip Magnific assignment workflow is separate from this supplied-video integration and is not certified by these checks.
