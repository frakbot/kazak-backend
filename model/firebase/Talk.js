'use strict';

var Helper = require('./../../lib/firebase/helper');
var FirebaseClass = require('./FirebaseClass');
var Talk = FirebaseClass('talk', ['name', 'description'], {
  'room': 'Room',
  'presenters': 'Presenter'
});

Talk.getAll = function(firebase) {
  return Helper.once(firebase.child('talks'))
    .then(function(elems) {
      return Talk.expandAll(firebase, elems);
    });
};

Talk.get = function(id, firebase, expand) {
  return Helper.once(firebase.child('talks').child(id))
    .then(function(value) {
      return Talk.expand(firebase, value, expand || {room: true, presenters: true}, id);
    });
};

module.exports = Talk;
