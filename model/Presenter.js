'use strict';

var ParseClass = require('./ParseClass');
var Parse = require('parse').Parse;

var Presenter = ParseClass('Presenter', ['name', 'bio', 'socialLinks', 'image']);

Presenter.getAll = function() {
  return new Parse.Query(Presenter)
    .find({
      useMasterKey: true
    })
    .then(function(elems) {
      return Presenter.convertAll(elems);
    });
};

Presenter.get = function(id) {
  return new Parse.Query(Presenter)
    .get(id, {
      useMasterKey: true
    })
    .then(function(elem) {
      return elem.convert();
    });
};

module.exports = Presenter;
