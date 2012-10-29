Exercise: Existing Media Types
=============================

Objective
---------

Now we're moving from a domain specific media type to encode the same
concepts by using an existing media type.

Steps
-----

Update the server and client to use the new variant of the [Ads'r'us
API (with existing media types)](ads-r-us-api-with-existing-media-types.html).

Retrospective
-------------

### What is the gain by re-using existing media-types?

First of all, reusing existing parsers, is a good idea, 
as most bugs have been ironed out when you use them.
Existing mindshare is also a desirable property.

### Can hypermedia formats be too generic?

Yes, they can also be too specific, making them hard to change.
HAL is an example of a too generic media type.
