'use strict';

var Q = require('q');
var ParseLib = require('parse');

var config = require('./config');
var Parse = ParseLib.Parse;
Parse.initialize(config['appKey'], config['jsKey'], config['master']);

var purger = require('./lib/purger');
var linker = require('./lib/linker');

var Room = require('./model/Room');
var Talk = require('./model/Talk');
var Presenter = require('./model/Presenter');

var rooms = require('./lib/bootstrap/rooms');
var talks = require('./lib/bootstrap/talks');
var presenters = require('./lib/bootstrap/presenters');

var talkPresenters = require('./lib/bootstrap/relations/talk-presenters');
var talkRoom = require('./lib/bootstrap/relations/talk-room');

var purges = Q.all([
  purger(Room, rooms),
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
    console.log('Completed.');
  });
