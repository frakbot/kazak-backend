'use strict';

var Helper = require('./../../lib/firebase/helper');
var FirebaseClass = require('./FirebaseClass');
var TimeSlot = new FirebaseClass('timeSlot', ['start', 'end']);

TimeSlot.getAll = function(firebase) {
  return Helper.once(firebase.child('timeSlots'))
    .then(function(elems) {
      return TimeSlot.expandAll(firebase, elems);
    });
};

TimeSlot.get = function(id, firebase) {
  return Helper.once(firebase.child('timeSlots').child(id))
    .then(function(value) {
      return TimeSlot.expand(firebase, value, undefined, id);
    });
};

module.exports = TimeSlot;
