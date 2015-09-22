'use strict';

var FirebaseClass = require('./../lib/FirebaseClass');
var Room = new FirebaseClass(
  'rooms',
  ['name'],
  {
    'events': __dirname + '/Event',
    'secondaryEvents': __dirname + '/Event'
  }
);

module.exports = Room;
