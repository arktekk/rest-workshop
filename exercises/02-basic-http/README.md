Basic HTTP
==========

Goal
----

The background and requirements are similar to the "RPC over HTTP"
application, but now it's time to become a better and more correct
HTTP component.

We will improve the application with proper use of status codes,
content types and cache-related headers.

Background
----------

You are working for a company that has a classified advertisements
website. The task is to create a server used to create new ads with
pictures per ad. For now, you only need to implement the server side.

Requirements
------------

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

### Endpoints

#### Create ad endpoint: `http://localhost:3000/create-ad`

This is where clients should POST a json object to create a new ad.
The JSON that's sent to the server should look like this:

~~~json
{
  "title": "Fin bolig til salgs!",
  "body": "Fire rom, nytt bad."
}
~~~

The server should return a document like this:

~~~json
{
  "type": "ad",
  "id": "4fc494d10b6a9fcb09000001", 
  "body": "Fire rom, nytt bad.", 
  "pictures": [], 
  "title": "Fin bolig til salgs!"
}
~~~

#### Add picture endpoint: `http://localhost:3000/add-picture`

There are some example pictures available under [../../pictures](../../pictures/).

#### View ad endpoint:  `http://localhost:3000/ad?id=...`
 
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

