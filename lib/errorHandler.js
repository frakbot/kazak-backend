'use strict';

module.exports = function (err) {
  console.error('Parse Error #' + err.code + ':\n' + err.message);
};
