import{A as $,t as v,a as g}from"./api.CPWPAWzi.js";let i=[],d={status:"",domain:""},o=new Set;async function b(){try{const e=await g("/api/v1/my-procedures");if(!e.enabled){document.getElementById("grid").innerHTML=`
          <div class="disabled-msg">
            <h2>Module Procedures non active</h2>
            <p>Contactez votre administrateur pour activer l'acces aux procedures LCB-FT.</p>
          </div>`;return}i=e.procedures||[],document.getElementById("stats-bar").style.display="flex",document.getElementById("filters-bar").style.display="flex",h(),p()}catch{document.getElementById("grid").innerHTML='<div class="loading">Erreur de chargement.</div>'}}function h(){const e=i.filter(a=>a.status==="valide").length,t=i.filter(a=>a.status==="a_valider"||a.status==="en_cours").length,s=i.filter(a=>a.status_alert).length;document.getElementById("stat-total").textContent=String(i.length),document.getElementById("stat-valide").textContent=String(e),document.getElementById("stat-pending").textContent=String(t),document.getElementById("stat-alert").textContent=String(s)}function y(){return i.filter(e=>{const t=!d.status||e.status===d.status,s=!d.domain||e.domain===d.domain;return t&&s})}function p(){const e=y(),t=document.getElementById("grid");if(!e.length){t.innerHTML='<div class="loading">Aucune procedure pour ces filtres.</div>';return}t.innerHTML=e.map(E).join(""),o.forEach(s=>{const a=document.getElementById(`articles-${s}`);a&&a.classList.add("open")}),_()}function E(e){const t=o.has(e.reference),s=e.freshness!=="ok",a=`<span class="status-badge ${e.status}">
      <span class="status-dot"></span>${e.status_label}
    </span>`;let r="";e.freshness==="hot"?r=`<span class="freshness-badge hot" data-toggle-articles="${e.reference}">
        <span class="freshness-dot"></span>${e.articles_count_7d} article${e.articles_count_7d>1?"s":""} recent${e.articles_count_7d>1?"s":""}
      </span>`:e.freshness==="warm"&&(r=`<span class="freshness-badge warm" data-toggle-articles="${e.reference}">
        <span class="freshness-dot"></span>${e.articles_count_30d} ce mois
      </span>`);const n=e.status_alert?'<div class="alert-ribbon">Nouveaux articles detectes — revision recommandee</div>':"",c=["a_valider","en_cours","valide","obsolete"],m={a_valider:"A valider",en_cours:"En cours",valide:"Valide",obsolete:"Obsolete"},f=c.map(l=>{let u="status-opt";return l===e.status&&(l==="valide"?u+=" active-valide":l==="obsolete"?u+=" active-obsolete":u+=" active"),`<button class="${u}" data-set-status="${e.reference}" data-new-status="${l}">${m[l]}</button>`}).join("");return`
    <div class="mp-card ${e.status_alert?"alert-border":""}" id="card-${e.reference}">
      <div class="card-top">
        <span class="card-ref">${e.reference}</span>
        <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">
          ${a}
          ${r}
        </div>
      </div>
      ${n}
      <div>
        <div class="card-title">${e.title}</div>
        <div class="card-subtitle">${e.subtitle||""}</div>
      </div>
      <div class="card-meta">
        <span class="card-domain">${e.domain}</span>
        <span class="card-version">v${e.version}</span>
      </div>
      <div class="status-selector">${f}</div>
      <div class="linked-articles ${t?"open":""}" id="articles-${e.reference}">
        <div class="linked-articles-title">Articles lies (30 jours)</div>
        <div id="articles-content-${e.reference}">
          <div class="loading" style="padding:12px 0;font-size:13px">Chargement...</div>
        </div>
      </div>
      <div class="card-actions">
        <a href="${e.file_url}" download class="btn-download">Telecharger .docx</a>
        ${s?`<button class="btn-toggle ${t?"active":""}" id="btn-${e.reference}" data-toggle-articles="${e.reference}">Articles</button>`:""}
      </div>
    </div>`}function _(){document.querySelectorAll("[data-set-status]").forEach(e=>{e.addEventListener("click",()=>{L(e.dataset.setStatus,e.dataset.newStatus)})}),document.querySelectorAll("[data-toggle-articles]").forEach(e=>{e.addEventListener("click",()=>{x(e.dataset.toggleArticles)})})}async function L(e,t){try{await g(`/api/v1/my-procedures/${e}/status`,{method:"POST",body:{status:t}});const s=i.find(a=>a.reference===e);s&&(s.status=t,s.status_label={a_valider:"A valider",en_cours:"En cours",valide:"Valide",obsolete:"Obsolete"}[t]||t,t==="valide"&&(s.status_alert=null)),h(),p(),v("Statut mis a jour","success")}catch(s){v(s.message||"Erreur","error")}}async function x(e){const t=document.getElementById(`articles-${e}`),s=document.getElementById(`btn-${e}`);if(o.has(e)){o.delete(e),t?.classList.remove("open"),s?.classList.remove("active");return}o.add(e),t?.classList.add("open"),s?.classList.add("active");const a=document.getElementById(`articles-content-${e}`);if(!a.dataset.loaded)try{const r=await g(`/api/v1/my-procedures/${e}/articles`);!r.articles||!r.articles.length?a.innerHTML='<div class="no-articles">Aucun article lie sur les 30 derniers jours.</div>':a.innerHTML=r.articles.map(n=>{const c=n.published_at?new Date(n.published_at).toLocaleDateString("fr-FR",{day:"numeric",month:"short"}):"",m=(n.common_themes||[]).map(f=>`<span class="article-theme-tag">${f}</span>`).join("");return`
          <div class="article-item">
            <a href="${n.url}" target="_blank" class="article-item-title">${n.title}</a>
            <div class="article-item-meta">
              <span>${n.source}</span><span>${c}</span>${m}
            </div>
          </div>`}).join(""),a.dataset.loaded="1"}catch{a.innerHTML='<div class="no-articles">Erreur de chargement.</div>'}}document.querySelectorAll(".filter-btn").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.filter;t&&(document.querySelectorAll(`[data-filter="${t}"]`).forEach(s=>s.classList.remove("active")),e.classList.add("active"),d[t]=e.dataset.value,p())})});document.getElementById("btn-export-pdf").addEventListener("click",async()=>{const e=document.getElementById("btn-export-pdf");e.disabled=!0,e.textContent="Generation en cours...";try{const t=sessionStorage.getItem("ew_token"),s=await fetch(`${$}/api/v1/audit/export-pdf`,{headers:{Authorization:`Bearer ${t}`}});if(!s.ok){const c=await s.json().catch(()=>({}));throw new Error(c.detail||"Erreur export")}const a=await s.blob(),r=URL.createObjectURL(a),n=document.createElement("a");n.href=r,n.download=`piste-audit-lcbft-${new Date().toISOString().slice(0,10)}.pdf`,document.body.appendChild(n),n.click(),n.remove(),URL.revokeObjectURL(r),v("PDF telecharge","success")}catch(t){v(t.message||"Erreur export PDF","error")}finally{e.disabled=!1,e.textContent="Exporter piste d'audit PDF"}});b();
