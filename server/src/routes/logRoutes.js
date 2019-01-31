const express = require('express');
const logRoutes = express.Router();
import * as logController from '../controllers/logController';

logRoutes.route('/').post(logController.saveLog);
logRoutes.route('/search').get(logController.searchLogs);
module.exports = logRoutes;