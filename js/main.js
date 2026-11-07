/* ════════════════════════════════════════════════════════════════
   main.js · Portafolio de Melissa Villatoro
   Índice:
    1. DATOS EDITABLES  ← aquí cambias servicios, videos, fotos, marcas y testimonios
    2. Utilidades
    3. Tema claro/oscuro
    4. Glitter (motor de partículas en canvas)
    5. Marcas (marquee infinito)
    6. Videografía (iPhone + carrusel)
    7. Servicios (tarjetas + carrusel con puntos y arrastre)
    8. Fotografía (filtros + ampliación)
    9. Testimonios
   10. Formulario → WhatsApp
   11. Entradas al hacer scroll y contadores
   12. Glitter en movimiento (clics, rastro, ambiente)
   13. Movimiento extra (intro del logo, progreso, inclinación 3D, botones magnéticos)
   14. Móvil y pie de página (menú hamburguesa, botón flotante, volver arriba)
   ════════════════════════════════════════════════════════════════ */
"use strict";

/* ── 1 · DATOS EDITABLES ──────────────────────────────────────── */

/* Servicios. De aquí salen las tarjetas del carrusel Y las opciones del formulario.
   icon: video | spark | camera | chart | star.   items: 3 viñetas cortas (edítalas a lo que realmente ofreces). */
const SERVICES = [
  { icon: "video",  t: "Edición de video",        d: "Reels, TikToks y videos de marca editados en Premiere, After Effects y CapCut.",
    items: ["Cortes con ritmo y transiciones", "Subtítulos, color y efectos", "Formatos para cada red social"] },
  { icon: "spark",  t: "Creación de contenido",   d: "Ideas, guiones y material audiovisual pensado para redes sociales.",
    items: ["Ideas y guion por pieza", "Grabación de video y foto", "Contenido en tendencia"] },
  { icon: "camera", t: "Fotografía",              d: "Producto, moda y eventos con una estética cuidada y lista para publicar.",
    items: ["Producto y moda", "Cobertura de eventos", "Edición y retoque"] },
  { icon: "chart",  t: "Estrategia de contenido", d: "Líneas de contenido y tendencias para que tu marca publique con intención.",
    items: ["Líneas y pilares de contenido", "Calendario de publicaciones", "Ajustes según resultados"] },
  { icon: "star",   t: "Imagen de marca",         d: "Participación en campañas publicitarias y eventos como modelo y vocera.",
    items: ["Campañas publicitarias", "Eventos y activaciones", "Vocera de marca"] },
];
/* Íconos (trazos SVG de 24×24) */
const ICONS = {
  video:  '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9.5v5l4.5-2.5z"/>',
  spark:  '<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
  camera: '<path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z"/><circle cx="12" cy="13" r="3.5"/>',
  chart:  '<path d="M4 20V11M10 20V4M16 20v-6M22 20H2"/>',
  star:   '<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z"/>',
};

/* Videos del iPhone. Usa UNO de:
   yt:  ID de un YouTube Short (gratis, no consume tu ancho de banda de Vercel)
   src: ruta a un mp4 vertical comprimido (<10 MB), p. ej. "videos/campana.mp4"
   Si no pones ninguno, se muestra solo el póster con "video próximamente". */
const REELS = [
  { t: "Campaña de temporada",    c: "Shopping Center", poster: "images/Illustration-1.jpg", yt: "" },
  { t: "Lanzamiento de producto", c: "Cliente",         poster: "images/Illustration-2.jpg", yt: "" },
  { t: "Detrás de cámaras",       c: "Grupo Lorena",    poster: "images/Illustration-3.jpg", yt: "" },
  { t: "Voluntariado Mis Huellas",c: "UGB",             poster: "images/Illustration-4.jpg", yt: "" },
];

/* Fotos de la galería (n = número de images/Illustration-n.jpg). */
const PHOTOS = [
  { n: 1, cat: "Producto", c: "Shopping Center", d: "Descripción breve de la campaña" },
  { n: 2, cat: "Moda",     c: "Grupo Lorena",    d: "Descripción breve de la campaña" },
  { n: 3, cat: "Producto", c: "Cliente",         d: "Descripción breve de la campaña" },
  { n: 4, cat: "Eventos",  c: "UGB",             d: "Descripción breve del evento" },
  { n: 5, cat: "Moda",     c: "Cliente",         d: "Descripción breve de la campaña" },
  { n: 6, cat: "Producto", c: "Cliente",         d: "Descripción breve de la campaña" },
  { n: 7, cat: "Eventos",  c: "Mis Huellas",     d: "Descripción breve del evento" },
  { n: 8, cat: "Moda",     c: "Cliente",         d: "Descripción breve de la campaña" },
];

