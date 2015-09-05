'use strict';

var FirebaseClass = require('./FirebaseClass');
var Presenter = FirebaseClass(
  'presenters',
  ['name', 'bio', 'company', 'pic', 'social'],
  {'events': 'Event'}
);

module.exports = Presenter;
