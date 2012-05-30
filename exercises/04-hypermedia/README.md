Exercise 4
==========

Goal
----
Create a hypermedia type that represents an Ad. You should learn how
to create a document which is extensible, and allows change.

Background
----------
You are working for a company that has a classified advertisements
website. You are building their new RESTful webservice and 
need to build a hypermedia type which expresses a 
classified advertisement with metadata.


Requirements
------------
You may choose either XML or JSON as your base type.

The following fields MUST be modeled in your format:

"published": 
	The published date of the ad

"created":
	The created date of the ad

"title":
	The title of the ad

"body":
	The body of the ad.

"creator":
	A representation of the creator of the ad. 
	This may be a person or an organization.

"images":
	A list of attached images.

There are also other types of fields in an ad:

"subtitle":
	A subtitle, optional.

"lead":
	Lead text, optional.

More fields MAY appear at a different date. 
You must choose a strategy for modeling optional fields.

There must also be some hypermedia controls in the format which 
identifies resources connected to the ad-representation.

There MUST be a way of identifying which ad we are looking at.
The id MUST NOT be a simple identifier.

Useful link relations:
* `self`
* `alternate`
* `contact`
* `organization`
* `person`
* `image`

More link relations may be found here:

http://www.iana.org/assignments/link-relations

For date-times you SHOULD use RFC-3339.
http://www.ietf.org/rfc/rfc3339.txt

example:
2012-06-05T12:00:02.52Z

Hints
---------
Embedding images are not a good idea, so we need to link to them.

XML:
Use attributes where it makes sense instead of elements.

Links:
In Atom, a hypermedia format, there's defined a link type which looks like this:

```xml
<atom:link href="http://example.com/ad/1" rel="self">
```
You can either use this, or come up with our own.


JSON:
It is very easy to introduce incompatible changes in JSON, thereby it's important that
one is diligent when designing the format.

Links:
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

HAL - style
```json
{
	"property-1": "property-value",
	"links": {
		"self": "http://example.com/ad/1"
	}
}
```

Collection+JSON - Style
```json
{
	"href" : "http://example.com/ad/1"
	"links": [
		{"href": "http://example.com/ad/1", "rel": "self", "title": "The current Ad"}
	]
}
```


Steps
-----
Step1:

- Add required fields



Bonus
------

Add a list-version of the current format.


Retrospective
-------------

How can you add new fields without introducing a breaking change?


