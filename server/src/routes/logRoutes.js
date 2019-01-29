const express = require('express');
const logRoutes = express.Router();
import * as logController from '../controllers/logController';

logRoutes.route('/').post(logController.saveLog);
module.exports = logRoutes;