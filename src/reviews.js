/**
 * @fileoverview Список отзывов: загрузка, включение фильтрации и постраничная
 * отрисовка
 */

'use strict';


var filter = require('./filter/filter');
var FilterType = require('./filter/filter-type');
var Review = require('./review/review');
var domUtils = require('./dom-utils');
var utils = require('./utils');
var config = require('./config');

var reviewsFilters = document.querySelector('.reviews-filter');
var reviewsFilter = reviewsFilters.querySelectorAll('input');
var reviewsContainer = document.querySelector('.reviews-list');
var showMoreReviewsButton = document.querySelector('.reviews-controls-more');

/** @constant {number} */
var PAGE_SIZE = 3;

/** @constant {Filter} */
var DEFAULT_FILTER = FilterType.ALL;

/**
 * Изначальный список загруженных Отзывов.
 * @type {Array.<Object>}
 */
var reviews = [];

/**
 * Текущее состояние списка отзывов, учитывающее примененный фильтр.
 * Используется для отрисовки.
 * @type {Array}
 */
var filteredReviews = [];

/** @type {number} */
var pageNumber = 0;

/**
 * Массив отрисованных объектов отзыва
 * @type {Array.<Reviews>}
 */
var renderedReviews = [];

var getLastFilter = localStorage.getItem('filterValue');
/**
* toggle visibility for filter
*/

domUtils.toggleElementVisibility(reviewsFilters, true);

/**
 * @param {Array.<Object>} reviewsToRender
 * @param {number} page
 */
var renderReviews = function(reviewsToRender, page, replace) {
  if (replace) {
    renderedReviews.forEach(function(review) {
      review.remove();
    });

    renderedReviews = [];
  }

  var from = page * PAGE_SIZE;
  var to = from + PAGE_SIZE;

  reviewsToRender.slice(from, to).forEach(function(review) {
    renderedReviews.push(new Review(review, reviewsContainer));
  });

  if (to < reviewsToRender.length) {
    domUtils.toggleElementVisibility(showMoreReviewsButton, false);
  } else {
    domUtils.toggleElementVisibility(showMoreReviewsButton, true);
  }
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
      setFilterStorage(evt.target.value);
    }
  });
}

function setFilterStorage(value) {
  localStorage.setItem('filterValue', value);
}

function setFilterActive(filterLast) {
  for (var i = 0; i < reviewsFilter.length; i++) {
    if(reviewsFilter[i].value === filterLast) {
      reviewsFilter[i].setAttribute('checked', true);
    }
  }
}

utils.load(config.loadUrl, domUtils.loadStatus, function(loadedReviews) {
  reviews = loadedReviews;
  setFiltersEnabled();
  if(getLastFilter !== null) {
    setFilterEnabled(getLastFilter);
    setFilterActive(getLastFilter);
  } else {
    setFilterEnabled(DEFAULT_FILTER);
  }
  setShowMoreReviews();
});

domUtils.toggleElementVisibility(reviewsFilters, false);

