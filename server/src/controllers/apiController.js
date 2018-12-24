const AWS = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const shortid = require('shortid');


const Folder = require('../models/folder.js');
const Page = require('../models/page.js');
const User = require('../models/user.js');

// Amazon s3 config
const s3 = new AWS.S3();

const credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });
AWS.config.credentials = credentials;


const myBucket = process.env.S3_BUCKET;
// Multer config
// memory storage keeps file data in a buffer
const upload = multer({
  storage: multer.memoryStorage(),
  // file size limitation in bytes
  limits: { fileSize: 52428800 },
});


function authenticatePage(req, res) {
  if (!req.user) {
    res.send(false);
  } else {
    Page.find({ id: req.params.id }, (err, data) => {
      if (err) {
        res.send(false);
      } else {
        res.send(data[0].user.toString() === req.user._id.toString());
      }
    });
  }
}

function uploadFiles(req, res) {
  const fileName =
  `${req.params.user}/${req.params.type}/${shortid.generate()}_${req.query.filename}`;
  const params = {
    Bucket: myBucket,
    Key: fileName,
    Expires: 60,
    ContentType: req.query.filetype,
    ACL: 'public-read'
  };
  s3.getSignedUrl('putObject', params, (err, data) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    res.send(data);
  });
}

function getSketches(req, res) {
  // TODO: make the request async
  if (!req.params.user) {
    if (!req.user) {
      res.status(403).send({ error: 'Please log in first or specify a user' });
      return;
    }
  }
  let user = req.user;
  if (req.params.user) {
    User.findOne({ name: req.params.user }, (userFindError, data) => {
      if (userFindError) {
        res.status(404).send({ error: userFindError });
      } else if (data.type === 'student') {
        res.status(403).send({ error: 'This users data cannot be accessed' });
      } else {
        user = data;
        Promise.all([
          Page.find({ user: user._id }).exec(),
          Folder.find({ user: user._id }).exec()
        ])
          .then(([pages, folders]) => {
            res.send({ pages, folders });
          })
          .catch(err => res.send(err));
      }
    });
  } else {
    Promise.all([
      Page.find({ user: user._id }).exec(),
      Folder.find({ user: user._id }).exec()
    ])
      .then(([pages, folders]) => {
        res.send({ pages, folders });
      })
      .catch(err => res.send(err));
  }
}

function getExamples(req, res) {
  User.find({ name: 'peblioexamples' }, (userFindError, user) => {
    if (userFindError) {
      res.send(userFindError);
    } else {
      Page.find({ user: user[0]._id }, (pageFindError, page) => {
        if (pageFindError) {
          res.send(pageFindError);
        } else {
          res.send(page);
        }
      });
    }
  });
}

const apiRoutes = express.Router();
apiRoutes.route('/examples').get(getExamples);
apiRoutes.route('/authenticate/:id').get(authenticatePage);
apiRoutes.route('/sketches').get(getSketches);
apiRoutes.route('/sketches/:user').get(getSketches);
apiRoutes.route('/upload/:user/:type').get(uploadFiles);
module.exports = apiRoutes;
