const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.jsx');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
  usernameField : 'name',
  passwordField : 'password'
}, function(name, password, done) {
    User.findOne({ name: name }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      user.verifyPassword(password, (innerErr, isMatch) => {
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false);
      });
    });
  }
));
