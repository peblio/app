import { buildClassroomDetailFromRequest, buildClassroomMember } from '../models/creator/classroomDetailCreator';

export async function createClassroomDetail(req, res) {
  try {
    const classroomDetail = buildClassroomDetailFromRequest(req, req.user._id.toString());
    const savedClassroomDetail = await classroomDetail.save();
    await buildClassroomMember(req.user._id.toString(), savedClassroomDetail._doc.id, 'teacher' ).save();
    return res.status(200).send({ ...savedClassroomDetail._doc });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}
