const express = require('express');
const userRoutes = express.Router();
import * as userService from '../service/userService.js';

export function getUserProfile(req, res) {
  return userService.getUserProfile(req, res);
}

export function getUserDetailsById(req, res) {
  return userService.getUserDetailsById(req, res);
}

export function getUserDetailsForPage(req, res) {
  return userService.getUserDetailsForPage(req, res);
};

export function getUserDetailsForParentPage(req, res) {
  return userService.getUserDetailsForParentPage(req, res);
};

userRoutes.route('/:userName/profile').get(getUserProfile);
userRoutes.route('/:userObjectId').get(getUserDetailsById);
userRoutes.route('/pageAuthor/:pageId').get(getUserDetailsForPage);
userRoutes.route('/parentPageAuthor/:pageId').get(getUserDetailsForParentPage);
export default userRoutes;
