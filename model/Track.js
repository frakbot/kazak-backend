'use strict';

var FirebaseClass = require('./../lib/FirebaseClass');
var Track = new FirebaseClass(
  'tracks',
  ['name', 'color'],
  {'events': __dirname + '/Event'}
);

module.exports = Track;
