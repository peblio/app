import * as pageService from '../service/pageService';

export function getPage(req, res) {
    return pageService.getPage(req, res);
}

export async function getPagesWithTag(req, res) {
    return pageService.getPagesWithTag(req, res);
}

export async function savePageAsGuest(req, res) {
    return pageService.savePageAsGuest(req, res);
}

export async function trashPage(req, res) {
    return pageService.trashPage(req, res);
}

export async function restoreFromTrash(req, res) {
    return pageService.restoreFromTrash(req, res);
}

export async function savePage(req, res) {
    return pageService.savePage(req, res);
}

export async function deletePage(req, res) {
    return pageService.deletePage(req, res);
}

export async function getMyPagesWithTag(req, res) {
    return pageService.getMyPagesWithTag(req, res);
}

export async function updatePageWithVersion(req, res) {
    return pageService.updatePageWithVersion(req, res);
}

export async function updatePage(req, res) {
    return pageService.updatePage(req, res);
}

export async function getTrashPages(req, res) {
    return pageService.getTrashPages(req, res);
}

export async function uploadPageSnapshotToS3(req, res) {
    return pageService.uploadPageSnapshotToS3(req, res);
}

export async function updateClientsAboutPage(req, clients, webSocket) {
    return pageService.updateClientsAboutPage(req, clients, webSocket);
}

export async function movePage(req, res) {
    return pageService.movePage(req, res);
}

export async function emptyTrash(req, res) {
    return pageService.emptyTrash(req, res);
}

export async function renamePage(req, res) {
    return pageService.renamePage(req, res);
}
