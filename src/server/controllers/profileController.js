const express = require('express');

const Folder = require('../models/folder.js');
const Page = require('../models/page.js');
const User = require('../models/user.js');

const profileRoutes = express.Router();

profileRoutes.route('/user/:username').get(getUser);
profileRoutes.route('/save').post(saveProfile);


function saveProfile(req, res) {
  const name = req.body.name;
  const imageURL = req.body.imageURL;
  const newList = [];
  User.update({ name }, {
    image: imageURL
  },
  (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ data: 'Record has been updated!!' });
    }
  });
}


function getUser(req, res) {
  User.find({ name: req.params.username }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      const user = data[0];
      Promise.all([
        Page.find({ id: { $in: user.pages } }).exec(),
        Folder.find({ user: user._id }).exec()
      ])
      .then(([pages, folders]) => {
        res.send({
          name: user.name,
          image: user.image,
          pebls: pages,
          folders
        });
      })
      .catch(err => res.send(err));
    }
  });
}

module.exports = profileRoutes;
