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
