const express = require('express');
const pageVersionRoutes = express.Router();
import * as pageVersionController from '../controllers/pageVersionController';

pageVersionRoutes.route('/').post(pageVersionController.savePageVersion);
pageVersionRoutes.route('/').get(pageVersionController.getAllVersion);
module.exports = pageVersionRoutes;
