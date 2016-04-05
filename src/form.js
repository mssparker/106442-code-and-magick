'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  var form = formContainer.querySelector('.review-form');
  var formReviewMark = form.elements['review-mark'];
  var formReviewFieldName = form.elements['review-name'];
  var formReviewFieldText = form.elements['review-text'];
  var formReviewStatus = form.querySelector('.review-fields');
  var formReviewStatusName = form.querySelector('.review-fields-name');
  var formReviewStatusText = form.querySelector('.review-fields-text');
  var formReviewSubmit = form.querySelector('.review-submit');
  var formReviewMarkMin = 3;

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
  formValidation();

  /** Устанавливаем обработчик на проверку оценки */
  for (var i = 0; i < formReviewMark.length; i++) {
    formReviewMark[i].addEventListener('change', function() {
      formReviewFieldText.required = isRequired();
      formValidation();
    });
  }
  function isRequired() {
    return formReviewMark.value < formReviewMarkMin;
  }

  /** Переключение подсказок */
  function statusIsToggled(field, status) {
    return field.classList.toggle('invisible', status);
  }

  /** Проверка валидности поля */
  function fieldIsValidated(field) {
    return field.validity.valid;
  }

  /** Проверка валидности формы */
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

})();
