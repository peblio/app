import {
  createUser as create,
  loginUser as login,
  confirmUser as confirm,
  forgotPassword as forgotPasswordForUser,
  resetPassword as resetPasswordForUser,
  resendConfirmUser as resendConfirmationToUser
} from '../service/userRegisterActionsService';

export function createUser(req, res) {
  return create(req, res);
};

export function loginUser(req, res, next) {
  return login(req, res, next);
};

export function confirmUser(req, res) {
  return confirm(req, res);
};

export function forgotPassword(req, res) {
  return forgotPasswordForUser(req, res);
}

export function resetPassword(req, res) {
  return resetPasswordForUser(req, res);
}

export function resendConfirmUser(req, res) {
  return resendConfirmationToUser(req, res);
}


