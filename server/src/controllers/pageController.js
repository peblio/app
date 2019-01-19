import { getPage, getPagesWithTag, savePageAsGuest, savePage, deletePage, updatePage } from './pageControllerNew';
const express = require('express');
const Page = require('../models/page.js');
const Folder = require('../models/folder.js');

export async function movePage(req, res) {
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
    const page = await Page.findOne({ _id: pageId }).exec();
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
      page.folder = undefined;
      // could not use delete page.folder -
      // https://stackoverflow.com/questions/33239464/javascript-delete-object-property-not-working
    }
    const savedPage = await page.save();
    return res.status(200).send({ page: savedPage });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

const pageRoutes = express.Router();
pageRoutes.route('/withTags').get(getPagesWithTag);
pageRoutes.route('/:pageId/move').post(movePage);
pageRoutes.route('/:pageId').get(getPage);
pageRoutes.route('/save').post(savePage);
pageRoutes.route('/saveAsGuest').post(savePageAsGuest);
pageRoutes.route('/update').post(updatePage);
pageRoutes.route('/:pageId').delete(deletePage);
module.exports = pageRoutes;
