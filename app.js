var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var router = require('./router/index.js');
var PORT = 8080;

app.listen(PORT, function(){
  console.log('listening PORT ' + PORT);
});

app.use('/static', express.static('static'));
app.use(urlencodedParser);
app.use('/', router);
