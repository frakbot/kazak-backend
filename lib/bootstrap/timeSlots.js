'use strict';

var moment = require('moment');
moment.utc();

var buildTimeSlot = function(days, hours, minutes) {
  var time = moment('2014-10-29T00:00:00Z');
  time.add(days, 'days')
    .add(hours, 'hours')
    .add(minutes, 'minutes');
  return time.toDate();
};

module.exports = [
  {
    startDate: buildTimeSlot(1, 8, 30),
    endDate: buildTimeSlot(1, 9, 0)
  },
  {
    startDate: buildTimeSlot(1, 9, 0),
    endDate: buildTimeSlot(1, 10, 0)
  },
  {
    startDate: buildTimeSlot(1, 10, 0),
    endDate: buildTimeSlot(1, 10, 30)
  },
  {
    startDate: buildTimeSlot(1, 10, 30),
    endDate: buildTimeSlot(1, 11, 5)
  },
  {
    startDate: buildTimeSlot(1, 11, 10),
    endDate: buildTimeSlot(1, 11, 45)
  },
  {
    startDate: buildTimeSlot(1, 11, 45),
    endDate: buildTimeSlot(1, 12, 5)
  },
  {
    startDate: buildTimeSlot(1, 12, 5),
    endDate: buildTimeSlot(1, 12, 40)
  },
  {
    startDate: buildTimeSlot(1, 12, 45),
    endDate: buildTimeSlot(1, 13, 20)
  },
  {
    startDate: buildTimeSlot(1, 13, 20),
    endDate: buildTimeSlot(1, 14, 20)
  },
  {
    startDate: buildTimeSlot(1, 14, 20),
    endDate: buildTimeSlot(1, 14, 55)
  },
  {
    startDate: buildTimeSlot(1, 15, 0),
    endDate: buildTimeSlot(1, 15, 35)
  },
  {
    startDate: buildTimeSlot(1, 15, 35),
    endDate: buildTimeSlot(1, 15, 55)
  },
  {
    startDate: buildTimeSlot(1, 15, 55),
    endDate: buildTimeSlot(1, 16, 30)
  },
  {
    startDate: buildTimeSlot(1, 16, 30),
    endDate: buildTimeSlot(1, 17, 30)
  },
  {
    startDate: buildTimeSlot(1, 17, 30),
    endDate: buildTimeSlot(1, 18)
  },
  {
    startDate: buildTimeSlot(1, 18, 15)
  },
  {
    startDate: buildTimeSlot(2, 8, 30),
    endDate: buildTimeSlot(2, 9, 0)
  },
  {
    startDate: buildTimeSlot(2, 9, 0),
    endDate: buildTimeSlot(2, 9, 45)
  },
  {
    startDate: buildTimeSlot(2, 9, 45),
    endDate: buildTimeSlot(2, 10, 0)
  },
  {
    startDate: buildTimeSlot(2, 10, 0),
    endDate: buildTimeSlot(2, 10, 45)
  },
  {
    startDate: buildTimeSlot(2, 10, 50),
    endDate: buildTimeSlot(2, 11, 35)
  },
  {
    startDate: buildTimeSlot(2, 11, 35),
    endDate: buildTimeSlot(2, 12, 0)
  },
  {
    startDate: buildTimeSlot(2, 12, 0),
    endDate: buildTimeSlot(2, 12, 45)
  },
  {
    startDate: buildTimeSlot(2, 12, 45),
    endDate: buildTimeSlot(2, 13, 45)
  },
  {
    startDate: buildTimeSlot(2, 13, 45),
    endDate: buildTimeSlot(2, 14, 30)
  },
  {
    startDate: buildTimeSlot(2, 14, 35),
    endDate: buildTimeSlot(2, 15, 20)
  },
  {
    startDate: buildTimeSlot(2, 15, 20),
    endDate: buildTimeSlot(2, 15, 45)
  },
  {
    startDate: buildTimeSlot(2, 15, 45),
    endDate: buildTimeSlot(2, 16, 30)
  },
  {
    startDate: buildTimeSlot(2, 16, 35),
    endDate: buildTimeSlot(2, 17, 20)
  },
  {
    startDate: buildTimeSlot(2, 17, 30),
    endDate: buildTimeSlot(2, 17, 45)
  }
];
