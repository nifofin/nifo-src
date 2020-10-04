# NIFO

---

## Introduction
Nifo is a simple note-taking/note-keeping application with a collapsible tree structure to simplify organization.

First created in August 2020, [Nifo](https://nifofin.github.io/nifo/) includes a wide range of features, detailed in the [Todo - Done](#done) section below.

Nifo currently supports the following types of formatting:
- Markdown
- Tex

For a quick introduction, jump to [Getting Started](#getting-started)

For a list of public accounts/resources, jump to the [public accounts](#public-accounts) section.

---

## Public Accounts

### Editing
- Username: test   Password: test

### View Only
- Username: Math
- Username: Biology
- Username: Chemistry
- Username: Physics

### Contributing
If you wish to contribute to one of the public accounts (i.e. add notes for a textbook or something), please [email or DM](#contact) one of the developers.

If you wish to add an account to the public accounts list, please [email or DM](#contact) one of the developers.

---

## Usage

### Getting Started
1. Navigate to **Home**, where you will be redirected to a login page if you are not signed in to an account.

2. To login, enter a username and a password.

<ul style="list-style: none;"><li>
2.a. (Registration) If the entered username is not present in the DB, you will be prompted to register and create an account, and then you will be redirected to the home page.
</li></ul>

3. At the home page, a root folder that's named your username has already been created. Double click on it to start adding. We support infinite nesting (probably). Right click it to see a short introduction on how to use NIFO.

### Actions

<div markdown="1" style="margin-left: 1vw;">
**Single click/q:** Toggle folder expansion

**Double click/n:** Create new folder, retrieve any existing elements from DB, and add an item

**Right click/Enter:** Show content of element

**Hover/x:** When you hover over an item, an edit button will appear. Click on it to edit or delete the item.
</div>

#### Hotkeys
<div markdown="1" style="margin-left: 1vw;">
**e:** find if subitems exist under any current item, and if so, expands it out

**r:** toggles "showContent"

**t:** sets "showContent" to false

**y:** sets "showContent" to true

**s:** toggles folders

**d:** collapses all folders

**f:** expands all folders

**m:** toggles mouse interaction (left click, double click, right click)

**Escape:** leave the modal window



**i:** import a json file (**WIP, broken**)

**o:** export your notes as a json file
</div>

#### Selection
<div markdown="1" style="margin-left: 1vw;">
**ArrowUp:** go up

**ArrowDown:** go down

**z:** toggle selection - selection will always reappear at root folder
</div>

### Permissions
**Admin:**  Admin permissions allow the user to change the admin password and view password, as well as change the structure and content of the notes.

**Editor:** Editor permissions allow the user to view and change the structure and content of the notes. By default, the editor password is the same as the admin password, meaning that you must go to Profile - General Settings - Change Passwords - Change Editor Password and change it to something different first.

**View:**  View permissions, in contrast, are much more limited, only allowing the user to view the list of notes. By default, the view password is empty, although a user with admin permissions may change it in <router-link to="/profile">Profile->General->Change View Password.</router-link>

Note: This is the order of importance from high to low, meaning if two or more permission types have the same password, the highest permission type will be granted upon sign-in.

---

## FAQ

**Q:** If I delete/edit an item, can I undo it / get it back?

**A:** No, once you delete or edit it, it's gone forever.

<br>

**Q:** What happens to the nested items when I delete an item?

**A:** The subitems stay in the database forever, and you will never be able to access them again after deleting the parent item, so please either:
1. Delete all subitems before deleting the desired item
2. [Contact](#contact) one of the developers to delete it for you.

<br>

**Q:** Can I import/export things?

**A:** Exporting is possible—press "o" and a download called *"nifo_export_username.json"*, with username replaced by your username, should start.
As of 08/31/2020, importing is still not possible.

<br>

**Q:** What happens if I take a common username that may be used as a public account in the future?

**A:** If your username is used as a public account, your account's username will be changed (i.e. if your username was "C++", it could be changed to "C++1"). If it is changed, you will find a notice of it on the <router-link to="/announcements">Announcements</router-link> page.

<br>

**Q:** Can you explain the different types of formatting?
**A:** Nifo supports markdown formatting with [Showdown](http://showdownjs.com/). For the most part, it uses standard markdown formatting, but for specifics, check out [Showdown's markdown syntax](https://github.com/showdownjs/showdown/wiki/Showdown's-Markdown-syntax) on their github wiki!
Nifo also supports typesetting math with [MathJax](https://www.mathjax.org/). For inline math, rather than the standard "$", use "\\(" and "\\)" around your math instead! For displayed math, you can use "$$" or "\\[" and "\\]". For more information, check out [MathJax's documentation](http://docs.mathjax.org/en/latest/basic/mathematics.html). (Note: we don't support MathML or AsciiMath, only TeX and LaTeX.)
If you have any suggestions on what other types of formatting we should support, feel free to [let us know!](#contact)!

<br>

**Q:** How are my notes sorted?

**A:** Notes are sorted in alphabetical order (because firestore does that).

<br>

**Q:** What display options do I have?

**A:** You can choose whether to add/edit notes in a modal or in the markdown editor.
In the future, multiple themes will be added.

---

## Contact
If you encounter any issues, have any feedback on how to improve the UI and/or features to implement, or just want to talk, contact one of the developers!

<p style="cursor: pointer;" @click="sendEmail">Email: sevenisreallycommon at gmail dot com</p>

---

## Development
If you would like to help out, please [contact](#contact) our devs!
Please report any issues/bugs and suggest any ideas you think would help improve Nifo!

### Todo
- HTML
    - Clean up HTML
    - Clean up documentation
- CSS
    - Clean up CSS
    - Themes (with [javascript](https://joshuatz.com/posts/2019/coding-a-css-theme-switcher-a-multitude-of-web-dev-options/) or [scss](https://www.mynotepaper.com/create-multiple-themes-in-vuejs))
        - Dark theme
- JS
    - Clean up JS
    - Change selection to the thing your mouse last interacted with after you interact
    - It's a known bug that if you refresh while in the Profile page Vue will throw an error of 'maximum call stack size exceeded' because of weird stuff with Vue Router and validation settings; to fix just go to another page
    - It's a known bug that when you're using the markdown editor and you open the options, the content won't appear unless you click inside of the textarea
    - Make it so that when you double click to create/retrieve a folder, it stops highlighting the text (idk how to do this) (potential [fix](https://stackoverflow.com/questions/10342965/how-to-prevent-a-double-click-from-highlighting-web-page-text-using-javascript)).
- Import/export
    - Import by uploading a JSON file (temp code in main.js is commented out)
- Apps  
    - C++ (attempting to do it from scratch, will later use libraries)
        - display
        - edit + add + delete
        - Potential libraries:
            - [Nuklear](https://github.com/Immediate-Mode-UI/Nuklear)
            - [MicroUI](https://github.com/rxi/microui)
            - [GuiLite](https://github.com/idea4good/GuiLite)
    - Android (android studio going to kill my computer lol)
    - Apple (unlikely)

### Done
- File view
    - PDF View
        - Find a elements with an href with the .pdf extension
        - When you click on one, suppress default behavior and open up pdf modal
        - PDF modal—80vw and 90vh (the modal itself is actually 89vh to fix borders and stuff)
        - Uses default viewer
- Apps
    - C++ version
      - import
      - export
- Hotkeys/Keyboard navigation
    - e - expand folders if exist
    - r, t, y - toggle, hide, show all content
    - s - toggle folder expand/collapse
    - d, f - collapse, expand all folders
    - o - export notes
        - export as JSON
        - cleaned up JSON with a replacer array
    - Hotkeys only work in home page (check router path)
    - Pressing e multiple times in succession won't add duplicates (added changing variable and a check for it)
    - m - disable/enable (toggle) mouse interaction (left, double, and right click)—useful if you want to right click a link or read your notes without accidentally hiding/showing a part of the structure
    - Selection is highlighted (colors are inverted)
    - ArrowUp, ArrowDown - move selection
    - z - toggle selection—when retoggled, selection focuses on root folder
    - Esc - leave add/edit/delete state
    - Enter - same as right click, shows content
    - n -  same as double click, creates new folder and retrieves any existing elements if it's already a folder, otherwise opens the create new note state
    - x - open editor (same as options button)
- Formatting
    - Markdown via Showdown
    - TeX via MathJax
        - vue-mathjax is garbage
- Unobsfucated [github](https://github.com/nifofin/nifo-src) version
- Profile page
    - General tab
        - Change admin password
        - Change  view-only password
    - Appearance tab
        - Theme: light (default)
        - Option: toggle use modal
    - Sidebar
        - Disappears on clickaway
    - Edit-only users can now  view the Profile page, but only the Appearance tab (not the General tab)
- Permissions
    - Admin - full permissions
    - Editor/Edit-only - can only view and edit notes, can't change passwords
    - View-only - can only view notes, can't change/edit anything
- Firestore DB
    - sync and methods
- Modal window
    - Add, edit, and delete notes
    - Fixed CSS - button padding
    - Clickaway - modal disappears outside of modal windows
- Markdown editor
    - Easy Markdown Editor
    - Add, edit, and delete notes
- Home/main page
  - Tree view
      - Single click - toggle child foldeers
      - Double click - create/retrieve folder from DB
      - Right click - toggle content
      - Sorted alphabetically by name (rather than document ID)
      - Link default class—grey-link—is no longer green
      - Delete button outside of editing modal
- Login page
    - LocalStorage to save login details
        - Reverifies on page load
        - Prevents login component from showing until finished verifying
        - Changed logout to a instead of router-link, so that it works properly with v-on:click
- About/documentation page
    - Scrollactive in sidebar navigation
    - Documentation is now in a markdown file

---

## Misc

### External
- [Easy Markdown Editor](https://github.com/Ionaru/easy-markdown-editor) (for adding a plain-text markdown editor with an in-textarea preview)
- [Firebase](https://firebase.google.com) (firebase db)
- [JQuery](https://jquery.com) (for the PDF modal and other stuff)
- [MathJax](https://www.mathjax.org/) (for rendering math stuff)
- [Showdown](https://github.com/showdownjs/showdown) (for markdown-html)
- [Vue.js](https://vuejs.org/) (and things from vue-cli)
- [VueClickaway](https://github.com/simplesmiler/vue-clickaway) (for sidebar hiding when clicking on another portion of the screen)
- [VueScrollactive](https://github.com/eddiemf/vue-scrollactive) (for docs index highlighting)