/* Marcas del carrusel. "logo" es opcional: sin logo se muestra el nombre en texto.
   Para agregar una marca nueva basta una línea:  { name: "Mi marca" }  */
const BRANDS = [
  { name: "Shopping Center",   logo: "images/ShoppingCenter.png" },
  { name: "Grupo Lorena",      logo: "images/GrupoLorena.png" },
  { name: "Mis Huellas",       logo: "images/MisHuellas.png" },
  { name: "UGB",               logo: "images/UGB.png" },
  { name: "Global Outsourcing" },
];

/* Testimonios. Reemplaza el texto y quita "draft: true" para quitar la etiqueta Borrador. */
const TESTI = [
  { q: "Escribe aquí lo que dijo tu cliente sobre trabajar contigo: creatividad, puntualidad, resultados.", n: "Nombre del cliente", b: "Marca", draft: true },
  { q: "Una segunda opinión, de otra marca o proyecto con el que hayas colaborado.",                      n: "Nombre del cliente", b: "Marca", draft: true },
  { q: "Una tercera cita corta. Mejor si menciona un resultado concreto.",                                 n: "Nombre del cliente", b: "Marca", draft: true },
];

const WHATSAPP = "https://wa.me/50375440772";

/* ── 2 · UTILIDADES ───────────────────────────────────────────── */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const RM = matchMedia("(prefers-reduced-motion:reduce)").matches;   // ¿pidió menos movimiento?
const behavior = () => (RM ? "auto" : "smooth");
const esc = t => String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const centerOf = el => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
let lastX = innerWidth / 2, lastY = innerHeight / 2;                 // último punto tocado/movido

$("#y").textContent = new Date().getFullYear();

/* ── 3 · TEMA CLARO/OSCURO ────────────────────────────────────────
   El valor inicial lo pone el <script> del <head>. Aquí solo se
   maneja el botón y se sigue al sistema mientras no haya elección guardada. */
const root = document.documentElement, themeBtn = $("#theme");
function paintTheme() {
  const dark = root.dataset.theme === "dark";
  themeBtn.textContent = dark ? "☀\uFE0E" : "☾\uFE0E";
  themeBtn.setAttribute("aria-label", dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
  $("meta[name=theme-color]").content = dark ? "#1B1819" : "#FFF1F4";
}
themeBtn.onclick = () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
  paintTheme();
};
matchMedia("(prefers-color-scheme:dark)").addEventListener("change", e => {
  try { if (localStorage.getItem("theme")) return; } catch (_) {}
  root.dataset.theme = e.matches ? "dark" : "light";
  paintTheme();
});
paintTheme();

/* ── 4 · GLITTER ──────────────────────────────────────────────────
   Un solo <canvas> fijo cubre la pantalla. Dos funciones públicas:
   · glitter(x, y, n, opciones)  ráfaga desde un punto (clics, cañones).
   · dissolve(elemento)          "lluvia" de glitter sobre TODA el área de un
                                 objeto cuando aparece; flota y se desvanece lento.
   Partículas: estrellas, círculos y rombos con gravedad, giro y parpadeo, en la
   paleta del logo. El bucle se apaga solo cuando no quedan partículas.
   Opciones: angle/spread (dirección), power (fuerza), up (impulso hacia arriba),
   size (tamaño), g (gravedad), slow (<1 = dura más), rect (zona de aparición). */
const cv = $("#gl"), cx = cv.getContext("2d"), dpr = Math.min(devicePixelRatio || 1, 2);
const COLORS = ["#D82860", "#D24166", "#E4613C", "#EE7B30", "#FF9EB8", "#FFFFFF", "#F6C75A"];   // colores del logo (+ blanco y dorado)
const MAX_PARTICLES = 900;
let particles = [], running = false;

