var request = require("request")
  , fs = require("fs");

var base = "http://localhost:3000";

var createURI = base + "/create-ad";

var addPictures = base + "/add-picture";

var args = process.argv.slice(2);
var title = args[0];
var body  = args[1];
var images = args.slice(2);

function createAd(title, body, cb) {
	request.post({uri: createURI,
		json: JSON.stringify({ 
			title: title,
	    	body: body
		})
	}, function(err, res, body) {
  		if (err) cb(err);
  		if (res.statusCode == 200) cb(undefined, body.id);
  		else cb("Unexpected status code here"); 
	});
}

function uploadImage(id, file) {
  fs.createReadStream(file).pipe(request.post(addPictures + "?adId=" + id));
}

function getAd(id, cb) {
	request({url: base + "/ad?id="+id, headers: {"Accept": "application/json"}},
 	function(err, res, body) {
  		if (err) cb(err)
  		if (res.statusCode == 200) cb(undefined, body)
  		else cb("Unexpected status code " + res.statusCode); 
	});
}


createAd(title, body, function(err, id) {
	if (err) throw err;
	console.log(base + "/ad?id=" + id);	
	images.forEach(function(img) { uploadImage(id, img); });
	getAd(id, function(err, ad) {
		if (err) throw err;
		console.log(ad);
	});
});
