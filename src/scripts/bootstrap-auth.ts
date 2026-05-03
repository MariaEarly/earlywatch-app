/**
 * bootstrap-auth.ts — Guard d'authentification pour pages Astro.
 *
 * INVARIANT FRONTEND
 * Toute page qui utilise AppLayout doit appeler bootstrapAuth() en première
 * ligne de son <script type="module">, avant tout fetch() ou IO.
 *
 * Sans ce guard, il existe une race condition : AppLayout.requireAuth() et le
 * script de page s'exécutent en parallèle (modules ES indépendants). Si l'utilisateur
 * n'est pas authentifié, AppLayout déclenche window.location.href='login' pendant
 * que le script de page lance déjà un fetch() → le browser annule la requête
 * lors de la navigation → TypeError "Failed to fetch" visible à l'écran.
 *
 * Usage (première ligne du <script> de toute page authentifiée) :
 *
 *   import { bootstrapAuth } from '../scripts/bootstrap-auth';
 *   bootstrapAuth();
 *   // ... suite du bootstrap de la page
 *
 * @see AppLayout.astro qui appelle requireAuth() dans son propre module.
 */

import { requireAuth } from './api.js';

export function bootstrapAuth(): void {
  if (!requireAuth()) {
    throw new Error('redirect');
  }
}
