"use strict";
var Redis = require('ioredis');
class Cache {
    constructor() {
        this._redis = new Redis();
    }
    store(key, value) {
        this._redis.set(key, JSON.stringify(value));
    }
    get(key) {
        return new Promise((resolve, reject) => {
            this._redis.get(key).then(value => resolve(JSON.parse(value)));
        });
    }
    flush() { }
}
exports.Cache = Cache;
