/**
 * @fileoverview ?????? ?????? ? ??????? ????????? ?????? ?? ??????
 * ??????? ? ???????????? ??????? ??????
 */

'use strict';

/**
 * @param {Object} data
 * @param {Element} clone
 * @constructor
 */

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
 * @param {HTMLElement} clone
 * @return {HTMLElement}
 */
/**
 * @param {Object} data
 * @return {HTMLElement}
 */

var createReviewElement = function(data, container) {
  var element = reviewToClone.cloneNode(true);
  var reviewRating = element.querySelector('.review-rating');
  var reviewAuthor = element.querySelector('.review-author');
  var reviewAuthorImage = new Image();
  var reviewAuthorImageLoadTimeout;

  element.querySelector('.review-text').textContent = data.description;
  reviewAuthor.title = data.author.name;
  reviewAuthor.alt = data.author.name;
  reviewAuthor.width = IMAGE_SIZE;
  reviewAuthor.height = IMAGE_SIZE;

  var reviewRatingSize = 0;

  for(var i = 0; i < data.rating; i++) {
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

  reviewAuthorImage.src = data.author.picture;

  reviewAuthorImageLoadTimeout = setTimeout(function() {
    reviewAuthorImage.src = '';
    element.classList.add('review-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  return element;
};

module.exports = createReviewElement;
