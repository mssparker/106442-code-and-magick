/**
 * @fileoverview Компонента фотогалереи
 */

'use strict';

var gallery = require('./gallery-constructor');
var domUtils = require('../dom-utils');

var photogallery = document.querySelector('.photogallery');
var galleryImagesArray = document.querySelectorAll('.photogallery-image > img');

gallery.getGallery(domUtils.getSrcArray(galleryImagesArray, domUtils.imgHandler.setDataId));
gallery.onHashChange();

photogallery.addEventListener('click', function(evt) {
  evt.preventDefault();
  var image = evt.target;
  if (image.tagName === 'IMG') {
    gallery.setImageHash(image.getAttribute('src'));
  }
});