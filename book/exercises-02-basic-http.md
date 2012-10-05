Exercise: Basic HTTP
====================

Objective
---------

The background and requirements are similar to the "RPC over HTTP"
application, but now it's time to become a better and more "correct"
HTTP component.

We will improve the application by moving generic application
semantics one level down to the HTTP layer. We'll do this with proper
use of status codes and headers.

We're expanding on the previous server, but this time we're also
adding a client.

### Common Requirements for Resources

The application shall follow these general requirements:

* All data/non-binary content types should be 'application/json'. This
  applies both for both requests and responses.

Status codes:

 * 200: Everything is ok!
 * 404: Unknown resource.
 * 406: The client posted an unprocessable type.
 * 500: Unknown server-side fault.

Methods:

 * GET: Used to fetch data. Does not change the object
 * POST: Used to create new objects.

### Content Types

Use `application/json` for all normal messages, and `text/plain` for
error messages.

Steps
-----

### Create the 'create ad endpoint'

Endpoint URL: `http://localhost:3000/create-ad`

This is where clients should POST a json object to create a new ad.
The JSON that's sent to the server should look like this:

~~~ {.json}
{
  "title": "Nice house for sale!",
  "body": "Four rooms, huge bath."
}
~~~

The server should return `200 Ok` and a document like this:

~~~ {.json}
{
  "type": "ad",
  "id": "4fc494d10b6a9fcb09000001", 
  "body": "Four rooms, huge bath.", 
  "pictures": [], 
  "title": "Nice house for sale!"
}
~~~

Try to send an invalid object (for example an empty document like
`/dev/null` on unix or `nul` on windows) and make sure you're getting
a proper 500 error code back.

### View ad endpoint

Endpoint URL: `http://localhost:3000/ad?id=...`
 
Clients can GET this with an "id" query parameter. The server will
respond with something like this:

~~~ {.json}
{
  "type": "ad",
  "id": "4fc494d10b6a9fcb09000001", 
  "body": "Four rooms, huge bath.", 
  "pictures": [], 
  "title": "Nice house for sale!"
}
~~~

Try to fetch an ad that doesn't exist and make sure you're getting a
404 error.

### Add picture endpoint

Endpoint URL: `http://localhost:3000/add-picture`

There are some example pictures available under [pictures/](./pictures/).

See the node cheat sheet on how to add pictures to a Mongo object.

### Create a client for creating ads

The client shall first create the ad and then attach all the pictures
to the ad.

Suggested command line API:

    $ ./add-ad.js "Nice house for sale" "Four rooms, huge bath." car.jpg dinosaur.jpg

The client must assert the status codes and content types returned.
Proper error handling is not important now so just throw an exception
on any failure.

Bonus Tasks
-----------

### Proper error handling in the client

If the server returns an unexpected result or unprocessable content,
do not crash but rather try to show the error message to the user. If
the server returns `text/plain`, the user can be shown the text
directly.

### Add a `Last-Modified` header to the responses

### Client to view an ad

Create a client that displays an ad.

Suggested command line API:

    $ ./view-ad.js <id>
    Fetching ad ...
    Last-Modified: <time>
    Title: <title>
    Body: <body>

### Caching Client

Improve the client and store the ad as `ad-<id>.js`. If executed twice
it should do a conditional GET.

Hints
-----

### Converting JSON string to object

~~~javascript
var object = JSON.parse(data);
~~~

### Converting javascript object to string


~~~javascript
var str = JSON.stringify({hello: "world"});
~~~


NOTE: Headers in the node.js http request object are ALWAYS in
lower-case.

Setting status codes from node:

response.writeHead(200, headers);

### Curl

#### Change HTTP method

    -X GET|PUT|POST|DELETE|OPTIONS

#### POST image file

    curl -X POST -H 'Content-Type: image/jpeg' -T pictures/car.jpg <url>

#### Add `If-None-Match`

This header is mostly useful on conditional GET requests:

    -H 'If-None-Match: <value-of-etag-header>'

#### Add `If-Match`

This header is mostly useful on conditional PUT|POST requests:

    -H 'If-Match: <value-of-etag-header>'

#### Add `If-Modified-Since`

This header is mostly useful on conditional GET requests:

    -H 'If-Modified-Since: <value-of-last-modified-header>'

#### Add `If-Unmodified-Since`

This header is mostly useful on conditional PUT|POST requests:

    -H 'If-Unmodified-Since: <value-of-last-modified-header>'

### MongoDB / Mongoose

#### Insert a new object

~~~javascript
var ad = new Db.Ad();
ad.title = payload.title;
ad.body = payload.body;
ad.save();
~~~

When an object has been saved, the id of the object is available as
the `_id` attribute.

#### Find a object

~~~javascript
Db.Ad.findOne({_id: <my id>}, function(err, doc) {
   ....
});
~~~

`err` will be set if there was an error while talking to the DB. `doc`
will null if not found, or the object if found.

### Update an existing object

~~~javascript
var cmd = {$push: {arr: item}}
Db.Ad.update({_id: <my id>}, cmd, {}, function(err, numAffected) {
 ....
});
~~~

Retrospective
-------------

### Why is this better than the rpc solution?

We have not utilized HTTP as an application protocol, mening we are
delivering the application semantics through the protocol instead of 
layering on top.

We have started using HTTP the way it was intended to be used.

Delivering status codes, with the correct content-type headers
allows us to become better Web citizens.

When implementing a real application, you would delegate routing 
and content-negotiation to a framework, for instance Express, 
or whatever you use in your programming language.

### What are the benefits of caching?

Caching allows us to utiltize the scaling properties of the Web.

HTTP is optimized for GET and polling. Meaning that if we don't 
cache, we put a lot of strain on the origin server. Adding caching
allows us to potentially never go to the origin server, except for
verification of the representation of the resource.

### Invalidation

This is a difficult problem to solve, because of the distributed
nature of HTTP's caching model.

There are a few methods:

* Using a different method than GET or HEAD (invalidates the current resource)
* Using PURGE on a cache server (Does not invalidate local caches)
* Cache-Channels
* Edge Side Includes (ESI)
* [Linked Cache Invalidation](http://tools.ietf.org/html/draft-nottingham-linked-cache-inv-03)

### Coupling?

There are still a lot of coupling between the client and the server.
We are still hard-coding the URIs which we use.
