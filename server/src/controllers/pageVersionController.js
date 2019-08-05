
import * as pageVersionService from '../service/pageVersionService';

export async function savePageVersion(req, res) {
    return pageVersionService.savePageVersion(req, res);
}


export async function get(req, res) {
    return pageVersionService.get(req, res);
}