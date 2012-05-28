Exercise 1
==========

Goal
----

Create a classic "RPC over HTTP" application.

Background
----------

You are working for a company that has a classified advertisements
website. The task is to create a server used to create new ads. For
now, you only need to implement the server side.

Requirements
------------

The server shall expose two endpoints:

* `http://localhost:3000/create-ad`: Clients POST here.

* `http://localhost:3000/ad`: Clients can GET this with an "id" query
  parameter

Steps
-----

### Step 1: Create an ad

Test your server with curl:

    curl  --data-binary @ad.json http://localhost:3000/create-ad

### Step 2: View an ad

    curl http://localhost:3000/ad?id=<insert id here>
