'use strict';

var Data = function(data) {
  this.data = data;
};

Data.prototype.getAuthorName = function() {
  return this.data.author.name;
};

Data.prototype.getAuthorImage = function() {
  return this.data.author.picture;
};

Data.prototype.getRating = function() {
  return this.data.rating;
};

Data.prototype.getDescription = function() {
  return this.data.description;
};

module.exports = Data;
