'use strict';

var FirebaseClass = require('./FirebaseClass');
var Schedule = FirebaseClass(
  'schedules',
  [],
  {'events': 'Event'}
);

module.exports = Schedule;
