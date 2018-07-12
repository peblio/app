const express = require('express');

const Folder = require('../models/folder.js');
const Page = require('../models/page.js');
const User = require('../models/user.js');

const profileRoutes = express.Router();

profileRoutes.route('/user/:username').get(getUser);
profileRoutes.route('/save').post(saveProfile);


function saveProfile(req, res) {
  const name = req.body.name;
  const update = {};
  update[req.body.field] = req.body.value;
  const newList = [];
  User.update({ name }, {
    $set: update
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

      res.send({
        name: user.name,
        image: user.image,
        blurb: user.blurb
      });
    }
  });
}

module.exports = profileRoutes;
