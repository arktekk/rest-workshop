Basic HTTP
==========

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
* TODO: remove? Each resource should the appropriate caching information.
* Status codes:
 * 200: Everything is ok!
 * 404: Unknown resource.
 * 406: The client posted an unprocessable type.
 * 500: Unknown server-side fault.
* Methods:
 * GET: Used to fetch data. Does not change the object
 * POST: Used to create new objects.

### Content Types

Use `application/json` for all normal messages, and `text/plain` for
error messages.

Instructions
------------

### Create a work directory

Copy the `start/` directory into `work/`.

### Create the 'create ad endpoint': `http://localhost:3000/create-ad`

This is where clients should POST a json object to create a new ad.
The JSON that's sent to the server should look like this:

~~~json
{
  "title": "Nice house for sale!",
  "body": "Four rooms, huge bath."
}
~~~

The server should return `200 Ok` and a document like this:

~~~json
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

### View ad endpoint:  `http://localhost:3000/ad?id=...`
 
Clients can GET this with an "id" query parameter. The server will
respond with something like this:

~~~json
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

### Add picture endpoint: `http://localhost:3000/add-picture`

There are some example pictures available under
[../../pictures](../../pictures/).

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
