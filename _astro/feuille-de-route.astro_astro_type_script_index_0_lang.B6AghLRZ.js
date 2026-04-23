import{g as m,a as p}from"./api.CcTKbNwm.js";async function v(){const e=document.getElementById("deadlines-list");try{const n=m(),s=await p("/api/v1/deadlines?include_passed=true"),t=Array.isArray(s)?s:s?.deadlines||[],a=new Date,c=t.filter(i=>new Date(i.deadline_date)>=a).sort((i,r)=>new Date(i.deadline_date).getTime()-new Date(r.deadline_date).getTime()),d=t.filter(i=>new Date(i.deadline_date)<a).sort((i,r)=>new Date(r.deadline_date).getTime()-new Date(i.deadline_date).getTime());if(!c.length&&!d.length){e.innerHTML='<div class="ew-empty"><div class="ew-empty-title">Aucune échéance</div></div>';return}let l=c.map(i=>o(i,a)).join("");d.length&&(l+=`
          <div class="section-label">Échéances passées</div>
          ${d.map(i=>o(i,a)).join("")}
        `),e.innerHTML=l}catch(n){e.innerHTML=`<div class="ew-empty"><div class="ew-empty-title">Erreur</div><div class="ew-empty-sub">${n.message}</div></div>`}}function o(e,n){const s=new Date(e.deadline_date),t=Math.ceil((s.getTime()-n.getTime())/864e5),a=t<0,c=s.toLocaleDateString("fr-FR",{day:"2-digit",month:"2-digit",year:"numeric"}),d=a?`il y a ${Math.abs(t)} jours`:t===0?"aujourd'hui":t===1?"demain":t<30?`dans ${t} jours`:t<60?"dans 1 mois":`dans ${Math.round(t/30)} mois`,l=e.priority==="critical"?'<span class="badge-critical">CRITIQUE</span>':e.priority==="high"?'<span class="badge-high">ÉLEVÉ</span>':"",i=e.procedures_impacted?.length?`<div class="dl-procs">Procédures impactées : ${e.procedures_impacted.join(", ")}</div>`:"";return`
      <div class="deadline-card${!a&&t<=30?" imminent":""}">
        <div>
          <div class="dl-date">${c}</div>
          <div class="dl-countdown">${d}</div>
        </div>
        <div>
          <div class="dl-title">${e.title||e.regulation||"—"}</div>
          ${e.description?`<div class="dl-desc">${e.description}</div>`:""}
          ${i}
        </div>
        ${l}
      </div>`}v();
