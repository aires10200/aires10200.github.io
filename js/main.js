/* ---------- utilidades ---------- */
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// destaca trechos "TODO: ..." para ficarem fáceis de achar
const t = s => /^TODO/.test(s) ? `<span class="todo">${esc(s)}</span>` : esc(s);
const chips = arr => arr.length ? `<div class="chips">${arr.map(c => `<span class="chip">${esc(c)}</span>`).join('')}</div>` : '';

/* ---------- conteúdo das janelas ---------- */
const WINDOWS = {
  sobre: () => `
    <div class="about">
      <div class="avatar" aria-hidden="true">${esc(DATA.iniciais)}</div>
      <div>
        <div class="hi">olá, eu sou</div>
        <div class="name">${esc(DATA.nome)}</div>
        <div class="role">${esc(DATA.cargo)}</div>
        <p>${esc(DATA.bio)}</p>
        ${chips(DATA.skills)}
      </div>
    </div>`,
  projetos: () => `
    <h2>Projetos</h2>
    <ul class="list">${DATA.projetos.map(p => `
      <li class="card">
        <div class="top"><h3>${t(p.titulo)}</h3><span class="tag">${esc(p.tag)}</span></div>
        <p>${t(p.desc)}</p>
        ${chips(p.stack)}
        ${p.link ? `<a class="link" href="${esc(p.link)}" target="_blank" rel="noopener">ver projeto →</a>` : ''}
      </li>`).join('')}</ul>`,
  conquistas: () => `
    <h2>Conquistas</h2>
    <ul class="log">${DATA.conquistas.map(c => `<li><time>${esc(c.quando)}</time><span>${t(c.texto)}</span></li>`).join('')}</ul>`,
  objetivos: () => `
    <h2>O que eu quero</h2>
    <ul class="goals">${DATA.objetivos.map(o => `<li><span>${t(o)}</span></li>`).join('')}</ul>`,
  contato: () => `
    <div class="banner"><i></i>${esc(DATA.contato.disponibilidade)}</div>
    <p>Tem uma vaga, um freela ou uma ideia? Me chama.</p>
    <ul class="contacts">
      <li><b>e-mail</b><a href="mailto:${esc(DATA.contato.email)}">${esc(DATA.contato.email)}</a>
          <button class="copy" data-copy="${esc(DATA.contato.email)}">copiar</button></li>
      ${DATA.contato.links.map(l => `<li><b>${esc(l.nome.toLowerCase())}</b><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.url.replace(/^https?:\/\/(www\.)?/, ''))}</a></li>`).join('')}
    </ul>`
};

/* ---------- cabeçalho, hero e dock ---------- */
document.title = `${DATA.nome} — portfólio`;
document.getElementById('host').textContent = `${DATA.usuario}@portfolio`;
document.getElementById('heroName').textContent = DATA.nome;
document.getElementById('heroTag').textContent = DATA.tagline;

const clock = document.getElementById('clock');
const tick = () => clock.textContent = new Date().toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'});
tick(); setInterval(tick, 15000);

const arrow = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11l6-6M6 5h5v5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
document.getElementById('dock').innerHTML =
  DATA.contato.links.map(l => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${arrow}${esc(l.nome)}</a>`).join('');

/* ---------- gerenciador de janelas ---------- */
const desktop = document.getElementById('desktop');
const open = {};          // id -> elemento
let z = 10, cascade = 0;

function focusWin(win){
  desktop.querySelectorAll('.win.front').forEach(w => w.classList.remove('front'));
  win.classList.add('front');
  win.style.zIndex = ++z;
}

function openWin(id){
  if (open[id]) return focusWin(open[id]);
  const win = document.createElement('section');
  win.className = 'win';
  win.setAttribute('role', 'dialog');
  win.setAttribute('aria-label', id);
  win.innerHTML = `
    <div class="titlebar"><span>~/portfolio/${id}</span>
      <button class="close" aria-label="Fechar ${id}">x</button></div>
    <div class="body">${WINDOWS[id]()}</div>`;
  desktop.appendChild(win);

  // centraliza, com um pequeno deslocamento em cascata a cada janela nova
  const d = desktop.getBoundingClientRect(), w = win.getBoundingClientRect();
  const off = (cascade++ % 5) * 22;
  win.style.left = Math.max(12, Math.min(d.width - w.width / .96 - 12, (d.width - w.width / .96) / 2 + off)) + 'px';
  win.style.top  = Math.max(12, Math.min(d.height - w.height / .96 - 12, (d.height - w.height / .96) * .42 + off)) + 'px';

  open[id] = win;
  focusWin(win);
  requestAnimationFrame(() => win.classList.add('open'));

  win.addEventListener('pointerdown', () => focusWin(win));
  win.querySelector('.close').addEventListener('click', () => closeWin(id));
  makeDraggable(win, win.querySelector('.titlebar'));
  win.querySelector('.close').focus({preventScroll:true});
}

function closeWin(id){
  const win = open[id];
  if (!win) return;
  delete open[id];
  win.classList.remove('open');
  setTimeout(() => win.remove(), 190);
  if (!Object.keys(open).length) cascade = 0;
}

function makeDraggable(win, handle){
  handle.addEventListener('pointerdown', e => {
    if (e.target.closest('.close')) return;
    const d = desktop.getBoundingClientRect(), r = win.getBoundingClientRect();
    const dx = e.clientX - r.left, dy = e.clientY - r.top;
    handle.setPointerCapture(e.pointerId);
    const move = ev => {
      // mantém a barra de título sempre alcançável
      const x = Math.max(60 - r.width, Math.min(d.width - 60, ev.clientX - d.left - dx));
      const y = Math.max(0, Math.min(d.height - 34, ev.clientY - d.top - dy));
      win.style.left = x + 'px'; win.style.top = y + 'px';
    };
    const up = () => { handle.removeEventListener('pointermove', move); handle.removeEventListener('pointerup', up); handle.removeEventListener('pointercancel', up); };
    handle.addEventListener('pointermove', move);
    handle.addEventListener('pointerup', up);
    handle.addEventListener('pointercancel', up);
  });
}

document.querySelectorAll('[data-open]').forEach(b => b.addEventListener('click', () => openWin(b.dataset.open)));

// Esc fecha a janela da frente
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  const front = desktop.querySelector('.win.front');
  const id = front && Object.keys(open).find(k => open[k] === front);
  if (id) {
    closeWin(id);
    const rest = Object.values(open).sort((a, b) => b.style.zIndex - a.style.zIndex)[0];
    if (rest) focusWin(rest);
  }
});

// botão "copiar" do e-mail
desktop.addEventListener('click', async e => {
  const btn = e.target.closest('[data-copy]');
  if (!btn) return;
  try { await navigator.clipboard.writeText(btn.dataset.copy); btn.textContent = 'copiado!'; }
  catch { btn.textContent = 'selecione e copie'; }
  setTimeout(() => btn.textContent = 'copiar', 1600);
});
