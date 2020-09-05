const express = require('express');
const classroomRoutes = express.Router();
import * as classroomController from '../controllers/classroomController';

classroomRoutes.route('/classroomDetail').post(classroomController.createClassroomDetail);
classroomRoutes.route('/classroomDetail').get(classroomController.getAllMyClassroomDetails);
classroomRoutes.route('/classroomDetail/:id').patch(classroomController.joinClassroom);
classroomRoutes.route('/classroomDetail/:id').get(classroomController.getClassroomDetail);

classroomRoutes.route('/classroomAssignment').get(classroomController.getClassroomGrades);
classroomRoutes.route('/classroomAssignmentAttempt').post(classroomController.saveClassroomAssignmentStudentAttempt);

classroomRoutes.route('/classroomTopic/:id').get(classroomController.getClassroomTopics);
classroomRoutes.route('/classroomTopic').post(classroomController.saveClassroomTopic);

classroomRoutes.route('/classroomAssignment').post(classroomController.saveClassroomAssignment);
classroomRoutes.route('/classroomAssignment/:id').get(classroomController.getClassroomAssignment);
classroomRoutes.route('/classroomAllAssignments/:id').get(classroomController.getAllAssignmentsInClassroom);
module.exports = classroomRoutes;
