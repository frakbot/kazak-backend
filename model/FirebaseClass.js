'use strict';

var Q = require('q');
var _ = require('lodash');
var http = require('./../lib/firebaseHttp');

/**
 * Build a specific class for Firebase objects, it will be mapped as a collection on Firebase.io.
 *
 * @param {string} collectionName - Name of the Firebase collection (should be lowercase).
 * @param {string[]=} attributes - Attributes of class elements (don't include expandable
 *   attributes here).
 * @param {Object=} expandables - Dictionary where each key is an extensible attribute of class
 *   objects, and the value is the name of the Node module containing the related Firebase class.
 * @returns {Function} - The constructor function for elements of the built Firebase class.
 */
var buildFirebaseClass = function(collectionName, attributes, expandables) {

  /**
   * Construct a new element of the Firebase class.
   *
   * @param {*} value - The value to init the element with.
   * @returns {*} - The same input {@link value}.
   * @constructor
   */
  var FirebaseClass = function(value) {
    return value;
  };

  /**
   * Get the default expand object, if the input one is falsy.
   *
   * @param {*} expand - The input expand object.
   * @returns {Object} - The same input object, if truthy, or the default one for the class.
   */
  var defaultExpand = function(expand) {
    if (!expand) {
      expand = {};
      Object.keys(expandables || {}).forEach(function(attr) {
        expand[attr] = true;
      });
    }
    return expand;
  };

  /**
   * Get all elements from the collection, eventually expanding the provided connections.
   *
   * @param {Object} config - The configuration object for your Firebase instance.
   * @param {string} config.url - The base URL of your Firebase instance.
   * @param {string} config.url - The secret to use for accessing your Firebase instance.
   * @param {Object} expand - Dictionary containing attribute names of connections that have to be
   *   expanded. Attribute values must be {Object}s with the same specs as expand, as they will be
   *   used for recursive expansion.
   * @returns {Promise} - A Promise that will be resolved with the fetched objects.
   */
  FirebaseClass.getAll = function(config, expand) {
    return http('GET', config, collectionName)
      .then(function(results) {
        return FirebaseClass.expandAll(config, results, expand);
      });
  };

  /**
   * Get an element from the collection, eventually expanding the provided connections.
   *
   * @param {Object} config - The configuration object for your Firebase instance.
   * @param {string} config.url - The base URL of your Firebase instance.
   * @param {string} config.url - The secret to use for accessing your Firebase instance.
   * @param {string} id - The ID of the object to retrieve.
   * @param {Object} expand - Dictionary containing attribute names of connections that have to be
   *   expanded. Attribute values must be Objects with the same specs as expand, as they will be
   *   used for recursive expansion.
   * @returns {Promise} - A Promise that will be resolved with the fetched object.
   */
  FirebaseClass.get = function(config, id, expand) {
    return http('GET', config, collectionName, id)
      .then(function(result) {
        // if expand is falsy, set the default
        expand = defaultExpand(expand);
        return FirebaseClass.expand(config, result, expand, id);
      });
  };

  /**
   * Error handler for handling expansion errors: during expansion it may happen that a reference
   * doesn't exist on Firebase. Instead of erroring, print a warning for debugging purposes and
   * discard the expanded element.
   * @param {string} className - The class name of the object expansion was attempted for.
   * @param {string} key - The key of the object expansion was attempted for.
   * @returns {Function} - A custom error handler that prints out the warning.
   */
  var expansionErrorHandler = function(className, key) {
    return function(err) {
      console.warn('Object', key, 'of class', className,
        'generated a warning during expansion:\n', err.stack);
    };
  };

   * Expand an element of this class by retrieving all of its connections to other classes
   * (collections) on Firebase.
   *
   * @param {Object} config - The configuration object for your Firebase instance.
   * @param {string} config.url - The base URL of your Firebase instance.
   * @param {string} config.url - The secret to use for accessing your Firebase instance.
   * @param {Object} element - The element to expand using its connections.
   * @param {Object} expand - Dictionary containing attribute names of connections that have to be
   *   expanded. Attribute values must be {Object}s with the same specs as expand, as they will be
   *   used for recursive expansion.
   * @param {string} id - The (optional) ID of the element that will be expanded. If defined, it
   *   will be set into the object's `id` property.
   * @returns {Promise} - A Promise that will be resolved with the expanded object.
   *
   * @example <caption>Example usage of FirebaseClass.expand.</caption>
   * var expansionPromise = MyClass.expand({
   *  url: "",
   *  secret: ""
   * }, myClassObject, {
   *  attribute1: {}.
   *  attribute2: {}
   *  attribute3: {
   *    attribute_a: {},
   *    attribute_recursive2: {
   *      attribute_end: {}
   *    }
   *  }
   * }, 1337);
   */
  FirebaseClass.expand = function(config, element, expand, id) {
    var expansionPromises = [];

    if (!element) {
      return Q.fcall(function() {
        return element;
      });
    }

    // add the id, if any
    if (id && _.isObject(element)) {
      element.id = id;
    }

    // remove from the element all those expandables not in expand
    Object.keys(expandables || {}).forEach(function(key) {
      if (!expand || !expand.hasOwnProperty(key)) {
        delete element[key];
      }
    });

    if (expand && _.isObject(expand)) {
      // loop on the expand object and expand those attributes
      Object.keys(expand).forEach(function(key) {
        var expandChildren = expand[key];
        // the class to expand
        var fClass = require('./' + expandables[key]);
        var attribute = element[key];
        // if the object is single
        if (typeof(attribute) === 'string') {
          // get it, convert it, set it
          var p = fClass.get(config, attribute, expandChildren)
            .then(function(o) {
              element[key] = o;
            })
            .catch(expansionErrorHandler(expandables[key], key));
          expansionPromises.push(p);
        } else {
          // reset the Object to an Array
          element[key] = [];
          // if there is more than one object of the same class, for each of them
          Object.keys(attribute).forEach(function(id) {
            // get it, convert it, push it
            var cp = fClass.get(config, id, expandChildren)
              .then(function(o) {
                element[key].push(o);
                return o;
              })
              .catch(expansionErrorHandler(expandables[key], key));
            expansionPromises.push(cp);
          });
        }
      });
    }

    return Q.all(expansionPromises)
      .then(function() {
        return element;
      });
  };

  /**
   * Expand an array or dictionary of elements by calling {@link FirebaseClass.expand} with the
   * provided arguments.
   *
   * @param {Object} config - The configuration object for your Firebase instance.
   * @param {string} config.url - The base URL of your Firebase instance.
   * @param {string} config.url - The secret to use for accessing your Firebase instance.
   * @param {Object|Object[]} elements - Dictionary of elements or array of elements to expand.
   * @param {Object} expand - Dictionary containing attribute names of connections that have to be
   *   expanded. Attribute values must be {Object}s with the same specs as expand, as they will be
   *   used for recursive expansion.
   * @returns {Promise} - A Promise that will be resolved with the expanded object as an array.
   */
  FirebaseClass.expandAll = function(config, elements, expand) {
    var promises = [];
    if (_.isObject(elements)) {
      elements = FirebaseClass.toList(elements);
    }
    elements.forEach(function(element, key) {
      var p = FirebaseClass.expand(config, element, expand)
        .then(function(o) {
          elements[key] = o;
          return o;
        });
      promises.push(p);
    });
    return Q.all(promises);
  };

  /**
   * Convert a set of elements stored in a dictionary (map, object) into an array.
   *
   * @param {Object} elements - Dictionary containing one element for each attribute, where the
   *   attribute name is the element id.
   * @returns {Array} - The input elements as an array, with the `id` attributes set.
   */
  FirebaseClass.toList = function(elements) {
    var list = [];
    for (var key in elements) {
      elements[key].id = key;
      list.push(elements[key]);
    }
    return list;
  };

  return FirebaseClass;
};

module.exports = buildFirebaseClass;
