'use strict';

var Q = require('q');
var http = require('axios');
var Firebase = require('firebase');

var purger = require('./lib/firebase/purger');
var linker = require('./lib/firebase/linker');

var Room = require('./model/firebase/Room');

var config = require('./lib/config');
var firebaseUrl = config.getFirebaseUrl();
var db = new Firebase(firebaseUrl);

var rooms = require('./lib/bootstrap/rooms');
var talks = require('./lib/bootstrap/talks');
var presenters = require('./lib/bootstrap/presenters');
var timeSlots = require('./lib/bootstrap/timeSlots');

var talkRoom = require('./lib/bootstrap/relations/talk-room');
var talkPresenters = require('./lib/bootstrap/relations/talk-presenters');

var init = function() {
  return Q.ninvoke(db, 'authWithCustomToken', config.getFirebaseSecret())
    .then(function(authData) {
      console.log('Authenticated successfully with provider', authData.provider);
    })
    .catch(function(error) {
      console.error('Authentication Failed!', error);
    });
};

var bootstrap = function() {
  init()
    .then(function() {
      return Q.all([
        purger(db, 'rooms', rooms),
        purger(db, 'talks', talks),
        purger(db, 'presenters', presenters),
        purger(db, 'timeSlots', timeSlots)
      ]);
    })
    .then(function() {
      return http({
        url: firebaseUrl + '.settings/rules.json',
        method: 'PUT',
        params: {
          auth: config.getFirebaseSecret()
        },
        data: require('./lib/firebase/rules.json')
      });
    })
    .then(function() {
      return Q.all([
        linker(db, 'talks', 'rooms', 'room', 'talks', talkRoom),
        linker(db, 'talks', 'presenters', 'presenters', 'talks', talkPresenters)
      ]);
    })
    .then(function() {
      console.log('Completed.');
    })
    .catch(function(err) {
      console.error(err);
    });
};

var test = function() {
  init()
    .then(function() {
      return Room.get(db, '-JuL1zVQPSkf5nUwC3B9');
    })
    .then(function(room) {
      console.log(room);
    })
    .catch(function(err) {
      console.error(err.stack);
    });
};

bootstrap();
