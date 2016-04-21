/**
 * @fileoverview ??????????????? ??????
 */

'use strict';

/** @constant {string} */
var HIDDEN_CLASSNAME = 'invisible';
var LOAD_CONTAINER = document.querySelector('.reviews');

module.exports = {
  /**
   * toggle visibility for element
   * @param  {Element} element
   * @param  {Boolean} flag
   */
  toggleElementVisibility: function(element, flag) {
    element.classList.toggle(HIDDEN_CLASSNAME, flag);
  },

  setLoadStatus: function(status, flag) {
    LOAD_CONTAINER.classList.toggle(status, flag);
  }
};