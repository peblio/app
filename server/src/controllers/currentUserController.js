const express = require('express');

const { User } = require('../models');

const currentUserRoutes = express.Router();

function getCurrentUser(req, res) {
  let name = null;
  let type = null;
  if (req.user) {
    name = req.user.name;
    type = req.user.type;
  }
  res.send({ name, type });
}

async function updateCurrentUserProfile(req, res) {
  if (!req.user) {
    return res.status(403).send({ error: 'Please log in first.' });
  }
  try {
    const currentUser = await User.findByIdAndUpdate(req.user.id, { $set: req.body }, { new: true }).exec();
    return res.send({
      name: currentUser.name,
      type: currentUser.type,
      blurb: currentUser.blurb,
      image: currentUser.image
    });
  } catch (err) {
    return res.status(500).send({ error: err });
  }
}

currentUserRoutes.route('/').get(getCurrentUser);
currentUserRoutes.route('/profile').put(updateCurrentUserProfile);

module.exports = currentUserRoutes;
