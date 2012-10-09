var request = require("request")
  , fs = require("fs");

function createAd(title, body, callback) {
	request.post({uri: "",
		json: { 
			title: title,
	    	body: body
		}
	}, function(err, res, body) {
	});
}


