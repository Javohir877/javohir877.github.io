#!/usr/bin/env bash
# Portfolioni GitHub'ga joylaydi: manba kod → main, yig'ilgan sayt → gh-pages.
# Birinchi marta repozitoriyani ham yaratadi va GitHub Pages'ni yoqadi.
# Ishlatish (Git Bash'da, loyiha papkasida):  bash deploy.sh
set -euo pipefail

REPO="Javohir877/javohir877.github.io"
cd "$(dirname "$0")"

# 1) repozitoriya yo'q bo'lsa — yaratamiz va manba kodni yuklaymiz
if ! gh repo view "$REPO" >/dev/null 2>&1; then
  gh repo create "$REPO" --public \
    --description "Javohir — portfolio: saytlar, Telegram botlar, Android ilova" \
    --homepage "https://javohir877.github.io" \
    --source . --remote origin --push
else
  git remote get-url origin >/dev/null 2>&1 || git remote add origin "https://github.com/$REPO.git"
  git push -u origin main
fi

# 2) saytni yig'amiz
(cd client && npm install --no-audit --no-fund && npx vite build)
touch client/dist/.nojekyll

# 3) yig'ilgan saytni gh-pages tarmog'iga yuklaymiz
tmp="$(mktemp -d)"
cp -r client/dist/. "$tmp/"
(
  cd "$tmp"
  git init -q -b gh-pages
  git add -A
  git -c user.name="$(git -C "$OLDPWD" config user.name)" -c user.email="$(git -C "$OLDPWD" config user.email)" \
    commit -q -m "Saytni yangilash: $(date '+%Y-%m-%d %H:%M')"
  git push -f "https://github.com/$REPO.git" gh-pages
)
rm -rf "$tmp"

# 4) GitHub Pages gh-pages tarmog'idan ko'rsatsin. *.github.io repozitoriyasida Pages
#    o'zi main'dan yoqilib qoladi (README ko'rinadi), shuning uchun manbani doim tekshiramiz.
if gh api "repos/$REPO/pages" >/dev/null 2>&1; then
  if [ "$(gh api "repos/$REPO/pages" --jq .source.branch)" != "gh-pages" ]; then
    gh api "repos/$REPO/pages" -X PUT -f "source[branch]=gh-pages" -f "source[path]=/"
  fi
else
  gh api "repos/$REPO/pages" -X POST -f "source[branch]=gh-pages" -f "source[path]=/" >/dev/null
fi

echo
echo "Tayyor: https://javohir877.github.io  (birinchi marta 1–2 daqiqada ochiladi)"
