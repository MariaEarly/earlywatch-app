import{a as l,f as v,s as g,b as x,t as r,i as y}from"./api.CcTKbNwm.js";const d="/earlywatch-app/",o=new URLSearchParams(window.location.search).get("id");if(!o)throw window.location.href=`${d}dashboard`,new Error("no id");let p=null,c=null;function i(t){return t?String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):""}async function f(){try{p=await l(`/api/v1/articles/${o}`)}catch(t){document.getElementById("content").innerHTML=`<div class="empty-state"><p>${t.message}</p><a href="${d}dashboard" class="btn btn-secondary" style="margin-top:12px">Retour</a></div>`;return}m()}function m(){const t=p;document.title=`Early Watch — ${t.title||"Article"}`,document.getElementById("content").innerHTML=`
      <a href="${d}dashboard" class="btn btn-ghost btn-sm" style="margin-bottom:16px">&larr; Retour a l'inbox</a>

      <div class="card" style="padding:20px; margin-bottom:16px">
        <div class="article-meta" style="margin-bottom:8px">
          <span>${t.source_name||"Source inconnue"}</span>
          <span>&middot;</span>
          <span>${t.published_at?v(t.published_at):'<span style="color:var(--taupe);font-style:italic">Date inconnue</span>'}</span>
          ${g(t.status)}
        </div>
        <h1 style="font-size:18px; margin-bottom:8px">${i(t.title||"Sans titre")}</h1>
        <p style="margin-top:12px; font-size:13px; color:var(--taupe); line-height:1.7">
          ${i(t.summary||t.content||"Aucun contenu disponible.")}
        </p>
        ${t.url?`<a href="${t.url}" target="_blank" rel="noopener" class="btn btn-ghost btn-sm" style="margin-top:12px">Voir la source &rarr;</a>`:""}

        <div style="margin-top:16px; padding-top:16px; border-top:0.5px solid var(--line)">
          <div class="flex gap-8">
            <button class="btn btn-sm btn-success" data-triage-action="reviewed">Valider</button>
            <button class="btn btn-sm btn-secondary" data-triage-action="pending_review">En revue</button>
            <button class="btn btn-sm btn-danger" data-triage-action="dismissed">Ignorer</button>
          </div>
        </div>
      </div>

      ${t.detected_action_type?h(t):""}

      <div id="action-result"></div>
    `,document.querySelectorAll("[data-triage-action]").forEach(a=>{a.addEventListener("click",()=>w(a.dataset.triageAction))});const e=document.getElementById("executeBtn");e&&e.addEventListener("click",$)}function h(t){return`
      <div class="action-panel" style="margin-bottom:16px">
        <div class="flex items-center justify-between" style="margin-bottom:12px">
          <div>
            <h3 style="color:var(--moutarde)">Action détectée</h3>
            <p class="text-sm" style="color:var(--moutarde); margin-top:2px">
              ${{sanctions_update:"Mise à jour des sanctions",doctrine_update:"Évolution de la doctrine",obligation_update:"Nouvelles obligations"}[t.detected_action_type]||t.detected_action_type}
            </p>
          </div>
          ${x(t.detected_action_type)}
        </div>
        <button class="btn btn-primary" id="executeBtn">
          Exécuter l'action
        </button>
      </div>`}async function $(){const t=document.getElementById("executeBtn");t.disabled=!0,t.innerHTML='<div class="spinner" style="width:14px;height:14px;border-width:1.5px"></div> Exécution...';try{c=await l(`/api/v1/articles/${o}/execute-action`,{method:"POST"}),_(),r("Action exécutée")}catch(e){r(e.message,"error"),t.disabled=!1,t.textContent="Exécuter l'action"}}function _(){if(!c)return;const t=c,e=t.output||{};let a="";e.entities&&(a+=s("Entités détectées",`
        <ul>${e.entities.map(n=>`<li>${i(n)}</li>`).join("")}</ul>
        ${e.source_url?`<p style="margin-top:8px"><a href="${e.source_url}" target="_blank">Source officielle</a></p>`:""}
      `)),e.obligations&&(a+=s("Obligations extraites",`
        ${e.obligations.map(n=>`
          <div style="padding:8px 0; border-bottom:0.5px solid var(--line)">
            <strong>Article ${i(n.article_number||"?")}</strong>
            ${n.lien_legifrance?`<a href="${n.lien_legifrance}" target="_blank" class="text-sm text-accent" style="margin-left:8px">Legifrance</a>`:""}
            <ul style="margin-top:4px">${(n.relevant_paragraphs||[]).map(b=>`<li class="text-sm">${i(b)}</li>`).join("")}</ul>
          </div>
        `).join("")}
      `)),e.diff_sections&&(a+=s("Diff doctrine",`
        ${e.diff_sections.map(n=>`
          <div style="padding:6px 0">
            <span class="badge ${n.change_type==="added"?"badge-success":n.change_type==="removed"?"badge-danger":"badge-warning"}">
              ${n.change_type}
            </span>
            <pre style="font-size:12px; margin-top:4px; white-space:pre-wrap; background:var(--bg-side); padding:8px; border-radius:4px">${i(n.content||"")}</pre>
          </div>
        `).join("")}
      `)),e.current_content_preview&&(a+=s("Contenu actuel",`<div class="text-sm">${i(e.current_content_preview)}</div>`)),t.source_url&&(a+=s("Sources citées",`<a href="${t.source_url}" target="_blank">${t.source_url}</a>`)),e.provenance&&(a+=s("Provenance",`<p class="text-sm">${i(e.provenance)}</p>`)),document.getElementById("action-result").innerHTML=`
      <div class="card" style="padding:20px; margin-bottom:16px">
        <div class="flex items-center justify-between" style="margin-bottom:16px">
          <h2>Résultat de l'action</h2>
          ${g(t.status)}
        </div>
        ${a}
        <div class="warning-box" style="margin-top:16px">
          <span>&#9888;</span>
          <div>
            <strong>Avertissement Compliance Officer</strong><br>
            ${i(t.warning||t.confidence_note||"Ce contenu est généré automatiquement. Validation obligatoire avant usage.")}
          </div>
        </div>
      </div>`,y();const u=document.querySelector("#action-result .expandable");u&&u.classList.add("open")}function s(t,e){return`
      <div class="expandable">
        <button class="expandable-header">
          <span>${t}</span>
          <span class="arrow">&#9654;</span>
        </button>
        <div class="expandable-body">${e}</div>
      </div>`}async function w(t){try{await l(`/api/v1/articles/${o}/triage`,{method:"PATCH",body:{status:t}}),p.status=t,m(),r(`Article ${t==="reviewed"?"validé":t==="dismissed"?"ignoré":"en revue"}`)}catch(e){r(e.message,"error")}}f();
