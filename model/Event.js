'use strict';

var FirebaseClass = require('./FirebaseClass');
var Event = FirebaseClass(
  'events',
  ['name', 'description', 'type'],
  {
    'rooms': 'Room',
    'presenters': 'Presenter'
  });

module.exports = Event;
