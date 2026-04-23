#!/usr/bin/env bash
set -e

DEPLOY_REPO="/Users/mariagarcia/Desktop/earlybrief-platform/saas-frontend"

echo "→ Build earlywatch-astro..."
npm run build

echo "→ Sync src/ vers earlywatch-app..."
cp -r src/* "$DEPLOY_REPO/src/"
cp astro.config.mjs "$DEPLOY_REPO/"

echo "→ Push earlywatch-app/main..."
cd "$DEPLOY_REPO"
git add src/ astro.config.mjs
git diff --cached --quiet && echo "Rien à déployer." && exit 0
git commit -m "sync: src/ depuis earlybrief-platform [deploy]"
git push origin main

echo "✓ Déployé — GitHub Actions va builder et publier dans 2-3 min."
