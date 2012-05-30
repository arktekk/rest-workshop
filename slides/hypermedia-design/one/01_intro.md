!SLIDE 
# Hypermedia Design #

!SLIDE incremental
# What is hypermedia? #
The World Wide Web [...](the Web) is a system of interlinked hypertext documents accessed via the Internet. 
With a User Agent, one can access Web content that may contain text, images, videos, and other multimedia and navigate between them via hyperlinks.

** Slightly modified from http://en.wikipedia.org/wiki/World_Wide_Web**

!SLIDE
# Hyperlinks #
"User interface" controls that encapsulates intent and a target URI.

.notes User interface must be interpreted quite loosely here. It includes both
H2M and M2M.

!SLIDE
# Design #
* Attempt to generalize what is being modeled
* Design for extensibility
* MUST IGNORE rule

.notes If a customer is being modeled. Think of this as a person/organization.

!SLIDE bullets incremental
# Data #
* Concepts, not objects
* Generic, but not too generic

.notes Think of media types as a class if that helps the abstraction.
A customer is an instance of a Contact class. 
A Contact is a generalization of Person and Organization.

!SLIDE bullets incremental
# Links #

* Contextualizes the request/response
* Strongly typed
* Signals intent

!SLIDE
# Choose a base format #

.notes XML or JSON.

!SLIDE bullets incremental small
# XML #
* Pros
  * Extensible by default (namespaces)
  * elements AND attributes
  * Lots of tool-support

* Cons
  * Can be wordy and verbose
  * Adds boilerplate
  * No typed data
  * No hypermedia support built in

!SLIDE bullets incremental small
# JSON #
* Pros
  * Hot and "new"
  * Typed data
  * Simple model
  * Easy to parse

* Cons
  * Overhyped
  * Very easy to add backward-incompatible changes
  * Little tool support (improving)
  * No hypermedia support built-in
  * Simple model

!SLIDE bullets incremental smaller
# Serialization #
* DO NOT SERIALIZE OBJECTS AUTOMATICALLY
* DO NOT SERIALIZE OBJECTS AUTOMATICALLY
* DO NOT SERIALIZE OBJECTS AUTOMATICALLY
* DO NOT SERIALIZE OBJECTS AUTOMATICALLY

!SLIDE bullets incremental
# Serialization #

* Always convert to an intermediate before serializing.