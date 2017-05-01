require('env2')('./keys/.env');
const _ = require('underscore');
var Client = require('instagram-private-api').V1;
// var {Helpers} = require('instagram-private-api');
// var Thread = require('./edited-node-modules');
var LikeThread = require('./likeApi');
const accountName = process.env.ACCOUNT_NAME;
const botName = process.env.BOT_NAME;
const botPass = process.env.BOT_PASSWORD;

var device = new Client.Device(botName);
var storage = new Client.CookieFileStorage(__dirname + '/cookies/'+botName+'.json');

var path = "./img/Instrukcija.jpg";
var uploadId = '';
var name = '';

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
        return Client.Thread.configurePhoto(session, path, uploadId, name);
    }).then((res) =>{
      // console.log(res[0]._params);
    }).catch((e) =>{console.log('failure',e);});