const fitCanvas = () => { cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; };
fitCanvas(); addEventListener("resize", fitCanvas);

/* Tres formas: 0 = estrella de 4 puntas, 1 = círculo, 2 = rombo */
function drawShape(kind, x, y, r, rot) {
  cx.beginPath();
  if (kind === 1) { cx.arc(x, y, r * .45, 0, 6.283); }
  else if (kind === 2) {
    for (let i = 0; i < 4; i++) { const a = rot + i * Math.PI / 2, k = i % 2 ? r * .55 : r; cx.lineTo(x + Math.cos(a) * k, y + Math.sin(a) * k); }
  } else {
    for (let i = 0; i < 8; i++) { const a = rot + i * Math.PI / 4, k = i % 2 ? r * .26 : r; cx.lineTo(x + Math.cos(a) * k, y + Math.sin(a) * k); }
  }
  cx.closePath(); cx.fill();
}

function glitter(x, y, n = 60, o = {}) {
  if (RM) return;                                   // respeta "reducir movimiento"
  const power = o.power ?? 1, up = o.up ?? 3, size = o.size ?? 1, g = o.g ?? .16, slow = o.slow ?? 1, box = o.rect;
  for (let i = 0; i < n && particles.length < MAX_PARTICLES; i++) {
    const a = o.angle !== undefined ? o.angle + (Math.random() - .5) * (o.spread ?? 1) : Math.random() * 6.283;
    const s = (2 + Math.random() * 7) * power;
    particles.push({
      x: box ? box.left + Math.random() * box.width : x,
      y: box ? box.top + Math.random() * box.height : y,
      vx: Math.cos(a) * s, vy: Math.sin(a) * s - up, g,
      r: size * (2.5 + Math.random() * 7), life: 1, decay: (.008 + Math.random() * .014) * slow,
      rot: Math.random() * 6, spin: (Math.random() - .5) * .25, tw: Math.random() * 6,
      color: COLORS[(Math.random() * COLORS.length) | 0], kind: Math.random() < .6 ? 0 : Math.random() < .5 ? 1 : 2,
    });
  }
  if (!running) { running = true; requestAnimationFrame(tick); }
}

/* Glitter que "construye" un objeto: nace por toda su superficie, sube suave y se desvanece (2–4 s). */
function dissolve(el, o = {}) {
  if (RM) return;
  const r = el.getBoundingClientRect();
  const l = Math.max(r.left, 0), t = Math.max(r.top, 0), w = Math.min(r.right, innerWidth) - l, h = Math.min(r.bottom, innerHeight) - t;
  if (w < 8 || h < 8) return;                       // fuera de pantalla
  const n = Math.max(18, Math.min(o.max ?? 110, Math.round(w * h / (o.dens ?? 5200))));
  glitter(0, 0, n, { rect: { left: l, top: t, width: w, height: h }, power: .3, up: .8, g: .012, slow: .55, size: .95 });
}

function tick() {
  cx.setTransform(1, 0, 0, 1, 0, 0); cx.clearRect(0, 0, cv.width, cv.height); cx.scale(dpr, dpr);
  particles = particles.filter(p => p.life > 0 && p.y < innerHeight + 40);
  for (const p of particles) {
    p.x += p.vx; p.y += p.vy; p.vy += p.g; p.vx *= .985; p.life -= p.decay; p.rot += p.spin;
    cx.globalAlpha = Math.max(p.life, 0) * (.55 + .45 * Math.sin(p.life * 50 + p.tw));   // se desvanece + parpadea
    cx.fillStyle = p.color;
    cx.shadowColor = p.color; cx.shadowBlur = p.r > 6 ? 10 : 0;                           // brillo solo en las grandes
    drawShape(p.kind, p.x, p.y, p.r, p.rot);
  }
  if (particles.length) requestAnimationFrame(tick);
  else { running = false; cx.clearRect(0, 0, cv.width, cv.height); }
}

/* Cañones de confeti brillante desde las dos esquinas de abajo */
function cannons() {
  glitter(0, innerHeight, 70, { angle: -1.05, spread: .5, power: 2.1, up: 5 });
  glitter(innerWidth, innerHeight, 70, { angle: -2.09, spread: .5, power: 2.1, up: 5 });
}

