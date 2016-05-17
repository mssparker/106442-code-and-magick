/**
 * @fileoverview ?????? ?????? ? ??????? ????????? ?????? ?? ??????
 * ??????? ? ???????????? ??????? ??????
 */

'use strict';

/** @constant {number} */
var IMAGE_LOAD_TIMEOUT = 10000;
var RATING_DEFAULT_SIZE = 30;
var IMAGE_SIZE = 30;

var templateElement = document.querySelector('template');
var reviewToClone;

if ('content' in templateElement) {
  reviewToClone = templateElement.content.querySelector('.review');
} else {
  reviewToClone = templateElement.querySelector('.review');
}

/**
 * @param {Object} data
 * @return {HTMLElement}
 */

var createReviewElement = function(data) {
  var element = reviewToClone.cloneNode(true);
  var reviewRating = element.querySelector('.review-rating');
  var reviewAuthor = element.querySelector('.review-author');
  var reviewAuthorImage = new Image();
  var reviewAuthorImageLoadTimeout;

  element.querySelector('.review-text').textContent = data.getDescription();
  reviewAuthor.title = data.getAuthorName();
  reviewAuthor.alt = data.getAuthorName();
  reviewAuthor.width = IMAGE_SIZE;
  reviewAuthor.height = IMAGE_SIZE;

  var reviewRatingSize = 0;

  for(var i = 0; i < data.getRating(); i++) {
    reviewRatingSize = reviewRatingSize + RATING_DEFAULT_SIZE;
    reviewRating.style.width = reviewRatingSize + 'px';
  }

  reviewAuthorImage.onload = function(evt) {
    clearTimeout(reviewAuthorImageLoadTimeout);
    reviewAuthor.src = evt.target.src;
  };

  reviewAuthorImage.onerror = function() {
    element.classList.add('review-load-failure');
  };

  reviewAuthorImage.src = data.getAuthorImage();

  reviewAuthorImageLoadTimeout = setTimeout(function() {
    reviewAuthorImage.src = '';
    element.classList.add('review-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  return element;
};

module.exports = createReviewElement;
