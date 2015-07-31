'use strict';

var ParseClass = require('./ParseClass');
var Parse = require('parse').Parse;
var User = require('./User');
var Talk = require('./Talk');

var Schedule = ParseClass('Schedule', ['user', 'talks']);

var defaultExpansion = {
  'talks': {
    'include': {},
    'exclude': {
      'description': true,
      'presenters': true,
      'room': true
    }
  }
};

Schedule._getInternal = function(user) {
  var u = new User(user);
  return new Parse.Query(Schedule)
    .equalTo('user', u)
    .first();
};

Schedule._convertInternal = function(schedule) {
  if (schedule) {
    return schedule.convert(defaultExpansion)
      .then(function(converted) {
        return converted.talks;
      });
  }
  return [];
};

Schedule.get = function(user) {
  return Schedule._getInternal(user)
    .then(Schedule._convertInternal);
};

Schedule.addTalk = function(user, talkId) {
  return Schedule._getInternal(user)
    .then(function(schedule) {
      var talks = schedule.relation('talks');
      var talk = new Talk();
      talk.id = talkId;
      talks.add(talk);
      return schedule.save();
    })
    .then(Schedule._convertInternal);
};

Schedule.deleteTalk = function(user, talkId) {
  return Schedule._getInternal(user)
    .then(function(schedule) {
      var talks = schedule.relation('talks');
      var talk = new Talk();
      talk.id = talkId;
      talks.remove(talk);
      return schedule.save();
    })
    .then(Schedule._convertInternal);
};

module.exports = Schedule;
