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

!SLIDE
#Basic Authentication #
  WWW-Authenticate: Basic realm="Example"

!SLIDE
#Basic Authentication #
    Authorization: Basic QWxhZGluOnNlc2FtIG9wZW4=
    
* User: Aladin
* Password: sesam open

!SLIDE bullets incremental
# Digest Authentication #
* Does not send password over the wire
* More secure than Basic
* Requires some form of HTTP state server-side
* Prone to man-in-the-middle attacks

.notes Requires HTTPS to be really secure.
Server side state suX0rs

!SLIDE small
# Digest Authentication #

    WWW-Authenticate: Digest realm="testrealm@host.com",
      qop="auth,auth-int",
      nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093",
      opaque="5ccc069c403ebaf9f0171e9517f40e41"

!SLIDE small
# Digest Authentication #
    Authorization: Digest username="Mufasa", 
      realm="testrealm@host.com", 
      nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093", 
      uri="/dir/index.html", 
      qop=auth, 
      nc=00000001,
      cnonce="0a4f113b",
      response="6629fae49393a05397450978507c4ef1",
      opaque="5ccc069c403ebaf9f0171e9517f40e41"

!SLIDE bullets incremental
# OAuth 2 #
* Authorization framework, not Authentication
* Requires HTTPS for initial handshake
* Bearer spec requires HTTPS
* MAC spec does not require HTTPS
* Complex framework (enterprise proof)

.notes Draft 31 at the time of writing.

!SLIDE
# Other #
* OpenId (Browsers only)
* Mozilla Persona (Browsers only)
* AWS (SHOULD have been a standard)

!SLIDE bullets incremental
# HTTPS #
* HTTP + SSL
* Only transport-level security
* Loses intermediary support, as HTTPS in HTTP/1.1 is end-to-end, not hop-by-hop

.notes HTTPS could be added by having a HTTPS loadbalancer.
