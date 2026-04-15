import{a as c,t as d,g as G,f as R,b as J,s as Z}from"./api.CPWPAWzi.js";const N="/earlywatch-app/",ee={"EB-POL-001":"Politique générale LCB-FT","EB-RISK-001":"Classification des risques","EB-KYC-001":"Entrée en relation — Personne physique","EB-KYC-002":"Entrée en relation — Personne morale","EB-SCR-001":"Criblage sanctions et PPE","EB-MON-001":"Monitoring transactionnel","EB-TRC-001":"Déclaration de soupçon Tracfin","EB-CASP-001":"LCB-FT spécifique CASP/PSAN","EB-CTRL-001":"Contrôle permanent LCB-FT","EB-AGT-001":"Agents et distributeurs","EB-UBO-001":"Bénéficiaires effectifs","EB-EDD-001":"Vigilance renforcée","EB-PEP-001":"Personnes politiquement exposées","EB-SCR-002":"Criblage sanctions avancé","EB-GEL-001":"Gel des avoirs","EB-ARCH-001":"Archivage","EB-TRV-001":"Transfert de fonds","EB-CBK-001":"Correspondance bancaire","EB-FORM-001":"Formation LCB-FT"};function te(t){return ee[t]||t}const ne='<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0"><path d="M10 6.5V10a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1h3.5M7.5 1H11v3.5M11 1L5 7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';let o=[],P="all",w="all",q="all",h="recent",v=null,p=0;function L(){return!!G()?.tenant_newsletter_enabled}async function ae(){try{const[t,n,a]=await Promise.all([c("/api/v1/articles?page_size=200&score_min=11"),L()?c("/api/v1/articles/newsletter/counts").catch(()=>null):Promise.resolve(null),c("/api/v1/tracker/pending-count").catch(()=>({pending:0}))]);o=Array.isArray(t)?t:t?.items||[],v=n,p=a?.pending||0}catch(t){document.getElementById("article-list").innerHTML=`<div class="empty-state"><div class="icon">!</div><p>${t.message}</p></div>`;return}_(),g(),C()}function _(){const t=o.filter(i=>i.lifecycle_status==="inbox"||i.lifecycle_status==="triaged"),n={all:t.length,nouveau:0,quotidien:0,hebdo:0,ignorer:0};t.forEach(i=>{n[i.status]!==void 0&&n[i.status]++});const a={all:t.length,high:0,med:0,low:0};t.forEach(i=>{(i.score||0)>=50?a.high++:(i.score||0)>=25?a.med++:a.low++});const e={};t.forEach(i=>{const s=i.source_name||"Autre";e[s]=(e[s]||0)+1}),document.getElementById("sidebar-left").innerHTML=`
      <div class="sidebar-section">
        <h3>Statut</h3>
        <div class="filter-group">
          ${k("all","Tous",n.all)}
          ${k("nouveau","Nouveaux",n.nouveau)}
          ${k("quotidien","Quotidien",n.quotidien)}
          ${k("hebdo","Hebdo",n.hebdo)}
          ${k("ignorer","Ignorés",n.ignorer)}
        </div>
      </div>
      <div class="sidebar-section">
        <h3>Score</h3>
        <div class="filter-group">
          ${T("all","Tous",a.all)}
          ${T("high","Prioritaire (50+)",a.high)}
          ${T("med","Moyen (25-49)",a.med)}
          ${T("low","Faible (<25)",a.low)}
        </div>
      </div>
      <div class="sidebar-section">
        <h3>Source</h3>
        <div class="filter-group" style="max-height:240px;overflow-y:auto">
          ${U("all","Toutes",o.length)}
          ${Object.entries(e).sort((i,s)=>s[1]-i[1]).map(([i,s])=>U(i,i,s)).join("")}
        </div>
      </div>`,document.querySelectorAll("[data-filter]").forEach(i=>{i.addEventListener("click",()=>{P=i.dataset.filter,_(),g()})}),document.querySelectorAll("[data-score-filter]").forEach(i=>{i.addEventListener("click",()=>{w=i.dataset.scoreFilter,_(),g()})}),document.querySelectorAll("[data-source-filter]").forEach(i=>{i.addEventListener("click",()=>{q=i.dataset.sourceFilter,_(),g()})})}function k(t,n,a){return`<button class="filter-item ${P===t?"active":""}" data-filter="${t}">
      <span>${n}</span><span class="filter-count">${a}</span>
    </button>`}function T(t,n,a){return`<button class="filter-item ${w===t?"active":""}" data-score-filter="${t}">
      <span>${n}</span><span class="filter-count">${a}</span>
    </button>`}function U(t,n,a){return`<button class="filter-item ${q===t?"active":""}" data-source-filter="${t}" style="font-size:12px">
      <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${n}</span><span class="filter-count">${a}</span>
    </button>`}function g(){let t=o.filter(e=>e.lifecycle_status==="inbox"||e.lifecycle_status==="triaged");P!=="all"&&(t=t.filter(e=>e.status===P)),w==="high"?t=t.filter(e=>(e.score||0)>=50):w==="med"?t=t.filter(e=>(e.score||0)>=25&&(e.score||0)<50):w==="low"&&(t=t.filter(e=>(e.score||0)<25)),q!=="all"&&(t=t.filter(e=>(e.source_name||"Autre")===q));const n=new Date;if(h==="week"){const e=new Date(n);e.setDate(n.getDate()-n.getDay()+1),e.setHours(0,0,0,0),t=t.filter(i=>new Date(i.created_at)>=e)}else if(h==="7days"){const e=new Date(n.getTime()-6048e5);t=t.filter(i=>new Date(i.created_at)>=e)}t.sort((e,i)=>{const s=!!e.published_at,l=!!i.published_at;if(s!==l)return s?-1:1;const b=new Date(e.published_at||e.created_at).getTime(),m=new Date(i.published_at||i.created_at).getTime();return h==="oldest"?b-m:m-b});const a=`<div style="display:flex;justify-content:flex-end;margin-bottom:8px">
      <select id="sort-select" style="font-family:'IBM Plex Sans',sans-serif;font-size:12px;padding:5px 10px;border:1px solid #C2BFB8;border-radius:4px;background:#EDEAE3;color:#1A1918;cursor:pointer;outline:none">
        <option value="recent"${h==="recent"?" selected":""}>Plus récent</option>
        <option value="oldest"${h==="oldest"?" selected":""}>Plus ancien</option>
        <option value="week"${h==="week"?" selected":""}>Cette semaine</option>
        <option value="7days"${h==="7days"?" selected":""}>7 derniers jours</option>
      </select>
    </div>`;if(t.length===0){document.getElementById("article-list").innerHTML=a+`
        <div class="empty-state">
          <div class="icon">&#128196;</div>
          <p>Aucun article dans cette vue</p>
        </div>`,Q();return}document.getElementById("article-list").innerHTML=a+t.map(e=>`
      <div class="article-card" data-article-nav="${e.id}">
        <div class="article-meta">
          <span>${e.source_name||"Source inconnue"}</span>
          <span>&middot;</span>
          <span>${e.published_at?R(e.published_at):`<span class="date-unknown-badge" style="background:#E8A23E;color:#fff;font-size:10px;padding:1px 6px;border-radius:3px;font-style:normal">Date inconnue</span><a href="#" class="fix-date-link" data-fix-date="${e.id}" onclick="event.stopPropagation();event.preventDefault()" style="font-size:10px;color:#9B9790;margin-left:4px;text-decoration:underline">Corriger</a>`}</span>
          ${e.detected_action_type?J(e.detected_action_type):""}
          <span style="margin-left:auto">${Z(e.status)}</span>
        </div>
        <div class="article-title-row">
          ${e.original_url?`<a href="${u(e.original_url)}" target="_blank" rel="noopener" class="article-title" onclick="event.stopPropagation()">${u(e.title||"Sans titre")}<span class="title-ext-icon">${ne}</span></a>`:`<div class="article-title">${u(e.title||"Sans titre")}</div>`}
        </div>
        ${e.has_impact&&e.impacted_procedures&&e.impacted_procedures.length>0?`
          <div class="article-impact-row" onclick="event.stopPropagation()">
            <span class="impact-badge">${e.severity==="critical"?'<span class="impact-dot-critical"></span>':""}Impacte → ${e.impacted_procedures.map(i=>`<span class="impact-ref" title="${u(i)}">${u(te(i))}</span>`).join(" · ")}</span>
            <a href="${N}controle" class="impact-link">Voir reminder</a>
          </div>`:""}
        <div class="article-actions">
          <button class="btn btn-sm btn-triage${e.status==="quotidien"?e.lifecycle_status==="published"?" btn-triage-published":" btn-triage-active":""}" data-triage="${e.id}" data-triage-status="quotidien">Quotidien${e.status==="quotidien"?' <span class="triage-reset" data-reset="'+e.id+'">×</span>':""}</button>
          <button class="btn btn-sm btn-triage${e.status==="hebdo"?e.lifecycle_status==="published"?" btn-triage-published":" btn-triage-active":""}" data-triage="${e.id}" data-triage-status="hebdo">Hebdo${e.status==="hebdo"?' <span class="triage-reset" data-reset="'+e.id+'">×</span>':""}</button>
          <button class="btn btn-sm btn-triage${e.status==="ignorer"?e.lifecycle_status==="published"?" btn-triage-published":" btn-triage-active":""}" data-triage="${e.id}" data-triage-status="ignorer">Ignorer${e.status==="ignorer"?' <span class="triage-reset" data-reset="'+e.id+'">×</span>':""}</button>
          ${L()&&(e.status==="quotidien"||e.status==="hebdo")?`
            <button class="btn btn-sm ${e.published_to_newsletter?"btn-primary":"btn-secondary"}"
                    data-publish="${e.id}"
                    ${e.published_to_newsletter?'disabled title="Publié le '+R(e.published_to_newsletter_at)+'"':""}>
              ${e.published_to_newsletter?"✓ Publié":"Publier"}
            </button>`:""}
          <span class="action-sep">|</span>
          ${e.tracker_added?'<span class="badge-tracker-added">✓ Tracker</span>':`<button class="btn btn-sm btn-triage btn-tracker${!e.tracker_added&&(e.severity==="high"||e.severity==="critical")&&e.lifecycle_status!=="ignored"?" btn-tracker-pending":""}" data-tracker="${e.id}" data-source="${u(e.source_name||"")}" data-date="${e.published_at||""}" data-title="${u(e.title||"")}" data-synthese="${u(e.reminder_text||"")}" data-type="${e.impact_type||"info"}" data-url="${u(e.original_url||"")}">+ Tracker</button>`}
          <span class="action-sep">|</span>
          ${e.pub_added?'<span class="badge-tracker-added">✓ Pub</span>':`<button class="btn btn-sm btn-triage btn-tracker" data-pub="${e.id}" data-source="${u(e.source_name||"")}" data-date="${e.published_at||""}" data-title="${u(e.title||"")}" data-type="${e.impact_type||"info"}" data-url="${u(e.original_url||"")}">+ Pub</button>`}
        </div>
      </div>
    `).join(""),Q(),document.querySelectorAll("[data-article-nav]").forEach(e=>{e.addEventListener("click",i=>{i.target.closest("button")||i.target.closest("a")||(window.location.href=`${N}article?id=${e.dataset.articleNav}`)})}),document.querySelectorAll("[data-triage]").forEach(e=>{e.addEventListener("click",i=>{if(i.stopPropagation(),i.target.closest(".triage-reset")){K(e.dataset.triage,"nouveau");return}K(e.dataset.triage,e.dataset.triageStatus)})}),document.querySelectorAll("[data-publish]").forEach(e=>{e.addEventListener("click",i=>{i.stopPropagation(),ie(e.dataset.publish)})}),document.querySelectorAll(".fix-date-link").forEach(e=>{e.addEventListener("click",i=>{i.stopPropagation(),i.preventDefault();const s=e.dataset.fixDate,l=e.parentElement;l&&(l.innerHTML=`<input type="date" class="date-fix-input" data-date-article="${s}" style="font-size:11px;padding:1px 4px;border:1px solid #C2BFB8;border-radius:3px;font-family:'IBM Plex Sans',sans-serif;background:#EDEAE3"><button class="date-fix-ok" data-date-ok="${s}" style="font-size:10px;margin-left:3px;padding:1px 6px;border:1px solid #5C6347;border-radius:3px;background:#5C6347;color:#fff;cursor:pointer">OK</button>`,l.querySelector(".date-fix-ok").addEventListener("click",async b=>{b.stopPropagation();const m=l.querySelector(".date-fix-input");if(m.value)try{await c(`/api/v1/articles/${s}/date`,{method:"PATCH",body:{published_at:m.value}});const x=o.findIndex(A=>A.id===s);x!==-1&&(o[x].published_at=m.value+"T00:00:00Z"),g()}catch(x){console.error("Date fix failed:",x)}}))})})}function Q(){const t=document.getElementById("sort-select");t&&t.addEventListener("change",()=>{h=t.value,g()})}async function ie(t){try{const n=await c(`/api/v1/articles/${t}/published`,{method:"POST",body:{}}),a=o.findIndex(e=>e.id===t);a!==-1&&(o[a].published_to_newsletter=!0,o[a].published_to_newsletter_at=n.published_to_newsletter_at,o[a].lifecycle_status="published"),L()&&(v=await c("/api/v1/articles/newsletter/counts").catch(()=>v)),g(),C(),d("Article publié dans la newsletter")}catch(n){d(n.message,"error")}}const se={nouveau:"inbox",important:"inbox",relu:"inbox",quotidien:"triaged",hebdo:"triaged",ignorer:"ignored",archive:"published"};async function K(t,n){try{await c(`/api/v1/articles/${t}/triage`,{method:"PATCH",body:{status:n}});const a=o.findIndex(e=>e.id===t);a!==-1&&(o[a].status=n,o[a].lifecycle_status=se[n]||o[a].lifecycle_status),_(),g(),d(`Article → ${n==="quotidien"?"Quotidien":n==="hebdo"?"Hebdo":"Ignoré"}`)}catch(a){d(a.message,"error")}}async function V(){const t=document.getElementById("btn-publish-all"),n=o.filter(a=>a.lifecycle_status==="triaged"&&(a.status==="quotidien"||a.status==="hebdo"));if(n.length!==0){t&&(t.disabled=!0,t.textContent="Publication...");try{const a=await c("/api/v1/articles/publish-all",{method:"POST",body:{}});for(const i of n){const s=o.findIndex(l=>l.id===i.id);s!==-1&&(o[s].published_to_newsletter=!0,o[s].lifecycle_status="published")}v=await c("/api/v1/articles/newsletter/counts").catch(()=>v),p=(await c("/api/v1/tracker/pending-count").catch(()=>({pending:0})))?.pending||0,g(),C(),d(`${a.published||n.length} article${(a.published||n.length)>1?"s":""} publiés — session clôturée`)}catch(a){d("Erreur: "+(a.message||"publication échouée"),"error"),t&&(t.disabled=!1,t.textContent="Clôturer la session")}}}function C(){const t=v,n=t?t.quotidien_total:0,a=t?t.hebdo_total:0,e=n===0?";opacity:0.4;cursor:not-allowed;pointer-events:none":"",i=a===0?";opacity:0.4;cursor:not-allowed;pointer-events:none":"",s=p>0?`
      <div class="sidebar-section">
        <h3>Tracker</h3>
        <div style="font-size:11px;color:#6B6860">
          <span style="color:#E8A23E;font-weight:600">${p}</span> article${p>1?"s":""} éligible${p>1?"s":""} non ajouté${p>1?"s":""}
        </div>
      </div>`:"",l=o.filter(r=>r.lifecycle_status==="triaged"&&r.status==="quotidien"&&!r.published_to_newsletter),b=L()&&l.length>0?`
      <div class="sidebar-section">
        <h3 style="display:flex;align-items:center;gap:6px"><span style="color:#E8A23E;font-size:10px">&#9679;</span> Flash</h3>
        <div style="display:flex;flex-direction:column;gap:4px">
          ${l.map(r=>`
            <div style="display:flex;align-items:center;gap:6px;padding:4px 0;border-bottom:1px solid #D5D2CB">
              <span style="flex:1;font-size:11px;color:var(--text-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${u(r.title)}">${u(r.title.slice(0,50))}${r.title.length>50?"...":""}</span>
              <button class="btn btn-sm btn-secondary" data-flash-publish="${r.id}" style="padding:1px 6px;font-size:9px;white-space:nowrap">Publier</button>
            </div>`).join("")}
        </div>
      </div>`:"",m=L()&&t?`
      <div class="sidebar-section">
        <h3>Digest</h3>
        <div style="padding:6px 0;border-bottom:1px solid #D5D2CB">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
            <span style="font-size:12px;font-weight:500;color:var(--text-primary)">Quotidien</span>
            <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:#6B6860;white-space:nowrap">${t.quotidien_published}/${t.quotidien_total} publié</span>
          </div>
          <div style="display:flex;gap:6px">
            <button class="btn btn-sm btn-secondary" data-copy-md="quotidien" style="padding:2px 8px;font-size:10px;border-radius:4px;flex:1">Copier</button>
            <button class="btn btn-sm btn-secondary" id="btn-apercu-quotidien" style="padding:2px 8px;font-size:10px;border-radius:4px;flex:1${e}" ${n===0?"disabled":""}>Aperçu</button>
          </div>
        </div>
        <div style="padding:6px 0">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
            <span style="font-size:12px;font-weight:500;color:var(--text-primary)">Hebdo</span>
            <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:#6B6860;white-space:nowrap">${t.hebdo_published}/${t.hebdo_total} publié</span>
          </div>
          <div style="display:flex;gap:6px">
            <button class="btn btn-sm btn-secondary" data-copy-md="hebdo" style="padding:2px 8px;font-size:10px;border-radius:4px;flex:1">Copier</button>
            <button class="btn btn-sm btn-secondary" id="btn-apercu-hebdo" style="padding:2px 8px;font-size:10px;border-radius:4px;flex:1${i}" ${a===0?"disabled":""}>Aperçu</button>
          </div>
        </div>
        <div style="padding:8px 0 0;border-top:1px solid #D5D2CB;margin-top:6px">
          <button class="btn btn-sm btn-primary" id="btn-publish-all" style="width:100%;font-size:11px;padding:6px 0"
            ${t.quotidien_total+t.hebdo_total===0?'disabled style="width:100%;font-size:11px;padding:6px 0;opacity:0.4;cursor:not-allowed"':""}>
            Clôturer la session
          </button>
          <div style="font-size:10px;color:#9B9790;text-align:center;margin-top:4px">Marque tous les triagés comme publiés</div>
        </div>
      </div>`:"";document.getElementById("sidebar-right").innerHTML=`
      ${b}
      ${m}
      ${s}
      <div class="sidebar-section">
        <h3>Export</h3>
        <div class="flex flex-col gap-4" style="gap:6px">
          <button class="btn btn-secondary btn-sm" data-export="markdown">Export Markdown</button>
          <button class="btn btn-secondary btn-sm" id="btn-export-monthly">Export mensuel</button>
        </div>
      </div>`,document.querySelectorAll("[data-export]").forEach(r=>{r.addEventListener("click",()=>{le(r.dataset.export,r.dataset.exportType)})}),document.querySelectorAll("[data-copy-md]").forEach(r=>{r.addEventListener("click",()=>{oe(r.dataset.copyMd,r)})});const x=document.getElementById("btn-apercu-hebdo");x&&x.addEventListener("click",()=>Y("hebdo"));const A=document.getElementById("btn-apercu-quotidien");A&&A.addEventListener("click",()=>Y("quotidien"));const F=document.getElementById("btn-publish-all");F&&F.addEventListener("click",()=>{o.filter(f=>f.lifecycle_status==="triaged"&&(f.status==="quotidien"||f.status==="hebdo")).length!==0&&(p>0?(document.getElementById("cloturer-msg").textContent=`${p} article${p>1?"s":""} éligible${p>1?"s":""} n'${p>1?"ont":"a"} pas été ajouté${p>1?"s":""} au tracker.`,document.getElementById("cloturer-overlay").style.display="flex"):V())}),document.getElementById("cloturer-cancel")?.addEventListener("click",()=>{document.getElementById("cloturer-overlay").style.display="none"}),document.getElementById("cloturer-overlay")?.addEventListener("click",r=>{r.target===r.currentTarget&&(r.currentTarget.style.display="none")}),document.getElementById("cloturer-confirm")?.addEventListener("click",()=>{document.getElementById("cloturer-overlay").style.display="none",V()}),document.querySelectorAll("[data-flash-publish]").forEach(r=>{r.addEventListener("click",async()=>{const f=r.dataset.flashPublish;r.disabled=!0,r.textContent="...";try{await c(`/api/v1/articles/${f}/published`,{method:"POST",body:{}});const y=o.findIndex($=>$.id===f);y!==-1&&(o[y].published_to_newsletter=!0,o[y].lifecycle_status="published"),v=await c("/api/v1/articles/newsletter/counts").catch(()=>v),g(),C(),d("Article publié — édition Flash")}catch(y){d("Erreur: "+(y.message||"publication échouée"),"error"),r.disabled=!1,r.textContent="Publier"}})});const E=document.getElementById("btn-export-monthly");E&&E.addEventListener("click",async()=>{const r=new Date;let f=r.getFullYear(),y=r.getMonth()+1;r.getDate()<5&&(y--,y===0&&(y=12,f--));const $=`${f}-${String(y).padStart(2,"0")}`;E.disabled=!0,E.textContent=`Export ${$}...`;try{const M=await c(`/api/v1/articles/monthly-recap/markdown?month=${$}`),X=new Blob([M],{type:"text/markdown;charset=utf-8"}),H=URL.createObjectURL(X),O=document.createElement("a");O.href=H,O.download=`early-brief-recap-${$}.md`,O.click(),URL.revokeObjectURL(H),d(`Récap ${$} exporté`)}catch(M){d("Erreur: "+(M.message||"export échoué"),"error")}E.disabled=!1,E.textContent="Export mensuel"})}let B=[],j="hebdo";function Y(t){j=t;const n=t==="quotidien"?e=>e.status==="quotidien":e=>e.status==="hebdo"||e.status==="quotidien";B=o.filter(n).sort((e,i)=>!!e.published_at!=!!i.published_at?e.published_at?-1:1:new Date(i.published_at||i.created_at).getTime()-new Date(e.published_at||e.created_at).getTime());const a=document.getElementById("apercu-overlay");a.style.display="flex",document.getElementById("apercu-title").textContent=`Aperçu ${t==="quotidien"?"Quotidien":"Hebdo"}`,W(),document.getElementById("apercu-close").onclick=z,document.getElementById("apercu-cancel").onclick=z,document.getElementById("apercu-export").onclick=re}function z(){document.getElementById("apercu-overlay").style.display="none"}let S=-1;function W(){const t=document.getElementById("apercu-list");if(!B.length){t.innerHTML='<div style="padding:30px;text-align:center;color:#6B6860;font-size:13px">Aucun article hebdo</div>';return}t.innerHTML=B.map((n,a)=>`
      <div class="apercu-item" draggable="true" data-apercu-idx="${a}" style="display:flex;align-items:center;gap:12px;padding:10px 12px;margin-bottom:6px;background:#EDEAE3;border:1px solid #D5D2CB;border-radius:8px;cursor:grab;transition:opacity .15s,border .15s">
        <span style="color:#B0ADA7;font-size:16px;cursor:grab;user-select:none;flex-shrink:0">⠇</span>
        <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:#6B6860;flex-shrink:0;width:20px;text-align:center">${a+1}</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:500;color:#1A1918;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${u(n.title||"Sans titre")}</div>
          <div style="font-size:11px;color:#6B6860;margin-top:2px">${n.source_name||""} · ${n.published_at?R(n.published_at):"Date inconnue"}</div>
        </div>
      </div>
    `).join(""),t.querySelectorAll(".apercu-item").forEach(n=>{n.addEventListener("dragstart",a=>{S=parseInt(n.dataset.apercuIdx),n.style.opacity="0.5",a.dataTransfer.effectAllowed="move"}),n.addEventListener("dragend",()=>{n.style.opacity="1",t.querySelectorAll(".apercu-item").forEach(a=>{a.style.border="1px solid #D5D2CB"})}),n.addEventListener("dragover",a=>{a.preventDefault(),a.dataTransfer.dropEffect="move",n.style.border="1px dashed #5C6347"}),n.addEventListener("dragleave",()=>{n.style.border="1px solid #D5D2CB"}),n.addEventListener("drop",a=>{a.preventDefault();const e=parseInt(n.dataset.apercuIdx);if(S!==e&&S>=0){const i=B.splice(S,1)[0];B.splice(e,0,i),W()}})})}async function re(){const t=j==="quotidien"?"Quotidien":"Hebdo",n=new Date().toLocaleDateString("fr-FR"),a=[`# Early Watch ${t} — ${n}`,""];B.forEach((l,b)=>{const m=l.published_at?new Date(l.published_at).toLocaleDateString("fr-FR"):"Date inconnue";a.push(`## ${b+1}. ${l.title}`),a.push(""),l.summary&&(a.push(l.summary),a.push("")),a.push(`**Source :** ${l.source_name||"Source inconnue"} — ${m}${l.published_at?"":" (date non confirmée)"}`),a.push(`**Lien :** ${l.original_url||"N/A"}`),a.push(""),a.push("---"),a.push("")});const e=new Blob([a.join(`
`)],{type:"text/markdown"}),i=URL.createObjectURL(e),s=document.createElement("a");s.href=i,s.download=`earlywatch-${j}-${new Date().toISOString().slice(0,10)}.md`,s.click(),URL.revokeObjectURL(i),z(),d("Export hebdo téléchargé")}async function oe(t,n){try{const a=await c(`/api/v1/articles/export/markdown?type=${t}`),e=typeof a=="string"?a:JSON.stringify(a,null,2);await navigator.clipboard.writeText(e);const i=n.textContent;n.textContent="✓ Copié !",n.style.color="#5C6347",n.style.fontWeight="500",setTimeout(()=>{n.textContent=i,n.style.color="",n.style.fontWeight=""},2e3)}catch(a){d(a.message||"Erreur de copie","error")}}async function le(t,n){try{let a=t==="markdown"?"/api/v1/articles/export/markdown":"/api/v1/articles/export";n&&(a+=`?type=${n}`);const e=await c(a),i=new Blob([typeof e=="string"?e:JSON.stringify(e,null,2)],{type:"text/plain"}),s=URL.createObjectURL(i),l=document.createElement("a");l.href=s;const b=n?`-${n}`:"";l.download=`earlywatch-export${b}.${t==="markdown"?"md":"json"}`,l.click(),URL.revokeObjectURL(s),d("Export téléchargé")}catch(a){d(a.message,"error")}}function u(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}let D=null;document.addEventListener("click",t=>{const n=t.target.closest("[data-tracker]");if(!n)return;D=n.dataset.tracker,document.getElementById("tracker-source").value=n.dataset.source||"",document.getElementById("tracker-date").value=n.dataset.date?n.dataset.date.slice(0,10):"",document.getElementById("tracker-sujet").value=n.dataset.title||"",document.getElementById("tracker-synthese").value=n.dataset.synthese||"",document.getElementById("tracker-lien").value=n.dataset.url||"",document.getElementById("tracker-statut").value="Publié";const a={nouvelle_regle:"TEXTE",mise_a_jour:"TEXTE",sanction:"DECISION",appel_vigilance:"CONSULTATION",consultation:"CONSULTATION",info:"TEXTE"};document.getElementById("tracker-type").value=a[n.dataset.type||""]||"TEXTE",document.getElementById("tracker-overlay").style.display="flex"});document.getElementById("tracker-close")?.addEventListener("click",()=>{document.getElementById("tracker-overlay").style.display="none"});document.getElementById("tracker-cancel")?.addEventListener("click",()=>{document.getElementById("tracker-overlay").style.display="none"});document.getElementById("tracker-overlay")?.addEventListener("click",t=>{t.target===t.currentTarget&&(t.currentTarget.style.display="none")});document.getElementById("tracker-confirm")?.addEventListener("click",async()=>{const t={source:document.getElementById("tracker-source").value,date:document.getElementById("tracker-date").value,sujet:document.getElementById("tracker-sujet").value,synthese:document.getElementById("tracker-synthese").value,type:document.getElementById("tracker-type").value,lien:document.getElementById("tracker-lien").value,statut:document.getElementById("tracker-statut").value};try{if((await c(`/api/v1/tracker/propose?article_id=${D}`,{method:"POST",body:t})).success){const a=o.findIndex(s=>s.id===D);a!==-1&&(o[a].tracker_added=!0);const e=document.querySelector(`[data-tracker="${D}"]`);if(e){const s=document.createElement("span");s.className="badge-tracker-added",s.textContent="✓ Tracker",e.parentNode.replaceChild(s,e);const l=s.previousElementSibling;l&&l.classList.contains("action-sep")&&l.remove()}document.getElementById("tracker-overlay").style.display="none",p=(await c("/api/v1/tracker/pending-count").catch(()=>({pending:0})))?.pending||0,C(),d("Article ajouté au Tracker")}else d("Erreur tracker","error")}catch(n){d("Erreur: "+n.message,"error")}});let I=null;const de={rapport:"Rapport",etude:"Rapport",evaluation:"Rapport"};document.addEventListener("click",t=>{const n=t.target.closest("[data-pub]");if(!n)return;I=n.dataset.pub;const a=o.find(i=>i.id===I);document.getElementById("pub-date").value=n.dataset.date?n.dataset.date.slice(0,10):"",document.getElementById("pub-source").value=n.dataset.source||"",document.getElementById("pub-titre").value=n.dataset.title||"",document.getElementById("pub-synthese").value=a?.summary||"",document.getElementById("pub-lien").value=n.dataset.url||"";const e=n.dataset.type||"info";document.getElementById("pub-type").value=de[e]||"Intelligence",document.getElementById("pub-overlay").style.display="flex"});document.getElementById("pub-close")?.addEventListener("click",()=>{document.getElementById("pub-overlay").style.display="none"});document.getElementById("pub-cancel")?.addEventListener("click",()=>{document.getElementById("pub-overlay").style.display="none"});document.getElementById("pub-overlay")?.addEventListener("click",t=>{t.target===t.currentTarget&&(t.currentTarget.style.display="none")});document.getElementById("pub-confirm")?.addEventListener("click",async()=>{const t={date:document.getElementById("pub-date").value,source:document.getElementById("pub-source").value,type:document.getElementById("pub-type").value,titre:document.getElementById("pub-titre").value,synthese:document.getElementById("pub-synthese").value,lien:document.getElementById("pub-lien").value};try{if((await c(`/api/v1/tracker/pub/propose?article_id=${I}`,{method:"POST",body:t})).success){const a=o.findIndex(i=>i.id===I);a!==-1&&(o[a].pub_added=!0);const e=document.querySelector(`[data-pub="${I}"]`);if(e){const i=document.createElement("span");i.className="badge-tracker-added",i.textContent="✓ Pub",e.parentNode.replaceChild(i,e)}document.getElementById("pub-overlay").style.display="none",d("Ajouté aux autres publications")}else d("Erreur publication","error")}catch(n){d("Erreur: "+n.message,"error")}});ae();
