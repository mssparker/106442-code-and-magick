'use strict';

require('./form');
require('./check');
require('./game');
require('./reviews');

var gallery = require('./gallery');
var imageId;

var utils = require('./utils');

utils.getSrcArray(gallery.galleryImagesArray, function(srcArray) {
  gallery.galleryImages = srcArray;
});

gallery.getGallery(gallery.galleryImages);

gallery.photogallery.addEventListener('click', function(evt) {
  evt.preventDefault();
  if (evt.target.tagName === 'IMG') {
    imageId = parseInt(evt.target.dataset.id, 10);
    gallery.showGallery(imageId);
  }
});
