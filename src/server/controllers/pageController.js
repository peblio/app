const express = require('express');

const Page = require('../models/page.js');
const User = require('../models/user.js');
const Folder = require('../models/folder.js');

const pageRoutes = express.Router();

pageRoutes.route('/:pageId/move').post(movePage);
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
    editorIndex: req.body.editorIndex,
    layout: req.body.layout
  },
  (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ data: 'Record has been Inserted..!!' });
    }
  });
}

async function movePage(req, res) {
  const user = req.user;
  if (!user) {
    return res.status(403).send({ error: 'Please log in first' });
  }
  if (!req.body) {
    return res.sendStatus(400);
  }

  const { pageId } = req.params;
  const { folderId } = req.body;

  try {
    const page = await Page.findOne({ _id: pageId, user: user._id }).exec();
    if (!page) {
      return res.status(404).send({ error: `Page with id ${pageId} not found` });
    }
    // if we're given a folder ID, move the page to that folder
    if (folderId) {
      // check if folder exists, but don't actually fetch the folder
      const folderCount = await Folder.count({ _id: folderId, user: user._id }).exec();
      if (!folderCount) {
        return res.status(404).send({ error: `Folder with id ${folderId} not found` });
      }
      page.folder = folderId;
    // otherwise, move the page to the top level (remove its folder ID)
    } else {
      delete page.folder;
    }
    const savedPage = await page.save();
    return res.status(200).send({ page: savedPage });
  } catch (err) {
    return res.send(err);
  }
}

module.exports = pageRoutes;
