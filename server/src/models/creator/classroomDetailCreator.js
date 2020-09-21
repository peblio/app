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
    section: request.body.section,
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
    peblUrl: request.body.peblUrl,
    url: request.body.url,
    isPublished: request.body.isPublished,
    type: request.body.type,
  });
  return classroomAssignment;
}

export function buildClassroomMember(request, classroomId, role) {
  const classroomMember = new ClassroomMember({
    user: request.user._id.toString(),
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    classroomId: classroomId,
    role: role,
    isActive: true
  });
  return classroomMember;
}