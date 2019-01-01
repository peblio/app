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

function updatePreferences(req, res) {
  const name = req.user ? req.user.name : null;
  const key = req.body.key;
  const value = req.body.value;
  if (name) {
    User.findOne({ name }, (err, user) => {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }
      if (!user) {
        res.status(404).json({ error: 'Document not found' });
        return;
      }
      const preferences = { ...user.preferences };
      preferences[key] = value;
      user.preferences = preferences;
      user.save((saveErr, updatedUser) => {
        if (saveErr) {
          res.status(500).json({ error: saveErr });
          return;
        }
        res.json(updatedUser.preferences);
      });
    });
  } else {
    res.sendStatus(403);
  }
}

function getUserPreferences(req, res) {
  const name = req.user ? req.user.name : null;
  if (name) {
    User.findOne({ name }, (err, user) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).send(user.preferences);
      }
    });
  } else {
    res.sendStatus(403);
  }
}

currentUserRoutes.route('/').get(getCurrentUser);
currentUserRoutes.route('/profile').put(updateCurrentUserProfile);
currentUserRoutes.route('/preferences').post(updatePreferences);
currentUserRoutes.route('/preferences').get(getUserPreferences);

module.exports = currentUserRoutes;
