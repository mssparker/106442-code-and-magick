'use strict';

(function() {
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
  var formReviewFieldError = form.querySelector('.review-field-error');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  formReviewSubmit.disabled = true;
  formReviewFieldName.required = true;
  formReviewStatusText.classList.toggle('invisible', true);
  formValidation();

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
   * @param {HTMLDivElement} field
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
    statusIsToggled(formReviewStatus, status);
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

    statusIsToggled(formReviewStatusName, nameStatus); /** Переключаем подсказку для поля имя */
    statusIsToggled(formReviewStatusText, textStatus); /** Переключаем подсказку для поля отзыв */

    formReviewFieldError.innerHTML = formReviewFieldName.validationMessage;
  });

})();
