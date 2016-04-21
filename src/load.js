/**
 * @fileoverview ????? ??? ???????? ??????
 */

'use strict';

var utils = require('./utils');

/** @constant {number} */
var LOAD_TIMEOUT = 10000;
var LOAD_STATUS_SUCCESS = 200;

/**
 * @param {string} loadUrl
 * @param {function(Object)} callback
 */

var load = function(loadUrl, loadStatusProgress, loadStatusFailure, callback) {
  var xhr = new XMLHttpRequest();
  utils.setLoadStatus(loadStatusProgress, true);

  /** @param {ProgressEvent} */
  xhr.onload = function(evt) {
    if (evt.target.status === LOAD_STATUS_SUCCESS) {
      try {
        var loadedData = JSON.parse(evt.target.response);
        callback(loadedData);
      } catch (e) {
        utils.setLoadStatus(loadStatusProgress, false);
        utils.setLoadStatus(loadStatusFailure, true);
      }
    }
    utils.setLoadStatus(loadStatusProgress, false);
  };

  xhr.onerror = function() {
    utils.setLoadStatus(loadStatusProgress, false);
    utils.setLoadStatus(loadStatusFailure, true);
  };

  xhr.timeout = LOAD_TIMEOUT;
  xhr.open('GET', loadUrl);
  xhr.send();
};


module.exports = load;