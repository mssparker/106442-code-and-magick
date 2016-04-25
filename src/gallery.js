'use strict';

var utils = require('./utils');

var photogallery = document.querySelector('.photogallery');
var galleryImagesArray = document.querySelectorAll('.photogallery-image > img');

var galleryContainer = document.querySelector('.overlay-gallery');
var galleryPreview = galleryContainer.querySelector('.overlay-gallery-preview');
var galleryBtnClose = galleryContainer.querySelector('.overlay-gallery-close');
var galleryBtnPrev = galleryContainer.querySelector('.overlay-gallery-control-left');
var galleryBtnNext = galleryContainer.querySelector('.overlay-gallery-control-right');
var galleryPreviewTotal = galleryContainer.querySelector('.preview-number-total');
var galleryPreviewCurrent = galleryContainer.querySelector('.preview-number-current');

/** @constant {number} */
var ESC = 27;

var currentImage;
var numberImage;
var createImage = new Image();

/** @type {Array.<string>} */
var galleryImages = [];

var galleryImagesArrayLength = galleryImages.length;

var getGalleryArray = function() {
  for (var i = 0; i < galleryImagesArray.length; i++) {
    galleryImages.push(galleryImagesArray[i].getAttribute('src'));
    galleryImagesArray[i].dataset.id = i;
  }
  galleryImagesArrayLength = galleryImages.length;

  galleryPreviewTotal.textContent = galleryImagesArrayLength;
  currentImage = galleryPreview.appendChild(createImage);
};

var changeImage = function() {
  currentImage.src = galleryImages[numberImage];
  galleryPreviewCurrent.textContent = numberImage + 1;

  utils.toggleElementVisibility(galleryBtnPrev, numberImage === 0);
  utils.toggleElementVisibility(galleryBtnNext, numberImage === galleryImagesArrayLength - 1);
};

var hideGallery = function() {
  galleryBtnPrev.removeEventListener('click', showPrevImage);
  galleryBtnNext.removeEventListener('click', showNextImage);
  galleryBtnClose.removeEventListener('click', onCloseClick);
  window.removeEventListener('keydown', onDocumentKeyDown);

  utils.toggleElementVisibility(galleryContainer, true);
};

var onDocumentKeyDown = function(evt) {
  if (evt.keyCode === ESC) {
    hideGallery();
  }
};

var onCloseClick = function() {
  hideGallery();
};

var showPrevImage = function() {
  if (numberImage > 0) {
    changeImage(numberImage--);
  }
};

var showNextImage = function() {
  if (numberImage < galleryImagesArrayLength - 1) {
    changeImage(numberImage++);
  }
};

/** @param {number} imageId*/
var showGallery = function(imageId) {
  numberImage = imageId;
  changeImage();

  galleryBtnPrev.addEventListener('click', showPrevImage);
  galleryBtnNext.addEventListener('click', showNextImage);
  galleryBtnClose.addEventListener('click', onCloseClick);
  window.addEventListener('keydown', onDocumentKeyDown);

  utils.toggleElementVisibility(galleryContainer, false);
};

module.exports = {
  getGalleryArray: getGalleryArray,
  showGallery: showGallery,
  photogallery: photogallery
};


