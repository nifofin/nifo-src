# Nifo

Nifo is a simple note-taking/note-keeping application with a collapsible tree structure to simplify organization.

First created in August 2020, [Nifo](https:;//nifofin.github.io/nifo/) includes a wide range of features, detailed in the documentation.

Nifo currently supports the following types of formatting:

- Markdown
- TeX

If you wish to contribute to Nifo, please contact one of the developers by:

- emailing sevenisreallycommon at gmail dot com

If you have any feedback or suggestions, please let us know by contacting us or submitting an issue.

[Documentation](https://github.com/nifofin/nifo-src/blob/master/src/views/about_markdown.md)

## Downloading

Download it and make sure to `npm install` all of the dependencies in `package.json`.

## Committing

Look at `deploy.sh`.

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
