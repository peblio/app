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

  const { title, parent } = req.body;
  const f = new Folder({ title, user: user._id });
  if (parent) {
    f.parent = parent;
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
  return [folder._id, ...(folder.children || []).reduce((accum, child) => [
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
    const folder = await Folder.findOne({
      _id: folderId,
      user: user._id
    }).exec();
    if (!folder) {
      return res.status(404).send({ error: `Folder with id ${folderId} not found` });
    }
    const folderIdsToDelete = findChildFolderIds(folder);
    await Page.updateMany(
      { folder: { $in: folderIdsToDelete } },
      { deletedAt: Date.now() }
    ).exec();
    await Folder.updateMany(
      { _id: { $in: folderIdsToDelete }, user: user._id },
      { deletedAt: Date.now() }
    ).exec();
    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

folderRoutes.route('/:folderId/move').post(async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(403).send({ error: 'Please log in first' });
  }

  const childFolderId = req.params.folderId;
  const parentFolderId = req.body.folderId;

  if (childFolderId === parentFolderId) {
    return res.status(422).send({ error: 'Cannot move a folder into itself.' });
  }

  try {
    const childFolder = await Folder.findOne({
      _id: childFolderId,
      user: user._id
    }).exec();
    if (!childFolder) {
      return res.status(404).send({ error: `Folder with id ${childFolderId} not found` });
    }
    if (parentFolderId) {
      const parentFolderCount = await Folder.count({ _id: parentFolderId, user: user._id }).exec();
      if (!parentFolderCount) {
        return res.status(404).send({ error: `Folder with id ${parentFolderId} not found` });
      }
      childFolder.parent = parentFolderId;
    } else {
      childFolder.parent = undefined;
      // could not use delete page.folder -
      // https://stackoverflow.com/questions/33239464/javascript-delete-object-property-not-working
    }
    const savedChildFolder = await childFolder.save();
    return res.status(200).send({ folder: savedChildFolder });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

folderRoutes.route('/:folderId/rename/:folderName').post(async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(403).send({ error: 'Please log in first' });
  }

  const { folderId, folderName } = req.params;

  try {
    const renamedFolder = await Folder.findOne({
      _id: folderId 
    }).exec();
    await Folder.update({ _id: folderId }, { title: folderName }).exec();
    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

module.exports = folderRoutes;
