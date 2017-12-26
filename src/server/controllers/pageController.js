const express = require('express');

const Router = express.Router();
const Page = require('../models/page.js');
const User = require('../models/user.js');

const pageRoutes = express.Router();

pageRoutes.route('/save').post(savePage);
pageRoutes.route('/update').post(updatePage);

function savePage(req, res) {
  const user = req.user;
  const newList = [];
  if (user) {
    User.find({ _id: user._id }, (err, data) => {
      if (err) {
        res.send(err);
        console.log('fail');
      } else {
        data[0].pages.push(req.body.id);
        User.update({ _id: user._id }, {
          pages: data[0].pages
        },
        (err, data) => {
          if (err) {
            res.send(err);
          } else {
           // res.send({data:"Record has been Inserted..!!"});
          }
        });
      }
    });

    const mod = new Page(req.body);
    mod.save((err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send({ data: 'Record has been Inserted..!!' });
      }
    });
  } else {
    res.status(403).send({ error: 'Please log in first' });
  }
}

function updatePage(req, res) {
  Page.update({ id: req.body.id }, {
    title: req.body.title,
    editors: req.body.editors,
    indexEditor: req.body.indexEditor,
    textEditors: req.body.textEditors,
    indexTextEditor: req.body.indexTextEditor,
    iframes: req.body.iframes,
    indexIframe: req.body.indexIframe,
  },
  (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ data: 'Record has been Inserted..!!' });
    }
  });
}

module.exports = pageRoutes;
