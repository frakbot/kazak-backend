'use strict';

var Q = require('q');
var ParseLib = require('parse');

var config = require('./config');
var Parse = ParseLib.Parse;
Parse.initialize(config['appKey'], config['jsKey'], config['master']);

var purger = require('./lib/purger');
var linker = require('./lib/linker');
var errorHandler = require('./lib/errorHandler');

var Room = require('./model/Room');
var TimeSlot = require('./model/TimeSlot');
var Talk = require('./model/Talk');
var Presenter = require('./model/Presenter');

var rooms = require('./lib/bootstrap/rooms');
var timeSlots = require('./lib/bootstrap/timeSlots');
var talks = require('./lib/bootstrap/talks');
var presenters = require('./lib/bootstrap/presenters');

var talkPresenters = require('./lib/bootstrap/relations/talk-presenters');
var talkRoom = require('./lib/bootstrap/relations/talk-room');
var talkTimeSlot = require('./lib/bootstrap/relations/talk-timeSlot');

var purges = Q.all([
  purger(Room, rooms),
  purger(TimeSlot, timeSlots),
  purger(Talk, talks),
  purger(Presenter, presenters)
]);

purges
  .then(function() {
    return linker(Talk, Presenter, 'presenters', talkPresenters);
  })
  .then(function() {
    return linker(Talk, Room, 'room', talkRoom);
  })
  .then(function() {
    return linker(Talk, TimeSlot, 'timeSlot', talkTimeSlot);
  })
  .then(function() {
    console.log('Completed.');
  });
