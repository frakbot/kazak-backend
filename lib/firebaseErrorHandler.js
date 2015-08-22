'use strict';

module.exports = function(res) {
  return function(error) {
    res.status(error.status);
    res.send(error.data);
  }
};
