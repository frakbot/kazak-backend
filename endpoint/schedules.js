'use strict';

var buildScheduleEndpoint = function(app) {
  var Schedule = require('./../model/Schedule');
  var userMiddleware = require('./../middleware/user');
  var FirebaseClass = require('./../lib/FirebaseClass');
  var ErrorHandler = require('./../lib/firebaseErrorHandler');

  /**
   * Get the Schedule class for a specific user.
   *
   * @param {string} user - The user ID to build the Schedule class for.
   * @returns {Function} - The user-specific Schedule class.
   */
  var getScheduleClass = function(user) {
    return FirebaseClass(
      'schedules/' + user + '/events',
      []
    );
  };

  var get = function(req, res) {
    Schedule.get(req.context, req.params.user)
      .then(function(data) {
        res.send(data);
      })
      .catch(ErrorHandler(res));
  };

  var addEvent = function(req, res) {
    var UserSchedule = getScheduleClass(req.params.user);
    UserSchedule.put(req.context, req.params.event, true)
      .then(function(data) {
        res.send(data);
      })
      .catch(ErrorHandler(res));
  };

  var deleteEvent = function(req, res) {
    var UserSchedule = getScheduleClass(req.params.user);
    UserSchedule.delete(req.context, req.params.event)
      .then(function(data) {
        res.send(data);
      })
      .catch(ErrorHandler(res));
  };

  app.get('/api/schedules/:user', userMiddleware, get);
  app.post('/api/schedules/:user/:event', userMiddleware, addEvent);
  app.delete('/api/schedules/:user/:event', userMiddleware, deleteEvent);

};

module.exports = buildScheduleEndpoint;
