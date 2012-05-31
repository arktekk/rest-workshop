HTTP RPC
========

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

### Create ad endpoint: `http://localhost:3000/create-ad`

This is where clients should POST a json object to create a new ad.
The JSON that's sent to the server should look like this:

~~~json
{
  "title": "Nice house for sale!",
  "body": "Four rooms, huge bath."
}
~~~

The server should return a document like this:

~~~json
{
  "result": "ok",
  "data": {
    "id": "4fc494d10b6a9fcb09000001", 
    "body": "Four rooms, huge bath.", 
    "pictures": [], 
    "title": "Nice house for sale!"
  },
}
~~~

The `id` field inside the `data` object is used later on when
generating URLs.

### View ad endpoint:  `http://localhost:3000/ad?id=...`
 
Clients can GET this with an "id" query parameter. The server will
respond with something like this:

~~~json
{
  "result": "ok",
  "data": {
    "title": "Nice house for sale!",
    "body": "Four rooms, huge bath."
  }
}
~~~

If the ad does not exist, `result` should be `notFound`:

~~~json
{
  "result": "notFound"
}
~~~

Similar for any unknown error, `result` should be `error`:

~~~json
{
  "result": "error"
}
~~~

### Add picture endpoint: `http://localhost:3000/add-picture?id=...`

There are some example pictures available under [../../pictures](../../pictures/).

Steps
-----

### Step 1: Create an ad


### Step 2: View an ad


### Step 3: Add Pictures to Ad

