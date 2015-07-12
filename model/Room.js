'use strict';

var ParseClass = require('./ParseClass');
var Parse = require('parse').Parse;

var Room = ParseClass('Room', ['name']);

Room.getAll = function() {
  return new Parse.Query(Room)
    .find()
    .then(function(elems) {
      return Room.convertAll(elems);
    });
};

Room.get = function(id) {
  return new Parse.Query(Room)
    .get(id)
    .then(function(elem) {
      return elem.convert();
    });
};

module.exports = Room;
