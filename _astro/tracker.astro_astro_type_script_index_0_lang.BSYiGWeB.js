import{a as o,f as d,t as c}from"./api.CcTKbNwm.js";const i={};async function l(){const r=document.getElementById("tracker-list");try{const e=await o("/api/v1/tracker?limit=100"),t=Array.isArray(e)?e:e?.entries||e?.items||[];if(!t.length){r.innerHTML='<div class="ew-empty"><div class="ew-empty-title">Tracker vide</div><div class="ew-empty-sub">Aucune entrée de veille réglementaire.</div></div>';return}t.forEach(n=>{i[n.id]||(i[n.id]="not_processed")}),p(t)}catch(e){r.innerHTML=`<div class="ew-empty"><div class="ew-empty-title">Erreur</div><div class="ew-empty-sub">${e.message}</div></div>`}}function s(r){const e=i[r]||"not_processed",t={not_processed:"Non traité",to_integrate:"À intégrer",integrated:"Intégré"};return`<span class="badge-integration ${{not_processed:"badge-not-processed",to_integrate:"badge-to-integrate",integrated:"badge-integrated"}[e]}">${t[e]||e}</span>`}function g(r){const e=i[r]||"not_processed";return`<select class="ew-sort-btn" data-integration-id="${r}" style="font-size:11px;color:#888;border:none;background:none;cursor:pointer;padding:0">
      <option value="not_processed"${e==="not_processed"?" selected":""}>Non traité</option>
      <option value="to_integrate"${e==="to_integrate"?" selected":""}>À intégrer</option>
      <option value="integrated"${e==="integrated"?" selected":""}>Intégré</option>
    </select>`}function p(r){const e=document.getElementById("tracker-list");e.innerHTML=r.map(t=>`
      <div class="tracker-row">
        <div>
          <div class="tracker-title">${t.title||t.summary||"Sans titre"}</div>
          <div class="tracker-meta">${d(t.date||t.created_at)}${t.source?" · "+t.source:""}</div>
        </div>
        <div class="tracker-source">${t.regulation||t.type||"—"}</div>
        <div style="display:flex;align-items:center;gap:8px">
          ${s(t.id)}
          ${g(t.id)}
        </div>
      </div>
    `).join(""),e.querySelectorAll("[data-integration-id]").forEach(t=>{t.addEventListener("change",()=>{i[t.dataset.integrationId]=t.value;const n=t.closest(".tracker-row");if(n){const a=n.querySelector(".badge-integration");a&&(a.outerHTML=s(t.dataset.integrationId))}c("Statut mis à jour")})})}l();
