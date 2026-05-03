# Early Watch — Frontend Astro

## Conventions frontend

### Invariant — bootstrap auth (toutes pages authentifiées)

**Toute page Astro qui utilise `AppLayout` doit appeler `bootstrapAuth()` en première ligne de son `<script type="module">`, avant tout `fetch()` ou IO.**

```typescript
import { bootstrapAuth } from '../scripts/bootstrap-auth';
bootstrapAuth();
// ... reste du bootstrap de page
```

**Pourquoi ?** Astro produit deux modules ES indépendants (`type="module"`) pour chaque page :
1. `AppLayout.js` — appelle `requireAuth()` → si pas de session : `window.location.href = 'login'` + throw
2. `{page}.js` — démarre immédiatement ses appels API au bootstrap

Ces deux modules s'exécutent **en parallèle**. Si l'utilisateur ouvre la page sans session active (onglet neuf, deep link, refresh), AppLayout déclenche la navigation pendant que le script de page lance déjà un `fetch()`. Le browser annule la requête → `TypeError: Failed to fetch` affiché à l'utilisateur.

`bootstrapAuth()` (dans `src/scripts/bootstrap-auth.ts`) coupe court proprement avant tout IO.

**Vérification mécanique :**
```bash
diff <(grep -rl "AppLayout" src/pages/ | sort) \
     <(grep -rl "bootstrapAuth" src/pages/ | sort)
# Sortie attendue : vide
```

---

# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
