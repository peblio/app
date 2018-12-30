const shortid = require('shortid');
const User = require('../models/user.js');
const Token = require('../models/token.js');
const UserConst = require('../userConstants.js');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const passport = require('passport');

export function createUser(req, res) {
  const email = req.body.mail;
  const name = req.body.name;
  const type = req.body.userType;
  const password = req.body.password;
  const requiresGuardianConsent = req.body.requiresGuardianConsent;
  const guardianEmail = req.body.guardianEmail;
  const guardianConsentedAt = (requiresGuardianConsent === true) ? new Date() : '';
  const isVerified = (type === 'student');
  return User.findOne({ name }, (userFindViaNameError, userByName) => {
    if (userFindViaNameError) {
      return res.status(422).send({
        msg: UserConst.SIGN_UP_FAILED
      });
    }
    if (userByName) {
      return res.status(400).send({
        msg: UserConst.SIGN_UP_DUPLICATE_USER
      });
    }

    const user = new User({
      email,
      name,
      type,
      password,
      loginType: 'password',
      requiresGuardianConsent,
      guardianEmail,
      guardianConsentedAt,
      isVerified
    });
    user.hashPassword(password);
    return user.save((updateUserError, updatedUser) => {
      if (updateUserError) {
        return res.status(422).json({
          msg: UserConst.SIGN_UP_FAILED
        });
      }

      if (isVerified) {
        return res.status(200).send({
          msg: UserConst.PROCEED_TO_LOG_IN, user
        });
      }

      const token = new Token({
        _userId: updatedUser._id,
        token: shortid.generate()
      });
      return token.save(function (updateTokenError) {
          if (updateTokenError) {
            return res.status(500).send({
              msg: UserConst.SIGN_UP_FAILED
            });
          }
          sendSignUpConfirmationMail(updatedUser.email, [name], [token.token]);
          return res.status(200).send({
            msg: UserConst.SIGN_UP_CHECK_MAIL, user
          });
        });
    });
  });
}

export function loginUser(req, res, next) {
  return User.find({ email: req.body.name }, (userFindError, users) => {
    if (userFindError) {
      return res.status(401).send({
        msg: UserConst.LOGIN_FAILED
      });
    }
    if (users.length > 1) {
      return res.status(400).send({
        msg: UserConst.USE_NAME_TO_LOGIN
      });
    }
    return passport.authenticate('local', (passportAuthError, user) => {
      if (passportAuthError) {
        return res.status(500).send({ msg: passportAuthError }); // will generate a 500 error
      }
      // Generate a JSON response reflecting authentication status
      if (!user) {
        return res.status(401).send({
          msg: UserConst.LOGIN_FAILED
        });
      } 
      if (!user.isVerified) {
        return res.status(401).send({
          msg: UserConst.LOGIN_USER_NOT_VERIFIED
        });
      }
  
      return req.login(user, (loginError) => {
        if (loginError) {
          return res.status(401).send({
            msg: loginError
          });
        }
        return res.send({
          msg: UserConst.LOGIN_SUCCESS,
          user: { name: user.name, type: user.type }
        });
      });
    })(req, res, next);
  });
  
}

function sendSignUpConfirmationMail(email, users, tokens) {
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
