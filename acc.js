require('env2')('./keys/.env');
var {configureLike} = require('./sendLikeWrapper');

const _ = require('underscore');
var Client = require('instagram-private-api').V1;
var {Helpers} = require('instagram-private-api');
var Request = require('instagram-private-api').V1;

const accountName = process.env.ACCOUNT_NAME;
const botName = process.env.BOT_NAME;
const botPass = process.env.BOT_PASSWORD;

var device = new Client.Device(botName);
var storage = new Client.CookieFileStorage(__dirname + '/cookies/'+botName+'.json');

Client.Session.create(device, storage, botName, botPass)
    .then(function (session) {
        // console.log('searching');
        // console.log(accountName);
        return [session, Client.Account.searchForUser(session, accountName)]
    })
    .spread(function (session, user) {
        console.log('user');
        console.log(user);
        // console.log(message);
        configureLike(session, user.id);
    });
