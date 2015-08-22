'use strict';

module.exports = function(res) {
  return function(error) {
    // internal debugging trace
    if (error.stack) {
      console.error(error.stack);
    } else {
      console.error(error);
    }

    // appropriately output error
    if (error.status) {
      res.status(error.status);
      res.send(error.data);
    } else {
      res.status(500);
      res.send({
        error: 'Unhandled exception.',
        stack: error.stack
      });
    }
  }
};
