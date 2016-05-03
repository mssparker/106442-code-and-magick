'use strict';

var utils = require('./utils');

var photogallery = document.querySelector('.photogallery');
var galleryImageArray = document.querySelectorAll('.photogallery-image > img');

var galleryContainer = document.querySelector('.overlay-gallery');
var galleryPreview = galleryContainer.querySelector('.overlay-gallery-preview');
var galleryBtnClose = galleryContainer.querySelector('.overlay-gallery-close');
var galleryBtnPrev = galleryContainer.querySelector('.overlay-gallery-control-left');
var galleryBtnNext = galleryContainer.querySelector('.overlay-gallery-control-right');
var galleryPreviewTotal = galleryContainer.querySelector('.preview-number-total');
var galleryPreviewCurrent = galleryContainer.querySelector('.preview-number-current');

/** @constant {number} */
var ESC = 27;

//var imgId;
var currentImg;
var numberImg;

/** @type {Array.<string>} */
var galleryPictures = [];
var galleryImageArrayLength = galleryPictures.length;

var getGalleryArray = function() {
  for (var i = 0; i < galleryImageArray.length; i++) {
    galleryPictures.push(galleryImageArray[i].getAttribute('src'));
    galleryImageArray[i].dataset.id = i;
  }
  galleryImageArrayLength = galleryPictures.length;

  galleryPreviewTotal.textContent = galleryImageArrayLength;
  currentImg = galleryPreview.appendChild(new Image);
};

var _hideGallery = function() {
  galleryBtnPrev.removeEventListener('click', _showPrevImage);
  galleryBtnNext.removeEventListener('click', _showNextImage);
  galleryBtnClose.removeEventListener('click', _onCloseClick);
  window.removeEventListener('keydown', _onDocumentKeyDown);

  utils.toggleElementVisibility(galleryContainer, true);
};

var _onDocumentKeyDown = function(evt) {
  if (evt.keyCode === ESC) {
    _hideGallery();
  }
};

var _showPrevImage = function() {};
var _showNextImage = function() {};

var _onCloseClick = function() {
  _hideGallery();
};


/** @param {number} imgId*/
var showGallery = function(imgId) {
  numberImg = imgId;
  currentImg.src = galleryPictures[numberImg];
  galleryPreviewCurrent.textContent = numberImg + 1;

  galleryBtnPrev.addEventListener('click', _showPrevImage);
  galleryBtnNext.addEventListener('click', _showNextImage);
  galleryBtnClose.addEventListener('click', _onCloseClick);
  window.addEventListener('keydown', _onDocumentKeyDown);

  utils.toggleElementVisibility(galleryContainer, false);
};

module.exports = {
  getGalleryArray: getGalleryArray,
  showGallery: showGallery,
  photogallery: photogallery
};


