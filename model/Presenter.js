'use strict';

var FirebaseClass = require('./FirebaseClass');
var Presenter = FirebaseClass(
  'presenters',
  ['name', 'bio', 'company'],
  {'talks': 'Talk'}
);

module.exports = Presenter;
