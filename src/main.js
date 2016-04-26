'use strict';

require('./form');
require('./check');
require('./game');
require('./reviews');

var gallery = require('./gallery');
var imageId;

gallery.getGallery();

gallery.photogallery.addEventListener('click', function(evt) {
  evt.preventDefault();
  if (evt.target.tagName === 'IMG') {
    imageId = parseInt(evt.target.dataset.id, 10);
    gallery.showGallery(imageId);
  }
});
