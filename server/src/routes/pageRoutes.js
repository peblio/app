const express = require('express');
const pageRoutes = express.Router();
import * as pageController from '../controllers/pageController';

pageRoutes.route('/withTags').get(pageController.getPagesWithTag);
pageRoutes.route('/trash/:pageId').patch(pageController.trashPage);
pageRoutes.route('/trash/:pageId').put(pageController.restoreFromTrash);
pageRoutes.route('/trash').delete(pageController.emptyTrash);
pageRoutes.route('/trash').get(pageController.getTrashPages);
pageRoutes.route('/:pageId/move').post(pageController.movePage);
pageRoutes.route('/:pageId').get(pageController.getPage);
pageRoutes.route('/save').post(pageController.savePage);
pageRoutes.route('/saveAsGuest').post(pageController.savePageAsGuest);
//TODO: Create issue for making url's rest compliant
pageRoutes.route('/update').post(pageController.updatePage);
pageRoutes.route('/:pageId').delete(pageController.deletePage);
pageRoutes.route('/:pageId/rename/:pageName').patch(pageController.renamePage);
pageRoutes.route('/').patch(pageController.uploadPageSnapshotToS3);
module.exports = pageRoutes;
