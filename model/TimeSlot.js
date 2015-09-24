'use strict';

var FirebaseClass = require('./../lib/FirebaseClass');
var TimeSlot = new FirebaseClass(
  'timeSlots',
  ['start', 'end']
);

module.exports = TimeSlot;
