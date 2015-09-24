'use strict';

var FirebaseClass = require('./../lib/FirebaseClass');
var Schedule = FirebaseClass(
  'schedules',
  [],
  {'events': __dirname + '/Event'}
);

module.exports = Schedule;
