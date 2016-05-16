'use strict';

var BaseComponent = function(data, callback) {
  this.element = callback(data);
};

BaseComponent.prototype.insert = function(container) {
  container.appendChild(this.element);
};

BaseComponent.prototype.remove = function() {
  this.element.parentNode.removeChild(this.element);
};

module.exports = BaseComponent;
