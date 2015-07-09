'use strict';

var Parse;

try {
  Parse = require('parse').Parse;
} catch (Error) {
  // ignore
}

var getParseClass = function (className, attributes) {
  var ParseClass = Parse.Object.extend(className);

  attributes.forEach(function (attribute) {
    Object.defineProperty(ParseClass.prototype, attribute, {
      get: function () {
        return this.get(attribute);
      },
      set: function (value) {
        return this.set(attribute, value);
      }
    });
  });

  ParseClass.prototype.toObject = function () {
    var self = this;
    var object = {
      id: self.id
    };
    attributes.forEach(function (attribute) {
      object[attribute] = self.get(attribute);
    });
    return object;
  };

  return ParseClass;
};

module.exports = getParseClass;
