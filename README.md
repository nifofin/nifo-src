# Nifo

Nifo is a simple note-taking/note-keeping application with a collapsible tree structure to simplify organization.

First created in August 2020, [Nifo](https:;//nifofin.github.io/nifo/) includes a wide range of features, detailed in the documentation.

Nifo currently supports the following types of formatting:

- Markdown
- TeX

Nifo currently uses the following:

- Vue.js
  - VueScrollactive
  - Vue Clickaway
- Firebase
- Showdown
- MathJax
- and more

If you wish to contribute to Nifo, please contact one of the developers by:

- emailing sevenisreallycommon at gmail dot com

If you have any feedback or suggestions, please let us know by contacting us or submitting an issue.

## Downloading

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

## A guide
In the /public/ folder, we have our index.html file, in which our App.Vue will be mounted and our code will be injected into, and our 404.html file.

In the /src/ folder, we have our actual code.

The main.js file is the entry point.

Some other important places you should look at:

- /src/views/: these are the main components that are like actual "pages"
- /src/components/: these are components that are used in other components but don't actually get a router link of their own
- /src/router/: contains the stuff for the Vue router
- /src/store/: contains the stuff for the Vuex store
- /src/assets/styles/variables.css: contains a css file that I loaded into every component - it contains the variables that can be changed to change the theme
