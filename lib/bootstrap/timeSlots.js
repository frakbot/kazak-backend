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
    name: 'D1 8:30 - 9:00',
    startDate: buildTimeSlot(1, 8, 30),
    endDate: buildTimeSlot(1, 9, 0)
  },
  {
    name: 'D1 09:00 - 10:00',
    startDate: buildTimeSlot(1, 9, 0),
    endDate: buildTimeSlot(1, 10, 0)
  },
  {
    name: 'D1 10:00 - 10:30',
    startDate: buildTimeSlot(1, 10, 0),
    endDate: buildTimeSlot(1, 10, 30)
  },
  {
    name: 'D1 10:30 - 11:05',
    startDate: buildTimeSlot(1, 10, 30),
    endDate: buildTimeSlot(1, 11, 5)
  },
  {
    name: 'D1 11:10 - 11:45',
    startDate: buildTimeSlot(1, 11, 10),
    endDate: buildTimeSlot(1, 11, 45)
  },
  {
    name: 'D1 11:45 - 12:05',
    startDate: buildTimeSlot(1, 11, 45),
    endDate: buildTimeSlot(1, 12, 5)
  },
  {
    name: 'D1 12:05 - 12:40',
    startDate: buildTimeSlot(1, 12, 5),
    endDate: buildTimeSlot(1, 12, 40)
  },
  {
    name: 'D1 12:45 - 13:20',
    startDate: buildTimeSlot(1, 12, 45),
    endDate: buildTimeSlot(1, 13, 20)
  },
  {
    name: 'D1 13:20 - 14:20',
    startDate: buildTimeSlot(1, 13, 20),
    endDate: buildTimeSlot(1, 14, 20)
  },
  {
    name: 'D1 14:20 - 14:55',
    startDate: buildTimeSlot(1, 14, 20),
    endDate: buildTimeSlot(1, 14, 55)
  },
  {
    name: 'D1 15:00 - 15:35',
    startDate: buildTimeSlot(1, 15, 0),
    endDate: buildTimeSlot(1, 15, 35)
  },
  {
    name: 'D1 15:35 - 15:55',
    startDate: buildTimeSlot(1, 15, 35),
    endDate: buildTimeSlot(1, 15, 55)
  },
  {
    name: 'D1 15:55 - 16:30',
    startDate: buildTimeSlot(1, 15, 55),
    endDate: buildTimeSlot(1, 16, 30)
  },
  {
    name: 'D1 16:30 - 17:30',
    startDate: buildTimeSlot(1, 16, 30),
    endDate: buildTimeSlot(1, 17, 30)
  },
  {
    name: 'D1 17:30 - 18:00',
    startDate: buildTimeSlot(1, 17, 30),
    endDate: buildTimeSlot(1, 18)
  },
  {
    name: 'D1 18:15 - aaaall nite long',
    startDate: buildTimeSlot(1, 18, 15)
  },
  {
    name: 'D2 8:30 - 9:00',
    startDate: buildTimeSlot(2, 8, 30),
    endDate: buildTimeSlot(2, 9, 0)
  },
  {
    name: 'D2 9:00 - 9:45',
    startDate: buildTimeSlot(2, 9, 0),
    endDate: buildTimeSlot(2, 9, 45)
  },
  {
    name: 'D2 9:45 - 10:00',
    startDate: buildTimeSlot(2, 9, 45),
    endDate: buildTimeSlot(2, 10, 0)
  },
  {
    name: 'D2 10:00 - 10:45',
    startDate: buildTimeSlot(2, 10, 0),
    endDate: buildTimeSlot(2, 10, 45)
  },
  {
    name: 'D2 10:50 - 11:35',
    startDate: buildTimeSlot(2, 10, 50),
    endDate: buildTimeSlot(2, 11, 35)
  },
  {
    name: 'D2 11:35 - 12:00',
    startDate: buildTimeSlot(2, 11, 35),
    endDate: buildTimeSlot(2, 12, 0)
  },
  {
    name: 'D2 12:00 - 12:45',
    startDate: buildTimeSlot(2, 12, 0),
    endDate: buildTimeSlot(2, 12, 45)
  },
  {
    name: 'D2 12:45 - 13:45',
    startDate: buildTimeSlot(2, 12, 45),
    endDate: buildTimeSlot(2, 13, 45)
  },
  {
    name: 'D2 13:45 - 14:30',
    startDate: buildTimeSlot(2, 13, 45),
    endDate: buildTimeSlot(2, 14, 30)
  },
  {
    name: 'D2 14:35 - 15:20',
    startDate: buildTimeSlot(2, 14, 35),
    endDate: buildTimeSlot(2, 15, 20)
  },
  {
    name: 'D2 15:20 - 15:45',
    startDate: buildTimeSlot(2, 15, 20),
    endDate: buildTimeSlot(2, 15, 45)
  },
  {
    name: 'D2 15:45 - 16:30',
    startDate: buildTimeSlot(2, 15, 45),
    endDate: buildTimeSlot(2, 16, 30)
  },
  {
    name: 'D2 16:35 - 17:20',
    startDate: buildTimeSlot(2, 16, 35),
    endDate: buildTimeSlot(2, 17, 20)
  },
  {
    name: 'D2 17:30 - 17:45',
    startDate: buildTimeSlot(2, 17, 30),
    endDate: buildTimeSlot(2, 17, 45)
  }
];
