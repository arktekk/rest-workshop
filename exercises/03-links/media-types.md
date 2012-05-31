_This document is an example on how one can document an API by using
the REST principles._

Ads'r'us API
============

This document describes an architecture for how agents should interact
with Ads'r'us. Interactions with Ads'r'us follow the general
architecture and constraints described in the REST dissertation and
add some domain specific constraints.

We only implement a HTTP interface to our resources which come with
its own set of constraints. As the world progresses, new
specifications, updates and enhancements arrive and we try to stay as
much as possible in line. However, we will always remain backwards
compatible with our own published specifications.

General Architecture Rules
--------------------------

These are general rules and principles used. They apply as long as a
specific interaction/resource does not specify something else.

TODO: skriv noe om hvordan vi bruker HTTP metoder. Det er lov å bruke
alle metoder på alle ressurser, men man kan få feilkoder. Man er da
garantert at man får en Allow-header med tilbake.

### On Creating New Resources

When a new resource is created, the server MUST return the status code
`201` and a `Location` header pointing to the newly created resource.

### On Links and Allowed Methods

Many resources will include URIs to other resources and operations
available for the client. The resources will include all links, even
if the client may not be authorized to use them.

Expected usage
--------------

It is assumed that clients are pre-programmed with a link to an ad
list when starting to interact with us.

Media Type: Single Ad / `application/vnd.ad+json`
-------------------------------------------------

~~~json
{
  "title": "Fin bolig til salgs!",
  "body": "Fire rom, nytt bad.",
  "pictures": [
    URI, ...
  ]
  "self": URI,
  "add-picture": URI,
  "publish": URI,
  ...
}
~~~

Fields:

* `title`: the title and body of the ad. Available: summary
* `body`: the title and body of the ad.
* `self`: the canonical URI for this ad. Can be used to send a
  link to other agents or when editing the ad.
* `pictures`: A JSON list of URLs that point to image files.
* `add-picture`: Send pictures here to add them to an ad.
  
### Updating Ads

When updating the ad, only these fields needs to be sent:

* `title`
* `body`

There is no described way to update only a subset of the fields in an
ad.

Media Type: Ad List / `application/vnd.ad-list+json`
----------------------------------------------------

~~~json
{
  "count": 10,
  "add-ad": URI,
  "ads": [
    {
      // See specification for application/vnd.ad+json
    }
  ],
  "next-page": URI,
  "prev-page": URI,
  ...
}
~~~

To insert a new ad into the list
