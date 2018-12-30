const express = require('express');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const shortid = require('shortid');
const { OAuth2Client } = require('google-auth-library');
const { createUser, loginUser, confirmUser, forgotPassword, resetPassword, resendConfirmUser } = require('./userControllerNew.js');

const User = require('../models/user.js');
const Token = require('../models/token.js');
const UserConst = require('../userConstants.js');

// Methods: EMAIL
// TODO: Refactor following Email methods to separate module
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

function sendSignUpConfirmationMail(email, users, tokens, req) {
  const confirmationLinks = '';
  let resetLinks = '';
  users.forEach((user, i) => {
    resetLinks += `Username: ${user}\n` +
    'Please click on the following link, or paste this into your browser to complete the process:\n' +
    `http://${process.env.PEBLIO_DOMAIN_NAME}/confirmation/${tokens[i]}\n\n`;
  });
  const mailOptions = {
    to: email,
    from: process.env.PEBLIO_SENDGRID_MAIL,
    subject: 'Peblio Confirmation',
    text: `You are receiving this because you have signed up for peblio.\n\n
    Please click on the following link, or paste this into your browser to complete the process:\n\n${
  resetLinks}`
  };
  sendMail(mailOptions);
}

// Methods: AUTH
function resendConfirmUser1(req, res) {
  User.find({ email: req.body.email }, (userFindError, users) => {
    if (users.length === 0) {
      return res.status(400).send({
        msg: UserConst.CONFIRM_NO_EMAIL
      });
    }

    const userNames = [];
    const tokens = [];
    users.forEach((user) => {
      if (!user.isVerified) {
        userNames.push(user.name);
        // Create a verification token, save it, and send email
        const newToken = shortid.generate();
        tokens.push(newToken);
        const token = new Token({
          _userId: user._id,
          token: newToken
        });

        // Save the token
        token.save((tokenSaveError) => {
          if (tokenSaveError) {
            return res.status(500).send({
              msg: UserConst.SIGN_UP_FAILED
            });
          }
        });
      }
    });
    sendSignUpConfirmationMail(req.body.email, userNames, tokens, req);
    return res.send({
      msg: UserConst.SIGN_UP_CHECK_MAIL
    });
  });
}

function loginWithGoogle(req, res) {
  if (!req.body.google_id_token) {
    return res.status(400).send({ msg: '' });
  }
  const type = req.body.userType;
  const requiresGuardianConsent = req.body.requiresGuardianConsent;
  const guardianEmail = req.body.guardianEmail;
  const guardianConsentedAt = (requiresGuardianConsent === true) ? new Date() : '';
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  return client.verifyIdToken({
    idToken: req.body.google_id_token,
    audience: process.env.GOOGLE_CLIENT_ID
  }).then((ticket) => {
    const payload = ticket.getPayload();
    const googleId = payload.sub;

    User.findOne({ googleId }, (err, user) => {
      if (err) { return req.send({ msg: err }); }

      let userPromise = Promise.resolve(user);
      if (!user) {
        const newUser = new User({
          googleId,
          type,
          loginType: 'google',
          name: payload.name,
          isVerified: true,
          requiresGuardianConsent,
          guardianEmail,
          guardianConsentedAt
        });
        userPromise = newUser.save();
      }

      return userPromise.then((newRegisteredUser) => {
        req.login(newRegisteredUser, (loginError) => {
          if (loginError) {
            return res.send({ msg: loginError });
          }
          return res.send({
            msg: UserConst.LOGIN_SUCCESS,
            user: { name: newRegisteredUser.name, type: newRegisteredUser.type }
          });
        });
      });
    });
  }).catch(err => res.status(401).send({ msg: UserConst.LOGIN_FAILED }));
}

function updatePreferences(req, res) {
  const name = req.user ? req.user.name : null;
  const key = req.body.key;
  const value = req.body.value;
  if (name) {
    User.findOne({ name }, (err, user) => {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }
      if (!user) {
        res.status(404).json({ error: 'Document not found' });
        return;
      }
      const preferences = { ...user.preferences };
      preferences[key] = value;
      user.preferences = preferences;
      user.save((saveErr, updatedUser) => {
        if (saveErr) {
          res.status(500).json({ error: saveErr });
          return;
        }
        res.json(updatedUser.preferences);
      });
    });
  } else {
    res.sendStatus(403);
  }
}

function getUserPreferences(req, res) {
  const name = req.user ? req.user.name : null;
  if (name) {
    User.findOne({ name }, (err, user) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).send(user.preferences);
      }
    });
  } else {
    res.sendStatus(403);
  }
}

function getUserProfile(req, res) {
  User.findOne({ name: req.params.userName }, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.send({
        name: user.name,
        type: user.type,
        image: user.image,
        blurb: user.blurb,
        isOwner: !!(req.user && req.user.name && req.user.name === user.name)
      });
    }
  });
}

const userRoutes = express.Router();
userRoutes.route('/login').post(loginUser);
userRoutes.route('/signup').post(createUser);
userRoutes.route('/forgot').post(forgotPassword);
userRoutes.route('/reset').post(resetPassword);
userRoutes.route('/confirmation').post(confirmUser);
userRoutes.route('/resendconfirmation').post(resendConfirmUser);
userRoutes.route('/login/google').post(loginWithGoogle);
userRoutes.route('/preferences').post(updatePreferences);
userRoutes.route('/preferences').get(getUserPreferences);
userRoutes.route('/:userName/profile').get(getUserProfile);
module.exports = userRoutes;
