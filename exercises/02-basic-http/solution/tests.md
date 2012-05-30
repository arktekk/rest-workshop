Test 1
------

    curl -D - --data-binary @ad.json http://localhost:3000/create-ad
    HTTP/1.1 406 You have to post application/json
    Content-Type: text/plain
    Connection: keep-alive
    Transfer-Encoding: chunked

    You have to post application/json

Test 2
------

    curl -H "Content-Type: application/json" -D - --data-binary @ad.json http://localhost:3000/create-ad
    HTTP/1.1 200 OK
    Content-Type: application/json
    Connection: keep-alive
    Transfer-Encoding: chunked

    {"id":"4fc60e6facfd8fa021000001"}
