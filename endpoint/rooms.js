'use strict';

var buildRoomEndpoint = function(app) {
  var Room = require('./../model/Room');
  var ErrorHandler = require('./../lib/firebaseErrorHandler');

  var getAll = function(req, res) {
    Room.getAll(req.context)
      .then(function(data) {
        res.send(data);
      })
      .catch(ErrorHandler(res));
  };

  var get = function(req, res) {
    Room.get(req.context, req.params.room)
      .then(function(data) {
        res.send(data);
      })
      .catch(ErrorHandler(res));
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
