'use strict';

var ParseClass = require('./ParseClass');
var Parse = require('parse').Parse;

var TimeSlot = ParseClass('TimeSlot', ['name', 'startDate', 'endDate']);

TimeSlot.getAll = function() {
  return new Parse.Query(TimeSlot)
    .find({
      useMasterKey: true
    })
    .then(function(elems) {
      return TimeSlot.convertAll(elems);
    });
};

TimeSlot.get = function(id) {
  return new Parse.Query(TimeSlot)
    .get(id, {
      useMasterKey: true
    })
    .then(function(elem) {
      return elem.convert();
    });
};

module.exports = TimeSlot;
