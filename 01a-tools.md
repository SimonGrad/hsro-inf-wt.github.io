---
title: Assignment 1
permalink: /01a-tools/
---

# Assignment 1

Main objective of this assignment is to get (well) familiar with the tools you'll be using the most: [git](https://git-scm.com), text editor (_e.g._ [Sublime](https://www.sublimetext.com/)), a rapid prototyping tool (e.g. [jsfiddle](https://jsfiddle.net/)), and the developer tools of important browsers.


# Git

If you haven't yet completed <https://github.com/hsro-inf-prg3/01a-tools/#get-familiar-with-git>, do so now.


# Editor

Unless you're using an IDE (such as [Webstorm](https://www.jetbrains.com/webstorm/)), you will need to get familiar with a text editor of your choice.
There are [plenty](http://brackets.io/) [of](https://www.sublimetext.com/3) [reasonable](https://atom.io/) [choices](https://notepad-plus-plus.org/), but only [one to rule them all](http://www.vim.org/) (well, [maybe two](https://www.gnu.org/software/emacs/)).
For your peace of mind, it should support at least directory browsing and syntax highlighting for HTML, CSS and JavaScript.

You may want to get familiar with your favorite terminal ([bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) is recommended); use [Windows Subsystem for Linux](https://msdn.microsoft.com/en-us/commandline/wsl/install_guide) or a [VirtualBox VM with Linux](https://www.virtualbox.org/wiki/Downloads) on Windows, or [Terminal.app](https://en.wikipedia.org/wiki/Terminal_(macOS)) or [iTerm2](https://www.iterm2.com/) on OSX.


# Developer Tools

Install all browsers (as far as supported by your OS), and get familiar with their developer tools:
- [Chrome developer tools](https://developer.chrome.com/devtools)
- [Firefox developer tools](https://developer.mozilla.org/en-US/docs/Tools)
- [Safari developer tools](https://developer.apple.com/safari/tools/) in [preferences](/assets/safari-devtools.png) to see them in the [menu bar](/assets/safari-devtools-menu.png)
- [Edge developer tools](https://docs.microsoft.com/en-us/microsoft-edge/f12-devtools-guide)
- [Opera Dragonfly](http://www.opera.com/dragonfly/)

> Note: Some of them need to be enabled in the preferences first, and they all have similar but different hotkeys to bring them up.


# Rapid Prototyping

Often enough, you'll discover that the solutions to your problems are a combination of HTML (data schema), CSS (layout and design) and JavaScript (actions).
Since it's a bit of a pain to go through setting up all three files, linking and serving them, just to demonstrate a problem/solution, bright people have come up with platforms such as <https://jsfiddle.net>.

Solve this little riddle: <https://jsfiddle.net/sikoried/6bouqrbp/>. (Hit _RUN_ atop once you made changes!).


# A simple web server (Node.js)

In this exercise, you will create your first (static and very basic) website.

1. Install node.
	- Mac: Use [homebrew](https://brew.sh/), get it via `brew install node`
	- Windows: ~~You should not use Windows.~~ Try using [Windows Subsystem for Linux](https://msdn.microsoft.com/en-us/commandline/wsl/install_guide) (which is effectively Ubuntu Linux). Or see <http://blog.teamtreehouse.com/install-node-js-npm-windows>
	- Linux: See <https://nodejs.org/en/download/package-manager/>
	- [Docker](https://www.docker.com/): (yeah!) https://github.com/nodejs/docker-node
2. Create a new directory (eg. `hello-world`), and change into it.
3. Install `http-server` using the node packaga manager `npm`, and run
	```bash
	$ npm install http-server  # installs locally in ./node_modules/
	$ npm bin  # this shows you where the executables are
	$ $(npm bin)/http-server  # runs locally installed module; bash magic!
	```
	Note: This is bash syntax; Windows Powershell might be different (if it works at all).
	You will see output similar to this:
	```
	Starting up http-server, serving ./
	Available on:
	  http://127.0.0.1:8081
	  http://141.60.132.204:8081
	Hit CTRL-C to stop the server
	```
	Go ahead and try it in your browser!
	Since there is no index page, it will display the content of the directory.
4. Now create your first webpage, by creating a file `index.html` with the following content:
	```html
	<html>
	<body>
		<p>Hello, World!</p>
	</body>
	</html>
	```
	...and refresh your browser.
5. Use the inspector to change the text, color and font size.

