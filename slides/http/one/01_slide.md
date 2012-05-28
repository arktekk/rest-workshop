!SLIDE 
# HTTP #

!SLIDE
# History #
.notes HTTP 0.9 was first publicly available by Tim Berners-Lee et al in 1992.
.notes Optimized for HTML as that was the current state of affairs.
.notes 1.0 was updated to be the first standardized version of HTTP.
.notes Later, Roy T. Fielding et. al published in 1999 version 1.1  and is today the current protocol in use.

!SLIDE bullets incremental
# Standardized #
* RFC-2616
* http://www.iana.org/protocols/

.notes HTTP is a request/response-based protocol. The communication protocol is stateless. 
.notes Most servers do have some form of server-side session management. This is, however, not part of the specification.
.notes HTTP is extended all the time. This usually is done in the form of Internet Drafts, and becoming RFCs if they are approved by the
.notes IETF (Internet Engineering Task Force).

!SLIDE small
# Request format #
<pre>
GET /message?msg=1
Host: example.com

200 OK HTTP/1.1
Date: Thu, 01 Dec 2012 16:00:00 GMT
Content-Type: application/json
Content-Length: 27

{"message": "Hello World!"}
</pre>
.notes HTTP is a text based format, It consists of Headers and Body. The headers are separated by \r\n and the body is separated 
.notes from the headers with a double \r\n.
.notes The envelope is based on the MIME-format also used in email.
.notes MIME allows the body to be all kinds for formats, it just needs to be correctly encoded into a MIME-message.

!SLIDE bullets incremental
# Status Codes #
* Informational (1xx)
* Successful (2xx)
* Redirection (3xx)
* Client Error (4xx)
* Server Error (5xx)

.notes Informational -> 100 Continue MAY be used if uploading large files (eg. Videos). SHOULD be used in in combination with Expect header.
.notes Successful -> 200 OK, Denotes a successful response.
.notes Redirection -> 301 Moved Permanently, This document has found a new home. Please update links accordingly.
.notes Client Error -> 401 Authentication Required, Followed with a WWW-Authenticate header:
.notes this lets the Agent know that it must authenticate, or it's notes. credentials are invalid.
.notes Server Error => 503 Service Unavailable, Server is overloaded. 
.notes If response contains a Retry-After header, indicates when the Agent can try the request again.
.notes HTTPbis has been refining a lot of these status codes.


!SLIDE
# HTTP Methods #
* GET
* PUT
* POST
* HEAD
* OPTIONS
* DELETE
* TRACE
* CONNECT

.notes These methods are defined by RFC-2616
.notes I have never seen TRACE in use. (Erlend)
.notes Extensions Methods are added all the time. See the registry for more methods. 
.notes Some 30odd methods are defined at the time of writing

!SLIDE
# Example #
.notes curl -I http://www.vg.no
.notes curl -o /dev/null -D - -s http://www.vg.no

!SLIDE
# HTTP is everywhere #

.notes HTTP is incredibly widespread. 
.notes There are libraries and frameworks in almost every language you can think of. 
.notes Port 80, the default http port, is open in almost every firewall. It has therefore seen a lot of "abuse".

!SLIDE
# Session #
* HTTP Session is not standardized.
* Session state SHOULD be stored client side with use of COOKIES: RFC-6265

!SLIDE bullets
# Caching #
* Expiration based
* Validation based

.notes Headers that notify clients and intermediaries of how long a response should be considered fresh.
.notes HTTP advocates use of expiration over validation, but both may be used together.
.notes One caveat: Browsers prefer accuracy over latency, thereby trying to use the validation model 
.notes even if the response is considered fresh by the server.
.notes To reduce traffic when writing browser based clients, consider only having expiration based caches. //TODO: Verify this

!SLIDE
# Expiration based #

.notes Reduces the the latency of the application, thereby increasing the perceived speed of your application.

!SLIDE
# Expires header #

Expires: Thu, 01 Dec 2012 16:00:00 GMT

.notes Inheritance from HTTP/1.0
.notes Format: HTTP Date in the future until the representation should be considered fresh.
.notes if a response includes a Cache-Control field with the max-age directive, that directive overrides the Expires field.
.notes Expiry dates more than a year are generally not useful. Can be considered cached forever.

!SLIDE
# Max-Age #

.code Cache-Control: max-age=3600

