
import * as pageVersionService from '../service/pageVersionService';

export async function savePageVersion(req, res) {
    return pageVersionService.savePageVersion(req, res);
}


export async function getAllVersion(req, res) {
    return pageVersionService.getAllVersion(req, res);
}