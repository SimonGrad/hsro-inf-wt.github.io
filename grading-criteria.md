---
title: "Grading Criteria"
---

# Grading Criteria

## Feature Checklist

Binary tests: Project ...

- uses advanced toolkit (eg. angular, vue, react, jekyll/liquid)
- connects to database or other form of permanent storage
- has frontend and backend (exception is jekyll: backend is build process)
- has advanced authentication (eg. OAuth2, social, ...)
- has deployment (docker containers, heroku, VM)
- (overwhelmingly) passes W3 validators (warnings?)

All features are required to pass (4.0).


## Grading Guideline

Once a project passes the feature checklist, the grade is worked out with the following criteria.

### Use of HTML

_Good examples_:
- layout out driven by `div`s with css
- most css is in stylesheets, only minimum `style` attributes
- `head` section is properly populated (`title`, `meta`s as required, etc.)
- stylesheets in `head`, scripts in `head` or `body` (where appropriate)

_Bad examples:_:
- layout driven by `table`s
- most css is on inline `style` attributes
- syntax is overly complex (unneccessary nesting)


### Use of CSS

_Good examples:_
- only required attributes are set
- class names are meaningful, stylesheet is well organized (or less/sass)
- sizes predominantly in relative units (eg. `em` and `%`, for typography see <https://kyleschaeffer.com/development/css-font-size-em-vs-px-vs-pt-vs/>)
- use of selectors (`:before`, `:after`, `:nth-child(n)` etc.)
- use of toolkits such as bootstrap, foundation, etc.

_Bad examples:_
- uneccessary attributes are set (css overly crowded)
- unintuitive class names, unorganized stylesheet
- sizes are predominantly absolute `px` values


### Use of Javascript

**Very Important**: The chosen advanced toolkit (e.g. vue) is appropriately used; foremost this means there should be no "plain old" Javascript.

Examples: Use...
- `v-on:keypress` instead of `.addEventListener('keypress', ...)`.
- `v-bind:class` to set attributes, instead of `document.getElementById(...).class = ...`
- `vue.$http` instead of `XHTMLRequest` or `fetch`
- `v-model` to realize 2-way data binding instead of manually setting variables or DOM elements
- `v-for` (_declarative_) instead of `for (...) { ...appendChild(...) }` (_imperative_)
- If jQuery is unavoidable: `$(p.users).css('border', '1px solid black')` instead of `for (e in document.getElementByTagName('p')) { if e.class == 'users' ... }`

_Good examples:_
- ES6 syntax (lambdas, `let`/`var`, `fetch`) -- for frontend and backend!
- proper code style (indentation, naming conventions, etc.)
- use of external toolkits (jquery, underscore, es6-shim, etc.)

_Bad examples:_
- incoherent use of language standards (pre-ES5, ES5, ES6)
- use of old `xhttprequest`
- "raw Javascript" as opposed to standard toolkits (e.g. `document.getElementById('#meh')` instead of `$('#meh')`)
- scripts not organized into files/modules/etc
