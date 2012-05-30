var APIeasy = require('api-easy'),
    assert = require('assert');

var id;

var suite = APIeasy.describe('Ad API').
  use('localhost', 3000).
  discuss('Create Ad endpoint: ').
    path('/create-ad').
    setHeader('Content-Type', 'application/json').
    post({ title: 'Fin bolig til salgs!', body: 'Fire rom, nytt bad.' }).
    expect(200).
    expect('body should include id key', function (err, res, body) {
      var body = JSON.parse(body);
      assert.ok(body.id);
      console.log("setting id!");
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
  undiscuss().unpath().
  next().
  discuss('Ad endpoint').
    get('/ad', {id: id}).
    expect(200).
export(module);
