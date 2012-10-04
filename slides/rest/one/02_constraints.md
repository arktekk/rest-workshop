!SLIDE
# Constraints #

!SLIDE center
![Client-Server](client-server.gif)

.notes Client/Server.

!SLIDE bullets incremental
# Uniform Interface #
* Identifying resources using URIs
* Manipulation of resources through representations
* Self-descriptive messaging

.notes The same methods are available everywhere.

!SLIDE
	@@@ java
	interface Resource {
		URI id;
		Representation process(Representation r);
		Representation update(Representation r);
		Representation download();
		Representation remove();
	}

.notes Example written in Java.

!SLIDE bullets incremental
# Stateless protocol #
* Request must be self-contained
* No server-side temporary state (HTTP Session)

.notes Everything that the server needs to satisfy the request must be part of the request.
Authentication, freshness rules, Which resource is being requested, capabilities of the agent.


!SLIDE bullets incremental
# Layered System #
* Caching
* Security
* Transparent to the network
* Components may be added after deployment

.notes Layered System. Since we are using HTTP, we get this for free.  This means that Components may be injected into the 
network stack to offload origin servers, or add capabilities of their own. For instance Security.

!SLIDE
# Caching #
* Makes REST Scale
* Part of the layered system
* May be placed anywhere in the network stack
* Use client-caches

.notes Important part for scalability. Caches may be placed anywhere in the stack. As we remember 
from the HTTP talk, caching means that polling works fine.

!SLIDE
# Code on Demand (optional) #
* Adds additional capabilities to an Agent, by downloding code
* Browsers, JavaScript
* ScalaScript
* Python

.notes An Agent may download additional code to be able to add new capabilities for the Agent.
In browsers this means javascript.
