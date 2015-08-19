'use strict';

var Q = require('q');

var fSet = function(db, elements) {
  return Q.ninvoke(db, 'set', elements);
};
var fPush = function(db, element) {
  return Q.ninvoke(db, 'push', element);
};

var Purger = function(firebase, Class, newValues) {
  return fSet(firebase.child(Class), {})
    .then(function() {
      var promises = [];
      newValues.forEach(function(value) {
        promises.push(fPush(firebase.child(Class), value));
      });
      return Q.all(promises);
    })
    .then(function() {
      console.log(Class + ': done.');
    }, function(err) {
      console.error(err);
    });
};

module.exports = Purger;
