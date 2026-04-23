import{a as b}from"./api.CcTKbNwm.js";let l=[],r={profile:"",domain:""},c="",d=new Set;async function g(){try{l=(await b("/api/v1/procedures-library")).procedures||[],v(),o()}catch{document.getElementById("grid").innerHTML='<div class="bib-loading">Erreur de chargement. Vérifiez votre connexion.</div>'}}function v(){const e=l.filter(t=>t.freshness==="hot").length,s=l.filter(t=>t.articles_count_30d>0).reduce((t,i)=>t+i.articles_count_30d,0);document.getElementById("stat-total").textContent=String(l.length),document.getElementById("stat-hot").textContent=String(e),document.getElementById("stat-warm").textContent=String(s)}function h(){return l.filter(e=>{const s=!r.profile||e.profile_tags.includes(r.profile),t=!r.domain||e.domain===r.domain,i=!c||e.title.toLowerCase().includes(c)||e.reference.toLowerCase().includes(c)||(e.subtitle||"").toLowerCase().includes(c);return s&&t&&i})}function o(){const e=h(),s=document.getElementById("grid");if(!e.length){s.innerHTML='<div class="bib-loading">Aucun template trouvé pour ces filtres.</div>';return}s.innerHTML=e.map(t=>$(t)).join(""),d.forEach(t=>{const i=document.getElementById(`bib-articles-${t}`);i&&i.classList.add("open")}),y()}function p(e){return e.freshness==="hot"?`<span class="bib-freshness-badge hot" data-toggle-articles="${e.reference}">
        <span class="bib-freshness-dot"></span>
        ${e.articles_count_7d} article${e.articles_count_7d>1?"s":""} récent${e.articles_count_7d>1?"s":""}
      </span>`:e.freshness==="warm"?`<span class="bib-freshness-badge warm" data-toggle-articles="${e.reference}">
        <span class="bib-freshness-dot"></span>
        ${e.articles_count_30d} article${e.articles_count_30d>1?"s":""} ce mois
      </span>`:`<span class="bib-freshness-badge ok">
      <span class="bib-freshness-dot"></span> À jour
    </span>`}function $(e){const s=p(e),t=e.profile_tags.map(a=>`<span class="bib-profile-tag">${a}</span>`).join(""),i=d.has(e.reference),n="bib-btn-articles-toggle"+(i?" active":"");return`
    <div class="bib-card" id="bib-card-${e.reference}">
      <div class="bib-card-top">
        <span class="bib-card-ref">${e.reference}</span>
        ${s}
      </div>
      <div>
        <div class="bib-card-title">${e.title}</div>
        <div class="bib-card-subtitle">${e.subtitle||""}</div>
      </div>
      <div class="bib-card-meta">
        <span class="bib-card-domain">${e.domain}</span>
        <span class="bib-card-version">v${e.version}</span>
      </div>
      <div class="bib-card-profiles">${t}</div>
      <div class="bib-linked-articles ${i?"open":""}" id="bib-articles-${e.reference}">
        <div class="bib-linked-articles-title">Articles réglementaires liés (30 derniers jours)</div>
        <div id="bib-articles-content-${e.reference}">
          <div class="bib-loading" style="padding:12px 0; font-size:13px">Chargement...</div>
        </div>
      </div>
      <div class="bib-card-actions">
        <a href="${e.file_url}" download class="bib-btn-download">Télécharger .docx</a>
        ${e.freshness!=="ok"?`
        <button class="${n}" id="bib-btn-${e.reference}" data-toggle-articles="${e.reference}">
          Articles liés
        </button>`:""}
      </div>
    </div>`}function y(){document.querySelectorAll("[data-toggle-articles]").forEach(e=>{e.addEventListener("click",()=>{E(e.dataset.toggleArticles)})})}async function E(e){const s=document.getElementById(`bib-articles-${e}`),t=document.getElementById(`bib-btn-${e}`);if(d.has(e)){d.delete(e),s?.classList.remove("open"),t?.classList.remove("active");return}d.add(e),s?.classList.add("open"),t?.classList.add("active");const i=document.getElementById(`bib-articles-content-${e}`);if(!i.dataset.loaded)try{const n=await b(`/api/v1/procedures-library/${e}/articles`);!n.articles||!n.articles.length?i.innerHTML='<div class="bib-no-articles">Aucun article lié sur les 30 derniers jours.</div>':i.innerHTML=n.articles.map(a=>{const u=a.published_at?new Date(a.published_at).toLocaleDateString("fr-FR",{day:"numeric",month:"short"}):"",f=(a.common_themes||[]).map(m=>`<span class="bib-article-theme-tag">${m}</span>`).join("");return`
          <div class="bib-article-item">
            <a href="${a.url}" target="_blank" class="bib-article-item-title">${a.title}</a>
            <div class="bib-article-item-meta">
              <span>${a.source}</span><span>${u}</span>${f}
            </div>
          </div>`}).join(""),i.dataset.loaded="1"}catch{i.innerHTML='<div class="bib-no-articles">Erreur de chargement des articles.</div>'}}document.querySelectorAll(".filter-btn").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.filter;s&&(document.querySelectorAll(`[data-filter="${s}"]`).forEach(t=>t.classList.remove("active")),e.classList.add("active"),r[s]=e.dataset.value,o())})});document.getElementById("search-input").addEventListener("input",e=>{c=e.target.value.toLowerCase().trim(),o()});g();
