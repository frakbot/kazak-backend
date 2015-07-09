'use strict';

var ParseClass = require('./ParseClass');
var errorHandler = require('./../lib/errorHandler');
var Parse = require('parse').Parse;

var Talk = ParseClass('Talk', ['name', 'description', 'subtitle', 'presenters', 'room', 'timeSlot']);

Talk.getAll = function () {
  return new Parse.Query(Talk)
    .include('room')
    .find({
      useMasterKey: true
    })
    .then(function (elems) {
      return Talk.convertAll(elems, [{
        name: 'presenters',
        children: []
      }]);
    }, errorHandler);
};

module.exports = Talk;
