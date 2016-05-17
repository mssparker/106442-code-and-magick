/**
 * @fileoverview Компонента фотогалереи
 */

'use strict';

var domUtils = require('../dom-utils');

var galleryContainer = document.querySelector('.overlay-gallery');
var galleryPreview = galleryContainer.querySelector('.overlay-gallery-preview');
var galleryBtnClose = galleryContainer.querySelector('.overlay-gallery-close');
var galleryBtnPrev = galleryContainer.querySelector('.overlay-gallery-control-left');
var galleryBtnNext = galleryContainer.querySelector('.overlay-gallery-control-right');
var galleryPreviewTotal = galleryContainer.querySelector('.preview-number-total');
var galleryPreviewCurrent = galleryContainer.querySelector('.preview-number-current');

/**
 * @const {RegExp}
 */
var PATH = /#photo\/(\S+)/;


/** @constant {number} */
var ESC = 27;

var currentImage;
var numberImage;

var createImage = new Image(450, 450);

/** @type {Array.<string>} */
var galleryImages = [];

var galleryImagesArrayLength = galleryImages.length;


/** @constructor */
var Gallery = function() {
  /** @param {Array.<string>} srcArray*/
  this.getGallery = function(srcArray) {
    galleryImages = srcArray;
    galleryImagesArrayLength = galleryImages.length;
    galleryPreviewTotal.textContent = galleryImagesArrayLength;
    currentImage = galleryPreview.appendChild(createImage);
  };
  this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
  this.clearHash = this.clearHash.bind(this);
  this.showPrevImage = this.showPrevImage.bind(this);
  this.showNextImage = this.showNextImage.bind(this);
  this.showGallery = this.showGallery.bind(this);

  window.addEventListener('hashchange', this.onHashChange.bind(this));
};

Gallery.prototype = {
  onDocumentKeyDown: function(evt) {
    if (evt.keyCode === ESC) {
      this.clearHash();
    }
  },

  showPrevImage: function() {
    if (numberImage > 0) {
      numberImage--;
      this.setImageHash(galleryImages[numberImage]);
    }
  },
  showNextImage: function() {
    if (numberImage < galleryImagesArrayLength - 1) {
      numberImage++;
      this.setImageHash(galleryImages[numberImage]);
    }
  },
  hideGallery: function() {
    galleryBtnPrev.removeEventListener('click', this.showPrevImage);
    galleryBtnNext.removeEventListener('click', this.showNextImage);
    galleryBtnClose.removeEventListener('click', this.clearHash);
    window.removeEventListener('keydown', this.onDocumentKeyDown);
    domUtils.toggleElementVisibility(galleryContainer, true);
  },
  /** @param {string} image*/
  changeImage: function(image) {
    numberImage = image;
    currentImage.src = galleryImages[numberImage];
    galleryPreviewCurrent.textContent = numberImage + 1;
    domUtils.toggleElementVisibility(galleryBtnPrev, numberImage === 0);
    domUtils.toggleElementVisibility(galleryBtnNext, numberImage === galleryImagesArrayLength - 1);
  },

  setImageHash: function(path) {
    location.hash = '#photo/' + path;
  },

  clearHash: function() {
    location.hash = '';
  },

  onHashChange: function() {
    var result = location.hash.match(PATH);

    if (result) {
      this.showGallery(result[1]);
    } else {
      this.hideGallery();
    }
  },
  showGallery: function(image) {
    if (isNaN(image)) {
      image = galleryImages.indexOf(image);
    }
    this.changeImage(image);
    galleryBtnPrev.addEventListener('click', this.showPrevImage);
    galleryBtnNext.addEventListener('click', this.showNextImage);
    galleryBtnClose.addEventListener('click', this.clearHash);
    window.addEventListener('keydown', this.onDocumentKeyDown);
    domUtils.toggleElementVisibility(galleryContainer, false);
  }
};

module.exports = new Gallery();


