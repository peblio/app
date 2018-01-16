const express = require('express');

const Router = express.Router();
const Page = require('../models/page.js');
const User = require('../models/user.js');

const pageRoutes = express.Router();

pageRoutes.route('/save').post(savePage);
pageRoutes.route('/update').post(updatePage);
pageRoutes.route('/delete').post(deletePage);

function savePage(req, res) {
  const user = req.user;
  const newList = [];
  if (user) {
    User.find({ _id: user._id }, (err, data) => {
      if (err) {
        res.send(err);
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

function deletePage(req, res) {
  const user = req.user;
  let data;
  Page.remove({ id: req.body.id },
  (err, data) => {
    if (err) {
      data = err;
    } else {
      data = 'Record has been Deleted..!!';
    }
  });

  User.find({ _id: user._id }, (err, data) => {
    if (err) {
      data = err;
    } else {
      const pages = data[0].pages.filter(id => id !== req.body.id);
      User.update({ _id: user._id }, {
        pages
      },
      (err, data) => {
        if (err) {
          data = err;
        } else {
          data = 'Single Page removed from User!!';
        }
      });
    }
  });
  res.send(data);
}

function updatePage(req, res) {
  Page.update({ id: req.body.id }, {
    title: req.body.title,
    preview: req.body.preview,
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
