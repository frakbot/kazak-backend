'use strict';

var FirebaseClass = require('./FirebaseClass');
var Room = new FirebaseClass(
  'rooms',
  ['name'],
  {
    'events': 'Event',
    'secondaryEvents': 'Event'
  }
);

module.exports = Room;
