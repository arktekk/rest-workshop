!SLIDE 
# HTTP #

!SLIDE bullets incremental
# History #
* HTTP 0.9 was first publicly available by Tim Berners-Lee et al in 1992.
* HTTP/1.1 1999 Roy T. Fielding et. al 
* HTTP/2.0 is now under development at IETF.

!SLIDE bullets incremental
# Standardized #
* RFC-2616
* http://www.iana.org/protocols/

.notes HTTP is a request/response-based protocol. The communication protocol is stateless. 
Most servers do have some form of server-side session management. This is, however, not part of the specification.
HTTP is extended all the time. This usually is done in the form of Internet Drafts, and becoming RFCs if they are approved by the
IETF (Internet Engineering Task Force).

!SLIDE small
# Wire format #

    GET /message/1
    Host: example.com

    200 OK HTTP/1.1
    Date: Thu, 01 Dec 2012 16:00:00 GMT
    Content-Type: application/json
    Content-Length: 27

    {"message": "Hello World!"}

.notes HTTP is a text based format, It consists of Headers and Body. The headers are separated by \r\n and the body is separated 
from the headers with a double \r\n.
The envelope is based on the MIME-format also used in email.
MIME allows the body to be all kinds for formats, it just needs to be correctly encoded into a MIME-message.

!SLIDE
# HTTP headers #
Metadata which describes the request or response.

!SLIDE
# Some useful headers #
    Content-Type
    Allow
    Cache-Control
    ETag
    Last-Modified
    Retry-After
    User-Agent
    Vary

!SLIDE
# Headers #
http://tools.ietf.org/html/rfc2616#section-14

!SLIDE bullets incremental
# Status Codes #
* Informational (1xx)
* Successful (2xx)
* Redirection (3xx)
* Client Error (4xx)
* Server Error (5xx)

.notes HTTPbis has been refining a lot of these status codes.


!SLIDE
# Informational # 
100 Continue MAY be used if uploading large files (eg. Videos). SHOULD be used in in combination with Expect header.

!SLIDE
# Successful #
200 OK, Denotes a successful response. SHOULD have a message body.

!SLIDE
# Redirection #
301 Moved Permanently, This document has found a new home. Please update links accordingly.

!SLIDE
# Client Error #
401 Authentication Required, Followed with a WWW-Authenticate header:
this lets the Agent know that it must authenticate, or it's credentials are invalid.

!SLIDE
# Server Error #
503 Service Unavailable, Server is overloaded. 
If response contains a Retry-After header, indicates when the Agent can try the request again.

!SLIDE
# Status Codes #
http://tools.ietf.org/html/rfc2616#section-10

!SLIDE
# HTTP Methods #
    GET
    PUT
    POST
    HEAD
    OPTIONS
    DELETE
    TRACE
    CONNECT

.notes These methods are defined by RFC-2616
I have never seen TRACE in use. (Erlend)
This set has been extended by multiple specifications, Webdav for instance.


!SLIDE small
# HTTP Methods #
    
    | Method  | Safe   | Idempotent |
    |---------|--------|------------|
    | GET     | yes    | yes        |
    | PUT     | no     | yes        |
    | POST    | no     | no         |
    | HEAD    | yes    | yes        |
    | OPTIONS | no     | yes        |
    | DELETE  | no     | yes        |
    | TRACE   | no     | yes        |
    | CONNECT | no     | no         |   
    

!SLIDE
# Example #
    curl http://www.vg.no
.notes curl -o /dev/null -D - -s http://www.vg.no

!SLIDE
# HTTP is everywhere #

.notes HTTP is incredibly widespread. 
There are libraries and frameworks in almost every language you can think of. 
Port 80, the default http port, is open in almost every firewall. It has therefore seen a lot of "abuse".

!SLIDE
# Session #
* HTTP Session is not standardized.
* Session state SHOULD be stored client side with use of COOKIES: RFC-6265

.notes Try to avoid server side session state. Replication nightmare.
Cookies can be scoped, so may be more useful
Cookies have security issues, so must be protected. See HttpOnly and secure flags.