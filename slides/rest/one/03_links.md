!SLIDE
# Elevating data as a first-class architectural element #

.notes Since we need to care about data, the structure of data and how it should be operated upon, becomes important. 
Structure becomes important, the data needs to be parsed, and contain something that lets clients know
how to operate on those data.

!SLIDE
# HATEOAS #
"The scary part of REST"

!SLIDE
# Hypertext as the engine of application state #

.notes to be able to understand this sentance, one must first understand what hypertext means. 
Then you need to understand what application means. And lastly understanding what engine in this context means.

!SLIDE
# The "link" constraint #

.notes This is something that "restafarians" keep scaring people with. Basically this can be thought of (click)

!SLIDE
# LINKS #
	@@@ html
	<a href="http://example.com">

	<link rel="stylesheet" href="http://static.example.com/1.css">

	<img src="http://static.example.com/1234.png">

.notes as Links, or hyperlink.

!SLIDE
# Why are links important #
* Links helps decouple server and client. 
* An agent does not need to know how the server works internally.
* Intent can be expressed in a link.

!SLIDE
# Use links to let your client application know what is possible to do next #

.notes Links may take many forms and sizes, We will return to this subject later.

!SLIDE
# MUD Example #

    You are in a room, there is a wizard here. You can GO NORTH, SOUTH, EAST.
    There is an empty whisky BOTTLE on the floor. You can hear the wizard snoring.
    
.notes Anyone seen something like this? *Hands* 
This can be thought of a representation with links to NORTH, SOUTH, EAST.
You could always try to GO another direction, like WEST, the MUD server would then
give you an error message. There would be a limited set of operations the player could use, so
this would map to the Uniform interface. You could for instance try to PICK UP NORTH.

