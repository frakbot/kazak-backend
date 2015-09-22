'use strict';

var FirebaseClass = require('./FirebaseClass');
var Event = FirebaseClass(
  'events',
  ['name', 'description', 'type', 'stars'],
  {
    'rooms': 'Room',
    'secondaryRooms': 'Room',
    'presenters': 'Presenter',
    'track': 'Track'
  });

module.exports = Event;
