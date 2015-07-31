'use strict';

var Helper = require('./../../lib/firebase/helper');
var FirebaseClass = require('./FirebaseClass');
var Room = new FirebaseClass('room', ['name'], {
  'talks': 'Talk'
});

Room.getAll = function(firebase) {
  return Helper.once(firebase.child('rooms'))
    .then(function(elems) {
      return Room.expandAll(firebase, elems);
    });
};

Room.get = function(id, firebase, expand) {
  return Helper.once(firebase.child('rooms').child(id))
    .then(function(value) {
      return Room.expand(firebase, value, expand || {talks: true}, id);
    });
};

module.exports = Room;
