const AWS = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const shortid = require('shortid');
const Page = require('../models/page.js');

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

const apiRoutes = express.Router();
apiRoutes.route('/authenticate/:id').get(authenticatePage);
apiRoutes.route('/upload/:user/:type').get(uploadFiles);
module.exports = apiRoutes;
