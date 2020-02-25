const util = require('util');
const Redis = require('../../cache/redis');

function Subscriber(...args) {
  Redis.apply(this, args);
}

Subscriber.prototype.subscribe = function (key) {
  this.client.subscribe(key);
};

util.inherits(Subscriber, Redis);

module.exports = Subscriber;
