'use strict';

var buildTimeSlotEndpoint = function(app, impl) {
  var TimeSlot = require('./../model/' + impl + '/TimeSlot');

  var get = function(req, res, next) {
    TimeSlot.get(req.params.timeslot, req.dataLayer)
      .then(function(data) {
        res.send(data);
      }, next);
  };

  var getAll = function(req, res, next) {
    TimeSlot.getAll(req.dataLayer)
      .then(function(data) {
        res.send(data);
      }, next);
  };

  app.get('/api/timeslots', getAll);
  app.get('/api/timeslots/:timeslot', get);
};

module.exports = buildTimeSlotEndpoint;
