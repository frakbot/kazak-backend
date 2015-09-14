'use strict';

var Q = require('q');
var http = require('axios');
var Firebase = require('firebase');

var Helper = require('./lib/bootstrap/helper');
var purger = require('./lib/bootstrap/purger');
var linker = require('./lib/bootstrap/linker');

var Room = require('./model/Room');

var config = require('./lib/config');
var firebaseUrl = config.getFirebaseUrl();
var db = new Firebase(firebaseUrl);

var rooms = require('./lib/bootstrap/models/rooms');
var events = require('./lib/bootstrap/models/events');
var presenters = require('./lib/bootstrap/models/presenters');
var timeSlots = require('./lib/bootstrap/models/timeSlots');
var tracks = require('./lib/bootstrap/models/tracks');

var eventRooms = require('./lib/bootstrap/relations/event-rooms');
var eventSecondaryRooms = require('./lib/bootstrap/relations/event-secondary-rooms');
var eventPresenters = require('./lib/bootstrap/relations/event-presenters');
var eventTrack = require('./lib/bootstrap/relations/event-track');

var init = function() {
  return Helper.authWithCustomToken(db, config.getFirebaseSecret())
    .then(function(authData) {
      console.log('Authenticated successfully with provider', authData.provider);
    })
    .catch(function(error) {
      console.error('Authentication Failed!', error);
    });
};

var bootstrap = function() {
  return init()
    .then(function() {
      return Q.all([
        purger(db, 'rooms', rooms),
        purger(db, 'events', events),
        purger(db, 'presenters', presenters),
        purger(db, 'timeSlots', timeSlots),
        purger(db, 'tracks', tracks)
      ]);
    })
    .then(function() {
      return http({
        url: firebaseUrl + '.settings/rules.json',
        method: 'PUT',
        params: {
          auth: config.getFirebaseSecret()
        },
        data: require('./lib/bootstrap/rules.json')
      });
    })
    .then(function() {
      return Q.all([
        linker(db, 'events', 'rooms', 'rooms', 'events', eventRooms),
        linker(db, 'events', 'rooms', 'secondaryRooms', 'secondaryEvents', eventSecondaryRooms),
        linker(db, 'events', 'presenters', 'presenters', 'events', eventPresenters),
        linker(db, 'events', 'tracks', 'track', 'events', eventTrack)
      ]);
    })
    .then(function() {
      console.log('Completed.');
    })
    .catch(function(err) {
      console.error(err.stack);
    });
};

// playground

var test = function() {
  return init()
    .then(function() {
      return Room.get(config.firebase, '-Jx4OMBrgXafcbWwJryS');
    })
    .then(function(room) {
      console.log(room);
    })
    .catch(function(err) {
      console.error(err.stack);
    });
};

var TEST_ACCOUNT = {
  email: 'ahahah@gmail.com',
  password: 'lol'
};

var makeDummyAccount = function() {
  return init()
    .then(function() {
      return Helper.createUser(db, TEST_ACCOUNT);
    })
    .then(function(userData) {
      console.log('Successfully created user account with uid:', userData.uid);
    })
    .catch(function(error) {
      console.log('Error creating user:', error);
    });
};

var makeDummyLogin = function() {
  return Helper.authWithPassword(db, TEST_ACCOUNT)
    .then(function(authData) {
      console.log(authData);
    })
};

bootstrap()
  .then(function() {
    process.exit();
  })
  .catch(function(err) {
    console.error(err.stack);
  });
