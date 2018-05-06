const express = require('express');
const passport = require('passport');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const shortid = require('shortid');

const Router = express.Router();
const User = require('../models/user.js');

const userRoutes = express.Router();

userRoutes.route('/login').post(loginUser);
userRoutes.route('/signup').post(createUser);
userRoutes.route('/forgot').post(forgotPassword);
userRoutes.route('/reset').post(resetPassword);

function createUser(req, res) {
  const name = req.body.name;
  const password = req.body.password;
  const user = new User({
    name,
    password
  });

  user.save((err, user) => {
    if (err) {
      res.status(422).json({ error: err });
    } else {
      return res.send({ success: true, message: 'signup succeeded', user });
    }
  });
}

function sendSuccessfulResetMail(email) {
  console.log('going to send email');
  const options = {
    auth: {
      api_user: 'Peblio',
      api_key: '#Peblio123'
    }
  };

  const client = nodemailer.createTransport(sgTransport(options));

  const mailOptions = {
    to: email,
    from: 'passwordreset@peblio.co',
    subject: 'Peblio Password Reset Successful',
    text: `${'Hello,\n\n' +
        'This is a confirmation that the password for your account '}${email} has just been changed.\n`
  };
  client.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Message sent: ${info.response}`);
    }
  });
}

function sendResetMail(email, token, req) {
  console.log('going to send email');
  const options = {
    auth: {
      api_user: 'Peblio',
      api_key: '#Peblio123'
    }
  };

  const client = nodemailer.createTransport(sgTransport(options));

  const mailOptions = {
    to: email,
    from: 'passwordreset@peblio.co',
    subject: 'Peblio Password Reset',
    text: `${'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://'}${req.headers.host}/reset/${token}\n\n` +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
  };
  console.log(mailOptions);
  client.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(error);
    } else {
      console.log(`Message sent: ${info.response}`);
    }
  });
}

function forgotPassword(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    console.log(user);
    user.resetPasswordToken = shortid.generate();
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    user.save((err, user) => {
      if (err) {
        res.status(422).json({ error: err });
      } else {
        sendResetMail(req.body.email, user.resetPasswordToken, req);
        return res.send({ success: true, message: 'sending reset info', user });
      }
    });
  });
}

function resetPassword(req, res) {
  User.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
    if (!user) {
      res.status(422).json({ error: 'token expired' });
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.save((err) => {
      if (err) {
        res.status(422).json({ error: err });
      } else {
        sendSuccessfulResetMail(user.email);
        req.logIn(user, (err) => {
          if (err) {
            res.status(422).json({ error: err });
          } else {
            return res.send({ success: true, message: 'sending reset info', user });
          }
        });
      }
    });
  });
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
