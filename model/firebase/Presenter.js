'use strict';

var Helper = require('./../../lib/firebase/helper');
var FirebaseClass = require('./FirebaseClass');
var Presenter = FirebaseClass('presenter', ['name', 'bio', 'company'], {
  'talks': 'Talk'
});

Presenter.getAll = function(firebase) {
  return Helper.once(firebase.child('presenters'))
    .then(function(elems) {
      return Presenter.expandAll(firebase, elems);
    });
};

Presenter.get = function(id, firebase, expand) {
  return Helper.once(firebase.child('presenters').child(id))
    .then(function(value) {
      return Presenter.expand(firebase, value, expand || {talks: true}, id);
    });
};

module.exports = Presenter;
