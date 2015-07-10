'use strict';

var TimeSlot = require('./../model/TimeSlot');

var getAll = function(req, res, next) {
  TimeSlot.getAll()
    .then(function(data) {
      res.send(data);
    }, next);
};

module.exports = function(app) {
  app.get('/api/timeslots', getAll);
};
