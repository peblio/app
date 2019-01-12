const express = require('express');
const userRoutes = express.Router();
import * as userService from '../service/userService.js';

export function getUserProfile(req, res) {
  return userService.getUserProfile(req, res);
}

export function getUserNameById(req, res) {
  return userService.getUserNameById(req, res);
}

export function getUserNameForPage(req, res) {
  return userService.getUserNameForPage(req, res);
};

export function getUserNameForParentPage(req, res) {
  return userService.getUserNameForParentPage(req, res);
};

userRoutes.route('/:userName/profile').get(getUserProfile);
userRoutes.route('/:userObjectId').get(getUserNameById);
userRoutes.route('/page/:pageId').get(getUserNameForPage);
userRoutes.route('/parentPageAuthor/:pageId').get(getUserNameForParentPage);
export default userRoutes;
