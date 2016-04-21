/**
 * @fileoverview Функция фильтрации списка
 */

'use strict';

var FilterType = require('./filter-type');

  /**
   * @param {Array.<Object>} reviews
   * @param {string} filterType
   * @return {Array.<Object>}
   */

var filter = function(reviews, filterType) {
  var reviewsToFilter = reviews.slice(0);

  switch (filterType) {
    case FilterType.ALL:
      break;
    case FilterType.RECENT:
      return getRecentReviews(reviewsToFilter);
    case FilterType.GOOD:
      reviewsToFilter = reviewsToFilter.sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;
    case FilterType.BAD:
      reviewsToFilter = reviewsToFilter.sort(function(a, b) {
        return a.rating - b.rating;
      });
      break;
    case FilterType.POPULAR:
      reviewsToFilter = reviewsToFilter.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
      break;
  }

  return reviewsToFilter;
};

var getRecentReviews = function(reviews) {
  var currentDate = new Date();
  var recentDate = Math.floor(currentDate.valueOf() - 14);

  reviews = reviews.filter(function(review) {
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

module.exports = filter;
