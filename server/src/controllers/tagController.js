const express = require('express');
const tagRoutes = express.Router();
import * as tagService from '../service/tagService.js';

function saveTag(req, res) {
  return tagService.saveTag(req, res);
}

function getAllTags(req, res) {
  return tagService.getAllTags(req, res);
}

function getAllTagsStartingWith(req, res) {
  return tagService.getAllTagsStartingWith(req, res);
}

tagRoutes.route('/').post(saveTag);
tagRoutes.route('/startingWith/:tagPrefix').get(getAllTagsStartingWith);
tagRoutes.route('/').get(getAllTags);
module.exports = tagRoutes;
