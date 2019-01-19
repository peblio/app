import * as pageService from '../service/pageService';
const express = require('express');

export async function getPage(req, res) {
    return pageService.getPage(req, res);
}

export async function getPagesWithTag(req, res) {
    return pageService.getPagesWithTag(req, res);
}

export async function savePageAsGuest(req, res) {
    return pageService.savePageAsGuest(req, res);
}

export async function savePage(req, res) {
    return pageService.savePage(req, res);
}

export async function deletePage(req, res) {
    return pageService.deletePage(req, res);
}

export async function updatePage(req, res) {
    return pageService.updatePage(req, res);
}

export async function movePage(req, res) {
    return pageService.movePage(req, res);
}


const pageRoutes = express.Router();
pageRoutes.route('/withTags').get(getPagesWithTag);
pageRoutes.route('/:pageId/move').post(movePage);
pageRoutes.route('/:pageId').get(getPage);
pageRoutes.route('/save').post(savePage);
pageRoutes.route('/saveAsGuest').post(savePageAsGuest);
pageRoutes.route('/update').post(updatePage);
pageRoutes.route('/:pageId').delete(deletePage);

export default pageRoutes;
