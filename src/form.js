'use strict';

(function() {
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
  var formReviewRadioMarkMin = 3;

  formReviewSubmit.disabled = true;
  formReviewFieldName.required = true;
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
   * Переключение подсказок
   *
   * @param {HTMLInputElement} field
   * @param {boolean} status
   */

  function statusIsToggled(field, status) {
    return field.classList.toggle('invisible', status);
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
    if (status) {
      formReviewSubmit.disabled = false;
      statusIsToggled(formReviewStatus, status);
    } else {
      formReviewSubmit.disabled = true;
    }
  }

  /** Валидация */
  function formValidation() {
    var nameStatus = fieldIsValidated(formReviewFieldName);
    var textStatus = fieldIsValidated(formReviewFieldText);

    formIsValidated(nameStatus);

    /** Если отзыв является обязательным для заполнения то */
    if (formReviewFieldText.required) {

      statusIsToggled(formReviewStatus, false); /** Убираем invisible с блока подсказок */
      statusIsToggled(formReviewStatusText, !textStatus); /** Убираем invisible с подсказки о отзыве */
      formIsValidated(nameStatus && textStatus);
    }

    statusIsToggled(formReviewStatusName, nameStatus); /** Переключаем подсказку для поля имя */
    statusIsToggled(formReviewStatusText, textStatus); /** Переключаем подсказку для поля отзыв */
  }

  formReviewFieldName.addEventListener('input', function() {
    formValidation();
  });

  formReviewFieldText.addEventListener('input', function() {
    formValidation();
  });

  /**
   * @param {Event} evt
   */
  form.onsubmit = function(evt) {
    evt.preventDefault();

    var dayToday = new Date();
    var dayMyBirth = new Date(dayToday.getFullYear(), 9, 2);
    var dateDifference = dayToday.valueOf() - dayMyBirth.valueOf();
    var formattedDateToExpire = new Date(dayToday.valueOf() + dateDifference).toUTCString();

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
