import * as logService from '../service/logService';
import { getQueryForSearchLogs, getOptionsForSearchLogs } from '../models/creator/logCreator';

export async function saveLog(request, res) {
    return logService.saveLog(request, res);
}

export async function searchLogs(request, response) {
    const query = getQueryForSearchLogs(request);
    const options = getOptionsForSearchLogs(request);
    return logService.searchLogs(query, options, response);
}