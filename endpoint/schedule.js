'use strict';

var buildScheduleEndpoint = function(app) {
  var Schedule = require('./../model/Schedule');
  var userMiddleware = require('./../middleware/user');

  var get = function(req, res, next) {
    Schedule.get(req.user, req.dataLayer)
      .then(function(data) {
        res.send(data);
      }, next);
  };

  var addTalk = function(req, res, next) {
    Schedule.addTalk(req.user, req.params.talk, req.dataLayer)
      .then(function(data) {
        res.send(data);
      }, next);
  };

  var deleteTalk = function(req, res, next) {
    Schedule.deleteTalk(req.user, req.params.talk, req.dataLayer)
      .then(function(data) {
        res.send(data);
      }, next);
  };

  app.get('/api/schedule', userMiddleware, get);
  app.post('/api/schedule/talk/:talk', userMiddleware, addTalk);
  app.delete('/api/schedule/talk/:talk', userMiddleware, deleteTalk);

};

module.exports = buildScheduleEndpoint;
