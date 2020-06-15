import { buildClassroomDetailFromRequest } from '../models/creator/classroomDetailCreator';
const ClassroomDetail = require('../models/log.js');

export async function createClassroom(req, res) {
  try {
    const classroomDetail = buildClassroomDetailFromRequest(req);
    const savedClassroomDetail = await classroomDetail.save();
    return res.status(200).send({ ...savedClassroomDetail });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}
