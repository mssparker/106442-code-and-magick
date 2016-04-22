/**
 * @fileoverview Вспомогательные методы
 */

'use strict';

var config = require('./config');

/** @constant {number} */
var LOAD_TIMEOUT = 10000;
var LOAD_STATUS_SUCCESS = 200;

module.exports = {
  /**
   * toggle visibility for element
   * @param  {Element} element
   * @param  {Boolean} flag
   */
  toggleElementVisibility: function(element, flag) {
    element.classList.toggle(config.hiddenClass, flag);
  },

  /**
   * @param {string} url
   * @param {object} LoadStatus
   * @param {function(Array.<Object>)} callback
   */
  load: function(url, LoadStatus, callback) {
    var xhr = new XMLHttpRequest();
    if(LoadStatus) {
      config.loadContainer.classList.add(LoadStatus.loadProgress);
    }

    /** @param {ProgressEvent} */
    xhr.onload = function(evt) {
      if (evt.target.status === LOAD_STATUS_SUCCESS) {
        try {
          var loadedData = JSON.parse(evt.target.response);
          callback(loadedData);
        } catch (e) {
          if(LoadStatus) {
            config.loadContainer.classList.remove(LoadStatus.loadProgress);
            config.loadContainer.classList.add(LoadStatus.loadFailure);
          }
        }
      }

      if(LoadStatus) {
        config.loadContainer.classList.remove(LoadStatus.loadProgress);
      }
    };

    xhr.onerror = function() {
      if(LoadStatus) {
        config.loadContainer.classList.remove(LoadStatus.loadProgress);
        config.loadContainer.classList.add(LoadStatus.loadFailure);
      }
    };

    xhr.timeout = LOAD_TIMEOUT;
    xhr.open('GET', url);
    xhr.send();
  }
};