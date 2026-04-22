/**
 * Early Watch — Shared article card and tab rendering
 * Used by: src/pages/dashboard.astro AND src/pages/app/veille.astro
 *
 * All CSS classes used here are global (components.css) so they apply
 * correctly to dynamically generated innerHTML in both pages.
 */

import { sourceAvatarHTML } from './sigles.js';

// ── Sort ─────────────────────────────────────────────────────────────────────

export const SORT_LABELS = {
  recent: 'Plus récent',
  oldest: 'Plus ancien',
  week:   'Cette semaine',
  '7days':'7 derniers jours',
};

// ── Tabs ─────────────────────────────────────────────────────────────────────

/**
 * Single tab button. Uses global .ew-tab / .ew-tab-num from components.css.
 * @param {string} key       data-tab value used for click binding
 * @param {string} label     display label
 * @param {number} count     article count shown in tab
 * @param {string} activeKey currently active tab key
 */
export function renderEwTab(key, label, count, activeKey) {
  return `<button class="ew-tab${activeKey === key ? ' active' : ''}" data-tab="${key}">${label}<span class="ew-tab-num">${count}</span></button>`;
}

/**
 * Sort dropdown. Uses global .ew-sort-wrap / .ew-sort-btn / .ew-sort-menu / .ew-sort-opt.
 * @param {string} sortMode  current sort key (key of SORT_LABELS)
 */
export function renderSortDropdown(sortMode) {
  const label = SORT_LABELS[sortMode] || 'Plus récent';
  return `<div class="ew-sort-wrap" id="sort-wrap">
    <button class="ew-sort-btn" id="sort-btn">${label} ▾</button>
    <div class="ew-sort-menu" id="sort-menu" style="display:none">
      ${Object.entries(SORT_LABELS).map(([k, v]) =>
        `<button class="ew-sort-opt" data-sort-opt="${k}">${v}</button>`
      ).join('')}
    </div>
  </div>`;
}

/**
 * Bind sort dropdown click events. Call after renderSortDropdown is injected.
 * @param {(key: string) => void} onSortChange  called with the chosen sort key
 */
export function bindSortDropdown(onSortChange) {
  const btn  = document.getElementById('sort-btn');
  const menu = document.getElementById('sort-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = menu.style.display !== 'none';
    menu.style.display = open ? 'none' : 'block';
    if (!open) {
      document.addEventListener('click', () => { menu.style.display = 'none'; }, { once: true });
    }
  });
  menu.querySelectorAll('[data-sort-opt]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.style.display = 'none';
      onSortChange(el.dataset.sortOpt);
    });
  });
}

// ── Client card ──────────────────────────────────────────────────────────────

/**
 * Client article card — used by /app/veille.
 *
 * Shares the same HTML skeleton as the admin card:
 *   .ew-item (3-col grid) · .ew-source-avatar · .ew-item-body · .ew-item-side
 *   .ew-meta · .ew-title · .ew-actions · .ew-btn variants
 *
 * Differs only in action buttons:
 *   Admin  → Quotidien | Hebdo | Tracker | Ignorer
 *   Client → À traiter | Marquer comme lu | Tracker | Ignorer
 *
 * @param {object}   a           article object from /api/v1/app/articles
 * @param {Function} formatDate  formatDate() imported from api.js
 */
export function renderClientCard(a, formatDate) {
  const st = a.client_status || 'inbox';

  const impactRow = (a.has_impact && a.impacted_procedures?.length)
    ? `<div style="display:flex;align-items:center;gap:6px;margin-top:14px;flex-wrap:wrap">
         <span style="font-size:11px;color:#888">Impacte →</span>
         ${a.impacted_procedures.map(p =>
           `<span style="font-size:11px;font-weight:500;color:#5C6347">${p}</span>`
         ).join(' · ')}
       </div>` : '';

  const toProcessBtn = st === 'to_process'
    ? `<button class="ew-btn ew-btn-kaki ew-btn-kaki-removing" data-action="inbox" data-id="${a.id}">Retirer des tâches ×</button>`
    : `<button class="ew-btn ew-btn-kaki" data-action="to_process" data-id="${a.id}">À traiter</button>`;

  const readBtn = st === 'read'
    ? `<button class="ew-btn ew-btn-kaki-outline" data-action="inbox" data-id="${a.id}">Marquer non lu</button>`
    : `<button class="ew-btn ew-btn-kaki-outline" data-action="read" data-id="${a.id}">Marquer comme lu</button>`;

  return `
    <div class="ew-item" id="card-${a.id}">
      ${sourceAvatarHTML(a.source_name)}
      <div class="ew-item-body">
        <div class="ew-meta">
          <span class="src">${a.source_name || '—'}</span>
          <span class="dot">·</span>
          <span class="date">${formatDate(a.published_at)}</span>
        </div>
        <h3 class="ew-title" style="margin-bottom:0">
          ${a.original_url
            ? `<a href="${a.original_url}" target="_blank" rel="noopener" style="color:inherit;text-decoration:none">${a.title || 'Sans titre'}</a>`
            : (a.title || 'Sans titre')
          }
        </h3>
        ${impactRow}
        <div class="ew-actions"${impactRow ? ' style="margin-top:14px"' : ''}>
          ${toProcessBtn}
          ${readBtn}
          <div class="ew-act-sep"></div>
          <button class="ew-btn ew-btn-ghost" data-open-tracker="${a.id}">+ Tracker</button>
          <button class="ew-btn ew-btn-ghost" data-action="ignored" data-id="${a.id}">Ignorer</button>
        </div>
      </div>
      <div class="ew-item-side"></div>
    </div>`;
}
