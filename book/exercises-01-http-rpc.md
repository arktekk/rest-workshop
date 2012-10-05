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

There are some example pictures available under [pictures/](./pictures/).

See the node cheat sheet on how to add pictures to a Mongo object.
