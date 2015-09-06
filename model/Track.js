'use strict';

var FirebaseClass = require('./FirebaseClass');
var Track = new FirebaseClass(
  'tracks',
  ['name', 'color'],
  {'events': 'Event'}
);

module.exports = Track;
