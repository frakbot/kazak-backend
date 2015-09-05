'use strict';

var FirebaseClass = require('./FirebaseClass');
var Room = new FirebaseClass(
  'rooms',
  ['name'],
  {'events': 'Event'}
);

module.exports = Room;
