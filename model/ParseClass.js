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

  ParseClass.prototype.toObject = function() {
    var self = this;
    var object = {
      id: self.id
    };
    attributes.forEach(function(attribute) {
      var value = self.get(attribute);
      if (value && value.toObject) {
        value = value.toObject();
      }
      object[attribute] = value;
    });
    return object;
  };

  ParseClass.convertAll = function(elements, extendArray, ElementClass) {
    var data = [];
    if (elements) {
      elements.forEach(function(elem) {
        data.push(elem.convert(extendArray));
      });
    }
    return Q.all(data);
  };

  ParseClass.prototype.convert = function(extendArray) {
    var self = this;
    var extendPromises = [];
    // for each object we need to extend
    for (var key in extendArray) {
      var related = extendArray[key];
      // fetch the relation
      var promise = self
        .relation(related.name).query()
        .find()
        .then(function(children) {
          // convert all the children by specifying the class (can be null)
          return ParseClass.convertAll(children, related.children);
        });
      extendPromises.push(promise);
    }
    return Q.all(extendPromises)
      .then(function(children) {
        var converted = self.toObject();
        for (var key in extendArray) {
          var value = extendArray[key].name;
          converted[value] = children[key];
        }
        return converted;
      });
  };

  return ParseClass;
};

module.exports = getParseClass;
