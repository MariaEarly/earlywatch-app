const p={AMF:"AMF",ACPR:"ACPR",EBA:"EBA",ESMA:"ESMA","ECB Banking Supervision":"BCE",EIOPA:"EIOPA","AI Office EU":"AIOE","Parlement EU (ECON)":"ECON",CNIL:"CNIL","Banque de France":"BDF","EC Financial Services":"COM",BIS:"BIS",FSB:"FSB","Legifrance JO":"JO","Conseil UE":"CUE",COLB:"COLB",Tracfin:"TRAC","Tracfin Publications":"TRAC","FATF / GAFI":"GAFI","GAFI Typologies":"GAFI","GAFI Virtual Assets":"GAFI",AMLA:"AMLA",OSMP:"OSMP","AMF Réglementation":"AMF","AMF Doctrine PSAN":"AMF","EUR-Lex TFR 2023/1113":"EURL","EUR-Lex Législation":"EURL","Wolfsberg Group":"WOLF","Egmont Group":"EGM",OFAC:"OFAC","OFSI UK":"OFSI","UN Sanctions":"ONU","EUR-Lex Sanctions":"EURL",AGEFI:"AGFI",Moneyval:"MVAL","FCA UK":"FCA",FinCEN:"FNCN"},b=new Set(["ACPR","ESMA","AIOE","ECON","CNIL","COLB","TRAC","GAFI","AMLA","OSMP","EURL","WOLF","OFAC","OFSI","AGFI","MVAL","FNCN","EIOPA"]);function A(t){if(!t)return"?";const n=p[t];if(n)return n;const e=new Set(["le","la","les","the","de","du","un","une","l'","’"]);return(t.split(/[\s\-_]+/).filter(o=>o&&!e.has(o.toLowerCase()))[0]||t).slice(0,2).toUpperCase()||"?"}function w(t){return b.has(t)}function E(t){const n=A(t);return`<div class="ew-source-avatar${w(n)?" sm":""}">${n}</div>`}const r={recent:"Plus récent",oldest:"Plus ancien",week:"Cette semaine","7days":"7 derniers jours"};function F(t,n,e,s){return`<button class="ew-tab${s===t?" active":""}" data-tab="${t}">${n}<span class="ew-tab-num">${e}</span></button>`}function S(t){return`<div class="ew-sort-wrap" id="sort-wrap">
    <button class="ew-sort-btn" id="sort-btn">${r[t]||"Plus récent"} ▾</button>
    <div class="ew-sort-menu" id="sort-menu" style="display:none">
      ${Object.entries(r).map(([e,s])=>`<button class="ew-sort-opt" data-sort-opt="${e}">${s}</button>`).join("")}
    </div>
  </div>`}function C(t){const n=document.getElementById("sort-btn"),e=document.getElementById("sort-menu");!n||!e||(n.addEventListener("click",s=>{s.stopPropagation();const o=e.style.display!=="none";e.style.display=o?"none":"block",o||document.addEventListener("click",()=>{e.style.display="none"},{once:!0})}),e.querySelectorAll("[data-sort-opt]").forEach(s=>{s.addEventListener("click",o=>{o.stopPropagation(),e.style.display="none",t(s.dataset.sortOpt)})}))}function $(t,n,{compact:e=!1}={}){const s=t.client_status||"inbox",o=t.has_impact&&t.impacted_procedures?.length?`<div style="display:flex;align-items:center;gap:6px;margin-top:16px;flex-wrap:wrap">
         <span style="font-size:11px;color:#888">Impacte →</span>
         ${t.impacted_procedures.map(a=>`<span style="font-size:11px;font-weight:500;color:#5C6347">${a}</span>`).join(" · ")}
       </div>`:"",c=!e&&t.original_url?`<a href="${t.original_url}" target="_blank" rel="noopener" style="color:inherit;text-decoration:none">${t.title||"Sans titre"}</a>`:t.title||"Sans titre",l=e?"":(()=>{const a=s==="to_process"?`<button class="ew-btn ew-btn-kaki ew-btn-kaki-removing" data-action="inbox" data-id="${t.id}">Retirer des tâches ×</button>`:`<button class="ew-btn ew-btn-kaki" data-action="to_process" data-id="${t.id}">À traiter</button>`,u=s==="read"?`<button class="ew-btn ew-btn-kaki-outline" data-action="inbox" data-id="${t.id}">Marquer non lu</button>`:`<button class="ew-btn ew-btn-kaki-outline" data-action="read" data-id="${t.id}">Marquer comme lu</button>`;return`<div class="ew-actions" style="margin-top:16px">
        ${a}
        ${u}
        <div class="ew-act-sep"></div>
        <button class="ew-btn ew-btn-ghost" data-open-tracker="${t.id}">+ Tracker</button>
        <button class="ew-btn ew-btn-ghost" data-action="ignored" data-id="${t.id}">Ignorer</button>
      </div>`})(),i=e?"a":"div",d=e?`href="${t.original_url||"#"}" target="_blank" rel="noopener" style="text-decoration:none;color:inherit"`:"";return`
    <${i} class="ew-item" id="card-${t.id}" ${d}>
      ${E(t.source_name)}
      <div class="ew-item-body">
        <div class="ew-meta">
          <span class="src">${t.source_name||"—"}</span>
          <span class="dot">·</span>
          <span class="date">${n(t.published_at)}</span>
        </div>
        <h3 class="ew-title">${c}</h3>
        ${o}
        ${l}
      </div>
      <div class="ew-item-side"></div>
    </${i}>`}export{F as a,S as b,C as c,$ as r,E as s};
