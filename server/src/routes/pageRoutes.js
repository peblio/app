const express = require('express');
const pageRoutes = express.Router();
import * as pageController from '../controllers/pageController';

pageRoutes.route('/withTags').get(pageController.getPagesWithTag);
pageRoutes.route('/:pageId/move').post(pageController.movePage);
pageRoutes.route('/:pageId').get(pageController.getPage);
pageRoutes.route('/save').post(pageController.savePage);
pageRoutes.route('/saveAsGuest').post(pageController.savePageAsGuest);
pageRoutes.route('/update').post(pageController.updatePage);
pageRoutes.route('/:pageId').delete(pageController.deletePage);
module.exports = pageRoutes;