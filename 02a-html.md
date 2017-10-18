---
title: Assignment 2
permalink: /02a-html/
---

# Assignment 2: HTML

## Hone your HTML skills

1. Complete this [online quiz](https://www.w3schools.com/quiztest/quiztest.asp?Qtest=HTML); you should score at least 75%.
2. Complete the exercises at <https://www.w3schools.com/html/exercise.asp>, with the exception of
	- Styles
	- CSS
	- Classes
	- Iframes
	- Scripts
	- Computercode
	- Forms
	- Form Elements
	- Form Attributes


## Page creation

Use HTML to recreate the following web page.
Start from [this template](https://jsfiddle.net/sikoried/95qcowoh/), which uses [bootstrap](http://bootstrapdocs.com/v3.2.0/docs/) for basic styling.

![web page](/assets/html-exercise.png)

- Do not copy the textual content; use <https://www.lipsum.com/> as a dummy text
- One of the text blocks is realized as a `blockquote`
- The embedded video is here: <https://www.youtube.com/watch?v=j_M8q6SVK7g>
- The logo is located here: http://www.fh-rosenheim.de/typo3conf/ext/in2template/Resources/Public/Images/fh-rosenheim.png
- Set the `class="table"` attribute on the table to activate bootstrap styling of the `table` element
- Validate your HTML using the [W3C Validator](https://validator.w3.org)
	+ since jsfiddle doesn't require the `html`, `head` and `body` tags, make sure to add `<!DOCTYPE html><html><head><title>Test</title></head><body>` at the top, and `</body></html>` at the bottom
	+ the only permissible errors are from Youtube's `iframe`
