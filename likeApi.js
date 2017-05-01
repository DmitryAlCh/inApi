var util = require("util");
var Request = require('./node_modules/instagram-private-api/client/v1/request');
var _ = require("underscore");
var Resource = require("./node_modules/instagram-private-api/client/v1/resource");
var Helpers = require("./node_modules/instagram-private-api/helpers");

function LikeThread(session, params) {
    Resource.apply(this, arguments);
}
util.inherits(LikeThread, Resource);
module.exports = LikeThread;

mapPayload = function(session, payload) {
    return _.map(payload.threads, function(thread) {
        return new LikeThread(session, thread);
    })
}

LikeThread.getById = function(session, id) {
    if(_.isEmpty(id))
        throw new Error("`id` property is required!")
    return new Request(session)
        .setMethod('GET')
        .generateUUID()
        .setResource('threadsShow', {
            threadId: id,
            cursor: null
        })
        .send()
        .then(function(json) {
            return new Thread(session, json.thread)
        })
};

threadsWrapper = function(session, promise) {
    return promise.then(function (json) {
        if(_.isArray(json.threads))
            return mapPayload(session, json);
        if(_.isEmpty(json.thread_id))
            throw new Error("Not sure how to map an thread!");
        // You cannot fetch thread id inmedietly after configure / broadcast
        return Promise.delay(1000).then(function () {
            return LikeThread.getById(session, json.thread_id)
        })
        .then(function (thread) {
            return [thread];
        })
    })
};

LikeThread.configureLike = function(session, users) {
    if(!_.isArray(users)) users = [users];
    var payload = {
        recipient_users: JSON.stringify([users]),
        client_context: Helpers.generateUUID(),
      };
    var request = new Request(session)
        .setMethod('POST')
        .generateUUID()
        // .setResource('threadsBroadcastLike')
        .setUrl('https://i.instagram.com/api/v1/direct_v2/threads/broadcast/like/')
        .setData(payload)
        .send();
    return threadsWrapper(session, request);
};
