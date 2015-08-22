'use strict';

var buildTimeSlotEndpoint = function(app) {
  var TimeSlot = require('./../model/TimeSlot');
  var ErrorHandler = require('./../lib/firebaseErrorHandler');

  var getAll = function(req, res) {
    TimeSlot.getAll(req.context)
      .then(function(data) {
        res.send(data);
      })
      .catch(ErrorHandler(res));
  };

  var get = function(req, res) {
    TimeSlot.get(req.context, req.params.timeslot)
      .then(function(data) {
        res.send(data);
      })
      .catch(ErrorHandler(res));
  };

  app.get('/api/timeslots', getAll);
  app.get('/api/timeslots/:timeslot', get);
};

module.exports = buildTimeSlotEndpoint;
