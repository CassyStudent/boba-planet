(() => {
  'use strict';
  const journey = document.querySelector('#journey');
  const film = document.querySelector('#film');
  const stage = document.querySelector('.stage');
  const art = [...document.querySelectorAll('.scene-art')];
  const sections = [...document.querySelectorAll('.scene')];
  const links = [...document.querySelectorAll('.chapter-nav a')];
  const fill = document.querySelector('#progress-fill');
  const status = document.querySelector('#media-status');
  const toggle = document.querySelector('#motion');
  const config = window.BOBA_MEDIA || {src:null,segments:[]};
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let reading = preference.matches, ready = false, failed = false;
  let raf = 0, desiredTime = 0, videoStarted = false, seekTimer;
  let journeyTop = 0, scrollDistance = 1;
  const frameDuration = 1 / (config.fps || 30);
  const clamp = (n, a=0, b=1) => Math.max(a, Math.min(b, n));
  const sum = config.segments.reduce((n,s) => n+s.duration,0) || 29;
  let cursor = 0;
  const starts = config.segments.filter(s => {
    s.start = cursor; cursor += s.duration; return s.kind === 'scene';
  }).map(s => s.start / sum);
  const boundaries = starts.length === 4 ? starts : [0,8/29,16/29,24/29];

  function applyReading() {
    document.body.classList.toggle('reading', reading);
    document.documentElement.style.scrollBehavior = reading ? 'auto' : '';
    toggle.setAttribute('aria-pressed', String(reading));
    toggle.textContent = reading ? 'Return to scroll story' : 'Read without motion';
    film.pause();
    if (reading) {
      clearTimeout(seekTimer);
      film.removeAttribute('src'); film.load(); ready = false; videoStarted = false;
      document.body.classList.remove('film-ready');
      status.textContent = 'Motion-free story';
    } else { failed = false; loadFilm(); }
    layout(); schedule();
  }
  function layout() {
    // Each text chapter begins at its scene's measured video boundary.
    sections.forEach((section,i) => {
      const length = ((boundaries[i+1] ?? 1)-boundaries[i])*620;
      section.style.minHeight = reading ? '' : `${length + (i===3 ? 100 : 0)}svh`;
    });
    measure();
  }
  function measure() {
    journeyTop = journey.getBoundingClientRect().top + scrollY;
    // Use the actual sticky height (stable svh), including on mobile when the
    // address bar changes. The entire film ends exactly when sticky travel ends.
    scrollDistance = Math.max(1, journey.offsetHeight-stage.offsetHeight);
    schedule();
  }
  function fallback() {
    failed = true; ready = false;
    clearTimeout(seekTimer);
    film.pause();
    document.body.classList.remove('film-ready');
    status.textContent = 'Film unavailable · explore the illustrated story';
    schedule();
  }
  function seek() {
    if (!ready || reading || film.seeking) return;
    if (Math.abs(film.currentTime-desiredTime) > frameDuration / 4) {
      // One seek at a time; seeked picks up the newest scroll target.
      try {
        film.currentTime = desiredTime;
        clearTimeout(seekTimer); seekTimer = setTimeout(fallback, 10000);
      } catch { fallback(); }
    }
  }
  function loadFilm() {
    if (!config.src || failed) {
      if (!failed) status.textContent = 'Illustrated preview · final film in production';
      return;
    }
    if (videoStarted) return;
    videoStarted = true;
    status.textContent = 'Preparing your little journey…';
    if (config.poster) film.poster = config.poster;
    film.src = config.src;
    film.load();
  }
  film.addEventListener('loadeddata', () => {
    if (reading || !Number.isFinite(film.duration) || film.duration <= 0) return;
    ready = true; failed = false;
    // Resolve restored/deep-link scroll positions before revealing any frame.
    cancelAnimationFrame(raf); raf = 0; render();
    // Keep the poster visible until the requested position has actually decoded.
    if (!film.seeking && Math.abs(film.currentTime-desiredTime) <= frameDuration) revealFilm();
  });
  function revealFilm() {
    if (!ready || reading) return;
    document.body.classList.add('film-ready');
    status.textContent = '';
  }
  film.addEventListener('seeked', () => {
    clearTimeout(seekTimer); revealFilm(); schedule();
  });
  // Never run a playback clock: both directions are exact seeks, not play().
  film.addEventListener('play', () => film.pause());
  film.addEventListener('error', () => {if (videoStarted && !reading) fallback();});
  function render() {
    raf = 0;
    const p = clamp((scrollY-journeyTop)/scrollDistance);
    fill.style.transform = `scaleX(${p})`;
    let active = 0;
    for (let i=1;i<boundaries.length;i++) if (p >= boundaries[i]-.0001) active=i;
    links.forEach((a,i) => i===active ? a.setAttribute('aria-current','step') : a.removeAttribute('aria-current'));
    document.querySelector('.chapter-nav').style.visibility = reading || p >= .999 ? 'hidden' : '';
    if (reading) return;
    if (!ready) art.forEach((img,i) => {
      const begin=boundaries[i], end=boundaries[i+1]??1;
      const local=clamp((p-begin)/(end-begin));
      const fadeIn = i===0 ? 1 : clamp((p-(begin-.035))/.035);
      const fadeOut = i===3 ? 1 : 1-clamp((p-(end-.035))/.035);
      img.style.opacity = String(fadeIn*fadeOut);
      img.style.transform = `translateY(${-local*18}px) scale(${1+local*.045})`;
    });
    if (ready) {
      // duration itself can be an empty end-of-stream frame, so stop on the
      // final decodable frame. Never reset currentTime when direction changes.
      desiredTime = p * Math.max(0,film.duration-frameDuration);
      seek();
    }
  }
  function schedule(){if (!raf) raf=requestAnimationFrame(render);}
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',measure);
  new ResizeObserver(measure).observe(journey);
  new ResizeObserver(measure).observe(stage);
  toggle.addEventListener('click',() => {
    reading=!reading; applyReading();
    // Keep the mode control available after a long journey.
    scrollTo({top:0,behavior:'instant'});
  });
  preference.addEventListener('change',e=>{reading=e.matches;applyReading();});
  // The header's mode control is also reachable through ordinary keyboard navigation.
  applyReading();
})();
