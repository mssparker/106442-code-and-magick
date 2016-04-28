'use strict';

require('./form');
require('./check');
require('./game');
require('./reviews');

var gallery = require('./gallery');
var domUtils = require('./dom-utils');

var photogallery = document.querySelector('.photogallery');
var galleryImagesArray = document.querySelectorAll('.photogallery-image > img');
var imageId;

gallery.getGallery(domUtils.getSrcArray(galleryImagesArray, domUtils.imgHandler.setDataId));

photogallery.addEventListener('click', function(evt) {
  evt.preventDefault();
  if (evt.target.tagName === 'IMG') {
    imageId = parseInt(domUtils.imgHandler.getDataId(evt.target), 10);
    gallery.showGallery(imageId);
  }
});


