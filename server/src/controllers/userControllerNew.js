const shortid = require('shortid');
const User = require('../models/user.js');
const Token = require('../models/token.js');
const UserConst = require('../userConstants.js');

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
      token.save((updateTokenError) => {
        if (updateTokenError) {
          return res.status(500).send({
            msg: UserConst.SIGN_UP_FAILED
          });
        }
        return sendSignUpConfirmationMail(updatedUser.email, [name], [token.token], req);
      });

      return res.status(200).send({
        msg: UserConst.SIGN_UP_CHECK_MAIL, user
      });
    });
  });
}
