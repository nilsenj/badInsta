"use strict";
var Redis = require('ioredis');
class RedisSubscriber {
    constructor() {
        this._redis = new Redis();
    }
    subscribe(callback) {
        this._redis.psubscribe('*', (err, count) => { });
        this._redis.on('pmessage', (subscribed, channel, message) => {
            message = JSON.parse(message);
            callback(channel, message);
        });
    }
}
exports.RedisSubscriber = RedisSubscriber;
