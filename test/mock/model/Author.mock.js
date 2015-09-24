'use strict';

var FirebaseClass = require('./../../../lib/FirebaseClass');

module.exports = FirebaseClass(
  'authors',
  ['name'],
  {'books': __dirname + '/Book.mock'}
);
