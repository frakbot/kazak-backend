'use strict';

var Parse = require('parse').Parse;
var errorHandler = require('./lib/errorHandler');

var Purger = function (Class, newValues) {
  var query = new Parse.Query(Class);
  return query.find({useMasterKey: true})
    .then(function (values) {
      return Class.destroyAll(values, {useMasterKey: true});
    })
    .then(function () {
      if (newValues) {
        newValues.forEach(function (value, key) {
          if (!value.className || value.className !== Class.prototype.className) {
            newValues[key] = new Class(value);
          }
        });
        return Class.saveAll(newValues, {useMasterKey: true});
      }
      return true;
    })
    .then(function () {
      console.log(Class.prototype.className + ': done.');
    }, errorHandler);
};

module.exports = Purger;
