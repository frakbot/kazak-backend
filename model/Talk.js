'use strict';

var FirebaseClass = require('./FirebaseClass');
var Talk = FirebaseClass(
  'talks',
  ['name', 'description'],
  {
    'room': 'Room',
    'presenters': 'Presenter'
  });

module.exports = Talk;
