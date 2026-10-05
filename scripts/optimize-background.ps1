param(
  [Parameter(Mandatory=$true)][string]$InputVideo,
  [string]$FFmpeg = 'ffmpeg'
)
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$mediaRoot = Join-Path $projectRoot 'media'
New-Item -ItemType Directory -Force -Path $mediaRoot | Out-Null
$sourceVideo = (Resolve-Path -LiteralPath $InputVideo).Path
$targetVideo = Join-Path $mediaRoot 'journey.mp4'
if ($sourceVideo -eq $targetVideo) { throw 'Use the original video as input, not the output journey.mp4.' }
& $FFmpeg -hide_banner -y -i $sourceVideo -map 0:v:0 -an -c:v libx264 -preset medium -crf 20 -g 6 -keyint_min 6 -sc_threshold 0 -bf 0 -pix_fmt yuv420p -movflags +faststart -map_metadata -1 $targetVideo
if ($LASTEXITCODE -ne 0) { throw 'Video encoding failed.' }
& $FFmpeg -hide_banner -y -i $targetVideo -frames:v 1 -q:v 2 -update 1 (Join-Path $mediaRoot 'poster.jpg')
if ($LASTEXITCODE -ne 0) { throw 'Poster extraction failed.' }
Write-Host 'Background and poster updated. Keep media-config.js fps aligned with your source.'
