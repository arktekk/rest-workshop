!SLIDE bullets incremental
# Internet media type #
* Used for classification of content on the Web.
* Type and subtype
* The type denotes the area of use
* Subtype indicates processing model.


.notes Type denotes the area of use.

!SLIDE
# The *image* type #
The media type *image/png* lets you know that this is an Image and should be processed as 
a lossless PNG image.

!SLIDE bullets incremental
# MIME type #
* Multipurpose Internet Mail Extensions
* Non-ascii parts of email messages.
* Email clients are unable to understand attachments without it.

.notes The original name MIME type referred to usage to identify non-ASCII parts of email messages composed using the MIME (Multipurpose Internet Mail Extensions) specification. Without MIME types, email clients would not be able to understand if an attachment file were a PNG file or a spreadsheet and would not be able to show the attachment appropriately.

!SLIDE
# Media type registry #
* There are 100s of registered media types in the [IANA Registry](http://www.iana.org/assignments/media-types/index.html)

!SLIDE
# Examples #

    application/json
    application/xml
    application/xhtml+xml
    application/atom+xml
    application/vnd.collection+json
    text/html
    text/plain
    image/png
    image/jpeg
    video/ogg
    video/mpeg
    
!SLIDE incremental
# subtype trees #
* *vnd* is the vendor tree
  * application/vnd.collection+json

* *prs* is the personal tree
  * application/prs.plucker

* *no-prefix* is the standards tree
  * application/atom+xml

!SLIDE incremental
# Specific media-types #
* *image/png* is an example of a specific media type.

!SLIDE incremental
# Generic media-types #
* *application/vnd.collection+json* is an example of a generic *list-style* media type.
* *application/atom+xml* is an example of a generic *list-style* media type.

!SLIDE incremental
# application/collection+json #
* Based on JSON
* Crafted by Mike Amundsen
  * Author of "Building Hypermedia APIs with HTML5 and Node"
* http://amundsen.com/media-types/collection/

.notes Built on ideas from Atom, but has a lot of extra hypermedia controls not built into atom.

!SLIDE even-smaller
    @@@ json
    { "collection": {
            "version": "1.0",
            "href": "http://example.com",
            "items": [
                {   "href": "http://example.com/item/1",
                    "data": [
                        {"name": "title", "prompt": "Title", 
                        "value": "My Ad"}
                    ]
                }
            ],
            "queries": [
                {   "href": "http://example.com/item"
                    "rel": "alternate search"
                    "data": [
                        {"name": "q", "prompt": "Fulltext Query"}
                    ]
                }
            ]            
        }
    }

!SLIDE even-smaller
# Atom #
    @@@ xml
    <feed xmlns="http://www.w3.org/2005/Atom">
        <id>urn:uuid:some-uuid-here</id>
        <updated>2012-05-05T12:00:00.00Z</updated>
        <author>
            <name>foo</name>
        </author>
        <link rel="self" href="http://example.com/feed"/>
        <entry>
            <id>urn:id:123</id>
            <updated>2012-05-05T12:00:00.00Z</updated>
            <published>2012-05-05T12:00:00.00Z</published>
            <content type="xhtml">
              <div xmlns="http://www.w3.org/1999/xhtml">
               <p>Something is written here</p>
              </div>
            </content>
        </entry>
        ....
    </feed>
    
.notes Atom is quite nice for stuff that maps to it. Its more specific than collection+json
since it targets articles, blogs etc.

!SLIDE
# HTML #
* Everyone knows html
* Nice for sending structured text

!SLIDE
# Error media type #
* Meant to be used for adding application semantics on top of HTTP errors.


!SLIDE
# Custom media-types #
You are allowed to create your own media type and (optionally) register it with IANA.

.notes For an organization it is probably best of putting it into the vendor tree, and
moving it to a standards-body if it gains traction.

!SLIDE
# Hypermedia #

The World Wide Web [...](the Web) is a system of interlinked hypertext documents 
accessed via the Internet. 
With a User Agent, one can access documents that may contain text, images, 
videos, and other multimedia and navigate between them via hyperlinks.

** Slightly modified from http://en.wikipedia.org/wiki/World_Wide_Web**

.notes Collected this can be thought of as Hypermedia. Data With Hypermedia controls.

!SLIDE
# Hyperlinks #
"User interface" controls that encapsulates intent and a target URI.

.notes User interface must be interpreted quite loosely here. It includes both
H2M and M2M.

!SLIDE bullets incremental
# Link Relation #
* A property of a link which signals intent.
* Gives context for a User Agent
* Signals what the target URI is
    
!SLIDE
# Encoding of link relations #
    @@@ html
    <link href="/" rel="alternate"/>

    <img src="foo.png"/>

.notes can be done in a multitude of ways. Either by name of the element/property, or 
a property/attribute on the link itself.

