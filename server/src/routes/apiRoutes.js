const express = require('express');
const apiRoutes = express.Router();
import * as apiController from '../controllers/apiController';

apiRoutes.route('/authenticate/:id').get(apiController.authenticatePage);
apiRoutes.route('/upload/:user/:type').get(apiController.uploadFiles);
apiRoutes.route('/sketches').get(apiController.getSketches);
apiRoutes.route('/sketches/:user').get(apiController.getSketches);
module.exports = apiRoutes;