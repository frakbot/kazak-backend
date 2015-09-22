'use strict';

var FirebaseClass = require('./../../../lib/FirebaseClass');

module.exports = FirebaseClass(
  'books',
  ['title', 'pages'],
  {
    'author': __dirname + '/Author.mock',
    'editor': __dirname + '/Editor.mock'
  }
);
