var request = require('request'),
    assert = require('assert'),
    Step = require('step');

var baseUri = 'http://localhost:3000';

var collectionJson = 'application/vnd.collection+json';


function dumpResponse(res) {
  console.log(res.headers);
  if(/+json$/.test(res.headers['content-type']))
    console.log(JSON.stringify(JSON.parse(res.body), null, 2));
  else
    console.log(body);
}

var count, createUrl;


Step(
// Get the full list of ads, save the count
function() {
  request({
    method: 'GET', uri: baseUri + '/ads',
    headers: {
      'Content-Type': collectionJson
    }}, this);
},
function(err, res, body) { if(err) throw err;
  assert.equal(200, res.statusCode);
  assert.equal(collectionJson, res.headers['content-type']);
  body = JSON.parse(body).collection || {};
  var items = body.items || [];
  count = items.length;
  createUrl = body.href;
  this();
},

// Create a new ad
function(err) { if(err) throw err;
  request({
    method: 'POST', uri: createUrl,
    headers: {
      'Content-Type': collectionJson
    },
    body: JSON.stringify({
      template: {
        data: [
          {name: 'title', value: 'Nice house for sale!'},
          {name: 'body', value: 'Four rooms, huge bath.'}
        ]
      }
    })}, this);
},
function(err, res, body) { if(err) throw err;
  assert.equal(201, res.statusCode);
  assert.ok(/^http:\/\/localhost:3000\/ad\?id=.{24}$/.test(res.headers.location));
  assert.equal(null, res.headers['content-type']);
  var location = res.headers.location;
  console.log('Created ad: ' + location);
  return location;
},

// GET the newly created ad
function(err, adUri) { if(err) throw err;
  request({
    method: 'GET', uri: adUri,
    headers: {
      'Accept': collectionJson
    }}, this);
},
function(err, res, body) { if(err) throw err;
  assert.equal(200, res.statusCode);
  assert.ok(res.headers['content-type'], collectionJson);
  this();
},

// Get the list again and check the new count.
function() {
  request({
    method: 'GET', uri: baseUri + '/ads',
    headers: {
      'Accept': collectionJson
    }}, this);
},
function(err, res, body) { if(err) throw err;
  body = JSON.parse(body).collection;
  assert.equal(count + 1, body.items.length);
  this();
},

function(err) { if(err) throw err;
  console.log('Success!');
}
);
