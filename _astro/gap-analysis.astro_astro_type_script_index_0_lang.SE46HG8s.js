import{f as g,a as m,t as u,c as x,A as B}from"./api.vBsT2HYn.js";let o="auto",r=[],v=[];function d(a){return a?String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):""}document.getElementById("tab-auto").addEventListener("click",()=>h("auto"));document.getElementById("tab-manual").addEventListener("click",()=>h("manual"));function h(a){o=a,document.querySelectorAll(".ga-tab").forEach(e=>e.classList.remove("active")),document.getElementById(a==="auto"?"tab-auto":"tab-manual").classList.add("active"),document.getElementById("ga-detail").style.display="none",f()}function y(a){const e={critical:["Critique","ga-impact-critical"],high:["Eleve","ga-impact-high"],medium:["Moyen","ga-impact-medium"],low:["Faible","ga-impact-low"]},[t,i]=e[a]||[a||"—","ga-impact-low"];return`<span class="ga-badge ${i}">${t}</span>`}function p(a){const e={pending:["En attente","ga-status-pending"],pending_validation:["En attente","ga-status-pending"],done:["Termine","ga-status-done"],validated:["Valide","ga-status-validated"],rejected:["Rejete","ga-status-rejected"],error:["Erreur","ga-status-error"]},[t,i]=e[a]||[a||"—","ga-status-pending"];return`<span class="ga-badge ${i}">${t}</span>`}async function $(){const[a,e]=await Promise.allSettled([A(),P()]);S(),f()}async function A(){try{const a=await m("/api/v1/gap-analysis/auto");r=a.analyses||a||[]}catch{r=[]}}async function P(){try{const a=await m("/api/v1/gap-analysis/reports");v=a.reports||a||[]}catch{v=[]}}function S(){const a=[...r,...v],e=a.length,t=a.filter(n=>n.status==="pending"||n.status==="pending_validation").length,i=a.filter(n=>n.status==="validated"||n.status==="done").length,l=a.filter(n=>n.impact_level==="critical").length;document.getElementById("kpi-total").textContent=String(e),document.getElementById("kpi-pending").textContent=String(t),document.getElementById("kpi-validated").textContent=String(i),document.getElementById("kpi-critical").textContent=String(l)}function f(){const a=o==="auto"?r:v,e=document.getElementById("ga-table-wrap");if(!a.length){e.innerHTML=`<div class="empty-state" style="padding:40px">
        <p>Aucune analyse ${o==="auto"?"auto-generee":"manuelle"}</p>
      </div>`;return}o==="auto"?e.innerHTML=`
        <table>
          <thead>
            <tr>
              <th>Ref. obligation</th>
              <th>Version</th>
              <th>Date</th>
              <th>Impact</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${a.map(t=>`
              <tr data-id="${t.id}" class="ga-row">
                <td><span class="ga-code">${d(t.obligation_ref||"—")}</span></td>
                <td class="ga-code">${d(t.version_previous||"?")} → ${d(t.version_current||"?")}</td>
                <td>${g(t.created_at)}</td>
                <td>${y(t.impact_level)}</td>
                <td>${p(t.status)}</td>
                <td>
                  <button class="btn btn-sm ga-view-btn" data-id="${t.id}" data-type="auto">Voir</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>`:e.innerHTML=`
        <table>
          <thead>
            <tr>
              <th>Code texte</th>
              <th>Type</th>
              <th>Profil</th>
              <th>Date</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${a.map(t=>`
              <tr data-id="${t.id}" class="ga-row">
                <td><span class="ga-code">${d(t.text_id||"—")}</span></td>
                <td><span class="ga-badge ga-type-badge">${t.analysis_type==="version_diff"?"N vs N-1":"Procedure"}</span></td>
                <td>${d(t.tenant_profile||"—")}</td>
                <td>${g(t.created_at)}</td>
                <td>${p(t.status)}</td>
                <td class="ga-actions">
                  <button class="btn btn-sm ga-view-btn" data-id="${t.id}" data-type="manual">Voir</button>
                  ${t.status==="pending_validation"?`<button class="btn btn-sm btn-success ga-validate-btn" data-id="${t.id}">Valider</button>`:""}
                  <button class="btn btn-sm ga-export-btn" data-id="${t.id}">PDF</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>`,e.querySelectorAll(".ga-view-btn").forEach(t=>{t.addEventListener("click",i=>{i.stopPropagation(),b(t.dataset.id,t.dataset.type)})}),e.querySelectorAll(".ga-validate-btn").forEach(t=>{t.addEventListener("click",i=>{i.stopPropagation(),E(t.dataset.id)})}),e.querySelectorAll(".ga-export-btn").forEach(t=>{t.addEventListener("click",i=>{i.stopPropagation(),_(t.dataset.id)})}),e.querySelectorAll(".ga-row").forEach(t=>{t.addEventListener("click",()=>{const i=o;b(t.dataset.id,i)})})}async function b(a,e){const t=document.getElementById("ga-detail"),i=document.getElementById("ga-detail-header"),l=document.getElementById("ga-detail-body");t.style.display="block",l.innerHTML='<div class="loading-overlay" style="padding:40px"><div class="spinner"></div></div>';try{if(e==="auto"){const n=r.find(c=>String(c.id)===String(a));if(!n)throw new Error("Analyse non trouvee");R(n,i,l)}else{const n=await m(`/api/v1/gap-analysis/${a}`);T(n,i,l)}}catch(n){l.innerHTML=`<div class="empty-state"><p>${d(n.message)}</p></div>`}t.scrollIntoView({behavior:"smooth",block:"start"})}function R(a,e,t){e.innerHTML=`
      <div class="ga-detail-top">
        <button class="btn btn-sm" id="ga-back">← Retour</button>
        <div class="ga-detail-title-row">
          <h2>${d(a.obligation_ref||"Analyse")}</h2>
          ${y(a.impact_level)}
          ${p(a.status)}
        </div>
        <div class="ga-detail-meta">
          Version <span class="ga-code">${d(a.version_previous||"?")}</span> → <span class="ga-code">${d(a.version_current||"?")}</span>
          &middot; ${g(a.created_at)}
        </div>
      </div>`;const i=a.changes_new||[],l=a.changes_modified||[],n=a.changes_removed||[];t.innerHTML=`
      ${a.summary?`<div class="ga-summary">${d(a.summary)}</div>`:""}

      ${i.length?`
        <div class="ga-section">
          <div class="ga-section-label">Nouvelles obligations</div>
          ${i.map(c=>`
            <div class="ga-change ga-change-new">
              <span class="ga-badge ga-impact-high">NOUVEAU</span>
              <span>${d(c)}</span>
            </div>
          `).join("")}
        </div>`:""}

      ${l.length?`
        <div class="ga-section">
          <div class="ga-section-label">Obligations modifiees</div>
          ${l.map(c=>`
            <div class="ga-change ga-change-mod">
              <span class="ga-badge ga-status-pending">MODIFIE</span>
              <span>${d(c)}</span>
            </div>
          `).join("")}
        </div>`:""}

      ${n.length?`
        <div class="ga-section">
          <div class="ga-section-label">Obligations supprimees</div>
          ${n.map(c=>`
            <div class="ga-change ga-change-rem">
              <span class="ga-badge ga-impact-low">SUPPRIME</span>
              <span>${d(c)}</span>
            </div>
          `).join("")}
        </div>`:""}

      ${!i.length&&!l.length&&!n.length?`
        <div class="empty-state" style="padding:24px"><p>Aucun changement detecte</p></div>`:""}

      ${a.impacted_procedures?.length?`
        <div class="ga-section">
          <div class="ga-section-label">Procedures impactees</div>
          <div class="ga-procedures-list">
            ${a.impacted_procedures.map(c=>`<span class="ga-badge ga-type-badge">${d(c)}</span>`).join("")}
          </div>
        </div>`:""}
    `,document.getElementById("ga-back").addEventListener("click",()=>{document.getElementById("ga-detail").style.display="none"})}function T(a,e,t){const i=a.analysis_type==="version_diff";e.innerHTML=`
      <div class="ga-detail-top">
        <button class="btn btn-sm" id="ga-back">← Retour</button>
        <div class="ga-detail-title-row">
          <h2>${d(a.text_id||"Rapport")}</h2>
          <span class="ga-badge ga-type-badge">${i?"N vs N-1":"Procedure"}</span>
          ${p(a.status)}
        </div>
        <div class="ga-detail-meta">
          Profil : ${d(a.tenant_profile||"—")}
          ${a.uploaded_filename?` &middot; Fichier : ${d(a.uploaded_filename)}`:""}
          &middot; ${g(a.created_at)}
          ${a.validated_by?` &middot; Valide le ${g(a.validated_at)}`:""}
        </div>
        <div class="ga-detail-actions">
          ${a.status==="pending_validation"?`<button class="btn btn-sm btn-success" id="ga-detail-validate" data-id="${a.id}">Valider</button>`:""}
          <button class="btn btn-sm" id="ga-detail-export" data-id="${a.id}">Export PDF</button>
        </div>
      </div>`;const l=a.report||{},n=a.summary||{},c=l.obligations||l.gaps||[],w=c.filter(s=>s.status==="covered"||s.status==="couverte").length,k=c.filter(s=>s.status==="partial"||s.status==="partielle").length,I=c.filter(s=>s.status==="absent"||s.status==="absente").length;t.innerHTML=`
      ${n.coverage_rate!=null?`
        <div class="ga-coverage-bar">
          <div class="ga-coverage-stats">
            <span class="ga-badge ga-impact-high">${w} couvertes</span>
            <span class="ga-badge ga-status-pending">${k} partielles</span>
            <span class="ga-badge ga-impact-critical">${I} absentes</span>
          </div>
          <div class="ga-coverage-pct">Couverture : ${n.coverage_rate}%</div>
        </div>`:""}

      ${c.length?c.map((s,L)=>`
          <div class="ga-obligation ${s.status==="covered"||s.status==="couverte"?"ga-obl-covered":s.status==="partial"||s.status==="partielle"?"ga-obl-partial":"ga-obl-absent"}">
            <div class="ga-obl-header">
              <span class="ga-code">${d(s.article||s.obligation_ref||"Obligation "+(L+1))}</span>
              ${p(s.status)}
              ${s.confidence!=null?`<span class="ga-confidence">${s.confidence}%</span>`:""}
            </div>
            <div class="ga-obl-text">${d(s.obligation||s.text||"")}</div>
            ${s.analysis||s.comment?`<div class="ga-obl-analysis">${d(s.analysis||s.comment)}</div>`:""}
            ${s.recommendation?`<div class="ga-obl-reco"><strong>Recommandation :</strong> ${d(s.recommendation)}</div>`:""}
          </div>`).join(""):'<div class="empty-state" style="padding:24px"><p>Aucune obligation analysee</p></div>'}

      ${a.provenance?`<p class="ga-provenance">${d(a.provenance)}</p>`:""}
    `,document.getElementById("ga-back").addEventListener("click",()=>{document.getElementById("ga-detail").style.display="none"}),document.getElementById("ga-detail-validate")?.addEventListener("click",()=>{E(a.id)}),document.getElementById("ga-detail-export")?.addEventListener("click",()=>{_(a.id)})}async function E(a){if(confirm("Valider ce rapport gap analysis ?"))try{await m(`/api/v1/gap-analysis/${a}/validate`,{method:"PATCH",body:{decision:"validate"}}),u("Rapport valide"),await $()}catch(e){u(e.message,"error")}}async function _(a){try{const e=x(),t=await fetch(`${B}/api/v1/gap-analysis/${a}/export`,{headers:{Authorization:`Bearer ${e}`}});if(!t.ok)throw new Error("Erreur export PDF");const i=await t.blob(),l=URL.createObjectURL(i),n=document.createElement("a");n.href=l,n.download=`gap-analysis-${a}.pdf`,document.body.appendChild(n),n.click(),n.remove(),URL.revokeObjectURL(l),u("PDF telecharge")}catch(e){u(e.message,"error")}}$();
