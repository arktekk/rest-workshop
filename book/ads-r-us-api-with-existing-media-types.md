% Ads'r'us API (with existing media types)
% Erlend Hamnaberg
  Trygve Laugstøl

About this document
===================

This document is an example on how one can document an API by using
the REST principles. This version of the API use a domain specific
media type with JSON serialization.


Ads'r'us API (with existing media types)
========================================

This document describes an architecture for how agents should interact
with Ads'r'us. Interactions with Ads'r'us follow the general
architecture and constraints described in the REST dissertation and
add some domain specific constraints.

We only implement a HTTP interface to our resources which come with
its own set of constraints. Most of our data resources (non-binary)
uses the existing `application/vnd.collection+json` media type,
commonly known as ["Collection+JSON"][collection_json]:

> Collection+JSON is a JSON-based read/write hypermedia-type designed
to support management and querying of simple collections. It is
similar to the The Atom Syndication Format (RFC4287) and the The Atom
Publishing Protocol (RFC5023) . However, Collection+JSON defines both
the format and the semantics in a single media type. It also includes
support for Query Templates and expanded write support through the use
of a Write Template.

As the world progresses, new specifications, updates and enhancements
arrive and we try to stay as much as possible in line. However, we
will always remain backwards compatible with our own published
specifications.

*Make sure to check back regularly to get the latest version of this
specification!*

General Architecture Rules
--------------------------

These are general rules and principles used. They apply as long as a
specific interaction/resource does not specify something else.

It is expected that the domain and objects that the resources describe
evolve over time and thus new fields and link relations might be
introduced later on. Clients must silently ignore unknown fieds and
should not expect optional fields to be present.

Expected usage
--------------

It is assumed that clients are pre-programmed with a link to an ad
list when starting to interact with us.

Ad Serialization Inside Collection+JSON
---------------------------------------

### Data Fields

When serializing an ad inside a Collection+JSON, these fields are available:

* `title`: The one-line title of the ad. MUST be present.
* `body`: The body part of the ad. MAY span multiple lines. MUST be present.
* `lastModified`: The timestamp of the ad. MUST use Atom's date
  format. See [3.3: Date
  Constructs](http://tools.ietf.org/html/rfc4287#section-3.3).  SHOULD
  be present when served from a server. MAY be present when a client
  sends one to the server.

### Links

* `add-picture`: Send pictures here to add them to an ad.

### Link Relations

In addition to the link relations specified by Collection+JSON, we use
the `picture` relation to reference pictures that are related to the
current resource.

### Example

~~~~ {.json .figure caption="awesome"}

{ "collection" :
  {
    "version": "1.0",
    "href": "http://localhost:3000/ads",
    
    "links": [
      {"rel": "self", "href": "http://localhost:3000/ads"}
      {"rel": "collection", "href": "http://localhost:3000/ads"}
      {"rel": "feed", "href": "http://localhost:3000/ads.atom"}
    ],
    
    "items": [
      {
        "href" : "...",
        "data" : [
          {"name" : "title", "value" : "Nice house for sale!", "prompt" : "Title"},
          {"name" : "body", "value" : "Four rooms, huge bath.", "prompt" : "Ad Body"}
        ],
        "links" : [
          {"rel" : "add-picture", "href" : "..."}
          {"rel" : "picture", "href" : "...", "render" : "image"}
          {"rel" : "picture", "href" : "...", "render" : "image"}
        ]
      },
      ...
    ]
  }
}

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Single Ad vs List of Ad Resources
---------------------------------

As Collection+JSON does not have a way to send a single item only the
context of the request specifies if the list will include one or more
items.

[collection_json]: http://amundsen.com/media-types/collection/
