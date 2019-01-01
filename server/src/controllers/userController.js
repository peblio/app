const express = require('express');
const User = require('../models/user.js');
const Folder = require('../models/folder.js');
const Page = require('../models/page.js');

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

const userRoutes = express.Router();

userRoutes.route('/:userName/profile').get(getUserProfile);
userRoutes.route('/:userName/sketches').get(getSketches);
module.exports = userRoutes;
