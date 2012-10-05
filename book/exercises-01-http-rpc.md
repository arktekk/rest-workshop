Exercise: HTTP RPC
==================

Objective
---------

Create a classic "RPC over HTTP" application for creating ads with
pictures.

The application will encode the result of each operation in the body
of the request.

For now, you only need to implement the server side. Use curl for
testing the responses from the server.

Steps
-----

### Create the ad endpoint: `http://localhost:3000/create-ad`

This is where clients should POST a json object to create a new ad.
The JSON that's sent to the server should look like this:

~~~ {.json}
{
  "title": "Nice house for sale!",
  "body": "Four rooms, huge bath."
}
~~~

To test the endpoint you can use the example `ad.json` file like this:

    curl --data-binary @../ad.json http://localhost:3000/create-ad

The server should return a document like this:

~~~ {.json}
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

Similar for any unknown error, `result` should be `error`:

~~~ {.json}
{
  "result": "error"
}
~~~

### View ad endpoint:  `http://localhost:3000/ad?id=...`
 
Clients can GET this with an "id" query parameter. The server will
respond with something like this:

~~~ {.json}
{
  "result": "ok",
  "data": {
    "title": "Nice house for sale!",
    "body": "Four rooms, huge bath."
  }
}
~~~

If the ad does not exist, `result` should be `notFound`:

~~~ {.json}
{
  "result": "notFound"
}
~~~

### Add picture endpoint: `http://localhost:3000/add-picture?id=...`

There are some example pictures available under
[../../pictures](../../pictures/).


Hints:
=======


Curl
-------

### POST image file

    curl -X POST -T <path-to-file> <url>


MongoDB / Mongoose
------------------

Insert a new object:

~~~javascript
var ad = new Db.Ad();
ad.title = payload.title;
ad.body = payload.body;
ad.save();
~~~


When an object has been saved, the id of the object is available as
the `_id` attribute:

Find a object:

~~~javascript
Db.Ad.findOne({_id: <my id>}, function(err, doc) {
   ....
});
~~~

`err` will be set if there was an error while talking to the DB. `doc`
will null if not found, or the object if found.

Update an existing object:
~~~javascript
var cmd = {$push: {arr: item}}
Db.Ad.update({_id: <my id>}, cmd, {}, function(err, numAffected) {
 ....
});
~~~

Retrospective
==============

Why is this bad?
----------------

We are tunneling application semantics through an application level protocol. 
We should rather delegate to HTTP to do the error handling, 
and delivery of correct status code. 
We are by every definition not a good Web citizen.

When implementing a real application, you would delegate routing to a framework, 
for instance Express, or whatever you use in your programming language.


Hard-coding of URIs
-------------------

All URIs are hard-coded in the client, we have a lot of coupling between our service, data and client.

If you only have one client and server, this might be a diserable property, but
once you have more than one client, this may be come unmanageable. You have to
upgrade all clients at the same time as you upgrade your clients.
