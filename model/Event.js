'use strict';

var FirebaseClass = require('./FirebaseClass');
var Event = FirebaseClass(
  'events',
  ['name', 'description', 'type'],
  {
    'room': 'Room',
    'presenters': 'Presenter'
  });

module.exports = Event;
