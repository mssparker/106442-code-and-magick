/**
 * @fileoverview Локальные настройки проекта
 */

'use strict';

/** @constant {string} */
var HIDDEN_CLASSNAME = 'invisible';

module.exports = {
  /** class for toggle visibility */
  hiddenClass: HIDDEN_CLASSNAME,

  /** loadUrl for load utils
   * @type {string}
   */
  loadUrl: '//o0.github.io/assets/json/reviews.json',

  /** Status for load utils
   * @type {object}
   * */
  loadStatus: {
    loadProgress: 'reviews-list-loading',
    loadFailure: 'review-load-failure',
    loadContainer: document.querySelector('.reviews'),

    statusProgress: function() {
      this.loadContainer.classList.add(this.loadProgress);
    },

    statusSuccess: function() {
      this.loadContainer.classList.remove(this.loadProgress);
    },

    statusFailure: function() {
      this.loadContainer.classList.remove(this.loadProgress);
      this.loadContainer.classList.add(this.loadFailure);
    }
  }
};
