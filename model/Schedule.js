'use strict';

var FirebaseClass = require('./FirebaseClass');
var Schedule = FirebaseClass(
  'schedules',
  [],
  {'talks': 'Talk'}
);

module.exports = Schedule;
