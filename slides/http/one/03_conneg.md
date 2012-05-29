!SLIDE bullets incremental
# Content Negotiation #
* Server-side negotiation
* Agent negotiation

.notes There are two types of conneg. 

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
All the accept headers have a simliar qualifier syntax.

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

.notes May require more than one request.
Can be improved by having @hreflang and @type in links