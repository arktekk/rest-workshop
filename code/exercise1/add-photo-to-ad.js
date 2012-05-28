var http = require("http");
var fs = require("fs");

var id = process.argv[2];
var file = process.argv[3];

if (typeof file === 'undefined' || typeof id === 'undefined' ) {
	throw new Error("id or file not supplied");
}

function mkRequest(options, contentType, datacallback) {
	var req = http.request(options, function(res){
		res.setEncoding("utf8");
		res.on('data', datacallback);
	});
	req.setHeader("Content-Type", contentType);
	req.on('error', function(e) {
	  console.log('problem with request: ', e.message);
	});
	return req;
}

var options = {
  host: '192.168.90.21',
  port: 8000,
  path: "/photo",
  method: 'POST'
};

var req = mkRequest(options, "image/jpeg", function (chunk) {
	var obj = JSON.parse(chunk);
	if (obj.result === "failure") {
		console.log("Failed to posted photo to image, with message: ", obj.message)
	} 
	else {
	    console.log("Successfully posted photo to server with id, : ", obj.photo._id);
	}
		
	options.path = "/ad/" + id;
		
	var req = mkRequest(options, "application/json", function (chunk) {
			var obj = JSON.parse(chunk);
			if (obj.result === "failure") {
				console.log("Failed to posted photo to image, with message: ", obj.message)
			} 
			else {
		    	console.log("Successfully added to ad with id, : ", obj.ad._id);
			}
		});
		
		req.write(JSON.stringify({
			command: "add-photo",
			id : obj.photo._id //One should add the id of the ad object, as this makes the message self-contained.
		}));
		req.end();
});

fs.readFile(file, function(err, data) {
	if (err) {
		console.log("Could not open file: '%s'", err)
		process.exit(1)
	}
	req.write(data)
});

req.end();

