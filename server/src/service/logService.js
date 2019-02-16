import { buildLogFromRequest } from '../models/creator/logCreator';
const Log = require('../models/log.js');

export async function saveLog(req, res) {
  try {
    const log = buildLogFromRequest(req);
    const savedLog = await log.save();
    return res.status(200).send({ log: savedLog });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function searchLogs(query, options, res) {
  return Log.paginate(query, options, (err, logs) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    return res.status(200).send({ data: logs });
  });
}
