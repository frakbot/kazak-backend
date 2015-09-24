'use strict';

var FirebaseClass = require('./../lib/FirebaseClass');
var Stars = FirebaseClass(
  'stars',
  [],
  {'events': __dirname + '/Event'}
);

module.exports = Stars;
