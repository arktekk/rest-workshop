!SLIDE
# Node.js #

!SLIDE bullets incremental
# At a glance #
* Runs JavaScript on the server.
* Built on top of Google's V8 engine.
* Standalone.
* Lightweight.
* Cross platform.

.notes Ships with a set of core libraries, for interaction with the filesystem and network among other things.
Cross platform thanks to libuv.

!SLIDE bullets incremental
# History #
* Project started by Ryan Dahl in 2009.
* Gained popularity quickly.
* Has a large, active community worldwide.
* Now maintained by Joyent inc.

.notes Ryan pondered writing an event web server. Considered LUA and other languages, but settled with JavaScript
due to the lack of existing IO API.
Got lots of attention after jsconf in 09.

!SLIDE bullets incremental
# Key principles #
* Single threaded - no locking.
* Event-driven, asynchronous I/O.
* Non-blocking.
* CPU-bound tasks dispatched to other workers.

.notes There has been a lot of discussion surrounding Node.js' applicability for servers with CPU-bound tasks.
This is easily solved by dispatching such tasks to a pool of other nodes, then go on to handle other requests.
When the CPU-bound task is completed, the main node is notified and a response can be sent.

!SLIDE bullets incremental
# Modules #
* The package manager: NPM.
* More than 10.000 modules.
* Something for everything, but no guarantees.

.notes Comparable to rubygems, but favors locally istalled packages. Makes it relatively easy to handle versioning,
and dead simple to see where different dependencies are pulled in from.

!SLIDE bullets incremental
# Success factors #
* Well known language.
* Easy to use.
* NPM quickly hit critical mass.
* Event model works for hip web apps.
* Share code between browser and server.
