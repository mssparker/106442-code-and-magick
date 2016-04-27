/**
 * @fileoverview Вспомогательные методы
 */

'use strict';

/** @constant {number} */
var LOAD_TIMEOUT = 10000;
var LOAD_STATUS_SUCCESS = 200;

module.exports = {
  /**
   * @param {string} url
   * @param {object} loadStatus
   * @param {function(Array.<Object>)} callback
   */
  load: function(url, loadStatus, callback) {
    var xhr = new XMLHttpRequest();
    if(loadStatus) {
      loadStatus.statusProgress();
    }

    /** @param {ProgressEvent} */
    xhr.onload = function(evt) {
      if (evt.target.status === LOAD_STATUS_SUCCESS) {
        try {
          var loadedData = JSON.parse(evt.target.response);
          callback(loadedData);
        } catch (e) {
          if(loadStatus) {
            loadStatus.statusFailure();
          }
        }

        if(loadStatus) {
          loadStatus.statusSuccess();
        }
      } else if(loadStatus) {
        loadStatus.statusFailure();
      }
    };

    xhr.onerror = function() {
      if(loadStatus) {
        loadStatus.statusFailure();
      }
    };

    xhr.timeout = LOAD_TIMEOUT;
    xhr.open('GET', url);
    xhr.send();
  },

  getSrcArray: function(collection, callback) {
    var srcArray = [];
    for (var i = 0; i < collection.length; i++) {
      srcArray.push(collection[i].getAttribute('src'));
      collection[i].dataset.id = i;
    }

    callback(srcArray)
  }
};
