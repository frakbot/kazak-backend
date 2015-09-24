'use strict';

var FirebaseClass = require('./../../../lib/FirebaseClass');

module.exports = FirebaseClass(
  'editors',
  ['name'],
  {
    'books': __dirname + '/Book.mock'
  }
);
