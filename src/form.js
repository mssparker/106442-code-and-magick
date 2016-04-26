'use strict';

(function() {

  var domUtils = require('./dom-utils');

  var browserCookies = require('browser-cookies');
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  var form = formContainer.querySelector('.review-form');
  var formReviewRadioMark = form.elements['review-mark'];
  var formReviewFieldName = form.elements['review-name'];
  var formReviewFieldText = form.elements['review-text'];
  var formReviewStatus = form.querySelector('.review-fields');
  var formReviewStatusName = form.querySelector('.review-fields-name');
  var formReviewStatusText = form.querySelector('.review-fields-text');
  var formReviewSubmit = form.querySelector('.review-submit');
  var formReviewFieldNameError = form.querySelector('.review-field-name-error');
  var formReviewFieldTextError = form.querySelector('.review-field-text-error');
  var formReviewRadioMarkMin = 3;

  formReviewSubmit.disabled = true;
  formReviewFieldName.required = true;
  domUtils.toggleElementVisibility(formReviewStatusText, true);
  formValidation();


  formReviewRadioMark.value = browserCookies.get('formReviewRadioMark') || formReviewRadioMark.value;
  formReviewFieldName.value = browserCookies.get('formReviewFieldName') || formReviewFieldName.value;

  /** Устанавливаем обработчик на проверку оценки */
  for (var i = 0; i < formReviewRadioMark.length; i++) {
    formReviewRadioMark[i].addEventListener('change', function() {
      formReviewFieldText.required = fieldIsRequired();
      formValidation();
    });
  }
  function fieldIsRequired() {
    return formReviewRadioMark.value < formReviewRadioMarkMin;
  }

  /**
   * Проверка валидности поля
   *
   * @param {HTMLInputElement} field
   */

  function fieldIsValidated(field) {
    return field.validity.valid;
  }

  /**
   *  Проверка валидности формы
   *
   * @param {boolean} status
   */
  function formIsValidated(status) {
    domUtils.toggleElementVisibility(formReviewStatus, status);
    formReviewSubmit.disabled = !status;
  }

  /** Валидация */
  function formValidation() {
    var invalidEvent = new Event('invalid');
    form.dispatchEvent(invalidEvent);
  }

  formReviewFieldName.addEventListener('input', formValidation);
  formReviewFieldText.addEventListener('input', formValidation);
  form.addEventListener('invalid', function() {
    var nameStatus = fieldIsValidated(formReviewFieldName);
    var textStatus = fieldIsValidated(formReviewFieldText);

    formIsValidated(nameStatus && textStatus);

    domUtils.toggleElementVisibility(formReviewStatusName, nameStatus); /** Переключаем подсказку для поля имя */
    domUtils.toggleElementVisibility(formReviewStatusText, textStatus); /** Переключаем подсказку для поля отзыв */

    formReviewFieldNameError.innerHTML = formReviewFieldName.validationMessage;
    formReviewFieldTextError.innerHTML = formReviewFieldText.validationMessage;
  });

  /**
   * @param {Event} evt
   */
  form.onsubmit = function(evt) {
    evt.preventDefault();

    var dayToday = new Date();
    var dayMyBirth = new Date(dayToday.getFullYear(), 8, 2);
    var msec = 1000 * 60 * 60 * 24;

    if (dayMyBirth > dayToday) {
      dayMyBirth.setFullYear(dayMyBirth.getFullYear() - 1);
    }

    var dateDifference = Math.floor((dayToday - dayMyBirth) / msec);
    var formattedDateToExpire = new Date(dayToday.valueOf() + dateDifference * msec).toUTCString();

    browserCookies.set('formReviewRadioMark', formReviewRadioMark.value, { expires: formattedDateToExpire });
    browserCookies.set('formReviewFieldName', formReviewFieldName.value, { expires: formattedDateToExpire });
    this.submit();
  };

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };
})();
