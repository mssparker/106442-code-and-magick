/**
 * @fileoverview ????? ??? ???????? ??????
 */

'use strict';

var utils = require('./utils');

/** @constant {number} */
var LOAD_TIMEOUT = 10000;
var LOAD_STATUS_SUCCESS = 200;

/**
 * @param {string} load_url
 * @param {function(Object)} callback
 */

var load = function(load_url, load_status_progress, load_status_failure, callback) {
  var xhr = new XMLHttpRequest();
  utils.setLoadStatus(load_status_progress, true);

  /** @param {ProgressEvent} */
  xhr.onload = function(evt) {
    if (evt.target.status === LOAD_STATUS_SUCCESS) {
      try {
        var loadedData = JSON.parse(evt.target.response);
        callback(loadedData);
      } catch (e) {
        utils.setLoadStatus(load_status_progress, false);
        utils.setLoadStatus(load_status_failure, true);
      }
    }
    utils.setLoadStatus(load_status_progress, false);
  };

  xhr.onerror = function() {
    utils.setLoadStatus(load_status_progress, false);
    utils.setLoadStatus(load_status_failure, true);
  };

  xhr.timeout = LOAD_TIMEOUT;
  xhr.open('GET', load_url);
  xhr.send();
};


module.exports = load;