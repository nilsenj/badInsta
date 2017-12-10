"use strict";
var request = require('request');
const log_1 = require('./../log');
class PrivateChannel {
    constructor(options) {
        this.options = options;
        this.request = request;
    }
    authenticate(socket, data) {
        let options = {
            url: this.authHost() + this.options.authEndpoint,
            form: { channel_name: data.channel },
            headers: (data.auth && data.auth.headers) ? data.auth.headers : {},
            rejectUnauthorized: false
        };
        return this.severRequest(socket, options);
    }
    authHost() {
        return (this.options.authHost) ?
            this.options.authHost : this.options.host;
    }
    severRequest(socket, options) {
        return new Promise((resolve, reject) => {
            options.headers = this.prepareHeaders(socket, options);
            this.request.post(options, (error, response, body, next) => {
                if (!error && response.statusCode == 200) {
                    resolve(JSON.parse(response.body));
                }
                else {
                    log_1.Log.error(error);
                    reject('Could not send authentication request.');
                }
            });
        });
    }
    prepareHeaders(socket, options) {
        options.headers['Cookie'] = socket.request.headers.cookie;
        return options.headers;
    }
}
exports.PrivateChannel = PrivateChannel;
