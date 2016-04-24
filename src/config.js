/**
 * @fileoverview Локальные переменные проекта
 */

'use strict';

/** @constant {string} */
var HIDDEN_CLASSNAME = 'invisible';

var loadUrl = '//o0.github.io/assets/json/reviews.json';
var loadStatusProgress = 'reviews-list-loading';
var loadStatusFailure = 'review-load-failure';
var loadContainer = document.querySelector('.reviews');

function LoadStatus() {
  this.loadProgress = loadStatusProgress;
  this.loadFailure = loadStatusFailure;
  this.loadContain = loadContainer;
}

var loadStatus = new LoadStatus();

module.exports = {
  /**
   * class for toggle visibility
   */
  hiddenClass: HIDDEN_CLASSNAME,
  loadUrl: loadUrl,
  loadContainer: loadContainer,
  loadStatus: loadStatus
};
