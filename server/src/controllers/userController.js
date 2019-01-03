const express = require('express');
const User = require('../models/user.js');

function getUserProfile(req, res) {
  User.findOne({ name: req.params.userName }, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.send({
        name: user.name,
        type: user.type,
        image: user.image,
        blurb: user.blurb,
        isOwner: !!(req.user && req.user.name && req.user.name === user.name)
      });
    }
  });
}

function getUserNameById(req, res) {
  User.findOne({ _id: req.params.userObjectId }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({
        name: user.name,
        type: user.type
      });
    }
  });
}

function getOwnerForPage(req, res) {
  Page.findOne({ _id: req.params.pageParentId }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({
        name: user.name,
        type: user.type
      });
    }
  });
}

//TODO: expose api to get user by object id
const userRoutes = express.Router();
userRoutes.route('/:userName/profile').get(getUserProfile);
userRoutes.route('/:userObjectId').get(getUserByObjectId);
module.exports = userRoutes;
