'use strict';

var buildRoomEndpoint = function(app, impl) {
  var Room = require('./../model/' + impl + '/Room');

  var getAll = function(req, res, next) {
    Room.getAll(req.dataLayer)
      .then(function(data) {
        res.send(data);
      }, next);
  };

  var get = function(req, res, next) {
    return Room.get(req.params.room, req.dataLayer)
      .then(function(data) {
        res.send(data);
      }, next);
  };

  var post = function(req, res, next) {
    // TODO
  };

  var put = function(req, res, next) {
    // TODO
  };

  var patch = function(req, res, next) {
    // TODO
  };

  var del = function(req, res, next) {
    // TODO
  };

  app.get('/api/rooms', getAll);
  app.get('/api/rooms/:room', get);
  app.post('/api/rooms/:room', post);
  app.put('/api/rooms/:room', put);
  app.patch('/api/rooms/:room', patch);
  app.delete('/api/rooms/:room', del);
};

module.exports = buildRoomEndpoint;
