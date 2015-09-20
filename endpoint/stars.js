'use strict';

var buildStarsEndpoint = function(app) {
  var Stars = require('./../model/Stars');
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
    var sky = buildPersonalSky(req.body);
    Stars.put(req.context, req.params.uid, sky)
      .then(function(data) {
        res.send(data);
      })
      .catch(ErrorHandler(res));
  };

  app.put('/api/stars/:uid', setForUid);

};

module.exports = buildStarsEndpoint;
