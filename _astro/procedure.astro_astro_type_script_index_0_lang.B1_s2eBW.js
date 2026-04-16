import{a as m,t as l,f as P,r as x,i as h,A as L}from"./api.vBsT2HYn.js";const g={"EB-POL-001":"Politique generale LCB-FT","EB-RISK-001":"Classification des risques","EB-KYC-001":"Entree en relation — Personne physique","EB-KYC-002":"Entree en relation — Personne morale","EB-SCR-001":"Criblage sanctions et PPE","EB-MON-001":"Monitoring transactionnel","EB-TRC-001":"Declaration de soupcon Tracfin","EB-CASP-001":"LCB-FT specifique CASP/PSAN","EB-CTRL-001":"Controle permanent LCB-FT","EB-AGT-001":"Agents et distributeurs","EB-UBO-001":"Beneficiaires effectifs","EB-EDD-001":"Vigilance renforcee","EB-PEP-001":"Personnes politiquement exposees","EB-SCR-002":"Criblage sanctions avance","EB-GEL-001":"Gel des avoirs","EB-ARCH-001":"Archivage","EB-TRV-001":"Transfert de fonds","EB-CBK-001":"Correspondance bancaire","EB-FORM-001":"Formation LCB-FT"},f={PSP:["EB-POL-001","EB-RISK-001","EB-KYC-001","EB-KYC-002","EB-SCR-001","EB-MON-001","EB-TRC-001","EB-CTRL-001","EB-AGT-001","EB-FORM-001"],Banque:["EB-POL-001","EB-RISK-001","EB-KYC-001","EB-KYC-002","EB-SCR-001","EB-MON-001","EB-TRC-001","EB-CTRL-001","EB-FORM-001","EB-UBO-001","EB-EDD-001","EB-PEP-001","EB-CBK-001","EB-ARCH-001"],CASP:["EB-POL-001","EB-RISK-001","EB-KYC-001","EB-KYC-002","EB-SCR-001","EB-MON-001","EB-TRC-001","EB-CASP-001","EB-CTRL-001","EB-FORM-001","EB-TRV-001","EB-GEL-001"],EME:["EB-POL-001","EB-RISK-001","EB-KYC-001","EB-KYC-002","EB-SCR-001","EB-MON-001","EB-TRC-001","EB-CTRL-001","EB-AGT-001","EB-FORM-001"]},R=["EB-EDD-001","EB-SCR-002","EB-GEL-001","EB-ARCH-001","EB-PEP-001"],S=Object.keys(g),A={PSP:"pi-badge-psp",Banque:"pi-badge-banque",CASP:"pi-badge-casp",EME:"pi-badge-psp",Tous:"pi-badge-tous"};let d={},u="",v=new Map;function p(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):""}async function T(){try{d=(await m("/api/v1/settings")).settings||{},u=d?.profil?.entity_type||d?.entity_type||"",(!d?.profil?.nom_etablissement||!u)&&(document.getElementById("prof-banner").style.display="block");try{const n=await m("/api/v1/procedures"),s=Array.isArray(n)?n:n.items||[];for(const a of s)v.set(a.id,a)}catch{}O()}catch{document.getElementById("left-subtitle").textContent="Erreur de chargement"}}function $(){const e=d?.perimetre||{},i=u||"PSP",n=new Set(f[i]||f.PSP),s=e.types_clients||[];(s.includes("Entreprises")||s.includes("Institutionnels"))&&(n.add("EB-UBO-001"),n.add("EB-PEP-001")),e.transferts_fonds&&(i==="PSP"||i==="EME")&&n.add("EB-TRV-001"),e.correspondance_bancaire&&(i==="Banque"||i==="EC")&&n.add("EB-CBK-001"),e.agents_distributeurs&&n.add("EB-AGT-001");const o=[...n],t=new Set(o),r=[];for(const c of S)t.has(c)||r.push(c);for(const c of R)!t.has(c)&&!r.includes(c)&&r.push(c);return{obligatoires:o,autres:r}}function O(){const{obligatoires:e,autres:i}=$(),n=u||"PSP";document.getElementById("left-subtitle").textContent=`${e.length} procedures pour profil ${n}`;const s=document.getElementById("proc-obligatoires");s.innerHTML=`<div class="section-label-oblig">Votre corpus obligatoire (${e.length})</div>`+e.map(t=>b(t,n)).join("");const a=document.getElementById("autres-list"),o=document.getElementById("toggle-autres");i.length&&(o.style.display="flex",a.innerHTML=i.map(t=>b(t,"Tous")).join("")),document.querySelectorAll(".proc-item").forEach(t=>{t.addEventListener("click",()=>I(t.dataset.ref))}),o.addEventListener("click",()=>{const t=document.getElementById("autres-list"),r=t.style.display!=="none";t.style.display=r?"none":"block",o.classList.toggle("open",!r)})}function b(e,i){const n=g[e]||e,s=A[i]||"pi-badge-tous";return`
      <div class="proc-item" data-ref="${e}">
        <div class="pi-left">
          <div class="pi-ref">${e}</div>
          <div class="pi-title">${p(n)}</div>
        </div>
        <span class="pi-badge ${s}">${i}</span>
      </div>`}async function I(e){document.querySelectorAll(".proc-item").forEach(t=>{t.classList.toggle("active",t.dataset.ref===e)});const i=document.getElementById("result-area");i.innerHTML=`
      <div style="display:flex; align-items:center; justify-content:center; height:100%; flex-direction:column; gap:12px">
        <div class="spinner"></div>
        <p style="font-size:13px; color:#3D3B38">Generation de ${e} en cours...</p>
        <p style="font-size:11px; color:var(--ew-ink3)">Cela peut prendre 30 a 60 secondes</p>
      </div>`;const a={PSP:"psp",Banque:"banque",CASP:"casp",EME:"psp",EC:"banque"}[u||"PSP"]||"psp",o=g[e]||e;try{const t=await m("/api/v1/procedures/generate",{method:"POST",body:{text_id:"cmf",tenant_profile:a,client_context:`Procedure demandee : ${e} — ${o}`}});v.set(t.id,t),C(t,e),l("Procedure generee")}catch(t){i.innerHTML=`
        <div class="proc-empty">
          <p class="proc-empty-text" style="color:#8B3A3A">${p(t.message||"Erreur de generation")}</p>
        </div>`,l(t.message||"Erreur","error")}}function C(e,i){const n=e.content||"",s=w(n),a=e.sources_cited||[],o=!!d?.profil?.nom_etablissement,t=o?"Personnalisee avec votre profil":"Generique",r=o?"badge-perso":"badge-generic";document.getElementById("result-area").innerHTML=`
      <div style="padding:24px; max-width:800px; margin:0 auto">
        <div class="result-header">
          <div>
            <div class="result-title">${p(i)} — ${p(g[i]||"")}</div>
            <div class="result-meta">
              ${e.obligation_count||"?"} obligations &middot; ${e.model_name||"Claude"}
              &middot; ${P(e.created_at)}
            </div>
          </div>
          <span class="result-badge ${r}">${t}</span>
        </div>

        ${a.length?`
        <div style="margin-bottom:16px">
          <div style="font-size:11px; color:var(--ew-ink3); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px; font-weight:600">Articles cites</div>
          <div style="display:flex; gap:4px; flex-wrap:wrap">
            ${a.map(c=>`
              <a href="${c.lien_legifrance||"#"}" target="_blank" rel="noopener"
                 style="font-size:10px; padding:2px 8px; background:var(--ew-surface); border-radius:4px; color:var(--ew-text); text-decoration:none; border:0.5px solid var(--ew-text); font-family:'IBM Plex Mono',monospace">
                Art. ${p(c.article_number||"")}
              </a>
            `).join("")}
          </div>
        </div>`:""}

        ${s.map((c,E)=>`
          <div class="expandable ${E<4?"open":""}">
            <button class="expandable-header">
              <span>${p(c.title)}</span>
              <span class="arrow">&#9654;</span>
            </button>
            <div class="expandable-body">
              <div class="md-content">${x(c.content)}</div>
            </div>
          </div>
        `).join("")}

        <div class="warning-box">
          <span>&#9888;</span>
          <div>
            <strong>Avertissement Compliance Officer</strong><br>
            Ce document est un PROJET genere automatiquement par IA a partir de sources Legifrance.
            Il DOIT etre valide par le Compliance Officer avant toute mise en application.
          </div>
        </div>

        <div class="result-actions">
          <button class="btn-docx" id="btn-export-docx" data-proc-id="${e.id}">Telecharger .docx</button>
          ${e.status==="pending_validation"?`
            <button class="btn-validate" id="btn-mark-valid" data-proc-id="${e.id}">Marquer comme validee</button>
          `:`
            <button class="btn-validate" disabled>${e.status==="validated"?"Validee":e.status}</button>
          `}
        </div>
      </div>`,h(),M(e,i)}function M(e,i){const n=document.getElementById("btn-export-docx");n&&n.addEventListener("click",async()=>{const a=n;a.disabled=!0,a.textContent="Export en cours...";try{const o=sessionStorage.getItem("ew_token"),t=await fetch(`${L}/api/v1/procedures/${e.id}/export-docx`,{headers:{Authorization:`Bearer ${o}`}});if(!t.ok)throw new Error(`Erreur ${t.status}`);const r=await t.blob(),E=(t.headers.get("Content-Disposition")||"").match(/filename="?([^"]+)"?/),y=E?E[1]:`${i}.docx`,B=document.createElement("a");B.href=URL.createObjectURL(r),B.download=y,B.click(),URL.revokeObjectURL(B.href),l("DOCX telecharge")}catch(o){l(o.message||"Erreur export","error")}finally{a.disabled=!1,a.textContent="Telecharger .docx"}});const s=document.getElementById("btn-mark-valid");s&&s.addEventListener("click",async()=>{try{const a=await m(`/api/v1/procedures/${e.id}/validate`,{method:"POST",body:{decision:"validated"}});C(a,i),l("Procedure validee")}catch(a){l(a.message||"Erreur","error")}})}function w(e){const i=e.split(`
`),n=[];let s=null;for(const a of i){const o=a.match(/^\*\*(\d+)\s*[-—]\s*(.+?)\*\*/),t=a.match(/^## \d*\.?\s*(.+)/),r=a.match(/^# (.+)/);o?(s&&n.push(s),s={title:`${o[1]} — ${o[2]}`,content:""}):t?(s&&n.push(s),s={title:t[1],content:""}):r&&!s?(s&&n.push(s),s={title:r[1],content:""}):s&&(s.content+=a+`
`)}return s&&n.push(s),n.length===0&&n.push({title:"Procedure",content:e}),n}T();
