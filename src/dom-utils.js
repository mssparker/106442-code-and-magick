'use strict';

var config = require('./config');

module.exports = {
  loadStatus: {
    loadProgress: 'reviews-list-loading',
    loadFailure: 'review-load-failure',
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
