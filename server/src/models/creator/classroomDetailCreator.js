import ClassroomDetail from "../ClassroomDetail";
import ClassroomMember from "../ClassroomMember";
import ClassroomAssignment from "../ClassroomAssignment";
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

export function buildClassroomAssignment(request) {
  const classroomAssignment = new ClassroomAssignment({
    user: request.user._id.toString(),
    title: request.body.title,
    id: shortid.generate(),
    classroomId: request.body.classroomId,
    topicId: request.body.topicId,
    dueDate: request.body.dueDate , //send ISO date using new Date().toISOString()
    description: request.body.description,
    peblUrls: request.body.peblUrls,
    urls: request.body.urls,
    isPublished: request.body.isPublished,
  });
  return classroomAssignment;
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