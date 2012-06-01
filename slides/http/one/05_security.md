!SLIDE
# Security #

!SLIDE bullets incremental
# Authentication - RFC-2617 #
* Authentication framework for HTTP
* WWW-Authenticate
* Authorization
* Authentication-Info.

!SLIDE bullets incremental
# Basic Authentication #
* Sends username:password encoded in base64
* Not secure, unless sent over HTTPS

.notes Simple, easy to deploy.
SHOULD NOT be used unless using HTTPS.

!SLIDE bullets incremental
# Digest Authentication #
* Does not send password over the wire
* More secure than Basic
* Requires some form of HTTP state server-side
* Prone to man-in-the-middle attacks

.notes Requires HTTPS to be really secure.
Server side state suX0rs

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
