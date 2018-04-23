const AWS = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const passport = require('passport');
const shortid = require('shortid');

const apiRoutes = express.Router();
const Router = express.Router();

const Page = require('../models/page.js');
const User = require('../models/user.js');

// Amazon s3 config
const s3 = new AWS.S3();

const credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });
AWS.config.credentials = credentials;


const myBucket = 'peblio-files';
// Multer config
// memory storage keeps file data in a buffer
const upload = multer({
  storage: multer.memoryStorage(),
    // file size limitation in bytes
  limits: { fileSize: 52428800 },
});

apiRoutes.route('/examples').get(getExamples);
apiRoutes.route('/page/:id').get(getPage);
apiRoutes.route('/user').get(getUser);
apiRoutes.route('/sketches').get(getSketches);
apiRoutes.route('/login').post(loginUser);
apiRoutes.route('/upload').post(upload.single('uploadImageFile'), uploadFiles);

function uploadFiles(req, res) {
  const fileName = `test/${shortid.generate()}_${req.file.originalname}`;
  const params = {
    Bucket: myBucket,
    Key: fileName,
    Body: req.file.buffer,
    ACL: 'public-read'
  };
  s3.putObject(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Successfully uploaded data to${myBucket}/${fileName}`);
      res.send(fileName);
    }
  });
}

function getPage(req, res) {
  Page.find({ id: req.params.id }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
}

function getUser(req, res) {
  let name = null;
  let pages = null;
  if (req.user) {
    name = req.user.name;
    pages = req.user.pages;
  }
  res.send({ name, pages });
}

function getSketches(req, res) {
  const sketches = [];
  let globalerr;
  if (req.user) {
    const user = req.user;
    Page.find({ id: { $in: user.pages } }, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  }
}

function getExamples(req, res) {
  User.find({ name: 'peblioexamples' }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      Page.find({ id: { $in: data[0].pages } }, (err, data) => {
        if (err) {
          res.send(err);
        } else {
          res.send(data);
        }
      });
    }
  });
}

function loginUser(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.send(401, { success: false, message: 'authentication failed' });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.send({ success: true, message: 'authentication succeeded', user: { name: user.name } });
    });
  })(req, res, next);
}

module.exports = apiRoutes;
