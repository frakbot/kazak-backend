'use strict';

var config = undefined;
try {
  config = require('./../config.json');
} catch (Error) {
}

module.exports.getMasterKey = function() {
  if (config) {
    return config.master;
  }
  return process.env.PARSE_MASTER_KEY;
};

module.exports.getApplicationKey = function() {
  if (config) {
    return config.appKey;
  }
  return process.env.PARSE_APP_KEY;
};

module.exports.getJavascriptKey = function() {
  if (config) {
    return config.jsKey;
  }
  return process.env.PARSE_JS_KEY;
};

module.exports.getRestKey = function() {
  if (config) {
    return config.restKey;
  }
  return process.env.PARSE_REST_KEY;
};

module.exports.getFirebaseSecret = function() {
  if (config) {
    return config.firebase.secret;
  }
  return process.env.FIREBASE_SECRET_KEY;
};

module.exports.getFirebaseUrl = function() {
  if (config) {
    return config.firebase.url;
  }
  return process.env.FIREBASE_URL;
};
