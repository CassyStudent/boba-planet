"""Local media preparation only. Requires Python 3, ffmpeg and ffprobe on PATH.

python scripts/media.py frames raw/01-garden.mp4
python scripts/media.py pilot
python scripts/media.py assemble

No network calls, generation, API keys, or Python third-party packages.
"""
import argparse
import json
from pathlib import Path
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
NAMES = ["01-garden", "02-garden-kitchen", "03-kitchen", "04-kitchen-river",
         "05-river", "06-river-cup", "07-cup"]


def run(args):
    subprocess.run([str(x) for x in args], check=True)


def probe(file):
    data = subprocess.check_output([
        "ffprobe", "-v", "error", "-select_streams", "v:0", "-count_frames",
        "-show_entries", "stream=width,height,r_frame_rate,nb_read_frames,duration:format=duration",
        "-of", "json", str(file)
    ], text=True)
    info = json.loads(data)
    if not info.get("streams"):
        raise ValueError(f"No video stream: {file}")
    return info


def frames(file, directory=None):
    if not file.is_file():
        raise FileNotFoundError(file)
    directory = directory or ROOT / "raw" / "frames"
    directory.mkdir(parents=True, exist_ok=True)
    first, last = directory / f"{file.stem}-first.png", directory / f"{file.stem}-last.png"
    run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", file,
         "-map", "0:v:0", "-frames:v", "1", "-update", "1", first])
    # Decode all frames and overwrite one image: the result is the actual last
    # decoded frame, not a timestamp guess that might land on an earlier frame.
    run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", file,
         "-map", "0:v:0", "-an", "-fps_mode", "passthrough", "-update", "1", last])
    print(f"First frame: {first}\nLast frame:  {last}")
    return first, last


def assemble(pilot=False, width=1920):
    names = NAMES[:3] if pilot else NAMES
    files = [ROOT / "raw" / f"{name}.mp4" for name in names]
    missing = [str(f.relative_to(ROOT)) for f in files if not f.is_file()]
    if missing:
        raise FileNotFoundError("Generate these clips first:\n" + "\n".join(missing))
    output = ROOT / "media"
    work = ROOT / "work" / ("pilot" if pilot else "final")
    work.mkdir(parents=True, exist_ok=True)
    output.mkdir(exist_ok=True)
    height = width * 9 // 16
    records, seam_paths = [], []
    for i, (name, file) in enumerate(zip(names, files)):
        info = probe(file)
        stream = info["streams"][0]
        if abs(stream["width"] / stream["height"] - 16 / 9) > .02:
            raise ValueError(f"{file.name}: expected 16:9. Reframe deliberately before assembly.")
        encoded = work / f"{name}.mp4"
        run(["ffmpeg", "-hide_banner", "-loglevel", "warning", "-y", "-i", file,
             "-map", "0:v:0", "-an", "-vf",
             f"scale={width}:{height}:flags=lanczos,fps=30,setsar=1,format=yuv420p",
             "-c:v", "libx264", "-preset", "medium", "-crf", "20",
             "-g", "6", "-keyint_min", "6", "-sc_threshold", "0", "-bf", "0",
             "-movflags", "+faststart", encoded])
        normalized = probe(encoded)["streams"][0]
        duration = int(normalized["nb_read_frames"]) / 30
        records.append({"id": name[3:], "kind": "scene" if i % 2 == 0 else "connector",
                        "duration": duration})
        seam_paths.append(frames(encoded, work / "frames"))
    concat = work / "concat.txt"
    # Relative controlled filenames avoid quoting arbitrary user paths.
    concat.write_text("\n".join(f"file '{name}.mp4'" for name in names) + "\n", encoding="utf-8")
    target = output / ("pilot.mp4" if pilot else "journey.mp4")
    run(["ffmpeg", "-hide_banner", "-loglevel", "warning", "-y", "-f", "concat",
         "-safe", "1", "-i", concat, "-c", "copy", "-movflags", "+faststart", target])
    actual = float(probe(target)["format"]["duration"])
    expected = sum(r["duration"] for r in records)
    if abs(actual - expected) > .1:
        raise ValueError(f"Joined duration {actual} differs from segment total {expected}; inspect timestamps.")
    # Pair images for human seam QA; differences are not automatically judged.
    for i in range(len(names)-1):
        pair = work / "frames" / f"seam-{i+1}.png"
        run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", seam_paths[i][1],
             "-i", seam_paths[i+1][0], "-filter_complex", "hstack=inputs=2",
             "-frames:v", "1", "-update", "1", pair])
    (work / "timeline.json").write_text(json.dumps(records, indent=2), encoding="utf-8")
    if not pilot:
        poster = output / "poster.jpg"
        run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", target,
             "-frames:v", "1", "-q:v", "2", "-update", "1", poster])
        config = {"src": "media/journey.mp4", "poster": "media/poster.jpg", "segments": records}
        (ROOT / "media-config.js").write_text(
            "// Generated from measured normalized video durations.\nwindow.BOBA_MEDIA = "
            + json.dumps(config, indent=2) + ";\n", encoding="utf-8")
    print(f"Wrote {target}; {actual:.3f}s; {target.stat().st_size / 1_000_000:.1f} MB")
    print(f"Inspect all seam pairs in {work / 'frames'} and scrub the video in both directions.")
    print("Generation provenance and visual continuity are not certified by this script.")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", choices=["frames", "pilot", "assemble"])
    parser.add_argument("file", nargs="?")
    parser.add_argument("--width", type=int, choices=[1280, 1920], default=1920)
    args = parser.parse_args()
    for tool in ["ffmpeg", "ffprobe"]:
        if not shutil.which(tool):
            parser.error(f"{tool} is not on PATH. Install FFmpeg from an official distribution, reopen your terminal, and retry.")
    if args.command == "frames":
        if not args.file:
            parser.error("frames needs a file, e.g. raw/01-garden.mp4")
        file = Path(args.file)
        frames(file if file.is_absolute() else ROOT / file)
    else:
        assemble(pilot=args.command == "pilot", width=args.width)


if __name__ == "__main__":
    try:
        main()
    except (FileNotFoundError, ValueError, subprocess.CalledProcessError) as error:
        print(f"Media preparation stopped: {error}", file=sys.stderr)
        sys.exit(1)
