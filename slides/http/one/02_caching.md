!SLIDE bullets
# Caching #
* Expiration based
* Validation based

.notes Headers that notify clients and intermediaries of how long a response should be considered fresh.
HTTP advocates use of expiration over validation, but both may be used together.
One caveat: Browsers prefer accuracy over latency, thereby trying to use the validation model 
even if the response is considered fresh by the server.
To reduce traffic when writing browser based clients, consider only having expiration based caches. //TODO: Verify this

!SLIDE
# Expiration based #

.notes Reduces the the latency of the application, thereby increasing the perceived speed of your application.

!SLIDE
# Expires header #

    Expires: Thu, 01 Dec 2012 16:00:00 GMT

.notes Inheritance from HTTP/1.0
Format: HTTP Date in the future until the representation should be considered fresh.
if a response includes a Cache-Control field with the max-age directive, that directive overrides the Expires field.
Expiry dates more than a year are generally not useful. Can be considered cached forever.

!SLIDE
# Max-Age #

    Cache-Control: max-age=3600

.notes This denotes the representation to be fresh for one hour. The resolution for max-age are seconds.
Expiry dates more than a year are generally not useful. max-age > 31536000. Can be considered cached forever.

!SLIDE bullets
# Validation based #
.notes Takes either the ETag or Last-Modified from the previous response and applies it to next request.
Improves the accuracy of the service. Requires conditional-gets, will be explained in a bit. 
Does not reduce the network traffic, but may reduce the number of bytes sent in a response.

!SLIDE bullets incremental
# ETag #
    ETag: "foobar"

* An opaque string which only have meaning for the server.

.notes Also known as an Entity Tag.
This may for instance be a hashed md5 of the body.
It may be a calculated string based on values of the backend.
There are two versions of Etag: Weak and Strong. 
Weak should be considered a semantic tag.
Strong are byte-for-byte equality.

!SLIDE bullets incremental
# Last-Modified #
* A HTTP date for when this resource was last modified
* Caveat: Max resolution of dates in HTTP are seconds.

!SLIDE
# Last-Modified #
    Last-Modified: Sat, 26 May 2012 11:44:04 GMT

!SLIDE
# Conditional GET #
    If-None-Match: "foobar"
    If-Modified-Since: Sat, 26 May 2012 11:44:04 GMT


!SLIDE bullets
# 304 Not Modified #
* Updated headers so the cache can update the metadata for the cached representation.

!SLIDE bullets
# 200 OK #
* A new copy of the representation + metadata which must replace the cached object.

!SLIDE commandline
# Conditional GET - Example #
    $ curl -v -o /dev/null -s \
    http://gfx.dagbladet.no/labrador/\
    217/217889/21788949/jpg/active/978x.jpg

!SLIDE 
# HTTP is optimized for GET #
* about 98 % of all requests are GET
* Remaining % of ALL other methods.