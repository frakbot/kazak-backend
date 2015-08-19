'use strict';

var buildTimeSlotEndpoint = function(app) {
  var TimeSlot = require('./../model/TimeSlot');

  var getAll = function(req, res, next) {
    TimeSlot.getAll(req.context)
      .then(function(data) {
        res.send(data);
      }, next);
  };

  var get = function(req, res, next) {
    TimeSlot.get(req.context, req.params.timeslot)
      .then(function(data) {
        res.send(data);
      }, next);
  };

  app.get('/api/timeslots', getAll);
  app.get('/api/timeslots/:timeslot', get);
};

module.exports = buildTimeSlotEndpoint;