/* ── 5 · MARCAS (MARQUEE) ─────────────────────────────────────────
   Se dibujan dos mitades idénticas y el CSS las desplaza -50% en bucle.
   Solo el primer juego es visible para lectores de pantalla. */
(function brands() {
  const el = $("#brands");
  const pill = (b, hidden) => `<li class="brand"${hidden ? ' aria-hidden="true"' : ""}>${
    b.logo ? `<img src="${esc(b.logo)}" alt="${hidden ? "" : esc(b.name)}" loading="lazy">` : `<span>${esc(b.name)}</span>`}</li>`;
  const set = hidden => BRANDS.map(b => pill(b, hidden)).join("");
  el.innerHTML = `<ul class="marquee-track" style="--t:${BRANDS.length * 2 * 4}s">${set(false)}${set(true)}${set(true)}${set(true)}</ul>`;
})();

/* ── 6 · VIDEOGRAFÍA ──────────────────────────────────────────────
   Cada video es una diapositiva dentro de .screen (scroll-snap).
   - Se puede deslizar, usar flechas, puntos o la lista de la izquierda.
   - Avanza solo cada 5 s, salvo que haya un video reproduciéndose,
     el usuario esté encima, o la sección no esté a la vista.
   - Al cambiar de video lanza un destello sobre el teléfono. */
(function videos() {
  const screen = $("#slides"), list = $("#reelList"), dots = $("#dots"), phone = $("#phone"), stage = phone.parentElement, n = REELS.length;
  let cur = 0, hovering = false, playing = false, visible = true;

  const poster = (r, i) => `
    <img src="${esc(r.poster)}" alt="" loading="${i ? "lazy" : "eager"}">
    <div class="scrim"><span class="mono">${esc(r.c)}</span><strong>${esc(r.t)}</strong></div>
    <button class="play" type="button" aria-label="Reproducir: ${esc(r.t)}">▶</button>`;

  screen.innerHTML = REELS.map((r, i) =>
    `<div class="slide" data-i="${i}" role="group" aria-roledescription="diapositiva" aria-label="${i + 1} de ${n}">${poster(r, i)}</div>`).join("");
  list.innerHTML = REELS.map((r, i) =>
    `<button class="reel-item" type="button" data-i="${i}"><span>${esc(r.t)}</span><span class="mono">${esc(r.c)}</span></button>`).join("");
  dots.innerHTML = REELS.map((r, i) => `<button type="button" data-i="${i}" aria-label="Ir al video ${i + 1}"></button>`).join("");

  const slide = i => screen.children[i];
  const sync = () => $$("button", dots).concat($$(".reel-item", list)).forEach(b => b.setAttribute("aria-current", +b.dataset.i === cur));

  function mount(i) {                                   // reemplaza el póster por el reproductor
    const r = REELS[i], s = slide(i);
    if (!r.yt && !r.src) { if (!$(".soon", s)) s.insertAdjacentHTML("beforeend", '<p class="soon">Video próximamente</p>'); return; }
    s.innerHTML = r.yt
      ? `<iframe src="https://www.youtube-nocookie.com/embed/${esc(r.yt)}?autoplay=1&rel=0&playsinline=1" title="${esc(r.t)}" allow="autoplay;encrypted-media" allowfullscreen></iframe>`
      : `<video src="${esc(r.src)}" poster="${esc(r.poster)}" controls autoplay playsinline></video>`;
    playing = true;
  }
  function unmount(i) { slide(i).innerHTML = poster(REELS[i], i); playing = false; }   // vuelve al póster (detiene audio)

  function go(i) {
    i = (i + n) % n;
    screen.scrollTo({ left: i * screen.clientWidth, behavior: behavior() });
  }

  screen.addEventListener("scroll", () => {              // detecta la diapositiva visible
    const i = Math.round(screen.scrollLeft / screen.clientWidth);
    if (i === cur) return;
    if (playing) unmount(cur);
    cur = i; sync();
    if (visible) { glitter(...centerOf(phone), 22, { power: .9 }); dissolve(phone, { max: 90 }); }
  }, { passive: true });

  screen.addEventListener("click", e => { const s = e.target.closest(".slide"); if (s && !playing) mount(+s.dataset.i); });
  list.addEventListener("click", e => { const b = e.target.closest("[data-i]"); if (b) go(+b.dataset.i); });
  dots.addEventListener("click", e => { const b = e.target.closest("[data-i]"); if (b) go(+b.dataset.i); });
  $("#vPrev").onclick = () => go(cur - 1);
  $("#vNext").onclick = () => go(cur + 1);
  addEventListener("resize", () => screen.scrollTo({ left: cur * screen.clientWidth, behavior: "auto" }));

  stage.addEventListener("pointerenter", () => hovering = true);
  stage.addEventListener("pointerleave", () => hovering = false);
  stage.addEventListener("focusin", () => hovering = true);
  stage.addEventListener("focusout", () => hovering = false);
  new IntersectionObserver(([e]) => visible = e.isIntersecting, { threshold: .4 }).observe(phone);
  setInterval(() => { if (!RM && visible && !hovering && !playing && !document.hidden) go(cur + 1); }, 5000);

  /* Inclinación 3D del teléfono siguiendo el mouse (solo con mouse y sin "reducir movimiento") */
  if (!RM) {
    phone.addEventListener("pointermove", e => {
      if (e.pointerType !== "mouse") return;
      const r = phone.getBoundingClientRect();
      phone.style.setProperty("--ry", ((e.clientX - r.left) / r.width - .5) * 16 + "deg");
      phone.style.setProperty("--rx", (.5 - (e.clientY - r.top) / r.height) * 10 + "deg");
    });
    phone.addEventListener("pointerleave", () => { phone.style.setProperty("--ry", "0deg"); phone.style.setProperty("--rx", "0deg"); });
  }
  sync();
})();

