'use strict';

var Parse = require('parse').Parse;
var Q = require('q');

var getParseClass = function(className, attributes) {
  var ParseClass = Parse.Object.extend(className);

  attributes.forEach(function(attribute) {
    Object.defineProperty(ParseClass.prototype, attribute, {
      get: function() {
        return this.get(attribute);
      },
      set: function(value) {
        return this.set(attribute, value);
      }
    });
  });

  /**
   * Convert the DB object into a regular JavaScript object by excluding the
   * attribute names specified in the `excludeObject`.
   *
   * @param {Object=} excludeObject The Object whose attribute names (value can be anything) define
   *   which attributes in the output object won't be included.
   * @returns {Object} The converted JavaScript object.
   */
  ParseClass.prototype.toObject = function(excludeObject) {
    var self = this;
    var object = {};
    if (!(excludeObject && excludeObject.hasOwnProperty('id'))) {
      object.id = self.id
    }
    attributes.forEach(function(attribute) {
      if (!(excludeObject && excludeObject.hasOwnProperty(attribute))) {
        var value = self.get(attribute);
        if (value && value.toObject) {
          value = value.toObject();
        }
        object[attribute] = value;
      }
    });
    return object;
  };

  ParseClass.convertAll = function(elements, includeObj, excludeObj) {
    var data = [];
    if (elements) {
      elements.forEach(function(elem) {
        data.push(elem.convert(includeObj, excludeObj));
      });
    }
    return Q.all(data);
  };

  ParseClass.prototype.convert = function(includeObj, excludeObj) {
    var self = this;
    var extendPromises = [];
    // for each object we need to include
    for (var name in includeObj) {
      var childInclude = includeObj[name].include;
      var childExclude = includeObj[name].exclude;
      // fetch the relation
      var promise = self
        .relation(name).query()
        .find()
        .then(function(children) {
          // convert all the children, add the inclusion object and the exclusion array
          return ParseClass.convertAll(children, childInclude, childExclude);
        });
      extendPromises.push(promise);
    }
    return Q.all(extendPromises)
      .then(function(children) {
        // convert the regular object excluding the given attribute names list
        var converted = self.toObject(excludeObj);
        var i = 0;
        for (var name in includeObj) {
          converted[name] = children[i];
          i += 1;
        }
        return converted;
      });
  };

  return ParseClass;
};

module.exports = getParseClass;
