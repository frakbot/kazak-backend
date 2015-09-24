'use strict';

describe('firebaseErrorHandler', function() {

  var firebaseErrorHandler = require('./../../../lib/firebaseErrorHandler');

  var spyErrorHandler;
  var res;

  var console_error = console.error;

  beforeEach(function() {
    res = {
      status: function() {},
      send: function() {}
    };

    spyOn(res, 'status');
    spyOn(res, 'send');
    spyErrorHandler = firebaseErrorHandler(res);

    // spy console.error so it doesn't pollute the test output
    spyOn(console, 'error');
  });

  afterEach(function() {
    spyErrorHandler = undefined;
    res = undefined;
    // restore console.error so we don't break test debugging
    console.error = console_error;
  });

  describe('standard error', function() {

    it('should print the stack trace if there is one', function() {
      var error = {
        something: 'fishy',
        stack: 'The fish you\' re looking for has flown away.'
      };
      spyErrorHandler(error);
      expect(console.error).toHaveBeenCalledWith(error.stack);
    });

    it('should print the whole error if there\'s no stack trace', function() {
      var theObject = {
        what: 404,
        why: 'no idea lol'
      };
      spyErrorHandler(theObject);
      expect(console.error).toHaveBeenCalledWith(theObject);
    });

  });

  describe('response handling', function() {

    it('should return data and status if it has a status', function() {
      var error = {
        status: 418,
        data: 'I\'m Lord Teapot \'round-the-Sun'
      };
      spyErrorHandler(error);
      expect(res.status).toHaveBeenCalledWith(error.status);
      expect(res.send).toHaveBeenCalledWith(error.data);
    });

    it('should return status 500, a fixed error and stack trace if there\'s no status', function() {
      var error = {
        something: 'fishy',
        stack: 'The fish you\' re looking for has flown away.'
      };
      spyErrorHandler(error);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error: 'Unhandled exception.',
        stack: error.stack
      });
    });

  });

});
