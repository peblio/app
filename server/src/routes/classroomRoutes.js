const express = require('express');
const classroomRoutes = express.Router();
import * as classroomController from '../controllers/classroomController';

classroomRoutes.route('/classroomDetail').post(classroomController.createClassroomDetail);
classroomRoutes.route('/classroomDetail').get(classroomController.getAllMyClassroomDetails);
classroomRoutes.route('/classroomDetail/:id').patch(classroomController.joinClassroom);
classroomRoutes.route('/classroomDetail/addMember/:id').patch(classroomController.addMemberToClassroom);
classroomRoutes.route('/classroomDetail/:id').get(classroomController.getClassroomDetail);

classroomRoutes.route('/classroomAssignmentAttempt/:id').get(classroomController.getClassroomStudentAttemptForAssignment);
classroomRoutes.route('/classroomAssignmentAllAttempts/:id').get(classroomController.getClassroomAllAttemptsForAssignment);
classroomRoutes.route('/classroomAssignmentAttempt').post(classroomController.saveClassroomAssignmentStudentAttempt);
classroomRoutes.route('/classroomAssignmentAttempt/:id').patch(classroomController.turnInClassroomAssignmentAttempt);
classroomRoutes.route('/classroomAssignmentAttempt/addComment').patch(classroomController.addCommentOnClassroomAssignmentAttempt);
classroomRoutes.route('/classroomAssignmentAttempt/gradeAssignment').patch(classroomController.gradeClassroomAssignmentAttempt);

classroomRoutes.route('/classroomTopic/:id').get(classroomController.getClassroomTopics);
classroomRoutes.route('/classroomTopic').post(classroomController.saveClassroomTopic);
classroomRoutes.route('/classroomTopic').patch(classroomController.editClassroomTopicName);
classroomRoutes.route('/classroomTopic/:id').delete(classroomController.deleteClassroomTopic);

classroomRoutes.route('/classroomAssignment').post(classroomController.saveClassroomAssignment);
classroomRoutes.route('/classroomAssignment').patch(classroomController.publishClassroomAssignment);
classroomRoutes.route('/classroomAssignment/publishGrades').patch(classroomController.publishGradesForClassroomAssignment);
classroomRoutes.route('/classroomAssignment/reassignTopic').patch(classroomController.reassignTopicToAssignment);
classroomRoutes.route('/classroomAssignment/:id').get(classroomController.getClassroomAssignment);
classroomRoutes.route('/classroomAllAssignments/:id').get(classroomController.getAllAssignmentsInClassroom);
classroomRoutes.route('/classroomAllAssignmentsForStudent/:id').get(classroomController.getAllAssignmentsInClassroomForStudent);
classroomRoutes.route('/classroomAllAssignmentsByStudentForTeacher/:id').get(classroomController.getAllAssignmentsInClassroomByStudentForTeacher);

classroomRoutes.route('/classroomAllAttemptsForAssignment/:id').get(classroomController.getAllStudentAttemptsForAssignment);
module.exports = classroomRoutes;
