"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Redis = require('ioredis');
var RedisDatabase = (function () {
    function RedisDatabase(options) {
        this.options = options;
        this._redis = new Redis(options.databaseConfig.redis);
    }
    RedisDatabase.prototype.get = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._redis.get(key).then(function (value) { return resolve(JSON.parse(value)); });
        });
    };
    RedisDatabase.prototype.set = function (key, value) {
        this._redis.set(key, JSON.stringify(value));
    };
    return RedisDatabase;
}());
exports.RedisDatabase = RedisDatabase;
