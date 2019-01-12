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
  return getUserById(req.params.userObjectId, res);
}

export function getUserNameForPage(req, res) {
  Page.findOne({ id: req.params.pageId }, (err, page) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return getUserById(page.user, res);
    }
  });
};

export function getUserNameForParentPage(req, res) {
  Page.findOne({ id: req.params.pageId }, (err, page) => {
    if (err) {
      return res.status(500).send(err);
    }
    Page.findOne({id: page.parentId }, (parentPageRetrieveError, parentPage) => {
      if (parentPageRetrieveError) {
        return res.status(500).send(parentPageRetrieveError);
      }
      return getUserById(parentPage.user, res);
    });
  });
};

function getUserById(userId, res){
  return User.findById(userId, (err, user) => {
    if (err || !user) {
      return res.status(500).send(err);
    }
    return res.status(200).send({
      name: user.name,
      type: user.type
    });
  });
}

userRoutes.route('/:userName/profile').get(getUserProfile);
userRoutes.route('/:userObjectId').get(getUserNameById);
userRoutes.route('/page/:pageId').get(getUserNameForPage);
userRoutes.route('/parentPageAuthor/:pageId').get(getUserNameForParentPage);
export default userRoutes;
