Exercise: Hypermedia Design
===========================

Goal
----
Create a hypermedia type that represents an Ad. You should learn how
to create a document which is extensible, and allows change.

Background
----------
You are building Ads'r'us' new RESTful webservice and need to build a
hypermedia type which expresses a classified advertisement with
metadata.

### Requirements

You may choose either XML or JSON as your base type.

The following fields MUST be modeled in your format:

published 
:   The published date of the ad

created
:   The created date of the ad

last-modified
:   The last-modified date of the ad

title
:   The title of the ad

body
:   The body of the ad.

creator
:   A representation of the creator of the ad. This may be a person or
    an organization.

images
:   A list of attached images.

There are also other types of fields in an ad:

subtitle
:   A subtitle, optional.

lead
:   Lead text, optional.

The named listed above are concepts, which your format must contain,
the encoding of concepts to elements/attributes/properties are up to
you.

More fields MAY appear at a different date. You must choose a
strategy for modeling optional fields.

There must also be some hypermedia controls in the format which
identifies resources connected to the ad-representation.

There MUST be a way of identifying which ad we are looking at. The id
MUST NOT be a simple identifier.

Steps
-----

### Step 1

Choose base format (XML or JSON) and add required fields.

### Step 2

Find a way of adding new fields without breaking backward compability

### Step 3

Implement server and client which understands the new format.

Useful link relations:

* `self`
* `alternate`
* `contact`
* `organization`
* `person`
* `image`

More link relations may be found at [IANA's link-relations page](http://www.iana.org/assignments/link-relations).

For date-times you SHOULD use [RFC3339](http://tools.ietf.org/html/rfc3339). Example: `2012-06-05T12:00:02.52Z`.

Hints
-----
Embedding images are not a good idea, so we need to link to them.

### XML

Use attributes where it makes sense instead of elements.

#### Links
In Atom, a hypermedia format, there's defined a link type which looks like this:

```xml
<atom:link href="http://example.com/ad/1" rel="self">
```

Domain specific 

```xml
<ad href="http://example.com/ad/1"/>
```

Experiment, and try to find the best solution for your format.

### JSON

It is very easy to introduce incompatible changes in JSON, thereby it's important that
one is diligent when designing the format.

#### Links
Like XML, JSON does not have any hypermedia controls built in. There are a couple
of different ways of modeling links in JSON:

```json
{
  "id": "http://example.com/ad/1",
  "property-1": "property-value",
  "property-2": "property-value",
  "property-3": "property-value"
}
```

Collection+JSON-style:

```json
{
  "href" : "http://example.com/ad/1"
  "links": [
    {"href": "http://example.com/ad/1", "rel": "self", "title": "The current Ad"}
  ]
}
```

HAL-style:

```json
{
  "property-1": "property-value",
  "links": {
    "self": "http://example.com/ad/1"
  }
}
```

Bonus
------

* Add a list-version of the current format.
* Add more links to other resources.
* Test against other servers.

Retrospective
-------------

How can you add new fields without introducing a breaking change?
