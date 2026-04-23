import{t as a,a as o}from"./api.CcTKbNwm.js";let s=[];document.getElementById("create-header-toggle").addEventListener("click",()=>{document.getElementById("create-body").classList.toggle("open")});document.getElementById("btn-create-tenant").addEventListener("click",()=>{g()});async function l(){try{const t=await o("/api/v1/admin/tenants");s=t.tenants||[];const e=t.stats||{};document.getElementById("s-tenants").textContent=e.tenants_active||0,document.getElementById("s-procs").textContent=e.total_procedures||0,document.getElementById("s-reminders").textContent=e.total_reminders||0,document.getElementById("s-articles").textContent=e.articles_7d||0,m()}catch(t){document.getElementById("table-container").innerHTML=`<div class="loading">Erreur : ${t.message}</div>`}}function m(){if(!s.length){document.getElementById("table-container").innerHTML='<div class="loading">Aucun tenant.</div>';return}let t=`<table class="tenant-table">
      <thead><tr>
        <th>Tenant</th><th>Type</th><th>Plan</th><th>Users</th>
        <th>Procs</th><th>Reminders</th><th>Modules</th><th>Actions</th>
      </tr></thead><tbody>`;for(const e of s){const n=e.plan==="pro"?"plan-pro":e.plan==="starter"?"plan-starter":"plan-demo",d=e.procedures_count?Math.round(e.procedures_validated/e.procedures_count*100):0,c=[{key:"procedures_enabled",label:"Proc",on:e.procedures_enabled},{key:"newsletter_enabled",label:"News",on:e.newsletter_enabled},{key:"alert_email_enabled",label:"Email",on:e.alert_email_enabled}].map(r=>`<span class="module-dot ${r.on?"dot-on":"dot-off"}" title="${r.label}: ${r.on?"ON":"OFF"}"></span>`).join(""),i=e.created_at?new Date(e.created_at).toLocaleDateString("fr-FR",{day:"numeric",month:"short"}):"";t+=`<tr>
        <td>
          <div style="font-weight:500">${e.name}</div>
          <div style="font-size:11px;color:var(--mute)">${i}</div>
        </td>
        <td>${e.entity_type||"—"}</td>
        <td><span class="plan-badge ${n}">${e.plan}</span></td>
        <td>${e.users_count}</td>
        <td>${e.procedures_validated}/${e.procedures_count} <span style="font-size:11px;color:var(--mute)">(${d}%)</span></td>
        <td>${e.reminders_pending>0?'<b style="color:#5C6347">'+e.reminders_pending+"</b>":"0"}</td>
        <td>${c}</td>
        <td>
          <button class="sa-btn-sm" data-toggle-module="${e.id}" data-module="procedures_enabled" data-enabled="${!e.procedures_enabled}">
            ${e.procedures_enabled?"Desact. Proc":"Act. Proc"}
          </button>
          <button class="sa-btn-sm sa-btn-sm-kaki" data-grant-all="${e.id}">+ Procs</button>
        </td>
      </tr>`}t+="</tbody></table>",document.getElementById("table-container").innerHTML=t,document.querySelectorAll("[data-toggle-module]").forEach(e=>{e.addEventListener("click",()=>{u(e.dataset.toggleModule,e.dataset.module,e.dataset.enabled==="true")})}),document.querySelectorAll("[data-grant-all]").forEach(e=>{e.addEventListener("click",()=>{p(e.dataset.grantAll)})})}async function u(t,e,n){try{await o("/api/v1/admin/tenants/toggle-module",{method:"POST",body:{tenant_id:t,module:e,enabled:n}}),a(`Module ${n?"active":"desactive"}`,"success"),l()}catch(d){a(d.message,"error")}}async function p(t){try{await o("/api/v1/admin/procedures/grant",{method:"POST",body:{tenant_id:t,procedure_refs:[]}}),a("19 procedures attribuees","success"),l()}catch(e){a(e.message,"error")}}async function g(){const t=document.getElementById("c-name").value.trim(),e=document.getElementById("c-email").value.trim();if(!t||!e){a("Nom et email requis","error");return}try{const n=await o("/api/v1/admin/tenants",{method:"POST",body:{name:t,entity_type:document.getElementById("c-type").value,admin_email:e,admin_first_name:document.getElementById("c-fn").value.trim(),admin_last_name:document.getElementById("c-ln").value.trim(),plan:document.getElementById("c-plan").value}}),d=document.getElementById("create-result");d.innerHTML=`<b>Tenant cree !</b><br>
        ID : ${n.tenant_id}<br>
        Email : ${n.admin_email}<br>
        Mot de passe temporaire : <code style="background:#EDEAE3;padding:2px 6px;border-radius:0;font-weight:500">${n.temp_password}</code><br>
        <span style="font-size:11px;color:#6B6860">Communiquer ce mot de passe au client — il devra le changer a la premiere connexion.</span>`,d.classList.add("visible"),document.getElementById("c-name").value="",document.getElementById("c-email").value="",document.getElementById("c-fn").value="",document.getElementById("c-ln").value="",a("Client cree avec succes","success"),l()}catch(n){a(n.message,"error")}}l();
