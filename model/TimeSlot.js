'use strict';

var Rx = require('rx');
var Talk = require('./Talk');
var Parse = require('parse').Parse;

var TimeSlot = {};

TimeSlot.getAll = function() {
  return new Parse.Query(Talk)
    .select(['start', 'end'])
    .find()
    .then(function(allTimeSlots) {
      return Rx.Observable
        .from(allTimeSlots)
        .distinct(undefined, function(x, y) {
          return (x.get('start').getTime() === y.get('start').getTime() &&
                  x.get('end').getTime() === y.get('end').getTime());
        })
        .toArray()
        .toPromise();
    })
    .then(function(elems) {
      return Talk.convertAll(elems, undefined, {'id': true});
    });
};

module.exports = TimeSlot;
