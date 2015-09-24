'use strict';

var FirebaseClass = require('./../lib/FirebaseClass');
var Presenter = FirebaseClass(
  'presenters',
  ['name', 'bio', 'company', 'pic', 'social'],
  {'events': __dirname + '/Event'}
);

module.exports = Presenter;
