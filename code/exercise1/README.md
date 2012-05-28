# Exersise 1 - Create a server and a client which will support the base functionalty of an ad-system.


## Introduction
The system will support the following functionality:
* Create a new ad
* Send pictures
* Attach images to an ad
* Fetch an image given an id
* Publish an ad

The server repiles with objects. The client needs to store the object-id and use it in subsequent calls.
Either by generating URLs or in the body of POST messages.

## Ad
An ad has the following properties

    {
      title  : "title",
      body   : "body",
      photos : []
    }



#Bonus

There might be advantages by not hard-coding the ID of the ad for subsequent requests.

    var id = process.argv[2]; //get the first argument after "node file.js"

    if (typeof id === 'undefined') {
        throw new Error("No id supplied"); //If no argument was supplied
    }


Reading of a file might be done this way:

    var fs = require('fs');

    fs.readFile('filename', function(err,data){
      if(err) {
        console.error("Could not open file: %s", err);
        process.exit(1);
      }

      req.write(data); // assuming the request var is 'req'.
    });

## Servers

Use `basic-server.js` as the basis for your server. This is setup with the required modules and framework.