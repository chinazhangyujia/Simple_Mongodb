var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/test');
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
  account: String,
  password: String
});

var UserData = mongoose.model('UserData', userDataSchema);

router.get('/get_data', function(req, res){
  UserData.find().then(function(doc){
    res.send(doc);
  });
});

router.post('/create', function(req, res){
  var account = req.body.account;
  var password = req.body.password;

  var newUser = {account: account, password: password};
  var newDoc = new UserData(newUser);
  newDoc.save();
  res.send(newDoc);
});

router.post('/update', function(req, res){
  var id = req.body._id;
  UserData.findById(id, function(err, doc){
    if (err)
      res.status(500).send(err);

    doc.account = req.body.account;
    doc.password = req.body.password;

    doc.save();

    res.send(doc);
  });
});


router.post('/delete', function(req, res){
  var id = req.body._id;
  console.log(req.body);
  UserData.findByIdAndRemove(id).exec();
  res.send(req.body.account + ' is deleted');
});


module.exports = router;
