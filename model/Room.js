'use strict';

var ParseClass = require('./ParseClass');
var Parse = require('parse').Parse;

var Room = ParseClass('Room', ['name']);

Room.getAll = function() {
  return new Parse.Query(Room)
    .find({
      useMasterKey: true
    })
    .then(function(elems) {
      return Room.convertAll(elems);
    });
};

Room.get = function(id) {
  return new Parse.Query(Room)
    .get(id, {
      useMasterKey: true
    })
    .then(function(elem) {
      return elem.convert();
    });
};

module.exports = Room;
