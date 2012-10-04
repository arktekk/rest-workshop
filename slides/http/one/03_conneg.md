!SLIDE bullets incremental
# Content Negotiation #
* Server-side negotiation
* Agent negotiation

.notes There are two types of conneg. 

!SLIDE incremental
# Server-side negotiation #
    Accept
    Accept-Language
    Accept-Encoding
    Accept-Charset

.notes Accept* headers

!SLIDE
# Server-side negotiation #
## Server is unable to fulfill the request ##
.code 406 Not Acceptable

!SLIDE
# Server-side negotiation #
## Successful request ##
.code 200 OK

.notes The server SHOULD add a Vary header which lets
any intermediaries and the Agent know how the request 
was negotiated.


!SLIDE smaller
# Accept* header quality #

    Accept: application/json;q=0.4, application/xml, 
    *.*;q=0.3, application/xhtml+xml; q=0.8

.notes Sorted preferred list of acceptable media-types.
All the accept headers have a similar quality syntax.

!SLIDE smaller
# Accept* header qualifiers #

    Accept: application/xml; q=1.0, application/xhtml+xml; q=0.8, 
    application/json;q=0.4, *.*;q=0.3 
    
!SLIDE
# Vary #
    Vary: Accept
    Vary: Accept-Language, Accept, Accept-Charset

.notes If the server selects a representation for you without redirecting, the server SHOULD add
a Vary Header. This is to let caches know that the response varies on selection data.

!SLIDE bullets incremental
# Agent negotiation #

* Agent selects from a set of links which is the most applicable for the current context.
* HTTP Defines status codes: 406 Not Acceptable and 300 Multiple Choices for agent based conneg.

.notes May require more than one request.
Can be improved by having @hreflang and @type in links

!SLIDE smaller
# Agent Negotiation #
  
    {
      "collection": {
        "links": [
          {
            "href": "http://example.com", 
            "rel": "alternate", 
            "prompt": "Main Site"
          },
          {
            "href": "http://example.org", 
            "rel": "alternate", 
            "prompt": "Main Site 2"
          }
        ]
      }    
    }
    
!SLIDE smaller    
# Agent Negotiation #

    <!DOCTYPE html>
    <html>
      <body>
        <a href="http://example.org" rel="alternate" 
        hreflang="en">Main Site</a>
        <a href="http://example.no" rel="alternate" 
        hreflang="no">Main Site in Norwegian</a>
      </body>
    </html>