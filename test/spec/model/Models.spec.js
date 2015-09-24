'use strict';

var _ = require('lodash');

describe('Model', function() {

  var models = ['Event', 'Presenter', 'Room', 'Schedule', 'Star', 'TimeSlot', 'Track'];

  models.forEach(function(modelName) {
    it('should create the ' + modelName + ' class', function() {
      var Model = require('./../../../model/' + modelName);
      expect(Model).toBeDefined();
      expect(_.isFunction(Model)).toBe(true);
    });
  });

});
