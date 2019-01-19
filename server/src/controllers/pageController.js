import { getPage, getPagesWithTag, savePageAsGuest, savePage, deletePage, updatePage, movePage } from './pageControllerNew';
const express = require('express');

const pageRoutes = express.Router();
pageRoutes.route('/withTags').get(getPagesWithTag);
pageRoutes.route('/:pageId/move').post(movePage);
pageRoutes.route('/:pageId').get(getPage);
pageRoutes.route('/save').post(savePage);
pageRoutes.route('/saveAsGuest').post(savePageAsGuest);
pageRoutes.route('/update').post(updatePage);
pageRoutes.route('/:pageId').delete(deletePage);
module.exports = pageRoutes;
