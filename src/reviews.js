'use strict';

(function() {
  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsContainer = document.querySelector('.reviews-list');
  var templateElement = document.querySelector('template');
  var reviewToClone;

  if ('content' in templateElement) {
    reviewToClone = templateElement.content.querySelector('.review');
  } else {
    reviewToClone = templateElement.querySelector('.review');
  }

  /** @constant {number} */
  var IMAGE_LOAD_TIMEOUT = 10000;
  var RATING_DEFAULT_SIZE = 30;

  /**
  * toggle invisible for filter
  * @param  {Element} filter
  * @param  {Boolean} flag
  */
  function toggleFilter(filter, flag) {
    filter.classList.toggle('invisible', flag );
  }

  toggleFilter(reviewsFilter, true);

  /**
  * @param {Object} data
  * @return {HTMLElement}
  */

  var createReviewElement = function(data) {
    var reviewCloned = reviewToClone.cloneNode(true);
    var reviewRating = reviewCloned.querySelector('.review-rating');
    var reviewAuthor = reviewCloned.querySelector('.review-author');
    var reviewAuthorImage = new Image();
    var reviewAuthorImageLoadTimeout;

    reviewCloned.querySelector('.review-text').textContent = data.description;
    reviewAuthor.title = data.author.name;
    reviewAuthor.alt = data.author.name;
    reviewAuthor.width = 124;
    reviewAuthor.height = 124;

    var reviewRatingSize = 0;

    for(var i = 0; i < data.rating; i++) {
      reviewRatingSize = reviewRatingSize + RATING_DEFAULT_SIZE;
      reviewRating.style.width = reviewRatingSize + 'px';
    }

    reviewsContainer.appendChild(reviewCloned);

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

  window.reviews.forEach(createReviewElement);

  toggleFilter(reviewsFilter, false);
})();
