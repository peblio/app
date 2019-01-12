const express = require('express');
const exampleRoutes = express.Router();
const Page = require('../models/page.js');
const User = require('../models/user.js');

export function getExamples(req, res) {
  return User.find({ name: 'peblioexamples' }, (userFindError, user) => {
    if (userFindError) {
      return res.status(500).send(userFindError);
    }
    return Page.find({ user: user[0]._id }, (pageFindError, page) => {
      if (pageFindError) {
        return res.status(500).send(pageFindError);
      }
      return res.status(200).send(page);
    });
  });
}

exampleRoutes.route('/').get(getExamples);
export default exampleRoutes;
