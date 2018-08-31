const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user.js');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  {
    usernameField: 'name',
    passwordField: 'password'
  },
  (name, password, done) => {
    User.findOne({ name }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        User.findOne({ email: name }, (userFindError, userMail) => {
          if (userFindError) { return done(userFindError); }
          if (!userMail) { return done(null, false); }
          return userMail.verifyPassword(password, (innerErr, isMatch) => {
            if (isMatch) {
              return done(null, userMail);
            }
            return done(null, false);
          });
        });
      }

      return user.verifyPassword(password, (innerErr, isMatch) => {
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false);
      });
    });
  }
));
