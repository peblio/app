const express = require('express');
const exampleRoutes = express.Router();
const Page = require('../models/page.js');
const User = require('../models/user.js');

export async function getExamples(req, res) {
  try {
    const user = await User.findOne({ name: 'peblioexamples' }).exec();
    if(user && user._id) {
      const pages = await Page.find({ user: user._id }).exec();
      return res.status(200).send(pages);
    }
    return res.status(500).send('Error while retrieving examples');
  } catch (err) {
    return res.status(500).send({ error: 'Error while retrieving examples' });
  }
}

exampleRoutes.route('/').get(getExamples);
module.exports = exampleRoutes;
