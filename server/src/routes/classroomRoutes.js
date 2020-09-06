const express = require('express');
const classroomRoutes = express.Router();
import * as classroomController from '../controllers/classroomController';

classroomRoutes.route('/classroomDetail').post(classroomController.createClassroomDetail);
classroomRoutes.route('/classroomDetail').get(classroomController.getAllMyClassroomDetails);
classroomRoutes.route('/classroomDetail/:id').patch(classroomController.joinClassroom);
classroomRoutes.route('/classroomDetail/:id').get(classroomController.getClassroomDetail);

classroomRoutes.route('/classroomAssignmentAttempt/:id').get(classroomController.getClassroomStudentAttemptForAssignment);
classroomRoutes.route('/classroomAssignmentAllAttempts/:id').get(classroomController.getClassroomAllAttemptsForAssignment);
classroomRoutes.route('/classroomAssignmentAttempt').post(classroomController.saveClassroomAssignmentStudentAttempt);
classroomRoutes.route('/classroomAssignmentAttempt').patch(classroomController.changeTurnInStatusOfClassroomAssignmentAttempt);
classroomRoutes.route('/classroomAssignmentAttempt/addComment').patch(classroomController.addCommentOnClassroomAssignmentAttempt);

classroomRoutes.route('/classroomTopic/:id').get(classroomController.getClassroomTopics);
classroomRoutes.route('/classroomTopic').post(classroomController.saveClassroomTopic);
classroomRoutes.route('/classroomTopic').patch(classroomController.editClassroomTopicName);

classroomRoutes.route('/classroomAssignment').post(classroomController.saveClassroomAssignment);
classroomRoutes.route('/classroomAssignment').patch(classroomController.publishClassroomAssignment);
classroomRoutes.route('/classroomAssignment/:id').get(classroomController.getClassroomAssignment);
classroomRoutes.route('/classroomAllAssignments/:id').get(classroomController.getAllAssignmentsInClassroom);
classroomRoutes.route('/classroomAllAssignmentsForStudent/:id').get(classroomController.getAllAssignmentsInClassroomForStudent);

classroomRoutes.route('/classroomAllAttemptsForAssignment/:id').get(classroomController.getAllStudentAttemptsForAssignment);
module.exports = classroomRoutes;
