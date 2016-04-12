'use strict';

(function() {
  var reviewsFilters = document.querySelector('.reviews-filter');
  var reviewsFilter = reviewsFilters['reviews'];
  var reviewsContainer = document.querySelector('.reviews-list');
  var templateElement = document.querySelector('template');
  var reviewsList = document.querySelector('.reviews');
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

  /** @constant {string} */
  var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

  /** @type {Array.<Object>} */
  var reviews = [];

  /** @enum {number} */
  var Filter = {
    'ALL': 'reviews-all',
    'RECENT': 'reviews-recent',
    'GOOD': 'reviews-good',
    'BAD': 'reviews-bad',
    'POPULAR': 'reviews-popular'
  };


  /** @constant {Filter} */
  var DEFAULT_FILTER = Filter.ALL;

  /**
  * toggle invisible for filter
  * @param  {Element} filter
  * @param  {Boolean} flag
  */
  function toggleFilter(filter, flag) {
    filter.classList.toggle('invisible', flag );
  }

  toggleFilter(reviewsFilters, true);

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

  function reviewsFailure() {
    reviewsList.classList.add('reviews-load-failure');
  }

  /** @param {function(Array.<Object>)} callback */
  var getReviews = function(callback) {
    var xhr = new XMLHttpRequest();

    /** @param {ProgressEvent} */
    xhr.onload = function(evt) {
      reviewsList.classList.add('reviews-list-loading');
      var loadedData = JSON.parse(evt.target.response);
      callback(loadedData);
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


  var renderReviews = function(rw) {
    reviewsContainer.innerHTML = '';
    rw.forEach(function(review) {
      var createReview = createReviewElement(review, reviewToClone);
      reviewsContainer.appendChild(createReview);
    });
  };


  /**
   * @param {Array.<Object>} reviews
   * @param {string} filter
   */
  var setFiltrationEnabled = function(rw, filter) {
    var reviewsToFilter = reviews.slice(0);

    switch (filter) {
      case Filter.ALL:
        break;
      case Filter.RECENT:
        return getRecentReviews(reviewsToFilter);
      case Filter.GOOD:
        reviewsToFilter = reviewsToFilter.sort(function(a, b) {
          return b.rating - a.rating;
        });
        break;
      case Filter.BAD:
        reviewsToFilter = reviewsToFilter.sort(function(a, b) {
          return a.rating - b.rating;
        });
        break;
      case Filter.POPULAR:
        reviewsToFilter = reviewsToFilter.sort(function(a, b) {
          return b.review_usefulness - a.review_usefulness;
        });
        break;
    }

    return reviewsToFilter;
  };

  var getRecentReviews = function(rw) {
    var currentDate = new Date();
    var recentDate = Math.floor(currentDate.valueOf() - 14);

    reviews = rw.filter(function(review) {
      var reviewDate = new Date(review.date).valueOf();

      return reviewDate <= recentDate;
    });

    reviews.sort(function(a, b) {
      var earliestDate = new Date(a.date);
      var latestDate = new Date(b.date);

      return latestDate - earliestDate;
    });

    return reviews;
  };

  /** @param {Filter} filter */
  var setFilterEnabled = function(filter) {
    var filteredReviews = setFiltrationEnabled(reviews, filter);
    renderReviews(filteredReviews);
  };

  reviewsFilters.addEventListener('change', function() {
    setFilterEnabled(reviewsFilter.value);
  });


  getReviews(function(loadedReviews) {
    reviews = loadedReviews;
    setFilterEnabled(DEFAULT_FILTER);
  });


  toggleFilter(reviewsFilters, false);
})();
