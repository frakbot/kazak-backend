'use strict';

var buildTrackEndpoint = function(app) {
  var Track = require('./../model/Track');
  var ErrorHandler = require('./../lib/firebaseErrorHandler');

  var getAll = function(req, res) {
    Track.getAll(req.context)
      .then(function(data) {
        res.send(data);
      })
      .catch(ErrorHandler(res));
  };

  var get = function(req, res) {
    Track.get(req.context, req.params.room)
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

  app.get('/api/tracks', getAll);
  app.get('/api/tracks/:track', get);
  app.post('/api/tracks/:track', post);
  app.put('/api/tracks/:track', put);
  app.patch('/api/tracks/:track', patch);
  app.delete('/api/tracks/:track', del);
};

module.exports = buildTrackEndpoint;
