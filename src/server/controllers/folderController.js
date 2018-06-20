const express = require('express');

const Folder = require('../models/folder');

const folderRoutes = express.Router();

folderRoutes.route('').post((req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(403).send({ error: 'Please log in first' });
  }
  if (!req.body) {
    return res.sendStatus(400);
  }

  const { title, parentId } = req.body;
  const f = new Folder({ title });
  if (parentId) {
    f.parentId = parentId;
  }
  return f.save()
    .then(folder => res.status(201).send({ folder }))
    .catch(err => res.send(err));
});

module.exports = folderRoutes;
