'use strict';

var Q = require('q');

var fSet = function(db, elements) {
  return Q.ninvoke(db, 'set', elements);
};
var fPush = function(db, element) {
  return Q.ninvoke(db, 'push', element);
};

var Linker = function(firebase, ParentClass, ChildClass, parentRelation, childRelation, values) {
  // WATCH THIS: https://www.youtube.com/watch?v=hUFPooqKllA !!!11!1
  var allThePromisesWeMade = [];

  // for each parent, store the found children
  values.forEach(function(value) {

    // build the parent and children queries
    var parentQuery = firebase.child(ParentClass).orderByChild('name').equalTo(value.name);
    var childQueries = [];
    // if we have to hold a single relation
    if (value.hasOwnProperty('child')) {
      childQueries[0] = firebase.child(ChildClass).orderByChild('name').equalTo(value.child);
    } else {
      // otherwise it's a one to many relationship
      value.children.forEach(function(child, index) {
        childQueries[index] = firebase.child(ChildClass).orderByChild('name').equalTo(child);
      });
    }

    // execute all the queries to retrieve the stored elements
    var queries = [];
    [parentQuery].concat(childQueries).forEach(function(query) {
      var deferred = Q.defer();
      query.on('value', function(data) {
        deferred.resolve(data);
      });
      queries.push(deferred.promise);
    });

    // when all the queries have completed
    //   - nest the children in the parent object
    //   - reference the parent in the children
    var promise = Q.all(queries)
      .then(function(results) {
        var parent = results[0];
        var children = results.slice(1);

        var parentId = Object.keys(parent.val())[0];
        var parentRef = firebase.child(ParentClass).child(parentId).child(parentRelation);

        // if the relationship is 1 to 1/many (Pointer)
        if (value.hasOwnProperty('child')) {
          var childId = Object.keys(children[0].val())[0];
          var childRef = firebase.child(ChildClass).child(childId).child(childRelation).child(parentId);

          var parentQ = fSet(parentRef, childId);
          var childQ = fSet(childRef, true);
          return Q.all([parentQ, childQ]);
        } else {
          // if the relationship is many to many, use the relation to add the object
          var queries = [];
          children.forEach(function(child) {
            var childId = Object.keys(child.val())[0];
            queries.push(
              fSet(parentRef.child(childId), true)
            );
            var childRef = firebase.child(ChildClass).child(childId).child(childRelation).child(parentId);
            queries.push(
              fSet(childRef, true)
            );
          });
          return Q.all(queries);
        }
      });
    allThePromisesWeMade.push(promise);
  });

  // return all the promises we made #hahahahalol
  return Q.all(allThePromisesWeMade)
    .then(function() {
      console.log(ParentClass + '.' + ChildClass + ': done.');
    }, function(err) {
      console.error(err);
    });
};

module.exports = Linker;
