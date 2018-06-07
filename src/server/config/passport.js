const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../models/user.js');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'name',
  passwordField: 'password'
}, (name, password, done) => {
  User.findOne({ name }, (err, user) => {
    if (err) { return done(err); }
    if (!user) {
      User.findOne({ email: name }, (err, userMail) => {
        if (err) { return done(err); }
        if (!userMail) { return done(null, false); }
        userMail.verifyPassword(password, (innerErr, isMatch) => {
          if (isMatch) {
            return done(null, userMail);
          }
          return done(null, false);
        });
      });
    } else {
      user.verifyPassword(password, (innerErr, isMatch) => {
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false);
      });
    }
  });
}
));

// reference for callbackURL value:
// https://stackoverflow.com/questions/12869514/how-to-set-the-current-host-for-passport-strategy-callbackurl
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  // find or create user
  User.findOne({ googleId: profile.id }, (err, user) => {
    if (err) { return done(err); }
    if (user) {
      return done(null, user);
    }
    const newUser = new User({
      googleId: profile.id,
      name: profile.displayName,
      isVerified: true // if they sign in through OAuth, we know they own their email account
    });
    newUser.save((err) => {
      if (err) { return done(err); }
      return done(null, newUser);
    });
  });
}));
