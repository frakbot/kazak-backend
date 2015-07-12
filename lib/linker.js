'use strict';

var Q = require('q');
var Parse = require('parse').Parse;
var errorHandler = require('./errorHandler');

var Linker = function(ParentClass, ChildClass, relationName, values) {
  // WATCH THIS: https://www.youtube.com/watch?v=hUFPooqKllA !!!11!1
  var allThePromisesWeMade = [];

  // for each parent, store the found children
  values.forEach(function(value) {

    // build the parent and children queries
    var parentQuery = new Parse.Query(ParentClass);
    parentQuery.equalTo('name', value.name);
    var childQueries = [];
    // if we have to hold a single relation (Parse Pointer)
    if (value.hasOwnProperty('child')) {
      childQueries[0] = new Parse.Query(ChildClass).equalTo('name', value.child);
    } else {
      // otherwise it's a one to many relationship (Parse Relation)
      value.children.forEach(function(child, index) {
        childQueries[index] = new Parse.Query(ChildClass).equalTo('name', child);
      });
    }

    // execute all the queries to retrieve the stored elements
    var queries = [];
    [parentQuery].concat(childQueries).forEach(function(query) {
      queries.push(query.first());
    });

    // when all the queries have completed, nest the children in the parent object and save the
    // happy batch
    var promise = Q.all(queries)
      .then(function(results) {
        var parent = results[0];
        // if the relationship is 1 to 1/many (Pointer)
        if (value.hasOwnProperty('child')) {
          parent.set(relationName, results[1]);
        } else {
          // if the relationship is many to many (Relation)
          // use the relation to add the object
          var relation = parent.relation(relationName);
          relation.add(results.slice(1));
        }
        return parent.save();
      });
    allThePromisesWeMade.push(promise);
  });

  // return all the promises we made #hahahahalol
  return Q.all(allThePromisesWeMade)
    .then(function() {
      console.log(ParentClass.prototype.className + '.' + ChildClass.prototype.className +
                  ': done.');
    }, errorHandler);
};

module.exports = Linker;
