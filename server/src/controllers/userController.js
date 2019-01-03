const express = require('express');
const _userRoutes = express.Router();
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

export async function getUserNameById(req, res) {
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

export async function getUserNameForPage(req, res) {
  Page.findOne({ _id: req.params.pageParentId }, (err, page) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      User.findOne({ _id: page.user }, (err, user) => {
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

//TODO: expose api to get user by object id
_userRoutes.route('/:userName/profile').get(getUserProfile);
_userRoutes.route('/:userObjectId').get(getUserNameById);
export const userRoutes = _userRoutes;