/* ── 7 · SERVICIOS ────────────────────────────────────────────────
   - Genera las tarjetas y las opciones del formulario desde SERVICES.
   - Se navega con dedo, rueda, teclado, flechas (escritorio), puntos o ARRASTRANDO con el mouse.
   - Los puntos representan posiciones alcanzables (en escritorio caben 3 tarjetas, así que hay menos puntos).
   - Cada "Cotizar" preselecciona el servicio en el formulario. */
(function services() {
  const track = $("#track"), prev = $("#prev"), next = $("#next"), dotsEl = $("#svcDots");
  track.innerHTML = SERVICES.map((s, i) => `
    <article class="svc c${i % 5 + 1}" data-spark>
      <div class="svc-top"><span class="svc-ico"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[s.icon] || ""}</svg></span><span class="num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span></div>
      <h3>${esc(s.t)}</h3><p>${esc(s.d)}</p>
      <ul class="svc-list">${s.items.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      <a class="btn" href="#contacto" data-svc="${esc(s.t)}">Cotizar</a>
    </article>`).join("");
  $("#svc").innerHTML = [...SERVICES.map(s => s.t), "Otro"].map(t => `<option>${esc(t)}</option>`).join("");
  $$("[data-svc]").forEach(a => a.addEventListener("click", () => { $("#svc").value = a.dataset.svc; }));

  const gap = () => parseFloat(getComputedStyle(track).columnGap) || 16;
  const step = () => $(".svc", track).offsetWidth + gap();
  let pages = 1, cur = 0;
  function sync() {
    cur = Math.min(pages - 1, Math.max(0, Math.round(track.scrollLeft / step())));
    $$("button", dotsEl).forEach((b, i) => b.setAttribute("aria-current", i === cur));
    prev.disabled = track.scrollLeft < 4;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  }
  function build() {
    pages = Math.max(1, Math.round((track.scrollWidth - track.clientWidth) / step()) + 1);
    dotsEl.innerHTML = Array.from({ length: pages }, (_, i) => `<button type="button" data-i="${i}" aria-label="Ir al servicio ${i + 1}"></button>`).join("");
    sync();
  }
  const goTo = i => track.scrollTo({ left: i * step(), behavior: behavior() });
  prev.onclick = () => goTo(cur - 1);
  next.onclick = () => goTo(cur + 1);
  dotsEl.addEventListener("click", e => { const b = e.target.closest("[data-i]"); if (b) goTo(+b.dataset.i); });
  addEventListener("resize", build);

  let t = 0;
  track.addEventListener("scroll", () => {
    sync();
    const now = performance.now();                       // chispas mientras se desliza (máx. cada 110 ms)
    if (now - t > 110) { t = now; const r = track.getBoundingClientRect(); glitter(r.left + r.width * (.2 + Math.random() * .6), r.top + r.height / 2, 5, { power: .6, size: .8 }); }
  }, { passive: true });

  /* Arrastre con mouse: se desactiva el snap mientras se arrastra y al soltar se ajusta a la tarjeta más cercana */
  let down = false, moved = false, sx = 0, sl = 0;
  track.addEventListener("pointerdown", e => { if (e.pointerType !== "mouse" || e.button) return; down = true; moved = false; sx = e.clientX; sl = track.scrollLeft; track.classList.add("drag"); });
  addEventListener("pointermove", e => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 4) moved = true; track.scrollLeft = sl - dx; });
  addEventListener("pointerup", () => { if (!down) return; down = false; track.classList.remove("drag"); goTo(Math.round(track.scrollLeft / step())); });
  track.addEventListener("click", e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);   // un arrastre no cuenta como clic

  build();
})();

