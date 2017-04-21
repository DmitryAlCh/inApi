require('env2')('./keys/.env');
const _ = require('underscore');
var Client = require('instagram-private-api').V1;
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
var message = "hey there, how are you?";
// Client.Session.create(device, storage, botName, botPass)
//     .then(function (session) {
//         // console.log('searching');
//         // console.log(accountName);
//         return [session, Client.Account.searchForUser(session, accountName)]
//     })
//     .spread(function (session, user) {
//         console.log('user');
//         console.log(user);
//         console.log(message);
//         return Client.Thread.configureText(session, user.id, message);
//     }).then((res) =>{
//       // console.log(res[0]._params);
//     }).catch((e) =>{console.log('failure',e);});


Client.Session.create(device, storage, botName, botPass)
        .then(function (session) {
            inbox = new Client.Feed.Inbox(session, null);
            return [session, inbox.all()];
        })
        .spread(function (session, rawThreads) {
            var threads = _.map(rawThreads, function (item) {
                //console.log(item._params.title);
                var feedThreadItems = new Client.Feed.ThreadItems(session, item.id, null);
                //feedThreadItems.setCursor("27391982294567411307246376470970368");
                //feedThreadItems.setCursor("27390237101221430165924399988867072");


                //console.log(inbox[0].threadItems
                return feedThreadItems.get().then(function (ti) {
                    //console.log('cursor_' + feedThreadItems.getCursor());
                    return {
                        id: item.id,
                        title: item._params.title,
                        threadItems: _.map(ti, function (ti) {
                            return ti._params;
                        })
                    };
                });
            });
            return Promise.all(threads)
        })
        .then(function (threads) {
            console.log(JSON.stringify(threads));
            // return threads;
        });
