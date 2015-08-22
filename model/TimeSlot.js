'use strict';

var FirebaseClass = require('./FirebaseClass');
var TimeSlot = new FirebaseClass(
  'timeSlots',
  ['start', 'end']
);

module.exports = TimeSlot;
