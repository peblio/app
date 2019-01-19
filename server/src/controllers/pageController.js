import * as pageService from '../service/pageService';

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
