"use strict";
const presence_channel_1 = require('./presence-channel');
const private_channel_1 = require('./private-channel');
const log_1 = require('./log');
class Channel {
    constructor(io, options) {
        this.io = io;
        this.options = options;
        this._privateChannels = ['private-*', 'presence-*'];
        this.private = new private_channel_1.PrivateChannel(options);
        this.presence = new presence_channel_1.PresenceChannel(io, options);
    }
    join(socket, data) {
        if (data.channel) {
            if (this.isPrivate(data.channel)) {
                this.joinPrivate(socket, data);
            }
            else {
                socket.join(data.channel);
            }
        }
        this.onDisconnect(socket, data.channel);
    }
    leave(socket, channel) {
        if (channel) {
            if (this.isPresence(channel)) {
                this.presence.leave(socket, channel);
            }
            socket.leave(channel);
        }
    }
    isPrivate(channel) {
        let isPrivate = false;
        this._privateChannels.forEach(privateChannel => {
            let regex = new RegExp(privateChannel.replace('\*', '.*'));
            if (regex.test(channel))
                isPrivate = true;
        });
        return isPrivate;
    }
    joinPrivate(socket, data) {
        this.private.authenticate(socket, data).then(res => {
            socket.join(data.channel);
            if (this.isPresence(data.channel)) {
                this.presence.join(socket, data.channel, res.channel_data);
            }
        }, error => log_1.Log.error(error));
    }
    isPresence(channel) {
        return channel.lastIndexOf('presence-', 0) === 0;
    }
    onDisconnect(socket, channel) {
        socket.on('disconnect', () => this.leave(socket, channel));
    }
}
exports.Channel = Channel;
