'use strict';

var FirebaseClass = require('./FirebaseClass');
var Stars = FirebaseClass(
  'stars',
  [],
  {'events': 'Event'}
);

module.exports = Stars;
