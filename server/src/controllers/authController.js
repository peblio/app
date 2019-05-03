const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const { createUser, loginUser, confirmUser, forgotPassword, resetPassword, resendConfirmUser } = require('./userRegisterActionsController.js');

const User = require('../models/user.js');
const UserConst = require('../userConstants.js');

function loginWithGoogle(req, res) {
  if (!req.body.google_id_token) {
    return res.status(400).send({ msg: '' });
  }
  const type = req.body.userType;
  const requiresGuardianConsent = req.body.requiresGuardianConsent;
  const guardianEmail = req.body.guardianEmail;
  const name = req.body.name;
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
      if (user) {
        return res.status(400).send({
          msg: 'User already signed up using Google with Peblio',
        });
      }
      
      const newUser = new User({
          googleId,
          type,
          loginType: 'google',
          name: payload.name,
          isVerified: true,
          requiresGuardianConsent,
          guardianEmail,
          guardianConsentedAt,
          name
      });
      const userPromise = newUser.save();

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

const authRoutes = express.Router();
authRoutes.route('/login').post(loginUser);
authRoutes.route('/signup').post(createUser);
authRoutes.route('/forgot').post(forgotPassword);
authRoutes.route('/reset').post(resetPassword);
authRoutes.route('/confirmation').post(confirmUser);
authRoutes.route('/resendconfirmation').post(resendConfirmUser);
authRoutes.route('/login/google').post(loginWithGoogle);
module.exports = authRoutes;
