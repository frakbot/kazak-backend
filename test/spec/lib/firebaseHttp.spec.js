'use strict';

var _ = require('lodash');
var nock = require('nock');

describe('firebaseHttp', function() {

  var firebaseHttp = require('./../../../lib/firebaseHttp');

  var _config_ = {
    url: 'https://kazak-woof.firebaseio.com',
    secret: 'lanaaaaaaa'
  };

  var defaultQuery = {
    auth: _config_.secret
  };

  var element = {
    id: 1337,
    exists: 'yup'
  };

  beforeEach(function() {

    nock(_config_.url)
      .get('/existing/collection.json')
      .query(defaultQuery)
      .reply(200, element);

    nock(_config_.url)
      .get('/nope/nothing/here.json')
      .reply(404);

    nock(_config_.url)
      .post('/existing/element.json', element)
      .query(defaultQuery)
      .reply(200, element);

  });

  afterEach(function() {
    nock.cleanAll();
  });

  it('should resolve a promise with the fetched data', function(done) {
    return firebaseHttp('GET', _config_, 'existing', 'collection')
      .then(function(value) {
        expect(value.id).toBe(1337);
        expect(value.exists).toBe('yup');
        done();
      });
  });

  it('should reject a promise with the error', function(done) {
    var promise = firebaseHttp('GET', _config_, 'nope/nothing', 'here');
    spyOn(promise, 'then');
    return promise.catch(function(error) {
      expect(promise.then).not.toHaveBeenCalled();
      expect(error).toBeDefined();
      done();
    });
  });

  it('should post an object and return an object', function(done) {
    return firebaseHttp('POST', _config_, 'existing', 'element', element)
      .then(function(value) {
        expect(_.isString(value)).toBe(false);
        expect(_.isObject(value)).toBe(true);
        expect(value.id).toBe(element.id);
        expect(value.exists).toBe(element.exists);
        done();
      });
  });

});
