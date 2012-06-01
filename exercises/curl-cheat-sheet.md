### POST data file

    curl --data-binary @/path/to/file <url>

By adding `--data-binary`, curl will change the method to `POST` and
set the `Content-Type` header to `application/x-www-form-urlencoded`.

### POST image file

    curl -X POST -H 'Content-Type: image/jpeg' -T pictures/car.jpg <url>

### Add Request Header

    -H '<Header-Name>: <Header-Value>'

### Change HTTP method

    -X GET|PUT|POST|DELETE|OPTIONS

### Verbose mode

See what curl is actually doing:

    curl -v

### Dump response header data to stdout

    curl -D -

### Do a GET, but ignoring the data

On unix:

    curl -o /dev/null <other-options> <url>

On Windows:

    curl -o nul <other-options> <url>
 
This is useful if combined with `-D` to give you the headers only:

    curl -D - -o /dev/null <url>

### Add `If-None-Match`

This header is mostly useful on conditional GET requests:

    -H 'If-None-Match: <value-of-etag-header>'

### Add `If-Match`

This header is mostly useful on conditional PUT|POST requests:

    -H 'If-Match: <value-of-etag-header>'

### Add `If-Modified-Since`

This header is mostly useful on conditional GET requests:

    -H 'If-Modified-Since: <value-of-last-modified-header>'

### Add `If-Unmodified-Since`

This header is mostly useful on conditional PUT|POST requests:

    -H 'If-Unmodified-Since: <value-of-last-modified-header>'

