/**
 * @fileoverview Объект, описывающий поведение отзывв на странице:
 * — получение данных
 * — отрисовку на страницу
 * — добавление обработчиков событий
 * — удаление элемента со страницы и очистку памяти
 */


'use strict';

var BaseComponent = require('../dom-component');
var domUtils = require('../dom-utils');
var createReviewElement = require('./create-review-element');

/**
 * @param {Object} data
 * @param {Element} container
 * @constructor
 */

var Review = function(data, container) {
  BaseComponent.call(this, data, createReviewElement);
  this.onReviewAnswer = this.onReviewAnswer.bind(this);
  this.remove = this.remove.bind(this);
  this.onClick = this.onClick.bind(this);
  BaseComponent.prototype.insert.call(this, container);
};

domUtils.inherit(Review, BaseComponent);

Review.prototype = {
  onReviewAnswer: function(evt) {
    if (evt.target.classList.contains('review-quiz-answer')) {
      var activeAnswer = evt.target.parentNode.querySelector('.review-quiz-answer-active');

      if (activeAnswer) {
        activeAnswer.classList.remove('.review-quiz-answer-active');
      }

      evt.target.classList.add('.review-quiz-answer-active');
    }
  },
  onClick: function() {
    this.element.addEventListener('click', this.onReviewAnswer);
  },
  remove: function() {
    this.element.removeEventListener('click', this.onReviewAnswer);
    BaseComponent.prototype.remove.call(this);
  }
};
module.exports = Review;
