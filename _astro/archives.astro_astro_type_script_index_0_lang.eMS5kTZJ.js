import{a as b,f as k,t as p}from"./api.CcTKbNwm.js";const _="/earlywatch-app/",x='<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0"><path d="M10 6.5V10a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1h3.5M7.5 1H11v3.5M11 1L5 7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';let i=[],w="all",f="all",h="all",g="all";async function E(){try{const t=await b("/api/v1/articles?lifecycle_status=ignored,published&page_size=200");i=Array.isArray(t)?t:t?.items||[]}catch(t){document.getElementById("article-list").innerHTML=`<div class="empty-state"><div class="icon">!</div><p>${t.message}</p></div>`;return}i.sort((t,e)=>{const a=new Date(t.published_at||t.created_at).getTime();return new Date(e.published_at||e.created_at).getTime()-a}),c(),o()}function u(t){const e=new Date;if(t==="this-week"){const a=new Date(e);return a.setDate(e.getDate()-e.getDay()+1),a.setHours(0,0,0,0),a}return t==="last-week"?new Date(e.getTime()-6048e5):t==="2-weeks"?new Date(e.getTime()-12096e5):null}function T(){let t=[...i];const e=u(w);return e&&(t=t.filter(a=>new Date(a.published_at||a.created_at)>=e)),f!=="all"&&(t=t.filter(a=>(a.source_name||"Autre")===f)),h!=="all"&&(t=t.filter(a=>(a.theme||a.detected_action_type||"")===h)),g!=="all"&&(t=t.filter(a=>a.lifecycle_status===g)),t}function c(){const t={all:i.length,"this-week":i.filter(s=>{const n=u("this-week");return n?new Date(s.published_at||s.created_at)>=n:!0}).length,"last-week":i.filter(s=>{const n=u("last-week");return n?new Date(s.published_at||s.created_at)>=n:!0}).length,"2-weeks":i.filter(s=>{const n=u("2-weeks");return n?new Date(s.published_at||s.created_at)>=n:!0}).length},e={};i.forEach(s=>{const n=s.source_name||"Autre";e[n]=(e[n]||0)+1});const a={};i.forEach(s=>{const n=s.theme||s.detected_action_type||"";n&&(a[n]=(a[n]||0)+1)});const r=Object.keys(a).length>0,l={all:i.length,published:0,ignored:0};i.forEach(s=>{s.lifecycle_status==="published"?l.published++:s.lifecycle_status==="ignored"&&l.ignored++}),document.getElementById("sidebar-left").innerHTML=`
      <div class="sidebar-section">
        <h3>Semaine</h3>
        <div class="filter-group">
          ${d("all","Tout",t.all)}
          ${d("this-week","Cette semaine",t["this-week"])}
          ${d("last-week","Semaine dernière",t["last-week"])}
          ${d("2-weeks","2 semaines",t["2-weeks"])}
        </div>
      </div>
      <div class="sidebar-section">
        <h3>Statut</h3>
        <div class="filter-group">
          ${v("all","Tous",l.all)}
          ${v("published","Publié",l.published)}
          ${v("ignored","Ignoré",l.ignored)}
        </div>
      </div>
      <div class="sidebar-section">
        <h3>Source</h3>
        <div class="filter-group" style="max-height:240px;overflow-y:auto">
          ${y("all","Toutes",i.length)}
          ${Object.entries(e).sort((s,n)=>n[1]-s[1]).map(([s,n])=>y(s,s,n)).join("")}
        </div>
      </div>
      ${r?`
      <div class="sidebar-section">
        <h3>Thème</h3>
        <div class="filter-group" style="max-height:200px;overflow-y:auto">
          ${$("all","Tous",i.length)}
          ${Object.entries(a).sort((s,n)=>n[1]-s[1]).map(([s,n])=>$(s,s,n)).join("")}
        </div>
      </div>`:""}`,document.querySelectorAll("[data-week-filter]").forEach(s=>{s.addEventListener("click",()=>{w=s.dataset.weekFilter,c(),o()})}),document.querySelectorAll("[data-status-filter]").forEach(s=>{s.addEventListener("click",()=>{g=s.dataset.statusFilter,c(),o()})}),document.querySelectorAll("[data-source-filter]").forEach(s=>{s.addEventListener("click",()=>{f=s.dataset.sourceFilter,c(),o()})}),document.querySelectorAll("[data-theme-filter]").forEach(s=>{s.addEventListener("click",()=>{h=s.dataset.themeFilter,c(),o()})})}function d(t,e,a){return`<button class="filter-item ${w===t?"active":""}" data-week-filter="${t}">
      <span>${e}</span><span class="filter-count">${a}</span>
    </button>`}function v(t,e,a){return`<button class="filter-item ${g===t?"active":""}" data-status-filter="${t}">
      <span>${e}</span><span class="filter-count">${a}</span>
    </button>`}function y(t,e,a){return`<button class="filter-item ${f===t?"active":""}" data-source-filter="${t}" style="font-size:12px">
      <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${e}</span><span class="filter-count">${a}</span>
    </button>`}function $(t,e,a){return`<button class="filter-item ${h===t?"active":""}" data-theme-filter="${t}" style="font-size:12px">
      <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${e}</span><span class="filter-count">${a}</span>
    </button>`}function S(t){return t==="published"?'<span class="badge badge-success">Publié</span>':'<span class="badge badge-neutral">Ignoré</span>'}function o(){const t=T();if(t.length===0){document.getElementById("article-list").innerHTML=`
        <div class="empty-state">
          <div class="icon">&#128196;</div>
          <p>Aucun article dans cette vue</p>
        </div>`;return}document.getElementById("article-list").innerHTML=`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;padding:0 4px">
        <span style="font-size:12px;color:var(--taupe)">${t.length} article${t.length>1?"s":""}</span>
      </div>
    `+t.map(e=>`
      <div class="article-card" data-article-nav="${e.id}">
        <div class="article-meta">
          <span>${e.source_name||"Source inconnue"}</span>
          <span>&middot;</span>
          <span>${e.published_at?k(e.published_at):"Date inconnue"}</span>
          <span style="margin-left:auto;display:flex;align-items:center;gap:6px">
            ${e.score!=null?`<span style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--taupe)">${e.score}</span>`:""}
            ${S(e.lifecycle_status)}
          </span>
        </div>
        <div class="article-title-row">
          ${e.original_url?`<a href="${m(e.original_url)}" target="_blank" rel="noopener" class="article-title" onclick="event.stopPropagation()">${m(e.title||"Sans titre")}<span class="title-ext-icon">${x}</span></a>`:`<div class="article-title">${m(e.title||"Sans titre")}</div>`}
        </div>
        <div class="article-actions">
          ${e.tracker_added?'<span class="badge-tracker-added">✓ Tracker</span>':`<button class="btn btn-sm btn-secondary" data-tracker="${e.id}" onclick="event.stopPropagation()">+ Tracker</button>`}
          <span class="action-sep">|</span>
          ${e.pub_added?'<span class="badge-tracker-added">✓ Pub</span>':`<button class="btn btn-sm btn-secondary" data-pub="${e.id}" onclick="event.stopPropagation()">+ Pub</button>`}
        </div>
      </div>
    `).join(""),document.querySelectorAll("[data-article-nav]").forEach(e=>{e.addEventListener("click",a=>{a.target.closest("button")||a.target.closest("a")||(window.location.href=`${_}article?id=${e.dataset.articleNav}`)})}),document.querySelectorAll("[data-tracker]").forEach(e=>{e.addEventListener("click",a=>{a.stopPropagation(),A(e.dataset.tracker,e)})}),document.querySelectorAll("[data-pub]").forEach(e=>{e.addEventListener("click",a=>{a.stopPropagation(),D(e.dataset.pub,e)})})}async function A(t,e){try{await b(`/api/v1/tracker/propose?article_id=${t}`,{method:"POST",body:{source:"",date:"",sujet:"",synthese:"",type:"TEXTE",lien:"",statut:"Publié"}});const a=document.createElement("span");a.className="badge-tracker-added",a.textContent="✓ Tracker",e.parentNode.replaceChild(a,e);const r=i.findIndex(l=>l.id===t);r!==-1&&(i[r].tracker_added=!0),p("Article ajouté au tracker")}catch(a){p(a.message||"Erreur","error")}}async function D(t,e){const a=i.find(r=>r.id===t);try{await b(`/api/v1/tracker/pub/propose?article_id=${t}`,{method:"POST",body:{date:a?.published_at?a.published_at.slice(0,10):"",source:a?.source_name||"",type:"Intelligence",titre:a?.title||"",lien:a?.original_url||""}});const r=document.createElement("span");r.className="badge-tracker-added",r.textContent="✓ Pub",e.parentNode.replaceChild(r,e);const l=i.findIndex(s=>s.id===t);l!==-1&&(i[l].pub_added=!0),p("Ajouté aux autres publications")}catch(r){p(r.message||"Erreur","error")}}function m(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}E();
