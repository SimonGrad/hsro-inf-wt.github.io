---
title: Assignment 9
permalink: /09a-deployment/
---

# Deployment

Today's assignment is about deploying a complete web app (including static and API parts) with [docker](https://www.docker.com/) and [heroku](https://www.heroku.com/).

The basis for this weeks exercise is derived from the the solutions to the previous assignments [canteen menu with vue](/08a-vuejs/) and [express with mongo](/07a-express-db/).
Download an an [archive of the files](/09a-deployment.zip) to get started.

The backend (`server.js`) was extended to serve `static/index.html` containing the vue app, as well as a basic REST interface that allows to list, add and delete favorite meals, stored in a mongo database (on `localhost`).

The frontend (`static/index.html`) was extended with logic to toggle meals as favorites.
It works like shown in this video:

<video controls src="/assets/vue-node-docker.mp4" style="border: 1px solid black; max-with: 100%"></video>

Please familiarize yourself with the logic.
The favorites are modeled using a dictionary that maps a favorite meal name (e.g. _Bananenquark_) to its Mongo `ObjectId`.
These favorites are stored in the REST API.

The assignment is split in four tasks:

1. Create a basic node application using the files referenced above.
2. Start a Mongo container and then the app.
3. Create a docker container that runs the node application; use docker compose to deploy the service (app+mongo) locally.
4. Deploy your service to heroku.


# Preliminary

Make sure that you have [node](https://nodejs.org/) and [docker](https://www.docker.com/) installed and working on your system.


# Create a Basic Node Application

Donwload the [archive](/09a-deployment.zip) and extract it into an empty directory.

Run `npm install` to install all neccessary packages.

Run `npm start` to start the app; note that since there is no Mongo server yet, it will produce some warnings/errors.

Verify that your app works by checking <http://localhost:3000>.

> The favorites feature will not yet work since there is no Mongo database to drive it yet.


# Start a Mongo container

Start a local Mongo database container and verify that it runs.
Note that the lines starting with `$` are commands (to be entered without the `$`), the other lines are program output; your hashes may look differently.

```
$ docker run -d -p 27017:27017 mongo  # runs mongo as a background daemon
$ docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                      NAMES
89c22c269059        mongo               "docker-entrypoint..."   9 hours ago         Up 9 hours          0.0.0.0:27017->27017/tcp   friendly_swanson
$ docker logs 89c
2017-12-13T15:17:28.042+0000 I CONTROL  [initandlisten] MongoDB starting : pid=1 port=27017 dbpath=/data/db 64-bit host=89c22c269059
...
```

Now restart the node app (CTRL-C to terminate, `npm start` to restart) and verify that the favorites feature works as expected.


# Docker Containers and Docker Compose

Now let's go ahead and containerize this app.

Create a `Dockerfile` with the following content:

```
FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Copy package configuration into container
# A wildcard is used to ensure both package.json AND
# package-lock.json are copied where available (npm@5+)
COPY package*.json ./

# Run the installer
RUN npm install

# Copy all local files (e.g. server.js, static/index.html)
# into the container
COPY . .

# Node default port
EXPOSE 3000

# What command to run when the container starts?
CMD [ "npm", "start" ]
```

Test your Dockerfile by building and running the container.

```
$ docker build -t vue-canteen .  # name is arbitrarily chosen
...
$ docker run -d -p 3000:3000 vue-canteen  # don't forget the port!
56a83fd46cc4c940a34f72f0eb1db1d3825c7415f0854da4c28487c5cd34d7a3
```

When checking the logs of the container, you may see an error:

```
> node-app@1.0.0 start /usr/src/app
> node server.js

Example app.js listening on port 3000!
{ MongoNetworkError: failed to connect to server [localhost:27017] on first connect [MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017]
...
```

This is because the docker container can't reach your mongo container.
Enter `docker-compose` to combine containers to form a complete service!
Create a file `docker-compose.yml` with the following content:

```yaml
version: "3"
services:
  app:
    container_name: vue-canteen   # arbitrary name
    restart: always               # restart container on service startup?
    build: .                      # build container from .
    ports:
      - "3000:3000"               # expose default node port
    links:
      - mongo                     # provide network access to `mongo`
  mongo:
    container_name: mongo
    image: mongo                  # use existing image `mongo`
```

> For production use, you may want to set a data volume or container for the _mongo_ container to persist the database.

In `server.js`, replace `localhost` by `mongo` (the hostname of the database container inside the service).

Start the service by running

```
$ docker-compose up
```

Verify that everything works by browsing <http://localhost:3000>.


# Deployment to Heroku

If not already done, make your app directory a git repository:

```
$ git init
```

To get started, head to <https://www.heroku.com>, create an account and download/install the [command line interface](https://devcenter.heroku.com/articles/heroku-cli)

Create account on <https://mlab.com> (no worries, it's free).
After you signed up, create a database (e.g. `wt-2017`) and a user (e.g. `wt2017`, password `hsro`).

In your app directory, open the terminal, log into heroku, create an app and set the mLab credentials as an environment variable.

```
$ heroku login
Enter username...
$ heroku create
https://enigmatic-lake-72393.herokuapp.com/ | https://git.heroku.com/enigmatic-lake-72393.git
$ heroku config:set _MONGODB_URI=mongodb://wt2017:hsro@ds135956.mlab.com:35956/wt-2017
```

> You must adjust the above command to match your mLab credentials!

Modify your `server.js` so that 
- the `mongo` module connects mLab, by changing the `url` to `process.env._MONGODB_URI` (the environment variable that was configured before)
- The app listenes to port `process.env.PORT` (which will be set by heroku).

Now you're ready to publish your node app to heroku:

```
$ git push heroku master
```

