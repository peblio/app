const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    sparse: true,
    required() { return this.loginType === 'password'; }
  },
  name: {
    type: String,
    default: '',
    required: true,
    unique: true
  },
  blurb: {
    type: String,
    default: 'I <3 CS',
    required: false,
    unique: false
  },
  image: {
    type: String,
    default: 'https://s3.amazonaws.com/peblio-files-staging/DefaultProfileImage.png',
    required: false,
    unique: false
  },

  type: {
    type: String,
    enum: ['student', 'teacher', 'other'],
    required: true
  },
  password: {
    type: String,
    index: true,
    sparse: true,
    required() { return this.loginType === 'password'; },
  },
  isVerified: { type: Boolean, default: false },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  pages: { type: Array },
  loginType: {
    type: 'string',
    enum: ['password', 'google'],
    required: true
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
    required() { return this.loginType === 'google'; }
  },
  preferences: {
    editorFontSize: { type: Number, default: 14 },
    editorTheme: { type: String, enum: ['light', 'dark'], default: 'light' },
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

userSchema.virtual('folders', {
  ref: 'Folder',
  localField: '_id',
  foreignField: 'user'
});

userSchema.virtual('files', {
  ref: 'Page',
  localField: '_id',
  foreignField: 'user'
});

userSchema.methods.hashPassword = function hashPassword(password) {
  bcrypt.hash(password, null, null, (innerErr, hash) => {
    if (innerErr) { return next(innerErr); }
    this.password = hash;
  });
};

userSchema.methods.verifyPassword = function verifyPassword(password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
