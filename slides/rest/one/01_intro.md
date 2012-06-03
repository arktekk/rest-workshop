!SLIDE 
# REST #

!SLIDE bullets incremental
# History #

* First Coined by Roy T. Fielding in his dissertation

.notes While developing HTTP/1.1, Fielding also wrote his PhD dissertation. REST is the example in his dissertation.

!SLIDE
# Architectural Styles and the Design of Network-based Software Architectures #

.notes Describing architectural styles are a set of constraints to obtain certain properties or qualities within a concrete software architecture. REST is a network based architectural style. RPC is another style, Pipe and Filter a third.

!SLIDE
# Connector #
Software that communicates with the network. Typically a HTTP server, or HTTP Client.


!SLIDE
# Resource #

.notes this is what you should think the most of when you are designing a RESTful architecture. 
Think in nouns not verbs. What IS it? Not What can I do with it.

!SLIDE
# Representation #

.notes A representation is an encoding of the resource state, served over the network. 
A representation is also known as a hypermedia format or Media Type. 
This will be explained in detail later.

!SLIDE center
![amazon](amazon.png)

!SLIDE center
![amazon](amazon-representation.png)
