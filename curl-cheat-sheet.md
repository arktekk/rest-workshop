POST image file:

	curl -X POST -H 'Content-Type: image/jpeg' -T pictures/car.jpg <url>

Add Header to command:

	-H 'Content-Type: image/jpeg'

Add If-None-Match:
	-H 'If-None-Match: <value-of-etag-header'

Change HTTP method:
	-X GET|PUT|POST|DELETE|OPTIONS

Verbose mode, See what curl is actually doing:
	-v

Dump header data to stdout:
	-D -

execute a GET, but ignoring the data:
	curl -o /dev/null <other-options> <url>

execute a GET, but ignoring the data on Windows:
	curl -o nul <other-options> <url>
 
