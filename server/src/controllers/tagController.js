const express = require('express');
const tagRoutes = express.Router();
import * as tagService from '../service/tagService.js';

export function saveTag(req, res) {
  return tagService.saveTag(req, res);
}

tagRoutes.route('/').post(saveTag);
export default tagRoutes;
