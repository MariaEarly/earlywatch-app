import{g as i,l as p,a as c}from"./api.CcTKbNwm.js";function a(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function m(){const e=i()||{};document.getElementById("account-content").innerHTML=`
      <h1 style="margin:0 0 24px 0">Mon compte</h1>

      <div class="card" style="padding:24px;margin-bottom:24px">
        <h2 style="margin:0 0 16px 0;font-size:16px">Profil</h2>
        <div class="flex flex-col gap-12">
          <div>
            <label class="text-sm text-tertiary">Nom</label>
            <div>${a(((e.first_name||"")+" "+(e.last_name||"")).trim()||"—")}</div>
          </div>
          <div>
            <label class="text-sm text-tertiary">Email</label>
            <div>${a(e.email||"—")}</div>
          </div>
          <div>
            <label class="text-sm text-tertiary">Rôle</label>
            <div>${a(e.role||"—")}</div>
          </div>
        </div>
      </div>

      <div class="card" style="padding:24px;margin-bottom:24px">
        <h2 style="margin:0 0 16px 0;font-size:16px">Changer le mot de passe</h2>

        <div id="pwd-error" class="login-error" style="display:none;margin-bottom:12px"></div>
        <div id="pwd-success" style="display:none;margin-bottom:12px;padding:12px;background:var(--bg);color:var(--ink-soft);border:0.5px solid var(--line-strong);font-size:14px"></div>

        <form id="pwdForm" autocomplete="off">
          <div class="login-field">
            <label for="current_password">Mot de passe actuel</label>
            <input id="current_password" type="password" class="input" required autocomplete="current-password">
          </div>
          <div class="login-field">
            <label for="new_password">Nouveau mot de passe</label>
            <input id="new_password" type="password" class="input" required minlength="8" autocomplete="new-password">
            <p class="text-xs text-tertiary" style="margin:4px 0 0 0">Minimum 8 caracteres</p>
          </div>
          <div class="login-field">
            <label for="confirm_password">Confirmer le nouveau mot de passe</label>
            <input id="confirm_password" type="password" class="input" required minlength="8" autocomplete="new-password">
          </div>
          <button type="submit" id="pwdBtn" class="btn btn-primary" style="margin-top:8px">Mettre a jour le mot de passe</button>
        </form>
      </div>

      <div class="card" style="padding:24px">
        <h2 style="margin:0 0 16px 0;font-size:16px">Session</h2>
        <button class="btn btn-secondary" id="btn-logout">Se deconnecter</button>
      </div>
    `,document.getElementById("pwdForm").addEventListener("submit",u),document.getElementById("btn-logout").addEventListener("click",()=>{confirm("Se déconnecter ?")&&p()})}async function u(e){e.preventDefault();const s=document.getElementById("pwdBtn"),t=document.getElementById("pwd-error"),n=document.getElementById("pwd-success");t.style.display="none",n.style.display="none";const r=document.getElementById("current_password").value,o=document.getElementById("new_password").value,d=document.getElementById("confirm_password").value;if(o!==d){t.textContent="La confirmation ne correspond pas au nouveau mot de passe.",t.style.display="block";return}if(o.length<8){t.textContent="Le nouveau mot de passe doit contenir au moins 8 caractères.",t.style.display="block";return}s.disabled=!0,s.textContent="Mise a jour...";try{await c("/api/v1/auth/change-password",{method:"POST",body:{current_password:r,new_password:o}}),n.textContent="Mot de passe mis a jour avec succès.",n.style.display="block",document.getElementById("pwdForm").reset()}catch(l){t.textContent=l.message||"Erreur lors de la mise a jour",t.style.display="block"}finally{s.disabled=!1,s.textContent="Mettre a jour le mot de passe"}}m();
