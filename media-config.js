// User-provided CapCut film, optimized for scroll seeking.
// Chapter weights preserve the original page spacing; they are not detected cuts.
window.BOBA_MEDIA = {
  src: 'media/journey.mp4',
  poster: 'media/poster.jpg',
  fps: 30,
  // Original chapter timing proportions, scaled to the loaded film's duration.
  segments: [
    {id:'garden', kind:'scene', duration:5},
    {id:'garden-kitchen', kind:'connector', duration:3},
    {id:'kitchen', kind:'scene', duration:5},
    {id:'kitchen-river', kind:'connector', duration:3},
    {id:'river', kind:'scene', duration:5},
    {id:'river-cup', kind:'connector', duration:3},
    {id:'cup', kind:'scene', duration:5}
  ]
};
