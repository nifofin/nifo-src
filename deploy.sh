npm run build
cd dist
git init
git add -A
git commit -m "deploy"
git push -f git@github.com:nifofin/nifo.git master:gh-pages
cd ../

git add -A
git commit -m "small fixes"
git push -f git@github.com:nifofin/nifo-src.git master
