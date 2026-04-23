import{a as s,t as d}from"./api.CcTKbNwm.js";let r=[],c="";async function u(){try{const[e,t]=await Promise.all([s("/api/v1/reminders"),s("/api/v1/reminders/counts")]);r=e.reminders||[],document.getElementById("count-critical").textContent=t.critical||0,document.getElementById("count-high").textContent=t.high||0,document.getElementById("count-medium").textContent=t.medium||0,document.getElementById("count-total").textContent=t.total||0,l()}catch{document.getElementById("reminders-list").innerHTML='<div class="loading">Erreur de chargement.</div>'}}function l(){const e=c?r.filter(a=>a.severity===c):r,t=document.getElementById("reminders-list");if(!e.length){t.innerHTML=`
        <div class="empty">
          <div class="empty-icon">OK</div>
          <div>Aucun reminder actif${c?" pour ce niveau de severite":""}.</div>
        </div>`;return}t.innerHTML=e.map(v).join(""),g()}function v(e){const t=e.created_at?new Date(e.created_at).toLocaleDateString("fr-FR",{day:"numeric",month:"short",year:"numeric"}):"",a=(e.article.obligations_cited||[]).map(o=>`<span class="obligation-tag">${o}</span>`).join(""),n=e.status==="done";return`
    <div class="reminder-card ${e.severity} ${n?"done":""}" id="reminder-${e.id}">
      <div class="reminder-body">
        <div class="reminder-top">
          <div class="reminder-badges">
            <span class="severity-badge ${e.severity}">${e.severity_label}</span>
            <span class="impact-badge">${e.impact_label}</span>
            ${e.procedure_ref?`<span class="proc-badge">${e.procedure_ref}</span>`:""}
          </div>
        </div>
        <div class="reminder-message">${e.message}</div>
        <div class="reminder-article">
          <div class="article-info">
            <a href="${e.article.url}" target="_blank" class="article-link">${e.article.title}</a>
            <div style="display:flex; gap:10px; margin-top:3px;">
              <span class="article-source">${e.article.source||""}</span>
              <span class="article-source">${e.article.published_at?new Date(e.article.published_at).toLocaleDateString("fr-FR"):""}</span>
            </div>
          </div>
        </div>
        ${a?`<div class="obligations-list">${a}</div>`:""}
        <div class="reminder-footer">
          <span class="reminder-date">Cree le ${t}</span>
          <div class="reminder-actions">
            ${n?`<span style="font-size:12px; color:var(--ink-soft)">Traite le ${e.done_at?new Date(e.done_at).toLocaleDateString("fr-FR"):""}</span>`:`
            <button class="btn-action" data-reminder-action="${e.id}" data-action-status="dismissed">Ignorer</button>
            <button class="btn-action done-btn" data-reminder-action="${e.id}" data-action-status="done">Traite</button>
            `}
          </div>
        </div>
      </div>
    </div>`}function g(){document.querySelectorAll("[data-reminder-action]").forEach(e=>{e.addEventListener("click",()=>{y(parseInt(e.dataset.reminderAction),e.dataset.actionStatus)})})}async function y(e,t){try{await s(`/api/v1/reminders/${e}`,{method:"PATCH",body:{status:t}});const a=r.find(n=>n.id===e);a&&(a.status=t),l(),d(t==="done"?"Marque comme traite":"Reminder ignore","success")}catch{d("Erreur lors de la mise a jour","error")}}async function $(){try{await s("/api/v1/reminders/bulk/mark-seen",{method:"PATCH"}),r.forEach(e=>{e.status==="pending"&&(e.status="seen")}),d("Tous les reminders marques comme vus","success")}catch{d("Erreur","error")}}document.querySelectorAll("[data-sev]").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll("[data-sev]").forEach(t=>t.classList.remove("active")),e.classList.add("active"),c=e.dataset.sev,l()})});document.getElementById("btn-mark-all").addEventListener("click",$);async function f(){const e=document.getElementById("gap-list");if(e)try{const a=(await s("/api/v1/gap-analysis/auto?limit=10")).gap_analyses||[];if(!a.length){e.innerHTML=`<div style="text-align:center;padding:40px;color:var(--mute);font-size:14px;">
          Aucun gap analysis disponible — les analyses apparaissent automatiquement<br>
          quand des articles citant des textes CMF sont ingeres.
        </div>`;return}e.innerHTML=a.map(h).join("")}catch{e&&(e.innerHTML="")}}function h(e){const t={critical:"Critique",high:"Eleve",medium:"Moyen",low:"Faible"},a=[...(e.changes_new||[]).map(i=>({type:"new",text:i,label:"Nouveau"})),...(e.changes_modified||[]).map(i=>({type:"modified",text:i,label:"Modifie"})),...(e.changes_removed||[]).map(i=>({type:"removed",text:i,label:"Supprime"}))],n=a.length?`
      <div class="gap-changes">
        ${a.map(i=>`
          <div class="change-item">
            <span class="change-dot ${i.type}"></span>
            <span><strong>${i.label} :</strong> ${i.text}</span>
          </div>`).join("")}
      </div>`:"",o=(e.impacted_procedures||[]).length?`
      <div class="gap-procs">
        ${e.impacted_procedures.map(i=>`<span class="gap-proc-badge">${i}</span>`).join("")}
      </div>`:"",m=e.article?`
      <div class="gap-article">
        Source : <a href="${e.article.url}" target="_blank">${e.article.title}</a>
        ${e.article.published_at?" · "+new Date(e.article.published_at).toLocaleDateString("fr-FR"):""}
      </div>`:"",p=e.version_current||e.version_previous?`
      <div style="font-size:11px;color:var(--mute);margin-bottom:12px;">
        ${e.version_previous?`Version N-1 : ${e.version_previous}`:""}
        ${e.version_current?` → Version N : ${e.version_current}`:""}
      </div>`:"";return`
    <div class="gap-card ${e.impact_level}">
      <div class="gap-body">
        <div class="gap-top">
          <span class="gap-ref">${e.obligation_ref}</span>
          <span class="gap-impact ${e.impact_level}">${t[e.impact_level]||e.impact_level}</span>
        </div>
        ${p}
        <div class="gap-summary">${e.summary}</div>
        ${n}
        ${o}
        ${m}
      </div>
    </div>`}u();f();
