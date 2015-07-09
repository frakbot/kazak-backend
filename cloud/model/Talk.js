'use strict';

var ParseClass;

try {
  ParseClass = require('cloud/model/ParseClass');
} catch (Error) {
  ParseClass = require('./ParseClass');
}

var Talk = ParseClass('Talk', ['name', 'description', 'subtitle', 'presenters', 'room', 'timeSlot']);

module.exports = Talk;
