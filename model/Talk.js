'use strict';

var ParseClass = require('./ParseClass');
var errorHandler = require('./../lib/errorHandler');
var Parse = require('parse').Parse;

var Talk = ParseClass('Talk',
  ['name', 'description', 'subtitle', 'presenters', 'room', 'timeSlot']);

var talkExpansions = [{
  name: 'presenters',
  children: []
}];

Talk.getAll = function() {
  return new Parse.Query(Talk)
    .include('room')
    .include('timeSlot')
    .find({
      useMasterKey: true
    })
    .then(function(elems) {
      return Talk.convertAll(elems, talkExpansions);
    }, errorHandler);
};

Talk.get = function(id) {
  return new Parse.Query(Talk)
    .include('room')
    .include('timeSlot')
    .get(id, {
      useMasterKey: true
    })
    .then(function(elem) {
      return elem.convert(talkExpansions);
    }, errorHandler);
};

module.exports = Talk;
