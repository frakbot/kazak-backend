'use strict';

var ParseClass;

try {
  ParseClass = require('cloud/model/ParseClass');
} catch (Error) {
  ParseClass = require('./ParseClass');
}

module.exports = ParseClass('TimeSlot', ['startDate', 'endDate']);
