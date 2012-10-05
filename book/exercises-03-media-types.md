Exercise: Media Types
=====================

Objective
---------

In this exercise it's time to move from `application/json` to use
Ads'r'us' own media type. We will also remove all URL generation from
the clients.  The server will decide which interactions that are
allowed.

Steps
-----

Implement the API described in [Ads'r'us API (with domain-specific media
types)](ads-r-us-api-with-specific-media-types.html). Continue
with the implementation you completed in the previous exercise.

Replace the usage of `application/json` with `application/vnd.ad+json`
and `application/vnd.ad-list+json`. Update the `add-ad.js` client to
start from the "ad list" URL and find the `add-ad` URL from the list
document. In the end, the client should not hard code or generate any
URLs.

Bonus
-----

Work with another person/group and try your client against the other
groups server. Add extra fields and headers to the responses to try to
get the other client to fail. Make sure that you stay within the
specification when adding fields and headers. It is also possible to
change the URL that's served to the client.

Retrospective
-------------

### What have we gained by moving URI creation out of the client?

We can now change the servers URI scheme, except from the initial URI,
to whatever we want. We have thereby reduced the coupling of the client
to the server.

We can now introduce new network components into the stack without having
to change the client and how it works. For instance adding servers, and
changing the links to point to another if the current server is overloaded.

The connection points are:

* The initial URI
* Link relations used
* the data formats used.
