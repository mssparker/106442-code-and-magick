'use strict';

require('./form');
require('./check');
require('./game');
require('./reviews');

var gallery = require('./gallery');
var domUtils = require('./dom-utils');
var imageId;

gallery.getGallery(domUtils.getSrcArray(gallery.galleryImagesArray, domUtils.imgHandler.setDataId));

gallery.photogallery.addEventListener('click', function(evt) {
  evt.preventDefault();
  if (evt.target.tagName === 'IMG') {
    imageId = parseInt(domUtils.imgHandler.getDataId(evt.target), 10);
    gallery.showGallery(imageId);
  }
});


