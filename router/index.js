var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('');
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
  account: String,
  password: String
});

var UserData = mongoose.model('UserData', userDataSchema);

router.get('get_data', function(req, res){
  UserData.find().then(function(doc){
    res.send(doc);
  });
});

router.post('/insert', function(req, res){
  var account = req.body.account;
  var password = req.body.password;

  var newUser = {account: account, password: password};
  var newDoc = new UserData(newUser);
  newDoc.save(function(err, newDoc){
    if (err)
      res.send(err);

    res.send(newDoc);
  });
});



module.exports = router;
