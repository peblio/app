const express = require('express');
const tagRoutes = express.Router();
import * as tagService from '../service/tagService.js';

export function saveTag(req, res) {
  return tagService.saveTag(req, res);
}

export function getAllTags(req, res) {
  return tagService.getAllTags(req, res);
}

export function getAllTagsStartingWith(req, res) {
  return tagService.getAllTagsStartingWith(req, res);
}

tagRoutes.route('/').post(saveTag);
tagRoutes.route('/startingWith/:tagPrefix').get(getAllTagsStartingWith);
tagRoutes.route('/').get(getAllTags);
export default tagRoutes;
