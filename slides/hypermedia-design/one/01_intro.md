!SLIDE 
# Hypermedia Design #

!SLIDE incremental
# What is hypermedia? #
The World Wide Web [...](the Web) is a system of interlinked hypertext documents accessed via the Internet. 
With a User Agent, one can access documents that may contain text, images, videos, and other multimedia and navigate between them via hyperlinks.

** Slightly modified from http://en.wikipedia.org/wiki/World_Wide_Web**

.notes Collected this can be thought of as Hypermedia. Data With Hypermedia controls.

!SLIDE
# Hyperlinks #
"User interface" controls that encapsulates intent and a target URI.

.notes User interface must be interpreted quite loosely here. It includes both
H2M and M2M.

!SLIDE
# Design #
* Attempt to generalize what is being modeled
* Design for extensibility
* Avoid encoding too much of the domain into media types.

.notes If a customer is being modeled. Think of this as a person/organization.
Take a step back and see if you can think of the problem in a different manner.

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

!SLIDE bullets incremental
# XML Pros #
* Extensible by default (namespaces)
* elements AND attributes
* Lots of tool-support

!SLIDE bullets incremental
# XML Cons #

* Can be wordy and verbose
* Adds boilerplate
* No typed data
* No hypermedia support built in

!SLIDE bullets incremental
# JSON Pros #

* Hot and "new"
* Typed data
* Simple model
* Easy to parse

!SLIDE bullets incremental
# JSON Cons #

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

!SLIDE
# Versioning #
* Do not do this
* Breaking changes needs a new media type.

!SLIDE
# Evolvability #

.notes What you are actually looking for.

!SLIDE bullets incremental
# Extensibility #
* MUST Ignore unknowns
* In XML
 * Use namespaces
 * Allow new elements and attributes to be added in current namespace
* In JSON
 * Constrain certain data
 * Allow new properties to be added to every object.

.notes You must ignore unknown elements and attributes
This also helps the robustness of your parsers.

!SLIDE bullets incremental
# Helping to evolve #
* Content Negotiation
* Intermediaries convert to/from old format.
* Redirect if an old format is detected.

.notes Utilizing HTTP and REST, makes evolvability an obtainable goal.
