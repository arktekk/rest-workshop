Exercise 1
==========

Goal
----

Create a classic "RPC over HTTP" application.

Background
----------

You are working for a company that has a classified advertisements
website. The task is to create a server used to create new ads with
pictures per ad. For now, you only need to implement the server side.

Requirements
------------

The server shall expose two endpoints:

### Create ad endpoint: `http://localhost:3000/create-ad`

This is where clients should POST a json object to create a new ad.
The JSON should look like this:

~~~json
{
  "title": "Fin bolig til salgs!",
  "body": "Fire rom, nytt bad."
}
~~~

### Add picture endpoint: `http://localhost:3000/add-picture`

    curl -d ad_id=<AD ID> -d @picture.png http://localhost/create-picture

There are some example pictures available under [../../pictures](../../pictures/).

### View ad endpoint:  `http://localhost:3000/ad?id=...`
 
Clients can GET this with an "id" query parameter. The server will
respond with something like this:

~~~json
{
  "result": "ok",
  "data": {
    "title": "Fin bolig til salgs!",
    "body": "Fire rom, nytt bad."
  }
}
~~~

Steps
-----

### Step 1: Create an ad


### Step 2: View an ad

