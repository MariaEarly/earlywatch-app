import{a as l}from"./api.CPWPAWzi.js";let r=[],a={profile:"",urgency:""},n=null;const g={immediate:"Urgence immediate",high:"Priorite haute",medium:"Priorite normale",low:"Pour information"};async function f(){try{r=(await l("/api/v1/situations")).situations||[],c()}catch{document.getElementById("grid").innerHTML='<div class="loading">Erreur de chargement.</div>'}}function m(){return r.filter(e=>{const s=!a.profile||(e.profile_tags||[]).includes(a.profile),t=!a.urgency||e.urgency===a.urgency;return s&&t})}function c(){const e=m(),s=document.getElementById("grid");if(!e.length){s.innerHTML='<div class="loading">Aucune fiche pour ces filtres.</div>';return}s.innerHTML=e.map(t=>h(t)).join(""),y()}function $(e){return e.freshness==="hot"?`<span class="fresh-dot hot"></span>${e.articles_count_7d} article${e.articles_count_7d>1?"s":""} recent${e.articles_count_7d>1?"s":""}`:e.freshness==="warm"?`<span class="fresh-dot warm"></span>${e.articles_count_30d} article${e.articles_count_30d>1?"s":""} ce mois`:'<span class="fresh-dot ok"></span>A jour'}function h(e){return`
    <div class="sit-card ${n===e.reference?"open":""}" id="card-${e.reference}" data-card-ref="${e.reference}">
      <div class="sit-card-top">
        <span class="sit-card-ref">${e.reference}</span>
        <span class="urgency-badge ${e.urgency}">${g[e.urgency]||e.urgency}</span>
      </div>
      <div class="sit-card-title">${e.title}</div>
      <div class="sit-card-sit">${e.situation}</div>
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
        <div class="sit-card-tags">${(e.profile_tags||[]).map(t=>`<span class="sit-tag">${t}</span>`).join("")}</div>
        <div class="sit-card-articles">${$(e)}</div>
      </div>
      <div class="sit-panel" id="panel-${e.reference}">
        <div class="loading" style="padding:20px 0;font-size:13px;">Chargement...</div>
      </div>
    </div>`}function y(){document.querySelectorAll("[data-card-ref]").forEach(e=>{e.addEventListener("click",()=>{_(e.dataset.cardRef)})})}async function _(e){if(n===e){n=null,c();return}n=e,c();const s=document.getElementById(`panel-${e}`);if(!s.dataset.loaded)try{const t=await l(`/api/v1/situations/${e}`);s.innerHTML=b(t),s.dataset.loaded="1"}catch{s.innerHTML='<div style="color:var(--text-secondary);font-size:13px;">Erreur de chargement.</div>'}}function b(e){const s=e.urgency==="immediate"?"immediate":e.urgency==="high"?"high":"",t=(e.steps||[]).map(i=>`
      <div class="step-item">
        <div class="step-num ${s}">${i.order}</div>
        <div class="step-content">
          <div class="step-action">${i.action}</div>
          <div class="step-meta">
            ${i.delai?`<span class="step-delai">${i.delai}</span>`:""}
            ${i.base_legale?`<span class="step-loi">${i.base_legale}</span>`:""}
          </div>
        </div>
      </div>`).join(""),d=(e.documents_requis||[]).length?`<div class="panel-section">
          <div class="panel-section-title">Documents a conserver</div>
          <ul class="docs-list">${e.documents_requis.map(i=>`<li>${i}</li>`).join("")}</ul>
        </div>`:"",o=(e.base_legale||[]).length?`<div class="panel-section">
          <div class="panel-section-title">Base legale</div>
          <div class="loi-chips">${e.base_legale.map(i=>`<span class="loi-chip">${i}</span>`).join("")}</div>
        </div>`:"",p=(e.articles||[]).length?`<div class="panel-section">
          <div class="panel-section-title">Articles reglementaires recents lies</div>
          ${e.articles.map(i=>`
          <div class="sit-article-item">
            <a href="${i.url}" target="_blank" class="sit-article-link">${i.title}</a>
            <div class="sit-article-meta">${i.source||""}${i.published_at?" · "+new Date(i.published_at).toLocaleDateString("fr-FR"):""} ${(i.common_themes||[]).map(v=>`<span style="font-size:10px;background:rgba(92,99,71,0.1);color:#5C6347;padding:1px 5px;border-radius:0;margin-left:4px;">${v}</span>`).join("")}</div>
          </div>`).join("")}
        </div>`:"",u=e.notes?`<div class="panel-section"><div class="notes-box">${e.notes}</div></div>`:"";return`
      <div class="panel-section">
        <div class="panel-section-title">Etapes a suivre</div>
        <div class="steps-list">${t}</div>
      </div>
      ${d}${o}${p}${u}`}document.querySelectorAll(".fbtn").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.f;document.querySelectorAll(`[data-f="${s}"]`).forEach(t=>t.classList.remove("active")),e.classList.add("active"),a[s]=e.dataset.v,n=null,c()})});f();
