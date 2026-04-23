import{a as m,f as g,t as p}from"./api.CcTKbNwm.js";import{a as c,b,c as w,r as E}from"./article-card.Bk_eNW22.js";const T="/earlywatch-app/";let o=[],s={inbox:0,to_process:0,read:0,all_visible:0},i="all",l="recent",d=!1;const y=new URLSearchParams(window.location.search);y.get("tab")&&(i=y.get("tab"));async function k(){const t=document.getElementById("client-today");t&&(t.textContent=new Date().toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long",year:"numeric"})),await u()}async function u(){if(d)return;d=!0;const t=document.getElementById("veille-list"),a=t.querySelector("#ew-tabs");t.innerHTML='<div class="ew-loading"><div class="ew-spinner"></div></div>',a&&t.insertAdjacentElement("afterbegin",a);try{const[r,e]=await Promise.all([m(`/api/v1/app/articles?status=${i}&page_size=100`),m("/api/v1/app/articles/counts")]);o=r.articles||[],s=e}catch(r){t.innerHTML=`<div class="ew-empty">
        <div class="ew-empty-title">Erreur de chargement</div>
        <div class="ew-empty-sub">${r.message}</div>
      </div>`,d=!1;return}d=!1,v(),f()}function v(){const t=`<div class="ew-tabs" id="ew-tabs">
      ${c("all","Tous",s.all_visible,i)}
      ${c("inbox","Non lus",s.inbox,i)}
      ${c("to_process","À traiter",s.to_process,i)}
      ${c("read","Traités",s.read,i)}
      ${b(l)}
    </div>`,a=document.getElementById("veille-list"),r=a.querySelector("#ew-tabs");r?r.outerHTML=t:a.insertAdjacentHTML("afterbegin",t),a.querySelectorAll("[data-tab]").forEach(e=>{e.addEventListener("click",()=>{i=e.dataset.tab,u()})}),w(e=>{l=e,v(),f()})}function A(){const t=Date.now(),a=e=>new Date(e.published_at||e.created_at).getTime();if(l==="week"){const e=new Date;return e.setDate(e.getDate()-e.getDay()+1),e.setHours(0,0,0,0),o.filter(n=>a(n)>=e.getTime())}if(l==="7days")return o.filter(e=>a(e)>=t-7*864e5);const r=l==="oldest"?1:-1;return[...o].sort((e,n)=>r*(a(e)-a(n)))}function f(){const t=document.getElementById("veille-list"),a=t.querySelector("#ew-tabs"),r=A();r.length?t.innerHTML=`<div class="ew-list" id="ew-list">
        ${r.map(e=>E(e,g)).join("")}
      </div>`:t.innerHTML=`<div class="ew-empty">
        <div class="ew-empty-title">Aucun article</div>
        <div class="ew-empty-sub">Pas d'article dans cet onglet.</div>
      </div>`,a&&t.insertAdjacentElement("afterbegin",a),t.querySelectorAll("[data-action]").forEach(e=>{e.addEventListener("click",n=>{n.stopPropagation(),h(e.dataset.id,e.dataset.action)})}),t.querySelectorAll("[data-open-tracker]").forEach(e=>{e.addEventListener("click",n=>{n.stopPropagation(),L(e.dataset.openTracker)})})}async function h(t,a){try{await m(`/api/v1/app/articles/${t}/state`,{method:"PATCH",body:{action:a}}),p({to_process:"Article ajouté aux tâches",read:"Article marqué comme lu",inbox:"Article remis en non lu",ignored:"Article ignoré"}[a]||"Mis à jour"),await u()}catch(r){p(r.message,"error")}}function L(t){const a=o.find(e=>e.id===t);if(!a)return;const r=document.getElementById("tracker-form-body");r.innerHTML=`
      <p style="font-size:13px;color:var(--taupe);margin-bottom:16px">
        Ajoutez cet article à votre tracker réglementaire.
      </p>
      <div style="font-size:13px;font-weight:500;color:var(--ink);margin-bottom:12px">${a.title||"Sans titre"}</div>
      <a href="${T}app/tracker" class="ew-btn" style="display:inline-block;margin-top:8px;text-decoration:none">
        Aller au Tracker →
      </a>`,document.getElementById("tracker-overlay").style.display="flex"}document.getElementById("tracker-close")?.addEventListener("click",()=>{document.getElementById("tracker-overlay").style.display="none"});document.getElementById("tracker-overlay")?.addEventListener("click",t=>{t.target===t.currentTarget&&(t.currentTarget.style.display="none")});k();
