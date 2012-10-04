!SLIDE 
# Hypermedia Design #

!SLIDE
# Design #
* Attempt to generalize what is being modeled
* Design for extensibility
* Avoid encoding too much of the domain into media types.
* Try to make it as easy to parse as possible.

.notes If a customer is being modeled. Think of this as a person/organization.
Take a step back and see if you can think of the problem in a different manner.

!SLIDE bullets incremental
# Data #
* Concepts, not objects
* Generic, but not too generic

.notes Think of media types as a class if that helps the abstraction.

!SLIDE bullets incremental
# Data example #
* A customer is an instance of a Contact class. 
* Contact is a generalization of Person and Organization.
* Presto: text/vcard

!SLIDE bullets incremental
# Links #

* Contextualizes the request/response
* Strongly typed
* Signals intent

!SLIDE bullets incremental
# Relative links #
* Try to allow for relative links in your designs
* XML has this solved with the xml:base attribute.
* JSON needs a separate solution.

!SLIDE bullets incremental
# Choose a base format #
* XML
* JSON

.notes XML or JSON.

!SLIDE bullets incremental
# XML Pros #
* Document centric.
* Extensible by default (namespaces)
* elements AND attributes
* Lots of tool-support

!SLIDE bullets incremental
# XML Cons #
* Document centric.
* Can be wordy and verbose
* Adds boilerplate
* No typed data
* No hypermedia support built in

!SLIDE bullets incremental
# JSON Pros #
* "object" based
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

!SLIDE
# Making things easy to parse #
* Keep the number of concepts to a minimum.
* Generic concepts MAY be re-used to represent different things, eg. HTML
* Semantics SHOULD be expressed in link relations not in the media-type.

!SLIDE bullets incremental smaller
# Serialization #
* DO NOT SERIALIZE OBJECTS AUTOMATICALLY
* DO NOT SERIALIZE OBJECTS AUTOMATICALLY
* DO NOT SERIALIZE OBJECTS AUTOMATICALLY
* If you do, you WILL get to know pain.


!SLIDE bullets incremental
# Serialization #
* Build a model for your serialization format (intermediate).
* Always convert to the intermediate before serializing.

!SLIDE
# Evolvability #
* This is what you are looking for.
* Think Data, not software.

!SLIDE
# Versioning #
* A solution looking for a problem
* Do NOT do this!!!
* Breaking changes needs a new media type.
* http://www.mnot.net/blog/2011/10/25/web_api_versioning_smackdown

!SLIDE bullets incremental
# Extensibility #
* MUST Ignore unknowns
* In XML
 * Use namespaces
 * Allow new elements and attributes to be added in current namespace
* In JSON
 * Constrain certain data
 * Allow new properties to be added to every object.
 * Develop an extension model

.notes You must ignore unknown elements and attributes
This also helps the robustness of your parsers.

!SLIDE bullets incremental
# Helping to evolve #
* Content Negotiation
* Intermediaries convert to/from old format.
* Redirect if an old format is detected.

.notes Utilizing HTTP and REST, makes evolvability an obtainable goal.
