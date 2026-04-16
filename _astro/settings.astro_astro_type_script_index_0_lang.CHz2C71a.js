import{a as h,t as E}from"./api.vBsT2HYn.js";let T={},w=!1;const F=[{value:"EC",label:"Etablissement de credit"},{value:"PSP",label:"Prestataire de services de paiement"},{value:"EME",label:"Etablissement de monnaie electronique"},{value:"SGP",label:"Societe de gestion de portefeuille"},{value:"CASP",label:"Prestataire de services sur actifs numeriques"},{value:"CIF",label:"Conseiller en investissement financier"},{value:"IFP",label:"Intermediaire en financement participatif"},{value:"OTHER",label:"Autre"}],$=[{code:"psp_versement_retrait",label:"Versement / retrait d'especes sur compte de paiement"},{code:"psp_prelevement",label:"Prelevement"},{code:"psp_paiement_carte",label:"Paiement par carte"},{code:"psp_virement",label:"Virement"},{code:"psp_emission_instrument",label:"Emission d'instrument de paiement"},{code:"psp_acquisition",label:"Acquisition d'operations de paiement"},{code:"psp_transmission_fonds",label:"Transmission de fonds"},{code:"psp_initiation",label:"Initiation de paiement (DSP2)"},{code:"psp_information_comptes",label:"Information sur les comptes (DSP2)"}],D=[{code:"casp_conservation",label:"Conservation pour compte de tiers d'actifs numeriques"},{code:"casp_achat_vente",label:"Achat / vente d'actifs numeriques contre monnaie legale"},{code:"casp_echange",label:"Echange d'actifs numeriques contre d'autres actifs numeriques"},{code:"casp_plateforme",label:"Exploitation d'une plateforme de negociation"}],O=[{code:"casp_rto",label:"Reception et transmission d'ordres pour compte de tiers"},{code:"casp_gestion_portefeuille",label:"Gestion de portefeuille d'actifs numeriques pour compte de tiers"},{code:"casp_conseil",label:"Conseil aux souscripteurs d'actifs numeriques"},{code:"casp_prise_ferme",label:"Prise ferme / placement garanti / placement non garanti"}],k={PSP:["LCB-FT","DSP2","DORA"],EME:["LCB-FT","DSP2","DORA"],Banque:["LCB-FT","DORA","AMLR"],CASP:["LCB-FT","MiCA","AMLR"]};function S(e,i){if(!e)return"";let t='<label style="display:block;font-size:12px;font-weight:500;color:var(--noir);margin-bottom:4px;text-transform:uppercase;letter-spacing:0.1em">Services fournis</label>';if(e==="Banque"){const s=i.includes("banque_credit")||!i.length,o=i.includes("banque_correspondance");return t+=`
        <div class="toggle-row" style="margin:4px 0">
          <div><div class="toggle-label">Activite de credit</div></div>
          <label class="toggle"><input type="checkbox" class="svc-banque-toggle" data-svc="banque_credit" ${s?"checked":""}><span class="toggle-slider"></span></label>
        </div>
        <div class="toggle-row" style="margin:4px 0">
          <div><div class="toggle-label">Correspondance bancaire</div></div>
          <label class="toggle"><input type="checkbox" class="svc-banque-toggle" data-svc="banque_correspondance" ${o?"checked":""}><span class="toggle-slider"></span></label>
        </div>
        <div class="svc-legal-ref">Les operations de banque (reception de fonds, credit, paiement) sont presumees pour tout etablissement de credit agree — Article L.311-1 CMF</div>
      `,t}return e==="PSP"?(t+=$.map(s=>`<label class="svc-check"><input type="checkbox" class="svc-cb" data-svc="${s.code}" ${i.includes(s.code)?"checked":""}> ${s.label}</label>`).join(""),t+='<div class="svc-legal-ref">Article L.314-1 II CMF</div>',t):e==="EME"?(t+='<label class="svc-check disabled"><input type="checkbox" class="svc-cb" data-svc="eme_emission_gestion" checked disabled> Emission et gestion de monnaie electronique</label>',t+='<hr style="margin:8px 0;border:none;border-top:1px solid var(--color-border)">',t+=$.map(s=>`<label class="svc-check"><input type="checkbox" class="svc-cb" data-svc="${s.code}" ${i.includes(s.code)?"checked":""}> ${s.label}</label>`).join(""),t+='<div class="svc-legal-ref">Articles L.315-1 et L.526-1 CMF</div>',t):e==="CASP"?(t+='<div class="svc-group-title">Services necessitant un enregistrement obligatoire (1° a 4°)</div>',t+=D.map(s=>`<label class="svc-check"><input type="checkbox" class="svc-cb" data-svc="${s.code}" ${i.includes(s.code)?"checked":""}> ${s.label}</label>`).join(""),t+='<div class="svc-separator"></div>',t+='<div class="svc-group-title">Services necessitant un agrement optionnel (5°)</div>',t+=O.map(s=>`<label class="svc-check"><input type="checkbox" class="svc-cb" data-svc="${s.code}" ${i.includes(s.code)?"checked":""}> ${s.label}</label>`).join(""),t+='<div class="svc-legal-ref">Article L.54-10-2 CMF</div>',t):""}const N=["LCB-FT","DORA","DSP2","MiCA","AI Act","AMLR","PSD3","RGPD"],j=["critical","high","medium","low"],G={critical:"Critique",high:"Eleve",medium:"Moyen",low:"Faible"};async function U(){try{const e=await h("/api/v1/settings");T=e,_(e)}catch(e){document.getElementById("content").innerHTML=`<div class="loading">Erreur : ${e.message}</div>`}}function _(e){const i=e.tenant||{},t=e.settings||{},s=e.profile||{},o=e.users||[],n=e.counts||{},c=F.map(l=>`<option value="${l.value}" ${l.value===(t.entity_type||"")?"selected":""}>${l.label}</option>`).join(""),m=N.map(l=>`<button class="st-chip ${(t.regulations||[]).includes(l)?"active":""}" data-reg="${l}">${l}</button>`).join(""),r=j.map(l=>`<button class="st-chip ${(t.alert_severities||["critical","high"]).includes(l)?"active":""}" data-sev="${l}">${G[l]}</button>`).join(""),g=t.profil||{},u=t.conformite||{},a=t.outils||{},p=t.perimetre||{},x=t.organisation||{};t.systemes,t.seuils;const d=g.entity_type||t.entity_type||"",B=g.nom_etablissement||x.nom_etablissement||i.name||"",A=["Particuliers","Entreprises","Institutionnels"],q=["France uniquement","Union europeenne","International"],C=A.map(l=>`<button class="st-chip ${(p.types_clients||[]).includes(l)?"active":""}" data-client="${l}">${l}</button>`).join(""),P=q.map(l=>`<button class="st-chip ${(p.zones_geographiques||[]).includes(l)?"active":""}" data-zone="${l}">${l}</button>`).join(""),L=i.plan==="pro"?"st-plan-pro":i.plan==="starter"?"st-plan-starter":"st-plan-demo",R=o.map(l=>{const b=l.role==="admin"?"role-admin":l.role==="compliance_officer"?"role-compliance_officer":"role-user",M=l.last_login_at?new Date(l.last_login_at).toLocaleDateString("fr-FR",{day:"numeric",month:"short",year:"numeric"}):"Jamais";return`<tr>
        <td>${l.first_name||""} ${l.last_name||""}</td>
        <td>${l.email}</td>
        <td><span class="role-badge ${b}">${l.role}</span></td>
        <td>${M}</td>
        <td>${l.is_active?"Actif":"Inactif"}</td>
      </tr>`}).join("");document.getElementById("content").innerHTML=`
      <div class="st-section">
        <div class="st-section-header">
          Profil d'assujetti
          <span class="st-plan-badge ${L}">${i.plan||"demo"}</span>
        </div>
        <div class="st-section-body">
          <div class="st-form-row">
            <div class="st-form-group">
              <label>Nom de l'etablissement</label>
              <input type="text" id="f-name" value="${i.name||""}">
            </div>
            <div class="st-form-group">
              <label>Type d'entite</label>
              <select id="f-entity-type">${c}</select>
            </div>
          </div>
          <div class="st-form-row">
            <div class="st-form-group">
              <label>N ACPR / AMF</label>
              <input type="text" id="f-acpr" value="${t.acpr_number||""}" placeholder="Ex: 12345">
            </div>
          </div>
          <div class="st-form-group">
            <label>Reglementations applicables</label>
            <div class="st-chips" id="chips-reg">${m}</div>
          </div>
        </div>
      </div>

      <!-- ═══ PROFIL ORGANISATION v2 — Wizard 4 étapes ═══ -->
      <div class="st-section" id="wizard-org">
        <div class="st-section-header">Profil organisation</div>
        <div class="st-section-body">
          <!-- Progress bar -->
          <div class="wiz-progress">
            <button class="wiz-dot active" data-wstep="1">1</button>
            <div class="wiz-line"></div>
            <button class="wiz-dot" data-wstep="2">2</button>
            <div class="wiz-line"></div>
            <button class="wiz-dot" data-wstep="3">3</button>
            <div class="wiz-line"></div>
            <button class="wiz-dot" data-wstep="4">4</button>
          </div>
          <div class="wiz-step-label" id="wiz-step-label">Etape 1 — Etablissement</div>

          <!-- Step 1: Etablissement -->
          <div class="wiz-step" id="wiz-step-1">
            <div class="st-form-group" style="margin-bottom:16px">
              <label>Nom de l'etablissement *</label>
              <input type="text" id="f-profil-nom" value="${B}" required>
            </div>
            <div class="st-form-group">
              <label>Type d'entite *</label>
              <div class="wiz-radios" id="wiz-entity-radios">
                <label class="wiz-radio ${d==="PSP"?"selected":""}"><input type="radio" name="wiz-entity" value="PSP" ${d==="PSP"?"checked":""}> PSP</label>
                <label class="wiz-radio ${d==="Banque"||d==="EC"?"selected":""}"><input type="radio" name="wiz-entity" value="Banque" ${d==="Banque"||d==="EC"?"checked":""}> Banque</label>
                <label class="wiz-radio ${d==="CASP"?"selected":""}"><input type="radio" name="wiz-entity" value="CASP" ${d==="CASP"?"checked":""}> CASP</label>
                <label class="wiz-radio ${d==="EME"?"selected":""}"><input type="radio" name="wiz-entity" value="EME" ${d==="EME"?"checked":""}> EME</label>
              </div>
            </div>
            <!-- Services fournis (conditionnel selon entity_type) -->
            <div id="services-section" style="margin-top:16px;${d?"":"display:none"}">
              <div id="services-content"></div>
            </div>
          </div>

          <!-- Step 2: Equipe conformite -->
          <div class="wiz-step" id="wiz-step-2" style="display:none">
            <div class="st-form-row">
              <div class="st-form-group"><label>Responsable LCB-FT — Nom *</label><input type="text" id="f-conf-lcbft-nom" value="${u.responsable_lcbft_nom||""}"></div>
              <div class="st-form-group"><label>Responsable LCB-FT — Fonction *</label><input type="text" id="f-conf-lcbft-fn" value="${u.responsable_lcbft_fonction||""}"></div>
            </div>
            <div class="st-form-row">
              <div class="st-form-group"><label>Suppleant — Nom</label><input type="text" id="f-conf-suppleant" value="${u.responsable_lcbft_suppleant||""}"></div>
            </div>
            <div class="toggle-row" style="margin:12px 0">
              <div><div class="toggle-label">Le declarant Tracfin est le responsable LCB-FT</div></div>
              <label class="toggle"><input type="checkbox" id="f-conf-declarant-est-resp" ${u.declarant_est_responsable?"checked":""}><span class="toggle-slider"></span></label>
            </div>
            <div id="declarant-fields" style="${u.declarant_est_responsable?"display:none":""}">
              <div class="st-form-row">
                <div class="st-form-group"><label>Declarant Tracfin — Nom *</label><input type="text" id="f-conf-tracfin-nom" value="${u.declarant_tracfin_nom||""}"></div>
                <div class="st-form-group"><label>Declarant Tracfin — Fonction *</label><input type="text" id="f-conf-tracfin-fn" value="${u.declarant_tracfin_fonction||""}"></div>
              </div>
            </div>
            <div class="st-form-group" style="margin-top:12px">
              <label>Controle periodique *</label>
              <div class="wiz-radios" id="wiz-controle-radios">
                <label class="wiz-radio ${(u.controle_periodique||"interne")==="interne"?"selected":""}"><input type="radio" name="wiz-controle" value="interne" ${(u.controle_periodique||"interne")==="interne"?"checked":""}> Internalise</label>
                <label class="wiz-radio ${u.controle_periodique==="externe"?"selected":""}"><input type="radio" name="wiz-controle" value="externe" ${u.controle_periodique==="externe"?"checked":""}> Externalise</label>
              </div>
            </div>
            <div id="controle-prestataire" style="${u.controle_periodique==="externe"?"":"display:none"}">
              <div class="st-form-group" style="margin-top:8px"><label>Nom du prestataire</label><input type="text" id="f-conf-prestataire" value="${u.controle_periodique_prestataire||""}"></div>
            </div>
          </div>

          <!-- Step 3: Outils -->
          <div class="wiz-step" id="wiz-step-3" style="display:none">
            <div class="st-form-row">
              <div class="st-form-group">
                <label>Screening / criblage *</label>
                <select id="f-outils-screening">
                  <option value="">— Choisir —</option>
                  <option value="Comply Advantage" ${a.screening==="Comply Advantage"?"selected":""}>Comply Advantage</option>
                  <option value="Dow Jones" ${a.screening==="Dow Jones"?"selected":""}>Dow Jones</option>
                  <option value="Synaps" ${a.screening==="Synaps"?"selected":""}>Synaps</option>
                  <option value="WorldCheck" ${a.screening==="WorldCheck"?"selected":""}>WorldCheck</option>
                  <option value="autre" ${a.screening==="autre"?"selected":""}>Autre</option>
                </select>
              </div>
              <div class="st-form-group" id="screening-autre-group" style="${a.screening==="autre"?"":"display:none"}">
                <label>Preciser</label>
                <input type="text" id="f-outils-screening-autre" value="${a.screening_autre||""}">
              </div>
            </div>
            <div class="st-form-row">
              <div class="st-form-group">
                <label>Verification d'identite *</label>
                <select id="f-outils-kyc">
                  <option value="">— Choisir —</option>
                  <option value="Synaps" ${a.kyc==="Synaps"?"selected":""}>Synaps</option>
                  <option value="Onfido" ${a.kyc==="Onfido"?"selected":""}>Onfido</option>
                  <option value="Sumsub" ${a.kyc==="Sumsub"?"selected":""}>Sumsub</option>
                  <option value="autre" ${a.kyc==="autre"?"selected":""}>Autre</option>
                  <option value="Manuel" ${a.kyc==="Manuel"?"selected":""}>Manuel</option>
                </select>
              </div>
              <div class="st-form-group" id="kyc-autre-group" style="${a.kyc==="autre"?"":"display:none"}">
                <label>Preciser</label>
                <input type="text" id="f-outils-kyc-autre" value="${a.kyc_autre||""}">
              </div>
            </div>
            <div class="st-form-group" style="margin-bottom:12px">
              <label>Monitoring transactionnel *</label>
              <div class="wiz-radios" id="wiz-monitoring-radios">
                <label class="wiz-radio ${(a.monitoring||"interne")==="interne"?"selected":""}"><input type="radio" name="wiz-monitoring" value="interne" ${(a.monitoring||"interne")==="interne"?"checked":""}> Interne (pas d'outil dedie)</label>
                <label class="wiz-radio ${a.monitoring==="outil"?"selected":""}"><input type="radio" name="wiz-monitoring" value="outil" ${a.monitoring==="outil"?"checked":""}> Outil dedie</label>
              </div>
            </div>
            <div id="monitoring-outil-group" style="${a.monitoring==="outil"?"":"display:none"}">
              <div class="st-form-group"><label>Nom de l'outil</label><input type="text" id="f-outils-monitoring-outil" value="${a.monitoring_outil||""}"></div>
            </div>
            <div class="st-form-group" style="margin-top:12px">
              <label>Canal signalement interne *</label>
              <select id="f-outils-signalement">
                <option value="">— Choisir —</option>
                <option value="email" ${a.signalement_interne==="email"?"selected":""}>Email dedie conformite</option>
                <option value="ticketing" ${a.signalement_interne==="ticketing"?"selected":""}>Outil de ticketing</option>
                <option value="direct" ${a.signalement_interne==="direct"?"selected":""}>Remontee directe au responsable LCB-FT</option>
              </select>
            </div>
            <!-- Blockchain analytics — CASP only -->
            <div id="blockchain-section" style="${d==="CASP"?"":"display:none"}">
              <hr style="margin:16px 0;border:none;border-top:1px solid var(--color-border)">
              <div class="st-form-row">
                <div class="st-form-group">
                  <label>Blockchain analytics *</label>
                  <select id="f-outils-blockchain">
                    <option value="">— Choisir —</option>
                    <option value="Scorechain" ${a.blockchain_analytics==="Scorechain"?"selected":""}>Scorechain</option>
                    <option value="Chainalysis" ${a.blockchain_analytics==="Chainalysis"?"selected":""}>Chainalysis</option>
                    <option value="Elliptic" ${a.blockchain_analytics==="Elliptic"?"selected":""}>Elliptic</option>
                    <option value="autre" ${a.blockchain_analytics==="autre"?"selected":""}>Autre</option>
                  </select>
                </div>
                <div class="st-form-group" id="blockchain-autre-group" style="${a.blockchain_analytics==="autre"?"":"display:none"}">
                  <label>Preciser</label>
                  <input type="text" id="f-outils-blockchain-autre" value="${a.blockchain_analytics_autre||""}">
                </div>
              </div>
              <div class="st-form-group">
                <label>Seuil d'alerte (defaut : 75)</label>
                <input type="number" id="f-outils-blockchain-seuil" min="0" max="100" value="${a.blockchain_seuil??75}">
                <div style="font-size:11px;color:var(--color-text-tertiary);margin-top:4px;font-style:italic">La valeur standard reglementaire est 75. Ne modifier que si votre outil applique une echelle differente.</div>
              </div>
            </div>
          </div>

          <!-- Step 4: Perimetre -->
          <div class="wiz-step" id="wiz-step-4" style="display:none">
            <div class="st-form-group">
              <label>Types de clients</label>
              <div class="st-chips" id="chips-clients">${C}</div>
            </div>
            <div class="st-form-group" style="margin-top:12px">
              <label>Zones geographiques</label>
              <div class="st-chips" id="chips-zones">${P}</div>
            </div>
            <div class="st-form-group" style="margin-top:12px">
              <label>Canal d'entree en relation *</label>
              <div class="wiz-radios" id="wiz-canal-radios">
                <label class="wiz-radio ${p.canal_entree_relation==="digital"?"selected":""}"><input type="radio" name="wiz-canal" value="digital" ${p.canal_entree_relation==="digital"?"checked":""}> 100% digital</label>
                <label class="wiz-radio ${p.canal_entree_relation==="mixte"?"selected":""}"><input type="radio" name="wiz-canal" value="mixte" ${p.canal_entree_relation==="mixte"?"checked":""}> Mixte</label>
                <label class="wiz-radio ${p.canal_entree_relation==="presentiel"?"selected":""}"><input type="radio" name="wiz-canal" value="presentiel" ${p.canal_entree_relation==="presentiel"?"checked":""}> Presentiel</label>
              </div>
            </div>
            <div style="margin-top:16px">
              <div class="toggle-row" id="toggle-transferts" style="${["PSP","EME"].includes(d)?"":"display:none"}">
                <div><div class="toggle-label">Transferts de fonds</div></div>
                <label class="toggle"><input type="checkbox" id="f-per-transferts" ${p.transferts_fonds?"checked":""}><span class="toggle-slider"></span></label>
              </div>
              <div class="toggle-row" id="toggle-correspondance" style="${d==="Banque"||d==="EC"?"":"display:none"}">
                <div><div class="toggle-label">Correspondance bancaire</div></div>
                <label class="toggle"><input type="checkbox" id="f-per-correspondance" ${p.correspondance_bancaire?"checked":""}><span class="toggle-slider"></span></label>
              </div>
              <div class="toggle-row">
                <div><div class="toggle-label">Agents ou distributeurs</div></div>
                <label class="toggle"><input type="checkbox" id="f-per-agents" ${p.agents_distributeurs?"checked":""}><span class="toggle-slider"></span></label>
              </div>
            </div>
          </div>

          <!-- Navigation buttons -->
          <div class="wiz-nav">
            <button class="wiz-btn wiz-btn-prev" id="wiz-prev" style="display:none">Precedent</button>
            <div style="flex:1"></div>
            <button class="wiz-btn wiz-btn-next" id="wiz-next">Suivant</button>
            <button class="wiz-btn wiz-btn-save" id="wiz-save" style="display:none">Enregistrer</button>
          </div>
        </div>
      </div>

      <div class="st-section">
        <div class="st-section-header">Preferences d'alertes</div>
        <div class="st-section-body">
          <div class="toggle-row">
            <div>
              <div class="toggle-label">Alertes email</div>
              <div class="toggle-desc">Recevoir un email pour chaque reminder selon la severite selectionnee</div>
            </div>
            <label class="toggle">
              <input type="checkbox" id="f-alert-email" ${t.alert_email_enabled?"checked":""}>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div style="margin-top:12px">
            <label style="display:block;font-size:12px;font-weight:500;color:var(--noir);margin-bottom:4px;text-transform:uppercase;letter-spacing:0.1em">Severites declenchant un email</label>
            <div class="st-chips" id="chips-sev">${r}</div>
          </div>
          <div class="st-form-row" style="margin-top:16px">
            <div class="st-form-group">
              <label>Mode d'envoi</label>
              <select id="f-digest">
                <option value="immediate" ${t.alert_digest==="immediate"?"selected":""}>Immediat</option>
                <option value="daily" ${t.alert_digest==="daily"?"selected":""}>Digest quotidien</option>
                <option value="weekly" ${t.alert_digest==="weekly"?"selected":""}>Digest hebdomadaire</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="st-section">
        <div class="st-section-header">Modules actifs</div>
        <div class="st-section-body">
          <div class="toggle-row">
            <div><div class="toggle-label">Procedures LCB-FT</div><div class="toggle-desc">${n.procedures_count||0} procedures attribuees</div></div>
            <label class="toggle"><input type="checkbox" id="f-mod-procs" ${t.procedures_enabled?"checked":""}><span class="toggle-slider"></span></label>
          </div>
          <div class="toggle-row">
            <div><div class="toggle-label">Pays a risque</div><div class="toggle-desc">Liste FATF / EU / ACPR avec croisement veille</div></div>
            <label class="toggle"><input type="checkbox" id="f-mod-country" ${t.country_risk_enabled!==!1?"checked":""}><span class="toggle-slider"></span></label>
          </div>
          <div class="toggle-row">
            <div><div class="toggle-label">Roadmap reglementaire</div><div class="toggle-desc">Echeances DORA, AMLR, AI Act</div></div>
            <label class="toggle"><input type="checkbox" id="f-mod-roadmap" ${t.roadmap_enabled!==!1?"checked":""}><span class="toggle-slider"></span></label>
          </div>
          <div class="toggle-row">
            <div><div class="toggle-label">Fiches reflexes</div><div class="toggle-desc">Guides operationnels par situation</div></div>
            <label class="toggle"><input type="checkbox" id="f-mod-situations" ${t.situations_enabled!==!1?"checked":""}><span class="toggle-slider"></span></label>
          </div>
        </div>
      </div>

      <div class="st-section">
        <div class="st-section-header">Mon profil</div>
        <div class="st-section-body">
          <div class="st-form-row">
            <div class="st-form-group">
              <label>Prenom</label>
              <input type="text" id="f-firstname" value="${s.first_name||""}">
            </div>
            <div class="st-form-group">
              <label>Nom</label>
              <input type="text" id="f-lastname" value="${s.last_name||""}">
            </div>
          </div>
          <div class="st-form-row">
            <div class="st-form-group">
              <label>Email</label>
              <input type="email" id="f-email" value="${s.email||""}">
            </div>
            <div class="st-form-group">
              <label>Role</label>
              <input type="text" value="${s.role||""}" disabled style="background:#f5f5f5">
            </div>
          </div>
        </div>
      </div>

      <div class="st-section">
        <div class="st-section-header">Utilisateurs (${o.length})</div>
        <div class="st-section-body">
          <table class="users-table">
            <thead><tr><th>Nom</th><th>Email</th><th>Role</th><th>Derniere connexion</th><th>Statut</th></tr></thead>
            <tbody>${R||'<tr><td colspan="5" style="color:var(--color-text-tertiary)">Aucun utilisateur</td></tr>'}</tbody>
          </table>
        </div>
      </div>

      <div style="font-size:12px;color:var(--color-text-tertiary);text-align:center;padding:16px 0">
        ${n.sources_count||0} sources surveillees · ${n.procedures_count||0} procedures · ${n.reminders_active||0} reminders actifs
      </div>
    `,document.querySelectorAll("#content input, #content select").forEach(l=>{l.addEventListener("change",v)}),document.querySelectorAll(".st-chip").forEach(l=>{l.addEventListener("click",()=>{l.classList.toggle("active"),v()})})}function v(){w=!0,document.getElementById("save-bar").classList.add("visible")}function V(e){if(e==="Banque"){const t=[];return document.querySelectorAll(".svc-banque-toggle").forEach(s=>{s.checked&&t.push(s.dataset.svc)}),t}const i=[];return document.querySelectorAll(".svc-cb").forEach(t=>{t.checked&&i.push(t.dataset.svc)}),e==="EME"&&!i.includes("eme_emission_gestion")&&i.unshift("eme_emission_gestion"),i}async function z(){try{const e=Array.from(document.querySelectorAll("#chips-reg .st-chip.active")).map(r=>r.dataset.reg),i=Array.from(document.querySelectorAll("#chips-sev .st-chip.active")).map(r=>r.dataset.sev),t=Array.from(document.querySelectorAll("#chips-clients .st-chip.active")).map(r=>r.dataset.client),s=Array.from(document.querySelectorAll("#chips-zones .st-chip.active")).map(r=>r.dataset.zone),o=document.querySelector('input[name="wiz-entity"]:checked')?.value||"",n=document.getElementById("f-conf-declarant-est-resp")?.checked||!1,c=document.getElementById("f-conf-lcbft-nom")?.value||"",m=document.getElementById("f-conf-lcbft-fn")?.value||"";await h("/api/v1/settings",{method:"PUT",body:{name:document.getElementById("f-name").value,entity_type:o||document.getElementById("f-entity-type").value,acpr_number:document.getElementById("f-acpr").value,regulations:e,alert_email_enabled:document.getElementById("f-alert-email").checked,alert_severities:i,alert_digest:document.getElementById("f-digest").value,procedures_enabled:document.getElementById("f-mod-procs").checked,country_risk_enabled:document.getElementById("f-mod-country").checked,roadmap_enabled:document.getElementById("f-mod-roadmap").checked,situations_enabled:document.getElementById("f-mod-situations").checked,profil:{nom_etablissement:document.getElementById("f-profil-nom")?.value||"",entity_type:o,services:V(o)},conformite:{responsable_lcbft_nom:c,responsable_lcbft_fonction:m,responsable_lcbft_suppleant:document.getElementById("f-conf-suppleant")?.value||"",declarant_tracfin_nom:n?c:document.getElementById("f-conf-tracfin-nom")?.value||"",declarant_tracfin_fonction:n?m:document.getElementById("f-conf-tracfin-fn")?.value||"",declarant_est_responsable:n,controle_periodique:document.querySelector('input[name="wiz-controle"]:checked')?.value||"interne",controle_periodique_prestataire:document.getElementById("f-conf-prestataire")?.value||""},outils:{screening:document.getElementById("f-outils-screening")?.value||"",screening_autre:document.getElementById("f-outils-screening-autre")?.value||"",kyc:document.getElementById("f-outils-kyc")?.value||"",kyc_autre:document.getElementById("f-outils-kyc-autre")?.value||"",monitoring:document.querySelector('input[name="wiz-monitoring"]:checked')?.value||"interne",monitoring_outil:document.getElementById("f-outils-monitoring-outil")?.value||"",signalement_interne:document.getElementById("f-outils-signalement")?.value||"",blockchain_analytics:document.getElementById("f-outils-blockchain")?.value||"",blockchain_analytics_autre:document.getElementById("f-outils-blockchain-autre")?.value||"",blockchain_seuil:parseInt(document.getElementById("f-outils-blockchain-seuil")?.value)||75},perimetre:{types_clients:t,zones_geographiques:s,canal_entree_relation:document.querySelector('input[name="wiz-canal"]:checked')?.value||"",transferts_fonds:document.getElementById("f-per-transferts")?.checked||!1,correspondance_bancaire:document.getElementById("f-per-correspondance")?.checked||!1,agents_distributeurs:document.getElementById("f-per-agents")?.checked||!1}}}),await h("/api/v1/settings/profile",{method:"PUT",body:{first_name:document.getElementById("f-firstname").value,last_name:document.getElementById("f-lastname").value,email:document.getElementById("f-email").value}}),w=!1,document.getElementById("save-bar").classList.remove("visible"),E("Parametres enregistres","success")}catch(e){E(e.message||"Erreur","error")}}document.getElementById("btn-save").addEventListener("click",z);const W=["","Etape 1 — Etablissement","Etape 2 — Equipe conformite","Etape 3 — Outils","Etape 4 — Perimetre"];let f=1;function y(e){f=e;for(let n=1;n<=4;n++){const c=document.getElementById(`wiz-step-${n}`);c&&(c.style.display=n===e?"":"none")}document.querySelectorAll(".wiz-dot").forEach(n=>{const c=parseInt(n.dataset.wstep);n.classList.remove("active","done"),c===e?n.classList.add("active"):c<e&&n.classList.add("done")});const i=document.getElementById("wiz-step-label");i&&(i.textContent=W[e]||"");const t=document.getElementById("wiz-prev"),s=document.getElementById("wiz-next"),o=document.getElementById("wiz-save");t&&(t.style.display=e>1?"":"none"),s&&(s.style.display=e<4?"":"none"),o&&(o.style.display=e===4?"":"none")}function H(){document.querySelectorAll(".wiz-dot").forEach(e=>{e.addEventListener("click",()=>y(parseInt(e.dataset.wstep)))}),document.getElementById("wiz-prev")?.addEventListener("click",()=>{f>1&&y(f-1)}),document.getElementById("wiz-next")?.addEventListener("click",()=>{f<4&&y(f+1)}),document.getElementById("wiz-save")?.addEventListener("click",z),document.querySelectorAll(".wiz-radios").forEach(e=>{e.querySelectorAll(".wiz-radio").forEach(i=>{i.addEventListener("click",()=>{e.querySelectorAll(".wiz-radio").forEach(n=>n.classList.remove("selected")),i.classList.add("selected"),v();const t=i.querySelector('input[name="wiz-entity"]');t&&J(t.value);const s=i.querySelector('input[name="wiz-controle"]');if(s){const n=document.getElementById("controle-prestataire");n&&(n.style.display=s.value==="externe"?"":"none")}const o=i.querySelector('input[name="wiz-monitoring"]');if(o){const n=document.getElementById("monitoring-outil-group");n&&(n.style.display=o.value==="outil"?"":"none")}})})}),document.getElementById("f-conf-declarant-est-resp")?.addEventListener("change",e=>{const i=document.getElementById("declarant-fields");i&&(i.style.display=e.target.checked?"none":""),v()}),document.getElementById("f-outils-screening")?.addEventListener("change",e=>{const i=document.getElementById("screening-autre-group");i&&(i.style.display=e.target.value==="autre"?"":"none"),v()}),document.getElementById("f-outils-kyc")?.addEventListener("change",e=>{const i=document.getElementById("kyc-autre-group");i&&(i.style.display=e.target.value==="autre"?"":"none"),v()}),document.getElementById("f-outils-blockchain")?.addEventListener("change",e=>{const i=document.getElementById("blockchain-autre-group");i&&(i.style.display=e.target.value==="autre"?"":"none"),v()})}function I(){document.querySelectorAll(".svc-cb, .svc-banque-toggle").forEach(e=>{e.addEventListener("change",v)})}function J(e){const i=document.getElementById("blockchain-section");i&&(i.style.display=e==="CASP"?"":"none");const t=document.getElementById("toggle-transferts");t&&(t.style.display=["PSP","EME"].includes(e)?"":"none");const s=document.getElementById("toggle-correspondance");s&&(s.style.display=e==="Banque"?"":"none");const o=document.getElementById("services-content"),n=document.getElementById("services-section");o&&(o.innerHTML=S(e,[]),n&&(n.style.display=e?"":"none"),I());const c=document.querySelectorAll("#chips-reg .st-chip");if(Array.from(c).filter(r=>r.classList.contains("active")).length===0&&k[e]){const r=k[e];c.forEach(g=>{r.includes(g.dataset.reg)&&g.classList.add("active")}),v()}}const Y=_;_=function(e){Y(e),H(),y(1);const i=e.settings||{},t=i.profil||{},s=t.entity_type||i.entity_type||"",o=t.services||[],n=document.getElementById("services-content"),c=document.getElementById("services-section");n&&s&&(n.innerHTML=S(s,o),c&&(c.style.display=""),I())};U();
