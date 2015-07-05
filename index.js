'use strict';

var ParseLib = require('parse');

var config = require('./config');
var Parse = ParseLib.Parse;
Parse.initialize(config['appKey'], config['jsKey'], config['master']);

var purger = require('./purger');

var Room = require('./lib/Room');
var TimeSlot = require('./lib/TimeSlot');
var Talk = require('./lib/Talk');
var Presenter = require('./lib/Presenter');

var rooms = require('./lib/bootstrap/rooms');
var timeSlots = require('./lib/bootstrap/timeSlots');
var talks = require('./lib/bootstrap/talks');
var presenters = require('./lib/bootstrap/presenters');

purger(Room, rooms)
  .then(function () {
    return purger(TimeSlot, timeSlots);
  })
  .then(function () {
    return purger(Talk, talks);
  })
  .then(function () {
    return purger(Presenter, presenters);
  })
  .then(function () {
    console.log('Completed.');
  });
