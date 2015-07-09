'use strict';

var Talk = require('cloud/model/Talk');

var convertAll = function (elems, convertFn) {
  var values = [];
  for (var elem in elems) {
    values.push(convertFn(elems[elem]));
  }
  return values;
};

var convert = function (talk) {
  return talk.toObject();
};

var getAll = function (req, res, next) {
  var query = new Parse.Query(Talk);
  query.include('room');
  // TODO: the following crashes badly
  // query.include('presenters');
  query
    .find(query, {
      useMasterKey: true
    })
    .then(function (elems) {
      var data = convertAll(elems, convert);
      res.send(200, data);
    });
};

var get = function (req, res, next) {
  // TODO
};

var post = function (req, res, next) {
  // TODO
};

var put = function (req, res, next) {
  // TODO
};

var patch = function (req, res, next) {
  // TODO
};

var del = function (req, res, next) {
  // TODO
};

module.exports = function (app) {
  app.get('/api/talks', getAll);
  app.get('/api/talks/:talk', get);
  app.post('/api/talks/:talk', post);
  app.put('/api/talks/:talk', put);
  app.patch('/api/talks/:talk', patch);
  app.delete('/api/talks/:talk', del);
};
