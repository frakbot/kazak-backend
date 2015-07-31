'use strict';

var _ = require('lodash');
var Q = require('q');

var getFirebaseClass = function(className, attributes, expandables) {
  var FirebaseClass = function(value) {
    return value;
  };

  FirebaseClass.expand = function(firebase, element, expand, id) {
    var expansionPromises = [];

    // add the id, if any
    if (id) {
      element.id = id;
    }

    /* expand object:
      {
        "attribute1:" {},
        "attribute2:" {
          "childAttr": {}
        }
      }
     */

    // remove from the element all those expandables not in expand
    Object.keys(expandables || {}).forEach(function(key) {
      if (!expand || !expand.hasOwnProperty(key)) {
        element[key] = undefined;
      }
    });

    if (expand && _.isObject(expand)) {
      // loop on the expand object and expand those attributes
      Object.keys(expand).forEach(function(key) {
        var expandChildren = expand[key];
        // the class to expand
        var fClass = require('./' + expandables[key]);
        var attribute = element[key];
        // if the object is single
        if (typeof(attribute) === 'string') {
          // get it, convert it, set it
          var p = fClass.get(attribute, firebase, expandChildren)
            .then(function(o) {
              element[key] = o;
            });
          expansionPromises.push(p);
        } else {
          // reset the Object to an Array
          element[key] = [];
          // if there is more than one object of the same class, for each of them
          Object.keys(attribute).forEach(function(id) {
            // get it, convert it, push it
            var cp = fClass.get(id, firebase, expandChildren)
              .then(function(o) {
                element[key].push(o);
                return o;
              });
            expansionPromises.push(cp);
          });
        }
      });
    }

    return Q.all(expansionPromises)
      .then(function() {
        return element;
      });
  };

  FirebaseClass.expandAll = function(firebase, elements, expand) {
    var promises = [];
    if (_.isObject(elements)) {
      elements = FirebaseClass.toList(elements);
    }
    elements.forEach(function(element, key) {
      var p = FirebaseClass.expand(firebase, element, expand)
        .then(function(o) {
          elements[key] = o;
          return o;
        });
      promises.push(p);
    });
    return Q.all(promises);
  };

  FirebaseClass.toElement = function(element, key) {
    element.id = key;
    return element;
  };

  FirebaseClass.toList = function(elements) {
    var list = [];
    for (var key in elements) {
      elements[key] = FirebaseClass.toElement(elements[key], key);
      list.push(elements[key]);
    }
    return list;
  };

  return FirebaseClass;
};

module.exports = getFirebaseClass;
