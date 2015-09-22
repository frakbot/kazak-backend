'use strict';

var FirebaseClass = require('./../lib/FirebaseClass');
var Event = FirebaseClass(
  'events',
  ['name', 'description', 'type', 'stars'],
  {
    'rooms': __dirname + '/Room',
    'secondaryRooms': __dirname + '/Room',
    'presenters': __dirname + '/Presenter',
    'track': __dirname + '/Track'
  });

module.exports = Event;
