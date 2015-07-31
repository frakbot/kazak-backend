'use strict';

var Q = require('q');
var Parse = require('parse').Parse;

var config = require('./lib/config');
Parse.initialize(config.getApplicationKey(), config.getJavascriptKey(), config.getMasterKey());
Parse.Cloud.useMasterKey();

var purger = require('./lib/parse/purger');
var linker = require('./lib/parse/linker');

var Room = require('./model/parse/Room');
var Talk = require('./model/parse/Talk');
var Presenter = require('./model/parse/Presenter');

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
