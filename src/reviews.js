'use strict';

(function() {
  var filter = require('./filter/filter');
  var FilterType = require('./filter/filter-type');
  var domUtils = require('./dom-utils');
  var utils = require('./utils');
  var config = require('./config');

  var reviewsFilters = document.querySelector('.reviews-filter');
  var reviewsContainer = document.querySelector('.reviews-list');
  var templateElement = document.querySelector('template');
  var showMoreReviewsButton = document.querySelector('.reviews-controls-more');
  var reviewToClone;

  if ('content' in templateElement) {
    reviewToClone = templateElement.content.querySelector('.review');
  } else {
    reviewToClone = templateElement.querySelector('.review');
  }

  /** @constant {number} */
  var IMAGE_LOAD_TIMEOUT = 10000;
  var RATING_DEFAULT_SIZE = 30;
  var IMAGE_SIZE = 30;
  var PAGE_SIZE = 3;
  var pageNumber = 0;

  /** @type {Array.<Object>} */
  var reviews = [];

  /** @type {Array.<Object>} */
  var filteredReviews = [];

  /** @constant {Filter} */
  var DEFAULT_FILTER = FilterType.ALL;

  /**
  * toggle visibility for filter
  */

  utils.toggleElementVisibility(reviewsFilters, true);

  /**
  * @param {Object} data
  * @return {HTMLElement}
  */

  var createReviewElement = function(data, clone) {
    var reviewCloned = clone.cloneNode(true);
    var reviewRating = reviewCloned.querySelector('.review-rating');
    var reviewAuthor = reviewCloned.querySelector('.review-author');
    var reviewAuthorImage = new Image();
    var reviewAuthorImageLoadTimeout;

    reviewCloned.querySelector('.review-text').textContent = data.description;
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
      reviewCloned.classList.add('review-load-failure');
    };

    reviewAuthorImage.src = data.author.picture;

    reviewAuthorImageLoadTimeout = setTimeout(function() {
      reviewAuthorImage.src = '';
      reviewCloned.classList.add('review-load-failure');
    }, IMAGE_LOAD_TIMEOUT);

    return reviewCloned;
  };

  /** @param {function(Array.<Object>)} callback */
      /*

 function reviewsFailure() {
 reviewsList.classList.remove('reviews-list-loading');
 reviewsList.classList.add('reviews-load-failure');
 }
  var getReviews = function(callback) {
    var xhr = new XMLHttpRequest();
    reviewsList.classList.add('reviews-list-loading');


    xhr.onload = function(evt) {
      if (evt.target.status === 200) {
        try {
          var loadedData = JSON.parse(evt.target.response);
          callback(loadedData);
        } catch (e) {
          reviewsList.classList.add('reviews-load-failure');
        }
      }

      reviewsList.classList.remove('reviews-list-loading');
    };
    xhr.onerror = function() {
      reviewsFailure();
    };

    xhr.timeout = IMAGE_LOAD_TIMEOUT;
    xhr.ontimeout = function() {
      reviewsFailure();
    };
    xhr.open('GET', REVIEWS_LOAD_URL);
    xhr.send();
  };
  */

  /**
   * @param {Array} rw
   * @param {number} page
   * @param {number} pageSize
   * @return {boolean}
   */
  var isNextPageAvailable = function(rw, page, pageSize) {
    return page < Math.floor(rw.length / pageSize);
  };

  var setShowMoreReviews = function() {
    showMoreReviewsButton.addEventListener('click', function() {
      if (isNextPageAvailable(filteredReviews, pageNumber, PAGE_SIZE)) {
        pageNumber++;
        renderReviews(filteredReviews, pageNumber);
      }
    });
  };


  /**
   * @param {Array.<Object>} reviewsToRender
   * @param {number} page
   */
  var renderReviews = function(reviewsToRender, page, replace) {
    if (replace) {
      reviewsContainer.innerHTML = '';
    }

    var from = page * PAGE_SIZE;
    var to = from + PAGE_SIZE;

    reviewsToRender.slice(from, to).forEach(function(review) {
      var createReview = createReviewElement(review, reviewToClone);
      reviewsContainer.appendChild(createReview);
    });

    if (to < reviewsToRender.length) {
      utils.toggleElementVisibility(showMoreReviewsButton, false);
    } else {
      utils.toggleElementVisibility(showMoreReviewsButton, true);
    }
  };


  /** @param {Filter} filter */
  var setFilterEnabled = function(filterType) {
    filteredReviews = filter(reviews, filterType);
    pageNumber = 0;
    renderReviews(filteredReviews, pageNumber, true);
  };

  function setFiltersEnabled() {
    reviewsFilters.addEventListener('click', function(evt) {

      if (evt.target.type === 'radio') {
        setFilterEnabled(evt.target.value);
      }
    });
  }

  utils.load(config.loadUrl, domUtils.loadStatus, function(loadedReviews) {
    reviews = loadedReviews;
    setFiltersEnabled(true);
    setFilterEnabled(DEFAULT_FILTER);
    setShowMoreReviews();
  });

  utils.toggleElementVisibility(reviewsFilters, false);
})();
