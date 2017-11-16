---
title: Assignment 6
permalink: /06a-http/
---

# Assignment 6: HTTP

## Curl and Postman

Practice using curl and/or Postman, by trying all the examples of the [Internet Chuck Norris Database](http://www.icndb.com/api/).
Pay attention to the payload as well as to the response headers.


## Remeeting API

Check out this [speech recognition API](https://remeeting.com/api/docs/asr/v1/), but don't do the _Quickstart_ just yet.

This exercise will cover how to authenticate torward the API, submit audio to the transcription service, and receive the result.


### Authentication

You can choose between [HTTP Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) or a OAuth2-style Bearer token authentication.
Use the following credentials:

```
username: k+wt2017@rmtg.co
password: fhro
```

First, try to receive all previously processed recordings using basic auth from <https://api.remeeting.com/v1/recognitions/>.
For `curl`, use the `-u user:password` argument.

To obtain a Bearer token, you need to `POST` to the `/access/` end point of an older version of the API: <https://api.remeeting.com/v0.4/access/>.
The payload needs to be provided as `application/json`, and you need to set the `email` and `pw_plaintext` fields.
On success, the response will look similar to this

```json
{"access_hash": "e5d897dc5ced970283c62f0b48d5b91aebfa23017967bfff0081676435b419b0",
"access_token": "dGewJgxPJvVJQ4KXU4JUZ2pd", "email": "k+wt2017@rmtg.co",
"message": "Signed in", "user": "c037"}
```

where `access_token` is your bearer token.



## Openmensa API Revisited

From last assignment, you already know how to send an AJAX request using `$.ajax()` and subsequently update the DOM.

This time, we will dive deeper and let users select a supported cantina before rendering its menu.

You can find the documentation for the API here: <http://doc.openmensa.org/api/v2/>


### Setup

This time, start in a fresh [fiddle](https://jsfiddle.net).
In the Javascript settings (cog button near the center), enable jQuery, on the left side, under external resources, add 
- `//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css`
- `//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js`

Use this HTML template to get started:

```html
<h1>
Loading cantinas...
</h1>
<div class="progress">
  <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
  </div>
</div>

<select style="display: none" class="form-control">
</select>

<ul>
</ul>
```

As you can see, it makes use of 
- a bootstrap [progress bar](https://getbootstrap.com/docs/3.3/components/#progress); its extent can be set by setting the width of the `<div>` with the `progress-bar` class, e.g. `$('.progress-bar').css('width', '30%')`)
- a bootstrap [select](https://getbootstrap.com/docs/3.3/css/#selects), which shows `<option>`s as a dropdown menu
- an unordered list (`<ul>`) to be populated with the menu, or "no data" if there is no menu for the selected cafeteria.

See this video for a more visual description:

<video style="border: 1px solid black" src="/assets/mensabrowser.mp4" controls></video>


### Load Cafeterias

Get the available cafeterias from the API and display them inside the select element.
Use the `$.data()` method to attach the cafeteria id to each of the created `<option>` elements.
Explore the requests using curl or Postman before repeating them in the fiddle using `$.ajax` (you will need to set the `success` and `error` options!).

This is more tricky than it may look like since the results are paginated, i.e. you only get a subset of the cafeterias.
Use the `x-total-pages` response header to figure out how many requests you need to accrue.
With each page request, show the progress by advancing the progress bar.

Try requesting only the first page for a starter, and continue with the next part, before coming back to this.


### React to User Input

Once you select a cafeteria from the list (`$.change()`), figure out which option was selected, and get the menu for the corresponding cafeteria id.

If this request fails (`404`), then set the content of the unordered list to `<li>no information</li>`.

Bonus points if you can automatically remove a cafeteria from the list, once the menu retrieval failed.

