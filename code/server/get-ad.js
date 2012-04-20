var http = require("http");

var id = process.argv[2]

if (typeof id === 'undefined') {
	throw "No id supplied";
}

var options = {
  host: '192.168.90.21',
  port: 8000,
  path: '/ad/' + process.argv[2],
  method: 'GET'
};

var req = http.request(options, function(res){
	console.log('STATUS: ', res.statusCode);
	console.log('HEADERS: ', res.headers);
	res.setEncoding('utf8');
	res.on('data', function (chunk) {
	    var obj = JSON.parse(chunk);
		if (obj.result === "failure") {
			console.log("Failed to get ad, with message: ", obj.message)
	    } 
		else {
	    	console.log("Successfully got ad from server, : ", obj.ad);
		}
	});
});

req.on('error', function(e) {
  console.log('problem with request: ', e.message);
});

req.end();