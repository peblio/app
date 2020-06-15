const express = require('express');
const classroomRoutes = express.Router();
import * as classroomController from '../controllers/classroomController';

classroomRoutes.route('/classroomDetail').post(classroomController.createClassroomDetail);
module.exports = classroomRoutes;
