/**
 * @fileoverview ??????????????? ??????
 */

'use strict';

/** @constant {string} */
var HIDDEN_CLASSNAME = 'invisible';

module.exports = {
  /**
   * toggle visibility for element
   * @param  {Element} element
   * @param  {Boolean} flag
   */
  toggleElementVisibility: function(element, flag) {
    element.classList.toggle(HIDDEN_CLASSNAME, flag);
  },

  setLoadStatus: function(element, status, flag) {
    element.classList.toggle(status, flag);
  }
};