/* ── 8 · FOTOGRAFÍA ───────────────────────────────────────────────
   Filtros por categoría + ampliación en un <dialog> nativo
   (se cierra con Esc, con ✕ o tocando fuera). */
(function photos() {
  const dlg = $("#dlg"), stage = $("#stage"), info = $("#info");
  const cats = ["Todas", ...new Set(PHOTOS.map(p => p.cat))];
  $("#filters").innerHTML = cats.map((c, i) => `<button type="button" aria-pressed="${i === 0}" data-c="${esc(c)}">${esc(c)}</button>`).join("");
  $("#gallery").innerHTML = PHOTOS.map((p, i) => `
    <button class="shot" type="button" data-cat="${esc(p.cat)}" data-i="${i}" data-spark aria-label="Ampliar foto: ${esc(p.c)}">
      <img src="images/Illustration-${p.n}.jpg" alt="${esc(p.d)}, ${esc(p.c)}" loading="lazy">
      <span class="cap"><b>${esc(p.c)}</b>${esc(p.d)}</span>
    </button>`).join("");

  $("#filters").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    $$("#filters button").forEach(x => x.setAttribute("aria-pressed", x === b));
    $$(".shot").forEach(s => s.hidden = b.dataset.c !== "Todas" && s.dataset.cat !== b.dataset.c);
    $$(".shot:not([hidden])").forEach((s, i) => {          // las fotos visibles reaparecen en cascada con glitter
      s.classList.remove("pop"); void s.offsetWidth; s.style.animationDelay = i * 60 + "ms"; s.classList.add("pop");
      setTimeout(() => dissolve(s, { max: 45 }), i * 60 + 80);
    });
  });
  $("#gallery").addEventListener("click", e => {
    const b = e.target.closest(".shot"); if (!b) return;
    const p = PHOTOS[b.dataset.i];
    stage.innerHTML = `<img class="media" src="images/Illustration-${p.n}.jpg" alt="${esc(p.d)}, ${esc(p.c)}">`;
    info.innerHTML = `<span class="mono">${esc(p.c)}</span><p>${esc(p.d)}</p>`;
    dlg.showModal();
  });
  const close = () => { dlg.close(); stage.innerHTML = ""; };
  $("#x").onclick = close;
  dlg.addEventListener("click", e => { if (e.target === dlg) close(); });
  dlg.addEventListener("close", () => { stage.innerHTML = ""; });
})();

/* ── 9 · TESTIMONIOS ──────────────────────────────────────────── */
$("#quotes").innerHTML = TESTI.map(t =>
  `<article class="quote" data-spark>${t.draft ? '<span class="tag mono">Borrador</span>' : ""}<p>${esc(t.q)}</p><span class="mono">${esc(t.n)} · ${esc(t.b)}</span></article>`).join("");

/* ── 10 · FORMULARIO → WHATSAPP ───────────────────────────────────
   No hay servidor: se arma el mensaje y se abre wa.me (funciona gratis en Vercel). */
$("#form").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const text = `Hola Melissa, soy ${f.get("n")}${f.get("b") ? " de " + f.get("b") : ""}. Me interesa: ${f.get("s")}. ${f.get("m")}`;
  const a = document.createElement("a");
  a.href = `${WHATSAPP}?text=${encodeURIComponent(text)}`; a.target = "_blank"; a.rel = "noopener"; a.click();
  glitter(...centerOf(e.submitter || e.target), 80, { power: 1.3 });
});

