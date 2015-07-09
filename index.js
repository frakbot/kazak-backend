'use strict';

var Q = require('q');
var ParseLib = require('parse');

var config = require('./cloud/config');
var Parse = ParseLib.Parse;
Parse.initialize(config['appKey'], config['jsKey'], config['master']);

var purger = require('./lib/purger');
var linker = require('./lib/linker');

var Room = require('./cloud/model/Room');
var TimeSlot = require('./cloud/model/TimeSlot');
var Talk = require('./cloud/model/Talk');
var Presenter = require('./cloud/model/Presenter');

var rooms = require('./lib/bootstrap/rooms');
var timeSlots = require('./lib/bootstrap/timeSlots');
var talks = require('./lib/bootstrap/talks');
var presenters = require('./lib/bootstrap/presenters');

var talkPresenters = require('./lib/bootstrap/relations/talk-presenters');
var talkRoom = require('./lib/bootstrap/relations/talk-room');

/*
var purges = Q.all([
  purger(Room, rooms),
  purger(TimeSlot, timeSlots),
  purger(Talk, talks),
  purger(Presenter, presenters)
]);

purges
  .then(function () {
    return linker(Talk, Presenter, 'presenters', talkPresenters);
  })
  .then(function () {
    return linker(Talk, Room, 'room', talkRoom);
  })
  .then(function () {
    console.log('Completed.');
  });
*/

var query = new Parse.Query(Talk);
query.include('room');
// query.include('presenters');
query.find(null, {useMasterKey: true})
  .then(function(res) {
    console.log(res);
  });
