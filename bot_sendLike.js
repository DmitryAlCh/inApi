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

// console.log(device.info);
// console.log(storage);


// Client.Session.create(device, storage, botName, botPass)
//   .then((session) => {
//     session.getAccount()
//       .then((account)=>{
//         console.log(account.params);
//       })
//   });

// Client.Session.create(device, storage, botName, botPass)
//   .then(function (session) {
//     return [session, Client.Account.searchForUser(session, accountName)]
//   }).spread(function (session, account) {
//     console.log('Account found under ID: '+account.id);
//     return Client.Relationship.create(session, account.id);
//   }).then (function (relationship) {
//     console.log('Relashionship params:');
//     console.log(relationship.params);
//   }).catch((e) =>{
//     console.log('Something went wrong:');
//     console.log(e);
//   });
var message = "It is nice day";
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
        return LikeThread.configureLike(session, user.id);
    }).then((res) =>{
      // console.log(res[0]._params);
    }).catch((e) =>{console.log('failure',e);});
