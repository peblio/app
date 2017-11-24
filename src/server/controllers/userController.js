var express = require('express');
var Router = express.Router();
const User = require('../models/user.js');

var userRoutes = express.Router();

userRoutes.route('/signup').post(createUser);
userRoutes.route('/').get(getUsers);
userRoutes.route('/user').get(getUser);

function createUser(req,res) {
  const name = req.body.name;
  const password = req.body.password;
  let user = new User({
    name: name,
    password: password
  });

  user.save(function(err, user){
    if (err) {
      res.status(422).json({error: saveErr});
    } else {
      return res.send({ success : true, message : 'signup succeeded', user: user });
    }
  })
}

function saveUser(res, user) {
  user.save((saveErr) => {
    if(saveErr) {
      res.status(500).json({error: saveErr});
      return;
    }
    res.json(user);
  });
}

function getUsers(req,res) {
  User.find(function(err,users) {
    if(err) {
      res.send(err);
    } else {
      res.json(users);
    }
  })
}

function getUser(req,res) {
  User.find(function(err,users) {
    if(err) {
      res.send(err);
    } else {
      if(req.user) {
        res.json({username: req.user.name, authenticated: true});
      } else {
        res.json({username: '', authenticated: false});
      }

    }
  })
}

module.exports = userRoutes;
