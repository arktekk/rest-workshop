var APIeasy = require('api-easy'),
    util = require('util'),
    assert = require('assert');

var suite = APIeasy.describe('Ad API');

var id = "abc";

// Slightly nasty
function setId(outgoing) {
  if(outgoing.uri == 'http://localhost:3000/ad') {
    outgoing.uri += "?id=" + id;
  }
  return outgoing;
}

suite.
  use('localhost', 3000).
  before('setId', setId).
  discuss('Create Ad endpoint,').
    discuss('valid create').
      setHeader('Content-Type', 'application/json').
      post('/create-ad', { title: 'Nice house for sale!', body: 'Four rooms, huge bath.' }).
      expect(200).
      expect('body should include id key', function (err, res, body) {
        var body = JSON.parse(body);
        assert.ok(body.id);
        id = body.id;
      }).
      removeHeader('Content-Type').
    undiscuss().
    discuss('invalid method').
      get('/create-ad').
      expect(405).
      expect('response should include Allow header', function (err, res, body) {
        assert.equal(res.headers['allow'], 'POST');
      }).
      expect('body should describe error message', function (err, res, body) {
        assert.equal('Illegal method, you can only use: POST\n', body);
      }).
    undiscuss().
    discuss('with \'Content-Type: fjas\'').
      setHeader('Content-Type', 'fjas').
      post('/create-ad').
      expect(415).
      removeHeader('Content-Type').
    undiscuss().
  undiscuss().
  next().
  discuss('Ad endpoint').
    discuss('With \'Accept: application/json\'').
      setHeader('Accept', 'application/json').
      get('/ad').
      expect(200).
      removeHeader('Accept').
    undiscuss().
    discuss('With \'Accept: fjas\'').
      setHeader('Accept', 'fjas').
      get('/ad').
      expect(406).
      removeHeader('Accept').
    undiscuss().
  undiscuss().
  next().
  discuss('Generic 404').
    get('/not-found').
    expect(404).
    expect('body should include id key', function (err, res, body) {
      assert.equal(body, 'Not found\n');
    }).
    post('/not-found').
    expect(404).
    expect('body should include id key', function (err, res, body) {
      assert.equal(body, 'Not found\n');
    }).
  undiscuss().
export(module);
