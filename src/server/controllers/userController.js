const express = require('express');
const passport = require('passport');

const Router = express.Router();
const User = require('../models/user.js');

const userRoutes = express.Router();

userRoutes.route('/forgot').post(forgotPassword);
userRoutes.route('/login').post(loginUser);
userRoutes.route('/signup').post(createUser);

function createUser(req, res) {
  const name = req.body.name;
  const password = req.body.password;
  const user = new User({
    name,
    password
  });

  user.save((err, user) => {
    if (err) {
      res.status(422).json({ error: saveErr });
    } else {
      return res.send({ success: true, message: 'signup succeeded', user });
    }
  });
}

function forgotPassword(req, res) {

}

function loginUser(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.send(401, { success: false, message: 'authentication failed' });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.send({ success: true, message: 'authentication succeeded', user: { name: user.name } });
    });
  })(req, res, next);
}

module.exports = userRoutes;
