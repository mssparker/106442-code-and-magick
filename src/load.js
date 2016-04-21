/**
 * @fileoverview метод для загрузки данных
 */

'use strict';

var utils = require('./utils');

/** @constant {number} */
var LOAD_TIMEOUT = 10000;
var LOAD_STATUS_SUCCESS = 200;

/** @constant {string} */
var loadUrl = '//o0.github.io/assets/json/reviews.json';
var loadStatusProgress = 'reviews-list-loading';
var loadStatusFailure = 'review-load-failure';
var loadContainer = document.querySelector('.reviews');

function loadProgress() {
  utils.setLoadStatus(loadContainer, loadStatusProgress, true);
}

function loadFailure() {
  utils.setLoadStatus(loadContainer, loadStatusProgress, false);
  utils.setLoadStatus(loadContainer, loadStatusFailure, true);
}

function loadSuccess() {
  utils.setLoadStatus(loadContainer, loadStatusProgress, false);
}

/** @param {function(Array.<Object>)} callback */

var load = function(callback) {
  var xhr = new XMLHttpRequest();
  loadProgress();

  /** @param {ProgressEvent} */
  xhr.onload = function(evt) {
    if (evt.target.status === LOAD_STATUS_SUCCESS) {
      try {
        var loadedData = JSON.parse(evt.target.response);
        callback(loadedData);
      } catch (e) {
        loadFailure();
      }
    }
    loadSuccess();
  };

  xhr.onerror = function() {
    loadFailure();
  };

  xhr.timeout = LOAD_TIMEOUT;
  xhr.open('GET', loadUrl);
  xhr.send();
};

module.exports = load;
