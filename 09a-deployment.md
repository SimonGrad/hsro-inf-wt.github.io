---
title: Assignment 9
permalink: /09a-deployment/
---

# Deployment

Today's assignment is about deploying a complete web app (including static and API parts) with docker and heroku.

The basis for this weeks exercise is derived from the the solutions to the previous assignments [canteen menu with vue](/08a-vuejs/) ([solution](/vue-examples/vue-canteen.html)) and [express with mongo](/07a-express-db/) ([solution](/express-examples/rest-mongo.js)).

The [backend](https://github.com/hsro-inf-wt/express-examples/server.js) was extended to serve a static `index.html` with the vue app, as well as a basic REST interface that allows to list, add and delete favorite meals, stored in a mongo database (on `localhost`).

The [frontend](https://github.com/hsro-inf-wt/vue-examples/index.html) was extended with logic to toggle meals as favorites.
It works like shown in this video:

<video controls src="/assets/vue-node-docker.mp4" style="border: 1px solid black; max-with: 100%"></video>

The assignment is split in four tasks:

1. Create a basic node application that serves the static parts of the vue canteens application using express, and run it from the terminal.
2. Extend your vue app by adding the favorites (star/unstar) feature as shown in the video above.
3. Create a docker container that runs that node application; use docker compose to deploy the service (app+mongo) locally.
4. Deploy your service to heroku.


# Create a Basic Node Application

Since docker will have to build the containers, we need to automate the installation of required node modules and the actual "run" command.

In a fresh directory, start with creating a `package.json` file that configures `express` and `mongodb` as dependencies, and specifies a `scripts` target `"start": "node server.js"`.