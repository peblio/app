const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
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
  paymentPlan: {
    type: String,
    enum: ['FREE', 'PRO'],
  },
  expiresAt: { type: Date },
  password: {
    type: String,
    index: true,
    sparse: true,
    required() { return this.loginType === 'password'; },
  },
  isVerified: { type: Boolean, default: false },
  requiresGuardianConsent: { type: Boolean, default: false },
  guardianEmail: {
    type: String,
    sparse: true,
    required() { return this.requiresGuardianConsent === true; }
  },
  guardianConsentedAt: { type: Date },
  studentBirthday: { type: Date },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
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
    editorAutoSave: { type: Boolean, default: true },
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: true
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

userSchema.methods.hashPassword = function hashPassword(password, next) {
  bcrypt.hash(password, null, null, (innerErr, hash) => {
    if (innerErr) { return next(innerErr); }
    this.password = hash;

    return this.password;
  });
};

userSchema.methods.verifyPassword = function verifyPassword(password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
