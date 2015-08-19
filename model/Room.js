'use strict';

var FirebaseClass = require('./FirebaseClass');
var Room = new FirebaseClass(
  'rooms',
  ['name'],
  {'talks': 'Talk'}
);

module.exports = Room;
