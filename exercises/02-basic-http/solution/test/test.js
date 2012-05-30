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
  discuss('Create Ad endpoint: ').
    path('/create-ad').
    setHeader('Content-Type', 'application/json').
    post({ title: 'Fin bolig til salgs!', body: 'Fire rom, nytt bad.' }).
    expect(200).
    expect('body should include id key', function (err, res, body) {
      var body = JSON.parse(body);
      assert.ok(body.id);
      id = body.id;
    }).
    get().
    expect(405).
    expect('response should include Allow header', function (err, res, body) {
      assert.equal('Illegal method, you can only use: POST\n', body);
    }).
    expect('body should describe error message', function (err, res, body) {
      assert.equal('Illegal method, you can only use: POST\n', body);
    }).
  undiscuss().unpath().
  next().
  discuss('Ad endpoint').
    get('/ad').
    expect(200).
  undiscuss().unpath().
  next().
  discuss('Generic 404').
    path('/not-found').
    removeHeader('Content-Type').
    get().
    expect(404).
    expect('body should include id key', function (err, res, body) {
      assert.equal(body, 'Not found\n');
    }).
    post().
    expect(404).
    expect('body should include id key', function (err, res, body) {
      assert.equal(body, 'Not found\n');
    }).
export(module);
