'use strict';

var ParseClass = require('./ParseClass');
var Parse = require('parse').Parse;

var Talk = ParseClass('Talk',
  ['name', 'description', 'subtitle', 'presenters', 'room', 'start', 'end']);

var talkExpansions = {
  'presenters': {
    'include': {},
    'exclude': {}
  }
};

Talk.getAll = function() {
  return new Parse.Query(Talk)
    .include('room')
    .find({
      useMasterKey: true
    })
    .then(function(elems) {
      return Talk.convertAll(elems, talkExpansions);
    });
};

Talk.get = function(id) {
  return new Parse.Query(Talk)
    .include('room')
    .get(id, {
      useMasterKey: true
    })
    .then(function(elem) {
      return elem.convert(talkExpansions);
    });
};

module.exports = Talk;
