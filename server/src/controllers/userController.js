const express = require('express');
const userRoutes = express.Router();
const User = require('../models/user.js');
const Page = require('../models/page.js');

export function getUserProfile(req, res) {
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

export function getUserNameById(req, res) {
  User.findById(req.params.userObjectId, (err, user) => {
    if (err || !user) {
      res.status(500).send(err);
    } else {
      res.status(200).send({
        name: user.name,
        type: user.type
      });
    }
  });
}

export function getUserNameForPage(req, res) {
  Page.findOne({ id: req.params.pageShortId }, (err, page) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      User.findById(page.user, (err, user) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.status(200).send({
          name: user.name,
          type: user.type
        });
      });
    }
  });
}

userRoutes.route('/:userName/profile').get(getUserProfile);
userRoutes.route('/:userObjectId').get(getUserNameById);
userRoutes.route('/page/:pageShortId').get(getUserNameForPage);
export default userRoutes;
