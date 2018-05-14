const express = require('express');
const passport = require('passport');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const shortid = require('shortid');

const Router = express.Router();
const User = require('../models/user.js');
const Token = require('../models/token.js');

const userRoutes = express.Router();

userRoutes.route('/login').post(loginUser);
userRoutes.route('/signup').post(createUser);
userRoutes.route('/forgot').post(forgotPassword);
userRoutes.route('/reset').post(resetPassword);
userRoutes.route('/confirmation').post(confirmUser);
userRoutes.route('/resendconfirmation').post(resendConfirmUser);

function createUser(req, res) {
  const email = req.body.mail;
  const name = req.body.name;
  const password = req.body.password;
  let user;
  User.findOne({ email: req.body.mail }, (err, user) => {
    if (user) {
      return res.status(400).send(
        { msg: 'The email address you have entered is already associated with another account.' }
      );
    }
    user = new User({
      email,
      name,
      password
    });
    user.hashPassword(password);
    user.save((err, user) => {
      if (err) {
        res.status(422).json({ msg: 'Sign up failed' });
      } else {
        const token = new Token({
          _userId: user._id,
          token: shortid.generate()
        });
        token.save((err) => {
          if (err) {
            return res.status(500).send({ msg: 'Sign up failed' });
          }
          sendSignUpConfirmationMail(user.email, token.token, req);
        });
        return res.status(200).send({ msg: 'Please check mail to finish the sign up', user });
      }
    });
  });
}

function forgotPassword(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
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
    } else {
      res.status(404).json({ error: 'user not found' });
    }
  });
}

function resetPassword(req, res) {
  User.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
    if (err || !user) {
      res.status(422).json({ error: 'token expired' });
    } else {
      user.hashPassword(req.body.password);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      user.save((err) => {
        if (err) {
          res.status(422).json({ msg: 'Failed to update password' });
        } else {
          sendSuccessfulResetMail(user.email);
          return res.send({ success: true, msg: 'sending reset info', user });
        }
      });
    }
  });
}

function loginUser(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.send({ msg: err }); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.status(401).send({ success: false, msg: 'authentication failed' });
    } else if (!user.isVerified) return res.status(401).send({ msg: 'Your account has not been verified.' });

    req.login(user, (err) => {
      if (err) {
        return res.send({ msg: err });
      }
      return res.send({ success: true, msg: 'Login Successful', user: { name: user.name } });
    });
  })(req, res, next);
}

function confirmUser(req, res) {
  Token.findOne({ token: req.body.token }, (err, token) => {
    if (!token) return res.status(400).send({ msg: 'We were unable to find a valid token. Your token my have expired.' });

    // If we found a token, find a matching user

    User.findOne({ _id: token._userId }, (err, user) => {
      if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
      if (user.isVerified) return res.status(400).send({ msg: 'This user has already been verified.' });

      // Verify and save the user
      user.isVerified = true;
      user.save((err) => {
        if (err) { return res.status(500).send({ msg: 'Failed to complete sign up' }); }
        res.status(200).send({ msg: 'The account has been verified. Please log in.' });
      });
    });
  });
}

function resendConfirmUser(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
    if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });

    // Create a verification token, save it, and send email
    const token = new Token({
      _userId: user._id,
      token: shortid.generate()
    });

    // Save the token
    token.save((err) => {
      if (err) { return res.status(500).send({ msg: 'Failed to complete sign up' }); }
      sendSignUpConfirmationMail(user.email, token.token, req);
    });
    return res.status(200).send({ success: true, msg: 'Please check mail to finish the sign up', user });
  });
}

// EMAIL HELPERS

function sendMail(mailOptions) {
  const options = {
    auth: {
      api_user: process.env.PEBLIO_SENDGRID_USER,
      api_key: process.env.PEBLIO_SENDGRID_PASSWORD
    }
  };

  const client = nodemailer.createTransport(sgTransport(options));
  client.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Message sent: ${info.response}`);
    }
  });
}

function sendSignUpConfirmationMail(email, token, req) {
  const mailOptions = {
    to: email,
    from: process.env.PEBLIO_SENDGRID_MAIL,
    subject: 'Peblio Confirmation',
    text: `${'You are receiving this because you have signed up for peblio.\n\n' +
    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
    'http://'}${req.headers.host}/confirmation/${token}\n\n`
  };
  sendMail(mailOptions);
}

function sendSuccessfulResetMail(email) {
  const mailOptions = {
    to: email,
    from: process.env.PEBLIO_SENDGRID_MAIL,
    subject: 'Peblio Password Reset Successful',
    text: `${'Hello,\n\n' +
    'This is a confirmation that the password for your account '}${email} has just been changed.\n`
  };
  sendMail(mailOptions);
}

function sendResetMail(email, token, req) {
  const mailOptions = {
    to: email,
    from: process.env.PEBLIO_SENDGRID_MAIL,
    subject: 'Peblio Password Reset',
    text: `${'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
    'http://'}${req.headers.host}/reset/${token}\n\n` +
    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
  };
  sendMail(mailOptions);
}

module.exports = userRoutes;
