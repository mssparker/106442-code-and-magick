'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  var form = formContainer.querySelector('.review-form');
  var formReviewMark = form.elements['review-mark'];
  var formReviewFieldName = form.elements['review-name'];
  var formReviewFieldText = form.elements['review-text'];
  var formReviewFields = form.querySelector('.review-fields');
  var formReviewFieldsName = form.querySelector('.review-fields-name');
  var formReviewFieldsText = form.querySelector('.review-fields-text');
  var formReviewSubmit = form.querySelector('.review-submit');
  var formReviewMarkMin = 3;
  var formReviewFieldError = form.querySelector('.review-field-error');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };
  formReviewSubmit.disabled = 'true';
  formReviewFieldName.required = true;
  formReviewFieldText.required = isRequired();
  formValidation();

  /** Проверка обязательно ли поле */
  for (var i = 0; i < formReviewMark.length; i++) {
    formReviewMark[i].addEventListener('change', function() {
      formReviewFieldText.required = isRequired();
      formValidation();
    });
  }
  function isRequired() {
    return formReviewMark.value < formReviewMarkMin;
  }
  /** Проверка валидности поля */
  function isValidated(field) {
    if (!field.validity.valid) {
      return false;
    } else {
      return true;
    }
  }
  /** Проверка для доп задания */
  function isError(field) {
    if (!field.validity.valid) {
      formReviewFieldError.innerHTML = field.validationMessage;
    } else {
      formReviewFieldError.innerHTML = '';
    }
  }
  /** Валидация */
  function formValidation() {
    var nameStatus = isValidated(formReviewFieldName);
    /** Если отзыв является обязательным для заполнения то */
    if (formReviewFieldText.required === true) {
      formReviewFields.classList.remove('invisible'); /** Убираем invisible с блока подсказок */
      formReviewFieldsText.classList.remove('invisible'); /** Убираем invisible с подсказки о отзыве */
      formReviewSubmit.disabled = true; /** Дизеблим кнопку */

      var textStatus = isValidated(formReviewFieldText); /** Дизеблим кнопку */

      var formValid = nameStatus && textStatus;

      if (formValid === true) { /** Если оба поля заполнены то */
        formReviewSubmit.disabled = false; /** Убираем дизейбл с кнопки */
        formReviewFields.classList.toggle('invisible', formValid); /** Ставим invisible блоку подсказок */
      }

      formReviewFieldsName.classList.toggle('invisible', nameStatus); /** Переключаем подсказку для поля имя */
      formReviewFieldsText.classList.toggle('invisible', textStatus); /** Переключаем подсказку для поля отзыв */


    /** Если отзыв не является обязательным для заполнения то */
    } else {
      formReviewFieldsText.classList.add('invisible'); /** Ставим invisible подсказке о отзыве */

      if (nameStatus === true) { /** Если по Имя заполнено то */
        formReviewSubmit.disabled = false; /** Убираем дизейбл с кнопки */
        formReviewFields.classList.toggle('invisible'); /** Ставим invisible блоку подсказок */
      } else { /** Иначе ставим дизейбл кнопке */
        formReviewSubmit.disabled = true;
      }
      formReviewFields.classList.toggle('invisible', nameStatus); /** Переключаем блок с подсказкой */
      formReviewFieldsName.classList.toggle('invisible', nameStatus); /** Переключаем подсказку для поля имя */
    }
  }

  formReviewFieldName.addEventListener('input', function() {
    formValidation();
    isError(formReviewFieldName);
  });

  formReviewFieldText.addEventListener('input', function() {
    formValidation();
  });

})();