.notes This denotes the representation to be fresh for one hour.
.notes The resolution for max-age are seconds.
.notes Expiry dates more than a year are generally not useful. max-age > 31536000. Can be considered cached forever.

!SLIDE bullets
# Validation based #
.notes Takes either the ETag or Last-Modified from the previous response and applies it to next request.
.notes Success yields either (next)

!SLIDE bullets
# 304 Not Modified #
* Updated headers so the cache can update the metadata for the cached representation.

!SLIDE bullets
# 200 OK #
* A new copy of the representation + metadata which must replace the cached object.


!SLIDE bullets incremental
# ETag #
.code ETag: "foobar"

* An opaque string which only have meaning for the server.

.notes Also known as an Entity Tag.
.notes This may for instance be a hashed md5 of the body.
.notes It may be a calculated string based on values of the backend.
.notes There are two versions of Etag: Weak and Strong. 
.notes Weak should be considered a semantic tag.
.notes Strong are byte-for-byte equality.

!SLIDE bullets incremental
# Last-Modified #
* A HTTP date for when this resource was last modified
* Caveat: Max resolution of dates in HTTP are seconds.

!SLIDE
# Last-Modified #
.code Last-Modified: Sat, 26 May 2012 11:44:04 GMT

!SLIDE
# Conditional GET #
.code If-None-Match: "foobar"
If-Modified-Since: Sat, 26 May 2012 11:44:04 GMT

!SLIDE
# Conditional GET - Example #

.notes curl -D - -o /dev/null -s http://gfx.dagbladet.no/labrador/217/217889/21788949/jpg/active/978x.jpg

.notes Show example of GETTING an image from DB

!SLIDE 
# HTTP is optimized for GET #

!SLIDE bullets incremental
# Content Negotiation #
* Server-side negotiation
* Agent negotiation

!SLIDE bullets incremental
# Server-side negotiation #
* Accept
* Accept-Language
* Accept-Encoding
* Accept-Charset

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
# Accept* header qualifiers #
<pre class="noformat">
Accept: application/json;q=0.4, application/xml, 
 *.*;q=0.3, application/xhtml+xml; q=0.8
</pre>

.notes Sorted preferred list of acceptable media-types.
.notes All the accept headers have a simliar qualifier syntax.

!SLIDE smaller
# Accept* header qualifiers #

<pre class="noformat">
Accept: application/xml, application/xhtml+xml; q=0.8, 
application/json;q=0.4, *.*;q=0.3 
</pre>

!SLIDE bullets incremental
# Agent negotiation #

* Agent selects from a set of links which is the most applicable for the current context.
* HTTP Defines status codes: 406 Not Acceptable and 300 Multiple Choices for agent based conneg.

!SLIDE
# Intermediaries #
* Servers which sits between server and client and provides some form of value-add service

.notes Security. transforming, caching (proxies).
.notes Should be illustrated with a drawing.

!SLIDE bullets incremental
# Intermediary examples #
* Reverse Caching
* Forward Caching
* Pre-lookup of DNS based on links and history of the current client's request history.
* Transforming
* Load-balancing

.notes Transforming: Add a drawing for this.

!SLIDE
# Security #

!SLIDE bullets incremental
# Authentication - RFC-2617 #
* Authentication framework for HTTP

.notes Consists of WWW-Authenticate, Authorization and Authentication-Info.

!SLIDE bullets incremental
# Basic Authentication #
* Sends username:password encoded in base64
* Not secure, unless sent over HTTPS

.notes Simple, easy to deploy.
.notes SHOULD NOT be used unless using HTTPS.

!SLIDE bullets incremental
# Digest Authentication #
* Does not send password over the wire
* More secure than Basic
* Requires some form of HTTP state server-side
* Prone to man-in-the-middle attacks

.notes Requires HTTPS to be really secure.
.notes Server side state suX0rs

!SLIDE bullets incremental
# OAuth 2 #
* Secure HTTP authentication
* Requires HTTPS for initial handshake
* Bearer spec requires HTTPS
* MAC spec does not require HTTPS

.notes Work in progress at the time of writing. Last Call has been issued.

!SLIDE bullets incremental
# HTTPS #
* HTTP + SSL
* Only transport-level security
* Loses intermediary support, as HTTPS in HTTP/1.1 is end-to-end, not hop-by-hop

.notes HTTPS could be added by having a HTTPS loadbalancer.
