import * as logService from '../service/logService';

export async function saveLog(req, res) {
    return logService.saveLog(req, res);
}
