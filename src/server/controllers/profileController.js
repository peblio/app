const express = require('express');

const Folder = require('../models/folder.js');
const Page = require('../models/page.js');
const User = require('../models/user.js');

const profileRoutes = express.Router();

profileRoutes.route('/user/:username').get(getUser);

function getUser(req, res) {
  User.find({ name: req.params.username }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      console.log(data);
      const user = data[0];
      Promise.all([
        Page.find({ id: { $in: user.pages } }).exec(),
        Folder.find({ user: user._id }).exec()
      ])
      .then(([pages, folders]) => {
        res.send({ name: user.name, pebls: pages, folders });
      })
      .catch(err => res.send(err));
    }
  });
}

module.exports = profileRoutes;
