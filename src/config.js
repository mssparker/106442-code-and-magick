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
  sels: {
    reviews: '.reviews'
  }
};
