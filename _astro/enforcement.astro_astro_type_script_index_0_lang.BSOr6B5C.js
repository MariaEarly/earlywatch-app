import{a as d}from"./api.vBsT2HYn.js";let o=[];async function p(){try{const[s,t]=await Promise.allSettled([d("/enforcement/stats"),d("/enforcement?limit=100")]);if(s.status==="fulfilled"){const e=s.value;document.getElementById("stat-total").textContent=e.total||0,document.getElementById("stat-critical").textContent=e.critical||0,document.getElementById("stat-high").textContent=e.high||0,document.getElementById("stat-7d").textContent=e.last_7d||0,document.getElementById("stat-30d").textContent=e.last_30d||0;const a=document.getElementById("filter-source");e.by_source&&Object.entries(e.by_source).sort((l,i)=>i[1]-l[1]).forEach(([l,i])=>{const n=document.createElement("option");n.value=l,n.textContent=`${l} (${i})`,a.appendChild(n)})}t.status==="fulfilled"&&(o=t.value.items||[],c(o))}catch(s){console.error(s)}}function c(s){const t=document.getElementById("enf-body");if(!s.length){t.innerHTML='<tr><td colspan="5" class="empty-state">Aucune sanction trouvee</td></tr>';return}t.innerHTML=s.map(e=>{const a=e.published_at?new Date(e.published_at).toLocaleDateString("fr-FR"):"-",l=`sev-${e.severity||"low"}`,i=(e.impacted_procedures||[]).map(m=>`<span class="proc-tag">${m}</span>`).join(""),n=(e.summary||"").substring(0,120);return`<tr data-show-detail="${e.id}" style="cursor:pointer">
        <td class="enf-date">${a}</td>
        <td><span class="source-badge">${e.source_name||"-"}</span></td>
        <td>
          <span class="enf-title">${e.title||"-"}</span>
          <div class="enf-summary">${n}${n.length>=120?"...":""}</div>
        </td>
        <td><span class="sev-badge ${l}">${e.severity||"-"}</span></td>
        <td>${i||'<span style="color:var(--color-text-tertiary);font-size:12px">-</span>'}</td>
      </tr>`}).join(""),document.querySelectorAll("[data-show-detail]").forEach(e=>{e.addEventListener("click",()=>{y(e.dataset.showDetail)})})}function r(){const s=document.getElementById("filter-source").value,t=document.getElementById("filter-severity").value;let e=o;s&&(e=e.filter(a=>a.source_name===s)),t&&(e=e.filter(a=>a.severity===t)),c(e)}document.getElementById("filter-source").addEventListener("change",r);document.getElementById("filter-severity").addEventListener("change",r);function y(s){const t=o.find(n=>n.id===s);if(!t)return;const e=t.published_at?new Date(t.published_at).toLocaleDateString("fr-FR"):"-",a=`sev-${t.severity||"low"}`,l=(t.impacted_procedures||[]).map(n=>`<span class="proc-tag">${n}</span>`).join(" "),i=(t.obligations_cited||[]).map(n=>`<li>${n}</li>`).join("");document.getElementById("detail-content").innerHTML=`
      <div class="detail-title">${t.title}</div>
      <div class="detail-meta">
        <span class="source-badge">${t.source_name}</span>
        <span class="sev-badge ${a}" style="margin-left:8px">${t.severity}</span>
        <span style="margin-left:12px">${e}</span>
      </div>
      <div class="detail-summary">${t.summary||""}</div>
      ${i?`<div class="detail-section"><h4>Obligations citees</h4><ul style="padding-left:16px;font-size:13px;line-height:1.8">${i}</ul></div>`:""}
      ${l?`<div class="detail-section"><h4>Procedures impactees</h4><div>${l}</div></div>`:""}
      ${t.original_url?`<a href="${t.original_url}" target="_blank" class="detail-link">Voir la source</a>`:""}
    `,document.getElementById("detail-panel").classList.add("open")}function u(){document.getElementById("detail-panel").classList.remove("open")}document.getElementById("detail-close-btn").addEventListener("click",u);document.addEventListener("keydown",s=>{s.key==="Escape"&&u()});p();
