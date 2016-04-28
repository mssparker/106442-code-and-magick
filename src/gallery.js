/**
 * @fileoverview Компонента фотогалереи
 */

'use strict';

var domUtils = require('./dom-utils');

/** @constructor */
var Gallery = function() {
  var self = this;

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

  this.getGallery = function(srcArray) {
    galleryImages = srcArray;
    galleryImagesArrayLength = galleryImages.length;
    galleryPreviewTotal.textContent = galleryImagesArrayLength;
    currentImage = galleryPreview.appendChild(createImage);
  };

  this.onDocumentKeyDown = function(evt) {
    if (evt.keyCode === ESC) {
      self.hideGallery();
    }
  };

  this.onCloseClick = function() {
    self.hideGallery();
  };

  this.showPrevImage = function() {
    if (numberImage > 0) {
      numberImage--;
      self.changeImage(numberImage);
    }
  };

  this.showNextImage = function() {
    if (numberImage < galleryImagesArrayLength - 1) {
      numberImage++;
      self.changeImage(numberImage);
    }
  };

  this.changeImage = function(numberCurrent) {
    numberCurrent = numberImage;
    currentImage.src = galleryImages[numberCurrent];
    galleryPreviewCurrent.textContent = numberCurrent + 1;

    domUtils.toggleElementVisibility(galleryBtnPrev, numberCurrent === 0);
    domUtils.toggleElementVisibility(galleryBtnNext, numberCurrent === galleryImagesArrayLength - 1);
  };

  this.hideGallery = function() {
    galleryBtnPrev.removeEventListener('click', this.showPrevImage);
    galleryBtnNext.removeEventListener('click', this.showNextImage);
    galleryBtnClose.removeEventListener('click', this.onCloseClick);
    window.removeEventListener('keydown', this.onDocumentKeyDown);

    domUtils.toggleElementVisibility(galleryContainer, true);
  };

  /** @param {number} imageId*/
  this.showGallery = function(imageId) {
    numberImage = imageId;
    self.changeImage(numberImage);

    galleryBtnPrev.addEventListener('click', this.showPrevImage);
    galleryBtnNext.addEventListener('click', this.showNextImage);
    galleryBtnClose.addEventListener('click', this.onCloseClick);
    window.addEventListener('keydown', this.onDocumentKeyDown);

    domUtils.toggleElementVisibility(galleryContainer, false);
  };
};

module.exports = new Gallery();


