/* ================================================================
   Early Watch — Shared Application Logic
   ================================================================ */

// Detection automatique : dev local vs prod.
// - Si la page est servie depuis localhost/127.0.0.1 (ou file://), on tape le backend local
//   sur http://127.0.0.1:8000.
// - Sinon (GitHub Pages, domaine custom), on tape la prod Scaleway.
// Regle d'or : jamais de dev contre la prod.
const API = (() => {
  const h = window.location.hostname;
  if (h === 'localhost' || h === '127.0.0.1' || h === '' /* file:// */) {
    return 'http://127.0.0.1:8000';
  }
  return 'https://earlybriefp7hwqsga-earlybrief-api.functions.fnc.fr-par.scw.cloud';
})();

// ---- Auth ----
function getToken() {
  return sessionStorage.getItem('ew_token');
}
function getUser() {
  const u = sessionStorage.getItem('ew_user');
  return u ? JSON.parse(u) : null;
}
function requireAuth() {
  if (!getToken()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}
function logout() {
  sessionStorage.removeItem('ew_token');
  sessionStorage.removeItem('ew_user');
  window.location.href = 'login.html';
}

// ---- API helper ----
async function api(path, opts = {}) {
  const token = getToken();
  const headers = { ...opts.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (opts.body && typeof opts.body === 'object') {
    headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(opts.body);
  }
  const res = await fetch(`${API}${path}`, { ...opts, headers });
  if (res.status === 401) {
    logout();
    throw new Error('Session expirée');
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || 'Erreur serveur');
  }
  if (res.status === 204) return null;
  return res.json();
}

// ---- Toast ----
function toast(msg, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

// ---- Score helpers ----
function scoreClass(score) {
  if (score == null) return 'score-low';
  if (score >= 80) return 'score-critical';
  if (score >= 50) return 'score-high';
  if (score >= 25) return 'score-med';
  return 'score-low';
}
function scoreBar(score) {
  const pct = Math.min(100, Math.max(0, score || 0));
  const cls = scoreClass(score);
  return `<div class="score-bar ${cls}"><div class="score-bar-fill" style="width:${pct}%"></div></div>`;
}

// ---- Date formatting ----
function formatDate(d) {
  if (!d) return '—';
  const dt = new Date(d);
  return dt.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
}
function formatTime(d) {
  if (!d) return '';
  const dt = new Date(d);
  return dt.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

// ---- Badge helpers ----
function statusBadge(status) {
  const map = {
    nouveau: ['Nouveau', 'badge-accent'],
    important: ['Important', 'badge-warning'],
    quotidien: ['Quotidien', 'badge-accent'],
    hebdo: ['Hebdo', 'badge-neutral'],
    relu: ['Relu', 'badge-neutral'],
    archive: ['Archive', 'badge-neutral'],
    ignorer: ['Ignoré', 'badge-neutral'],
    pending_validation: ['Validation', 'badge-warning'],
    validated: ['Validé', 'badge-accent'],
    rejected: ['Rejeté', 'badge-danger'],
  };
  const [label, cls] = map[status] || [status, 'badge-neutral'];
  return `<span class="badge ${cls}">${label}</span>`;
}
function actionBadge(type) {
  if (!type) return '';
  const map = {
    sanctions_update: 'Sanctions',
    doctrine_update: 'Doctrine',
    obligation_update: 'Obligations',
  };
  return `<span class="badge badge-accent">${map[type] || type}</span>`;
}

// ---- Simple Markdown renderer ----
function renderMarkdown(md) {
  if (!md) return '';
  let html = md
    // Escape HTML
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // Horizontal rules
    .replace(/^---$/gm, '<hr>')
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    // Table rows
    .replace(/^\|(.+)\|$/gm, (match, content) => {
      if (content.match(/^[\s\-|]+$/)) return '<!-- sep -->';
      const cells = content.split('|').map(c => c.trim());
      return '<tr>' + cells.map(c => `<td>${c}</td>`).join('') + '</tr>';
    });

  // Wrap table rows
  html = html.replace(/((?:<tr>.*<\/tr>\n?)+)/g, (m) => {
    const cleaned = m.replace(/<!-- sep -->\n?/g, '');
    // First row = header
    const firstRowEnd = cleaned.indexOf('</tr>') + 5;
    const header = cleaned.slice(0, firstRowEnd).replace(/<td>/g, '<th>').replace(/<\/td>/g, '</th>');
    const rest = cleaned.slice(firstRowEnd);
    return `<table>${header}${rest}</table>`;
  });

  // Lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');

  // Paragraphs
  html = html.split('\n').map(line => {
    if (line.match(/^<(h[1-3]|ul|ol|li|table|tr|hr|!-)/)) return line;
    if (line.trim() === '') return '';
    return `<p>${line}</p>`;
  }).join('\n');

  return html;
}

// ---- Header renderer ----
function renderHeader() {
  const user = getUser();
  const initials = user ? (user.first_name?.[0] || '') + (user.last_name?.[0] || '') : '?';
  const tenant = user?.tenant_id ? 'Demo' : '';
  return `
    <header class="header">
      <div class="flex items-center gap-16">
        <a href="conformite.html" class="logo">Early <span>Watch</span></a>
        <nav class="flex gap-4">
          <a href="conformite.html" class="btn btn-ghost btn-sm">Conformite</a>
          <a href="dashboard.html" class="btn btn-ghost btn-sm">Inbox</a>
          <a href="procedure.html" class="btn btn-ghost btn-sm">Procedures</a>
          <a href="mes-procedures.html" class="btn btn-ghost btn-sm">Mes Procedures</a>
          <a href="bibliotheque.html" class="btn btn-ghost btn-sm">Bibliotheque</a>
          <a href="situations.html" class="btn btn-ghost btn-sm">Fiches Reflexes</a>
          <a href="roadmap.html" class="btn btn-ghost btn-sm">Roadmap</a>
          <a href="pays-risque.html" class="btn btn-ghost btn-sm">Pays a risque</a>
          <a href="settings.html" class="btn btn-ghost btn-sm">Parametres</a>
          <a href="controle.html" class="btn btn-ghost btn-sm" style="position:relative">Controle <span id="nav-badge-ctrl" style="display:none;position:absolute;top:-4px;right:-10px;background:#8B2F1F;color:#fff;font-size:10px;font-weight:700;min-width:18px;height:18px;line-height:18px;text-align:center;border-radius:9px;padding:0 5px;border:1.5px solid var(--noir)"></span></a>
        </nav>
      </div>
      <div class="flex items-center gap-12">
        ${tenant ? `<span class="badge badge-accent">${tenant}</span>` : ''}
        <a href="account.html" class="avatar" title="${user?.email || ''} — Mon compte" style="text-decoration:none">${initials}</a>
      </div>
    </header>`;
}

// ---- Expandable sections ----
function initExpandables() {
  document.querySelectorAll('.expandable-header').forEach(h => {
    h.addEventListener('click', () => {
      h.closest('.expandable').classList.toggle('open');
    });
  });
}

// ---- Reminder badge (nav) ----
async function loadReminderBadge() {
  try {
    const counts = await api('/api/v1/reminders/counts');
    const total = (counts.critical || 0) + (counts.high || 0) + (counts.medium || 0);
    const badge = document.getElementById('nav-badge-ctrl');
    if (badge && total > 0) {
      badge.textContent = total > 99 ? '99+' : total;
      badge.style.display = 'inline-block';
    }
  } catch (_) { /* silently ignore */ }
}
// Auto-load badge when header is rendered and user is authenticated
if (getToken()) {
  document.addEventListener('DOMContentLoaded', () => setTimeout(loadReminderBadge, 200));
  // Fallback if DOM already loaded
  if (document.readyState !== 'loading') setTimeout(loadReminderBadge, 200);
}
