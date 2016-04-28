/**
 * @fileoverview Объект, описывающий поведение отзывв на странице:
 * — получение данных
 * — отрисовку на страницу
 * — добавление обработчиков событий
 * — удаление элемента со страницы и очистку памяти
 */


'use strict';

var createReviewElement = require('./create-review-element');

/**
 * @param {Object} data
 * @param {Element} clone
 * @constructor
 */

var Review = function(data, container) {
  this.data = data;
  this.element = createReviewElement(data, container);

  this.onReviewAnswer = function(evt) {
    if (evt.target.classList.contains('review-quiz-answer')) {
      var activeAnswer = evt.target.parentNode.querySelector('.review-quiz-answer-active');

      if (activeAnswer) {
        activeAnswer.classList.remove('.review-quiz-answer-active');
      }

      evt.target.classList.add('.review-quiz-answer-active');
    }
  };
  this.remove = function() {
    this.element.removeEventListener('click', this.onReviewAnswer);
    this.element.parentNode.removeChild(this.element);
  };

  this.element.addEventListener('click', this.onReviewAnswer);
};

module.exports = Review;
