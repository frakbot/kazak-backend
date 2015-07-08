'use strict';

var Parse = require('parse').Parse;

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

  return ParseClass;
};

module.exports = getParseClass;
