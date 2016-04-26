'use strict';

var config = require('./config');

module.exports = {
  /**
   * toggle visibility for element
   * @param  {Element} element
   * @param  {Boolean} flag
   */
  toggleElementVisibility: function(element, flag) {
    element.classList.toggle(config.hiddenClass, flag);
  },

  loadStatus: {
    loadProgress: 'reviews-list-loading',
    loadFailure: 'reviews-load-failure',
    loadContainer: document.querySelector(config.sels.reviews),

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
