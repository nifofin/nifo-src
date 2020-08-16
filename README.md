# Nifo

Download it and make sure to `npm install` all of the dependencies in `package.json`.

## Instructions for committing to the public ver
These are present in `deploy.sh`.
```bash
# build
npm run build
```

```bash
# navigate into the build output directory
cd dist
```

```bash
# commit
git init
git add -A
git commit -m "deploy"
```

```bash
# push
git push -f git@github.com:nifofin/nifo.git master:gh-pages
```
Optional:
```bash
# cd back to root folder
cd ../
```

## Instructions for committing to the src
```bash
git add -u
git commit -m "message"
git push -f git@github.com:nifofin/nifo-src.git master
```
