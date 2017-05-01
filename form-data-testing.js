var FormData = require('form-data');
var fs = require('fs');

var form = new FormData();
form.append('myFile', fs.createReadStream('./img/instrukcija.jpg'));

console.log(form);
