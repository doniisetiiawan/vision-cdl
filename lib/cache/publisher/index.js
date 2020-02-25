const util = require('util');
const Redis = require('../../cache/redis');

function Publisher(...args) {
  Redis.apply(this, args);
}

Redis.prototype.save = function (key, items) {
  this.client.set(key, JSON.stringify(items));
};

Redis.prototype.publish = function (key, items) {
  this.client.publish(key, JSON.stringify(items));
};

util.inherits(Publisher, Redis);

module.exports = Publisher;
