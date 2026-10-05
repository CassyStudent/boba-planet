# Published film

The current journey.mp4 is an optimized copy of the user-supplied 1005.mp4.
It is a silent H.264 film with frequent keyframes and faststart, used as the
full sticky background. poster.jpg comes from its first frame. The original
source remains unchanged outside this project.

The commands below describe the earlier optional seven-clip generation
workflow. Running assemble intentionally replaces the current film and config.

With Python, ffmpeg and ffprobe installed, run:

    python scripts/media.py pilot
    python scripts/media.py assemble

The first command requires the first three raw videos and writes pilot.mp4.
The second requires all seven, writes journey.mp4 and poster.jpg, and updates
the root media-config.js. Normalized intermediates are in ignored work/.
Inspect seams before considering the production film complete.
