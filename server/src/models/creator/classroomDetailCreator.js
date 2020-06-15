import ClassroomDetail from "../ClassroomDetail";
import ClassroomMember from "../ClassroomMember";
import shortid from 'shortid';

export function buildClassroomDetailFromRequest(request, userId) {
  const classroomDetail = new ClassroomDetail({
    user: userId,
    name: request.body.name,
    room: request.body.room,
    description: request.body.description,
    subject: request.body.subject,
    grade: request.body.grade,
    id: shortid.generate()
  });
  return classroomDetail;
}

export function buildClassroomMember(userId, classroomId, role) {
  const classroomMember = new ClassroomMember({
    user: userId,
    classroomId: classroomId,
    role: role,
    isActive: true
  });
  return classroomMember;
}