/* ── 11 · ENTRADAS AL HACER SCROLL Y CONTADORES ───────────────────
   Todo lo que recibe .rv aparece con un desplazamiento suave y un pequeño
   retraso escalonado. Al aparecer un título, suelta un destello. */
/* Títulos: cada palabra es un <span class="w"> que sube con retraso escalonado (degradado del logo en el texto) */
$$(".head h2,.about h2,.video h2,.contact h2").forEach(h => {
  const t = h.textContent.trim(); h.setAttribute("aria-label", t);
  h.innerHTML = t.split(" ").map((w, i) => `<span class="w" aria-hidden="true" style="--i:${i}">${esc(w)}</span>`).join(" ");
});

/* Cada objeto aparece con desenfoque→nitidez y, a la vez, una lluvia de glitter que se desvanece.
   Pasado 1.8 s se le quita .rv para que sus efectos propios (hover, inclinación) vuelvan a funcionar. */
const REVEAL = ".head,.about,.card,.quote,.work>*,.video>*,.filters,.svc,.shot,.stats li,.about-brands";
const reveal = new IntersectionObserver(entries => entries.forEach(en => {
  if (!en.isIntersecting) return;
  const el = en.target; reveal.unobserve(el);
  el.classList.add("in"); $$(".w", el).forEach(w => w.classList.add("on"));
  dissolve(el);
  setTimeout(() => { el.classList.remove("rv", "in"); el.style.transitionDelay = ""; }, 1800);
}), { threshold: .05 });
$$(REVEAL).forEach((el, i) => { el.classList.add("rv"); el.style.transitionDelay = (i % 4) * 80 + "ms"; reveal.observe(el); });

const counters = new IntersectionObserver(entries => entries.forEach(en => {
  if (!en.isIntersecting) return;
  counters.unobserve(en.target);
  if (RM) return;
  const end = +en.target.dataset.n, t0 = performance.now();
  (function step(t) {
    const k = Math.min((t - t0) / 1200, 1);
    en.target.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(step); else glitter(...centerOf(en.target), 30, { power: .8 });
  })(t0);
}), { threshold: .6 });
$$(".stats b").forEach(b => counters.observe(b));

/* ── 12 · GLITTER EN MOVIMIENTO ───────────────────────────────────
   a) Clic en cualquier botón → ráfaga.
   b) Mouse sobre elementos [data-spark] → rastro de chispas.
   c) Al cargar → cañones + ráfaga en el sello del hero.
   d) Mientras el hero está a la vista → caen destellos suaves. */
addEventListener("pointermove", e => { lastX = e.clientX; lastY = e.clientY; }, { passive: true });

document.addEventListener("click", e => {
  const b = e.target.closest(".btn,.filters button,#theme,.arrows button,.phone-ctrl button,.reel-item,.top,.fab,#svcDots button");
  if (!b) return;
  let x = e.clientX, y = e.clientY;
  if (!x && !y) [x, y] = centerOf(b);                    // clic por teclado: sale desde el centro del botón
  glitter(x, y, 70, { power: 1.2 });
});

let lastTrail = 0;
document.addEventListener("pointermove", e => {
  if (e.pointerType !== "mouse" || e.timeStamp - lastTrail < 45) return;
  if (!e.target.closest(".hero,[data-spark]")) return;
  lastTrail = e.timeStamp;
  glitter(e.clientX, e.clientY, 3, { power: .5, size: .85, up: 1 });
}, { passive: true });

const heroEl = $(".hero"); let heroVisible = true;
new IntersectionObserver(([e]) => heroVisible = e.isIntersecting).observe(heroEl);
setInterval(() => {
  if (!heroVisible || document.hidden) return;
  const r = heroEl.getBoundingClientRect();
  glitter(r.left + Math.random() * r.width, Math.max(r.top, 0) + 10, 3, { angle: Math.PI / 2, spread: .8, power: .35, up: 0, size: .8 });
}, 650);

/* ── 13 · MOVIMIENTO EXTRA ───────────────────────────────────────── */

