'use strict';

var domUtils = require('./dom-utils');

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
var createImage = new Image(450, 450);

/** @type {Array.<string>} */
var galleryImages = [];

var galleryImagesArrayLength = galleryImages.length;

var getGalleryArray = function(imagesArray) {
  for (var i = 0; i < imagesArray.length; i++) {
    galleryImages.push(imagesArray[i].getAttribute('src'));
    imagesArray[i].dataset.id = i;
  }
};

var getGallery = function() {
  getGalleryArray(galleryImagesArray);
  galleryImagesArrayLength = galleryImages.length;
  galleryPreviewTotal.textContent = galleryImagesArrayLength;
  currentImage = galleryPreview.appendChild(createImage);
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
    numberImage--;
    changeImage();
  }
};

var showNextImage = function() {
  if (numberImage < galleryImagesArrayLength - 1) {
    numberImage++;
    changeImage();
  }
};

var changeImage = function() {
  currentImage.src = galleryImages[numberImage];
  galleryPreviewCurrent.textContent = numberImage + 1;

  domUtils.toggleElementVisibility(galleryBtnPrev, numberImage === 0);
  domUtils.toggleElementVisibility(galleryBtnNext, numberImage === galleryImagesArrayLength - 1);
};

var hideGallery = function() {
  galleryBtnPrev.removeEventListener('click', showPrevImage);
  galleryBtnNext.removeEventListener('click', showNextImage);
  galleryBtnClose.removeEventListener('click', onCloseClick);
  window.removeEventListener('keydown', onDocumentKeyDown);

  domUtils.toggleElementVisibility(galleryContainer, true);
};

/** @param {number} imageId*/
var showGallery = function(imageId) {
  numberImage = imageId;
  changeImage(numberImage);

  galleryBtnPrev.addEventListener('click', showPrevImage);
  galleryBtnNext.addEventListener('click', showNextImage);
  galleryBtnClose.addEventListener('click', onCloseClick);
  window.addEventListener('keydown', onDocumentKeyDown);

  domUtils.toggleElementVisibility(galleryContainer, false);
};

module.exports = {
  getGallery: getGallery,
  showGallery: showGallery,
  galleryImagesArray: galleryImagesArray,
  photogallery: photogallery
};


