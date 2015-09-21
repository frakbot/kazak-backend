'use strict';

var buildStarsEndpoint = function(app) {
  var _ = require('lodash');
  var Q = require('q');
  var Event = require('./../model/Event');
  var Star = require('./../model/Star');
  var ErrorHandler = require('./../lib/firebaseErrorHandler');

  var buildPersonalSky = function(stars) {
    var events = Array.isArray(stars) ? stars : [];
    var sky = {events: {}};
    events.forEach(function(event) {
      sky.events[event] = true;
    });
    return sky;
  };

  var setForUid = function(req, res) {
    // use the admin secret to read the stars and update the events
    var adminContext = _.clone(req.context);
    adminContext.secret = app.locals.SUPER_SECRET;

    var updateEvent = function(data, increment) {
      var updates = [];
      data.forEach(function(id) {
        var promise = Event.get(req.context, id)
          .then(function(event) {
            // increment the number of stars, default to 0 if negative
            var newStars = _.max([(event.stars || 0) + increment, 0]);
            return Event.patch(adminContext, event.id, {
              stars: newStars
            })
          });
        updates.push(promise);
      });
      return Q.all(updates);
    };

    // read previous stars for uid
    Star.get(adminContext, req.params.uid)
      .then(function(originalSky) {
        // map stars to an events id array
        var pre = originalSky.events.map(function(e) {
          return e.id;
        });
        var post = req.body;
        // pre - post = unstarred
        var unstarred = _.difference(pre, post);
        // post - pre = starred
        var starred = _.difference(post, pre);
        return Q.all([starred, unstarred]);
      })
      .spread(function(starred, unstarred) {
        return Q.all([updateEvent(starred, 1), updateEvent(unstarred, -1)]);
      })
      .then(function() {
        var sky = buildPersonalSky(req.body);
        return Star.put(req.context, req.params.uid, sky);
      })
      .then(function(data) {
        res.send(data);
      })
      .catch(ErrorHandler(res));
  };

  app.put('/api/stars/:uid', setForUid);

};

module.exports = buildStarsEndpoint;
