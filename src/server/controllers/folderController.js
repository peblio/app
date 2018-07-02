const express = require('express');

const Folder = require('../models/folder');
const Page = require('../models/page');

const folderRoutes = express.Router();

folderRoutes.route('').post(async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(403).send({ error: 'Please log in first' });
  }
  if (!req.body) {
    return res.sendStatus(400);
  }

  const { title, parentId } = req.body;
  const f = new Folder({ title, user: user._id });
  if (parentId) {
    f.parentId = parentId;
  }

  try {
    const folder = await f.save();
    return res.status(201).send({ folder });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

function findChildFolderIds(folder) {
  if (!folder) {
    return [];
  }
  return [folder._id, ...folder.children.reduce((accum, child) => [
    ...accum,
    ...findChildFolderIds(child)
  ], [])];
}

folderRoutes.route('/:folderId').delete(async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(403).send({ error: 'Please log in first' });
  }

  const { folderId } = req.params;
  try {
    const folder = await Folder.findOne({ _id: folderId, user: user._id }).exec();
    if (!folder) {
      return res.status(404).send({ error: `Folder with id ${folderId} not found` });
    }
    const folderIdsToDelete = findChildFolderIds(folder);
    await Page.deleteMany({ folder: { $in: folderIdsToDelete } }).exec();
    await Folder.deleteMany({ _id: { $in: folderIdsToDelete }, user: user._id }).exec();
    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

module.exports = folderRoutes;
