'use strict';

var config = {};
try {
  config = require('./../config.json');
} catch (Error) {
  config.firebase = {
    secret: process.env.FIREBASE_SECRET_KEY,
    url: process.env.FIREBASE_URL
  }
}

config.getFirebaseSecret = function() {
  return config.firebase.secret;
};

config.getFirebaseUrl = function() {
  return config.firebase.url;
};

module.exports = config;
