Agenda
======

Two days:

00. Who are the people that are here, what is their goal and what do they hope to learn?
01. Discussion: System integration in 2012
02. Intro NODE
03. Exercise 1
04. Intro HTTP
04. Exercise 2
05. REST
06. Exercise 3
07. Media-Types
08. Exercise 4
09. Hypermedia Design
10. Exercise 5

01: RPC over HTTP
=================

Discussion
----------

* Bakgrunn / Historie
 * Sockets
 * Corba/IDL/IIOP
  * ORB
  * EJB 
  * COM / COM+ / DCOM
  * RMI
  * Transaksjoner
  
 * SOAP ( Web services)
  * WSDL
  * UDDI
  * WS-* (nevne REST-*?)
  
 * XML
  * Dokumentformat, Forenkling av SGML
  * XML-Schema
 
 * XML-RPC
 
 * The Web
  * HTTP
  * Hypermedia

* Dagens tilstand
 * Forklare litt hvordan integrasjon gjøres i dag som oppbygning mot de senere foredragene og oppgavene.

 * SOAP
  * HTTP
  * JMS
  * Sikkerhet

 * "REST"
  * JSON RPC
  * POX

Retrospective
-------------

* How will this application handle new fields?
* What happens if the server changes its business rules?

Problems/flaws with this solution
---------------------------------

* POSTing random content types
* Sending commands ("create-ad") to hard-coded endpoints

02: Basic HTTP
==============

Retrospective
-------------

* Now that we use HTTP's status codes to tell us the result of the
  request we don't need the 'result' field anymore, we just add a new
  'type' field.

  By having a single 'type' field we know what kind of object the
  resource is encoding. Discuss how useful a generic media type like
  'application/json' is vs a domain specific media type.

  Did you see the advantage of using status codes instead of encoding
  error states in the JSON object?

* Did it make sense to use `text/plain` for the error messages? How
  did that feel?
* How will this application handle new fields?
* What happens if the server changes its business rules?

03: Links
=========

### General

* Eye opener: note now that it is possible to write a fairly reusable
  client for working on ads and lists of ads. The client's have no
  prior knowledge of the URLs to be used.

  This means that it is possible to relocate the server (change the
  URL). It is possible to also only change the URL to the ads.
  This might happen if we choose to cache all ads on a caching server,
  but let the list come from an origin server.
  
  It is also possible to give different URLs to each consumer, where
  each URL include a token that the server can use to filter what the
  user agent gets returned. (Google Calendar does this).

### Media Type Description

* Note that the media type description say that there is no way to
  only update some fields in an ad.

  Question: What happens if that is something that we want to support later?

  Talk about the PATCH method and the different media types that have
  popped up as suggestions on how one can do updates on an resource.

* Note that there was no talk on methods or HTTP specific stuff. Only
  links and media types.

The media type description document is a good example of a simple,
domain specific media type. Simple, extensible and as specified as
required for clients.

05: Hypermedia
==============
