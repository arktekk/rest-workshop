01: RPC over HTTP
=================

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
