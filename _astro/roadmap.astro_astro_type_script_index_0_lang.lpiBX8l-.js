import{a as v}from"./api.CcTKbNwm.js";let o=[],l="",r=new Set;async function p(){try{const e=await v("/api/v1/deadlines?include_passed=true");o=e.deadlines||[],f(e.stats||{}),d()}catch{document.getElementById("timeline").innerHTML='<div class="rm-loading">Erreur de chargement.</div>'}}function f(e){document.getElementById("stats-row").innerHTML=`
      <div class="rm-stat"><div class="rm-stat-val">${e.critical||0}</div><div class="rm-stat-lbl">Échéances critiques à venir</div></div>
      <div class="rm-stat"><div class="rm-stat-val">${e.imminent||0}</div><div class="rm-stat-lbl">Dans les 30 prochains jours</div></div>
      <div class="rm-stat"><div class="rm-stat-val">${e.upcoming||0}</div><div class="rm-stat-lbl">Échéances à venir</div></div>`}function g(){return o.filter(e=>!l||e.regulation===l)}function d(){const e=g(),s=document.getElementById("timeline");if(!e.length){s.innerHTML='<div class="rm-loading">Aucune échéance pour ce filtre.</div>';return}const a={};e.forEach(t=>{const n=t.deadline_date.slice(0,4);a[n]||(a[n]=[]),a[n].push(t)});let i="";Object.keys(a).sort().forEach(t=>{const n=t===new Date().getFullYear().toString();i+=`<div class="tl-year">${t}${n?" — en cours":""}</div>`,a[t].forEach(c=>{i+=h(c)})}),s.innerHTML=i,y()}function $(e){if(e.status==="passed")return'<span class="date-delta passed">Passée</span>';const s=e.delta_days;return s<=0?`<span class="date-delta imminent">Aujourd'hui</span>`:s<=30?`<span class="date-delta imminent">Dans ${s}j</span>`:s<=90?`<span class="date-delta soon">Dans ${s}j</span>`:`<span class="date-delta upcoming">Dans ~${Math.round(s/30)} mois</span>`}function h(e){const s=r.has(e.reference),a=e.status==="passed"?"passed":e.priority,i=e.status==="passed"?"passed":e.urgency==="imminent"?"imminent":e.urgency==="soon"?"soon":"",t=new Date(e.deadline_date+"T00:00:00").toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"}),n=(e.impacted_procedures||[]).slice(0,4).map(u=>`<span class="proc-chip">${u}</span>`).join(""),c=e.articles_count_30d>0?`<span class="fresh-badge">${e.articles_count_30d} article${e.articles_count_30d>1?"s":""} récent${e.articles_count_30d>1?"s":""}</span>`:"",m=s&&e.description?`<div class="rm-card-desc" style="display:block">${e.description}${e.notes?`<br><br><strong>Note :</strong> ${e.notes}`:""}${e.source_url?`<br><a href="${e.source_url}" target="_blank" style="color:var(--moutarde);font-size:12px;">Source officielle</a>`:""}</div>`:`<div class="rm-card-desc">${e.description||""}</div>`;return`
    <div class="tl-item">
      <div class="tl-dot ${a}"></div>
      <div class="rm-card ${i} ${s?"open":""}" data-toggle-item="${e.reference}">
        <div class="rm-card-top">
          <div class="rm-card-left">
            <span class="rm-card-ref">${e.reference}</span>
            <span class="rm-card-reg">${e.regulation}</span>
            <span class="rm-card-type">${e.deadline_type_label||e.deadline_type}</span>
          </div>
          <div class="rm-card-date">
            <div class="date-main">${t}</div>
            ${$(e)}
          </div>
        </div>
        <div class="rm-card-title">${e.title}</div>
        ${m}
        <div class="rm-card-bottom">${n}${c}</div>
      </div>
    </div>`}function y(){document.querySelectorAll("[data-toggle-item]").forEach(e=>{e.addEventListener("click",()=>{_(e.dataset.toggleItem)})})}function _(e){r.has(e)?r.delete(e):r.add(e),d()}document.querySelectorAll(".fbtn").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll('[data-f="reg"]').forEach(s=>s.classList.remove("active")),e.classList.add("active"),l=e.dataset.v,d()})});p();
