import { buildLogFromRequest } from '../models/creator/logCreator';

export async function saveLog(req, res) {
  try {
    const log = buildLogFromRequest(req);
    const savedLog = await log.save();
    return res.status(200).send({ log: savedLog });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}
