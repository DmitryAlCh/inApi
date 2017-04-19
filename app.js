require('env2')('./keys/.env');
var Client = require('instagram-private-api').V1;
const accountName = process.env.ACCOUNT_NAME;
const accountPass = process.env.ACCOUNT_PASSWORD;
const botName = process.env.BOT_NAME;
const botPass = process.env.BOT_PASSWORD;

var device = new Client.Device(botName);
var storage = new Client.CookieFileStorage(__dirname + '/cookies/'+botName+'.json');

// console.log(device.info);
// console.log(storage);


Client.Session.create(device, storage, botName, botPass)
  .then((session) => {
    session.getAccount()
      .then((account)=>{
        console.log(account.params);
      })
  });

// Client.Session.create(device, storage, accountName, accountPass)
//   .then(function (session) {
//     return [session, Client.Account.searchForUser(session, 'instagram')]
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
