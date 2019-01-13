const express = require('express');
const tagRoutes = express.Router();
import Tag, { buildTagFromRequest } from '../models/tag.js';

export function saveTag(req, res) {
  const tag = buildTagFromRequest(req);
  return Tag.findOne({ name: tag.name }, (retrieveTagError, retrievedTag) => {
    if (retrieveTagError) {
      return res.status(500).send(retrieveTagError);
    }
    if (retrievedTag) {
      return res.status(200).send();
    } else {
      return tag.save((tagSaveError) => {
        if (tagSaveError) {
          return res.status(500).send(tagSaveError);
        }
        return res.status(200).send();
      });
    }
  });
}

tagRoutes.route('/').post(saveTag);
export default tagRoutes;
