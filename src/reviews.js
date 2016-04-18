'use strict';

(function() {
  var reviewsFilters = document.querySelector('.reviews-filter');
  var reviewsContainer = document.querySelector('.reviews-list');
  var templateElement = document.querySelector('template');
  var reviewsList = document.querySelector('.reviews');
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


  /** @constant {string} */
  var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

  /** @type {Array.<Object>} */
  var reviews = [];

  /** @type {Array.<Object>} */
  var filteredReviews = [];

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
    reviewsList.classList.remove('reviews-list-loading');
    reviewsList.classList.add('reviews-load-failure');
  }

  /** @param {function(Array.<Object>)} callback */
  var getReviews = function(callback) {
    var xhr = new XMLHttpRequest();
    reviewsList.classList.add('reviews-list-loading');

    /** @param {ProgressEvent} */
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
      showMoreReviewsButton.classList.remove('invisible');
    } else {
      showMoreReviewsButton.classList.add('invisible');
    }
  };


  /**
   * @param {Array.<Object>} rw
   * @param {string} filter
   */
  var getFilteredReviews = function(rw, filter) {
    var reviewsToFilter = rw.slice(0);

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
    filteredReviews = getFilteredReviews(reviews, filter);
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

  getReviews(function(loadedReviews) {
    reviews = loadedReviews;
    setFiltersEnabled(true);
    setFilterEnabled(DEFAULT_FILTER);
    setShowMoreReviews();
  });


  toggleFilter(reviewsFilters, false);
})();
