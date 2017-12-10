"use strict";
var _ = require('lodash');
const cache_1 = require('./cache');
const log_1 = require('./log');
class PresenceChannel {
    constructor(io, options) {
        this.io = io;
        this.options = options;
        this.cache = new cache_1.Cache();
    }
    getMembers(channel) {
        return this.cache.get(channel + ':members');
    }
    isMember(channel, member) {
        return new Promise((resolve, reject) => {
            this.getMembers(channel).then(members => {
                this.removeInactive(channel, members, member).then((members) => {
                    let search = members.filter(m => m.user_id == member.user_id);
                    if (search && search.length) {
                        resolve(true);
                    }
                    resolve(false);
                });
            });
        });
    }
    removeInactive(channel, members, member) {
        return new Promise((resolve, reject) => {
            this.io.of('/').in(channel).clients((error, clients) => {
                members = members.filter(member => {
                    return clients.indexOf(member.socketId) >= 0;
                });
                this.cache.store(channel + ':members', members);
                resolve(members);
            });
        });
    }
    join(socket, channel, member) {
        this.isMember(channel, member).then(is_member => {
            this.getMembers(channel).then(members => {
                members = members || [];
                member.socketId = socket.id;
                members.push(member);
                this.cache.store(channel + ':members', members);
                members = _.uniqBy(members.reverse(), 'user_id');
                this.onSubscribed(socket, members);
                if (!is_member) {
                    this.onJoin(socket, channel, member);
                }
            });
        }, () => {
            log_1.Log.error('Error retrieving pressence channel members.');
        });
    }
    leave(socket, channel) {
        this.getMembers(channel).then(members => {
            members = members || [];
            let member = members.find(member => member.socketId == socket.id);
            members = members.filter(m => m.socketId != member.socketId);
            this.cache.store(channel + ':members', members);
            this.isMember(channel, member).then(is_member => {
                if (!is_member) {
                    delete member.socketId;
                    this.onLeave(channel, member);
                }
            });
        });
    }
    onJoin(socket, channel, member) {
        this.io
            .sockets
            .connected[socket.id]
            .broadcast
            .to(channel)
            .emit('presence:joining', member);
    }
    onLeave(channel, member) {
        this.io
            .to(channel)
            .emit('presence:leaving', member);
    }
    onSubscribed(socket, members) {
        this.io
            .to(socket.id)
            .emit('presence:subscribed', members);
    }
}
exports.PresenceChannel = PresenceChannel;
