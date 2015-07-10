'use strict';

var TimeSlot = require('./../model/TimeSlot');

var getAll = function(req, res, next) {
  TimeSlot.getAll()
    .then(function(data) {
      res.send(data);
    }, next);
};

var get = function(req, res, next) {
  return TimeSlot.get(req.params.timeSlot)
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

module.exports = function(app) {
  app.get('/api/timeslots', getAll);
  app.get('/api/timeslots/:timeSlot', get);
  app.post('/api/timeslots/:timeSlot', post);
  app.put('/api/timeslots/:timeSlot', put);
  app.patch('/api/timeslots/:timeSlot', patch);
  app.delete('/api/timeslots/:timeSlot', del);
};