/* Intro: el logo se "escribe" de izquierda a derecha (clip-path en CSS) y el JS suelta
   glitter siguiendo el trazo. Solo la primera visita de la sesión; luego salen los cañones. */
(function splash() {
  const el = $("#splash"); if (!el) return;
  const celebrate = () => { cannons(); glitter(...centerOf($(".chip")), 60, { power: 1.1 }); dissolve($(".hero"), { max: 120 }); };
  let seen = false; try { seen = sessionStorage.getItem("splash"); } catch (e) {}
  if (RM || seen) { el.remove(); setTimeout(celebrate, 400); return; }
  try { sessionStorage.setItem("splash", "1"); } catch (e) {}
  const r = $("img", el).getBoundingClientRect(), t0 = performance.now() + 200;
  const trail = setInterval(() => {
    const k = (performance.now() - t0) / 1300; if (k < 0) return;
    if (k > 1) { clearInterval(trail); glitter(r.left + r.width / 2, r.top + r.height / 2, 90, { power: 1.2 }); return; }
    glitter(r.left + r.width * k, r.top + r.height * (.15 + Math.random() * .7), 9, { power: .6, up: 1, g: .05, slow: .8, size: .9 });
  }, 50);
  setTimeout(() => { el.classList.add("out"); setTimeout(() => el.remove(), 700); celebrate(); }, 2100);
})();

/* Progreso de lectura (barra superior) y parallax del hero: un solo rAF por scroll */
const fab = $("#fab"), contactEl = $("#contacto");
let ticking = false;
addEventListener("scroll", () => {
  if (ticking) return; ticking = true;
  requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - innerHeight;
    root.style.setProperty("--p", max > 0 ? scrollY / max : 0);
    root.style.setProperty("--sy", scrollY);
    fab.classList.toggle("show", scrollY > 500 && contactEl.getBoundingClientRect().top > innerHeight * .9);   // visible, salvo al llegar al formulario
    ticking = false;
  });
}, { passive: true });

if (!RM) {
  /* Inclinación 3D de tarjetas y fotos siguiendo el mouse */
  $$(".svc,.card,.quote,.about-photo").forEach(el => {
    el.classList.add("tilt");
    el.addEventListener("pointermove", e => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--ry", ((e.clientX - r.left) / r.width - .5) * 8 + "deg");
      el.style.setProperty("--rx", (.5 - (e.clientY - r.top) / r.height) * 6 + "deg");
    });
    el.addEventListener("pointerleave", () => { el.style.setProperty("--ry", "0deg"); el.style.setProperty("--rx", "0deg"); });
  });
  /* Botones "magnéticos": se acercan un poco al cursor */
  $$(".btn").forEach(b => {
    b.addEventListener("pointermove", e => {
      if (e.pointerType !== "mouse") return;
      const r = b.getBoundingClientRect();
      b.style.setProperty("--mx", ((e.clientX - r.left) / r.width - .5) * 10 + "px");
      b.style.setProperty("--my", ((e.clientY - r.top) / r.height - .5) * 8 + "px");
    });
    b.addEventListener("pointerleave", () => { b.style.setProperty("--mx", "0px"); b.style.setProperty("--my", "0px"); });
  });
}


/* ── 14 · MÓVIL Y PIE DE PÁGINA ───────────────────────────────────
   - Menú hamburguesa: abre/cierra el panel de enlaces (solo se ve en ≤ 900 px).
     Se cierra al elegir un enlace, al tocar fuera o con Esc.
   - "Volver arriba" del pie de página. */
(function mobileUI() {
  const btn = $("#menuBtn"), list = $("#navlinks");
  const set = open => {
    list.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open);
    btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    btn.textContent = open ? "✕" : "☰";
  };
  btn.onclick = () => set(!list.classList.contains("open"));
  list.addEventListener("click", e => { if (e.target.closest("a")) set(false); });
  document.addEventListener("click", e => { if (!e.target.closest("nav")) set(false); });
  addEventListener("keydown", e => { if (e.key === "Escape") set(false); });
  matchMedia("(min-width:901px)").addEventListener("change", e => { if (e.matches) set(false); });

  $("#toTop").onclick = () => scrollTo({ top: 0, behavior: behavior() });
})();
