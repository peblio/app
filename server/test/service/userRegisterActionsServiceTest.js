import { expect } from 'chai';
import { assert, spy, useFakeTimers } from 'sinon';
import { createResponseWithStatusCode, assertStubWasCalledOnceWith } from '../utils';
import { createUser, loginUser, confirmUser, forgotPassword, resetPassword, resendConfirmUser } from '../../src/controllers/userRegisterActionsController';
import * as mailService from '../../src/service/mailSenderService';

const sandbox = require('sinon').sandbox.create();
const passport = require('passport');
const User = require('../../src/models/user.js');
const Token = require('../../src/models/token.js');

const signUpFailedMessage = {
  msg: 'Sign up failed'
};

const loginFailedMessage = {
  msg: 'Login failed'
};
const now = new Date();
let request;
let response;
let body;
let findOneSpy;
let saveSpy;
let findSpy;
let clock;
let tokenSaveSpy;
let sendSignUpConfirmationMailStub;
let sendSignUpNotificationMailStub;
let sendSuccessfulResetMailStub;
let sendResetMailStub;

describe('userRegisterActionsService', () => {
  describe('createUser', () => {
    let userToBeSaved;

    beforeEach(() => {
      body = getBody();
      userToBeSaved = getUserToBeSaved();
      request = { body };
      response = {
        send: spy(),
        json: spy(),
        status: createResponseWithStatusCode(200)
      };
      sendSignUpConfirmationMailStub = sandbox.stub(mailService, 'sendSignUpConfirmationMail');
      sendSignUpNotificationMailStub = sandbox.stub(mailService, 'sendSignUpNotificationMail');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('shall not create user when it already exists', () => {
      findOneSpy = sandbox.stub(User, 'findOne').yields(null, { name: 'whiskers' });
      response.status = createResponseWithStatusCode(400);

      createUser(request, response);

      assertFindOneWasCalledWithUsername();
      assertSendWasCalledWith({
        msg: 'Username not available! Please try again'
      });
      assert.notCalled(sendSignUpConfirmationMailStub);
    });

    it('shall not create user when retrieving username fails', () => {
      findOneSpy = sandbox.stub(User, 'findOne').yields({ error: 'Could not retrieve user' }, null);
      response.status = createResponseWithStatusCode(422);

      createUser(request, response);

      assertFindOneWasCalledWithUsername();
      assertSendWasCalledWith(signUpFailedMessage);
      assert.notCalled(sendSignUpConfirmationMailStub);
    });

    it('shall fail creating user when user could not be persisted', () => {
      findOneSpy = sandbox.stub(User, 'findOne').yields(null, null);
      const userSaveMock = sandbox.mock(new User());
      saveSpy = sandbox.stub(User.prototype, 'save').yields({ error: 'Could not save user' }, null);
      userSaveMock.save = saveSpy;
      response.status = createResponseWithStatusCode(422);

      createUser(request, response);

      assertFindOneWasCalledWithUsername();
      assert.calledOnce(saveSpy);
      assertJsonWasCalledWith(signUpFailedMessage);
      assert.notCalled(sendSignUpConfirmationMailStub);
    });

    it('shall save automatically verified user ', () => {
      findOneSpy = sandbox.stub(User, 'findOne').yields(null, null);
      saveSpy = sandbox.stub(User.prototype, 'save').yields(null, userToBeSaved);
      response.status = createResponseWithStatusCode(200);
      request.body.userType = 'student';
      userToBeSaved.type = 'student';

      createUser(request, response);

      assertFindOneWasCalledWithUsername();
      assert.calledOnce(saveSpy);
      assert.calledOnce(response.send);
      const actualResponse = response.send.getCall(0).args[0];
      const userSaved = actualResponse.user;
      expect(actualResponse.msg).to.be.equal('Successfully signed up! Please log in');
      assertUserSavedWithCorrectValues(userSaved);
      assert.notCalled(sendSignUpConfirmationMailStub);
    });

    it('shall not save non verified user when error generating token', () => {
      findOneSpy = sandbox.stub(User, 'findOne').yields(null, null);
      saveSpy = sandbox.stub(User.prototype, 'save').yields(null, userToBeSaved);
      tokenSaveSpy = sandbox.stub(Token.prototype, 'save').yields({ error: 'Could not save token' });
      response.status = createResponseWithStatusCode(500);

      createUser(request, response);

      assertFindOneWasCalledWithUsername();
      assert.calledOnce(saveSpy);
      assert.calledOnce(tokenSaveSpy);
      assertSendWasCalledWith(signUpFailedMessage);
      assert.notCalled(sendSignUpConfirmationMailStub);
    });

    it('shall save non verified user and send email', () => {
      findOneSpy = sandbox.stub(User, 'findOne').yields(null, null);
      saveSpy = sandbox.stub(User.prototype, 'save').yields(null, userToBeSaved);
      tokenSaveSpy = sandbox.stub(Token.prototype, 'save').yields(null);
      response.status = createResponseWithStatusCode(200);

      createUser(request, response);

      assertFindOneWasCalledWithUsername();
      assert.calledOnce(saveSpy);
      assert.calledOnce(tokenSaveSpy);
      assert.calledOnce(sendSignUpConfirmationMailStub);
      assertSignupConfirmationEmailValues(sendSignUpConfirmationMailStub);
    });

    it('shall save student as verified user with guardians email and send email', () => {
      findOneSpy = sandbox.stub(User, 'findOne').yields(null, null);
      saveSpy = sandbox.stub(User.prototype, 'save').yields(null, userToBeSaved);
      tokenSaveSpy = sandbox.stub(Token.prototype, 'save').yields(null);
      response.status = createResponseWithStatusCode(200);
      request = { body: getBodyForChildWithGuardiansConsent() };
      createUser(request, response);

      assertFindOneWasCalledWithUsername();
      assert.calledOnce(saveSpy);
      assert.notCalled(tokenSaveSpy);
      assert.calledOnce(sendSignUpNotificationMailStub);
      assertSignupNotificationEmailValues(sendSignUpNotificationMailStub);
    });

    function assertSignupConfirmationEmailValues(sendSignUpConfirmationMailStub) {
      const sendSignUpConfirmationMailStubArgs = sendSignUpConfirmationMailStub.getCall(0).args;
      expect(sendSignUpConfirmationMailStubArgs.length).to.be.equal(3);
      expect(sendSignUpConfirmationMailStubArgs[0]).to.be.equal(body.mail);
      expect(sendSignUpConfirmationMailStubArgs[1]).to.be.eql([body.name]);
    }

    function assertSignupNotificationEmailValues(sendSignUpNotificationMailStub) {
      const sendSignUpNotificationMailStubArgs = sendSignUpNotificationMailStub.getCall(0).args;
      expect(sendSignUpNotificationMailStubArgs.length).to.be.equal(2);
      expect(sendSignUpNotificationMailStubArgs[0]).to.be.equal(getBodyForChildWithGuardiansConsent().guardianEmail);
      expect(sendSignUpNotificationMailStubArgs[1]).to.be.eql(getBodyForChildWithGuardiansConsent().name);
    }

    function assertUserSavedWithCorrectValues(userSaved) {
      expect(userSaved.name).to.be.equal(userToBeSaved.name);
      expect(userSaved.email).to.be.equal(userToBeSaved.email);
      expect(userSaved.isVerified).to.be.true;
      expect(userSaved.isNew).to.be.true;
      expect(userSaved.blurb).to.be.equal('I <3 CS');
      expect(userSaved.type).to.be.equal('student');
      expect(userSaved.password).to.be.equal('IAmNotTellingYouThis');
    }
  });

  describe('loginUser', () => {
    let next;

    let passportAuthenticateStub;

    beforeEach(() => {
      body = getUserToLogin();
      request = { body };
      response = {
        send: spy(),
        json: spy(),
        status: createResponseWithStatusCode(200)
      };
      next = spy();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('shall not login user user could not be retrieved', () => {
      findSpy = sandbox.stub(User, 'find').yields({ err: 'Could not connect to database' }, null);
      response.status = createResponseWithStatusCode(401);

      loginUser(request, response, next);

      assertFindWasCalledWithEmail();
      assertSendWasCalledWith(loginFailedMessage);
    });

    it('shall not login when email associated with multiple accounts', () => {
      findSpy = sandbox.stub(User, 'find').yields(null, [{ name: '1' }, { name: '2' }]);
      response.status = createResponseWithStatusCode(400);

      loginUser(request, response, next);

      assertFindWasCalledWithEmail();
      assertSendWasCalledWith({ msg: 'This email is associated with multiple accounts, please use username to login' });
    });

    it('shall not login when passport authentication error', () => {
      findSpy = sandbox.stub(User, 'find').yields(null, [{ name: '1' }]);
      response.status = createResponseWithStatusCode(500);
      passportAuthenticateStub = sandbox.stub(passport, 'authenticate').returns(() => { });
      passportAuthenticateStub.yields('Could not connect to database', null);

      loginUser(request, response, next);

      assertFindWasCalledWithEmail();
      assertPassportAuthenticateWasCalled();
      assertSendWasCalledWith({ msg: 'Could not connect to database' });
    });

    it('shall not login when passport authentication could not retrieve user', () => {
      findSpy = sandbox.stub(User, 'find').yields(null, [{ name: '1' }]);
      response.status = createResponseWithStatusCode(401);
      passportAuthenticateStub = sandbox.stub(passport, 'authenticate').returns(() => { });
      passportAuthenticateStub.yields(null, null);

      loginUser(request, response, next);

      assertFindWasCalledWithEmail();
      assertPassportAuthenticateWasCalled();
      assertSendWasCalledWith(loginFailedMessage);
    });

    it('shall not login user when not verified', () => {
      findSpy = sandbox.stub(User, 'find').yields(null, [{ name: '1' }]);
      response.status = createResponseWithStatusCode(401);
      passportAuthenticateStub = sandbox.stub(passport, 'authenticate').returns(() => { });
      passportAuthenticateStub.yields(null, { isVerified: false });

      loginUser(request, response, next);

      assertFindWasCalledWithEmail();
      assertPassportAuthenticateWasCalled();
      assertSendWasCalledWith({
        msg: 'Your account has not been verified. \n <a href="/confirmation"> Resend email verification</a>'
      });
    });

    it('shall not login user when login returns error', () => {
      findSpy = sandbox.stub(User, 'find').yields(null, [{ name: '1' }]);
      response.status = createResponseWithStatusCode(401);
      passportAuthenticateStub = sandbox.stub(passport, 'authenticate').returns(() => { });
      passportAuthenticateStub.yields(null, { isVerified: true });
      request.login = sandbox.stub();

      loginUser(request, response, next);
      const loginCallback = request.login.getCall(0).args[1];
      loginCallback('error');

      assertFindWasCalledWithEmail();
      assertPassportAuthenticateWasCalled();
      assertSendWasCalledWith({
        msg: 'error'
      });
    });

    it('shall login user successfully', () => {
      findSpy = sandbox.stub(User, 'find').yields(null, [{ name: '1' }]);
      response.status = createResponseWithStatusCode(200);
      passportAuthenticateStub = sandbox.stub(passport, 'authenticate').returns(() => { });
      passportAuthenticateStub.yields(null, { isVerified: true, name: body.name, type: body.userType });
      request.login = sandbox.stub();

      loginUser(request, response, next);
      const loginCallback = request.login.getCall(0).args[1];
      loginCallback();

      assertFindWasCalledWithEmail();
      assertPassportAuthenticateWasCalled();
      assertSendWasCalledWith({ msg: 'Login Successful', user: { name: body.name, type: body.userType } });
    });

    function assertPassportAuthenticateWasCalled() {
      assertStubWasCalledOnceWith(passportAuthenticateStub, 'local');
    }
  });

  describe('confirmUser', () => {
    let tokenRetrieveSpy;

    beforeEach(() => {
      body = getBodyToConfirmUser();
      request = { body };
      response = {
        send: spy(),
        json: spy(),
        status: createResponseWithStatusCode(200)
      };
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('shall return 400 when token not sent', () => {
      request.body = {};
      response.status = createResponseWithStatusCode(400);

      confirmUser(request, response);

      assertSendWasCalledWith({ msg: '' });
    });

    it('shall not confirm user if token retrieve error', () => {
      response.status = createResponseWithStatusCode(400);
      tokenRetrieveSpy = sandbox.stub(Token, 'findOne').yields({ error: 'Could not retrieve token' });

      confirmUser(request, response);

      assertSendWasCalledWith({ msg: '' });
      assertTokenFindWasCalled();
    });

    it('shall not confirm user if token not found or has expired', () => {
      response.status = createResponseWithStatusCode(400);
      tokenRetrieveSpy = sandbox.stub(Token, 'findOne').yields(null, null);

      confirmUser(request, response);

      assertSendWasCalledWith({ msg: 'We were unable to find a valid token. Your token my have expired.' });
      assertTokenFindWasCalled();
    });

    it('shall not confirm user if token found but user retrieve error', () => {
      response.status = createResponseWithStatusCode(400);
      tokenRetrieveSpy = sandbox.stub(Token, 'findOne').yields(null, { token: 'token', _userId: getBody().mail });
      findOneSpy = sandbox.stub(User, 'findOne').yields({ err: 'Error retrieving user' }, null);

      confirmUser(request, response);

      assertSendWasCalledWith({ msg: '' });
      assertTokenFindWasCalled();
      assertFindOneWasCalledWithId();
    });

    it('shall not confirm user if token found but user not found', () => {
      response.status = createResponseWithStatusCode(400);
      tokenRetrieveSpy = sandbox.stub(Token, 'findOne').yields(null, { token: 'token', _userId: getBody().mail });
      findOneSpy = sandbox.stub(User, 'findOne').yields(null, null);

      confirmUser(request, response);

      assertSendWasCalledWith({ msg: 'We were unable to find a user for this token.' });
      assertTokenFindWasCalled();
      assertFindOneWasCalledWithId();
    });

    it('shall not confirm user if token already verified', () => {
      response.status = createResponseWithStatusCode(400);
      tokenRetrieveSpy = sandbox.stub(Token, 'findOne').yields(null, { token: 'token', _userId: getBody().mail });
      findOneSpy = sandbox.stub(User, 'findOne').yields(null, { isVerified: true });

      confirmUser(request, response);

      assertSendWasCalledWith({ msg: 'This account has already been verified. Please log in.' });
      assertTokenFindWasCalled();
      assertFindOneWasCalledWithId();
    });

    it('shall not confirm if user update fails while verifying', () => {
      response.status = createResponseWithStatusCode(500);
      tokenRetrieveSpy = sandbox.stub(Token, 'findOne').yields(null, { token: 'token', _userId: getBody().mail });
      const retrievedUser = getUser();
      saveSpy = sandbox.stub(User.prototype, 'save').yields({ err: 'Could not update user' }, null);
      retrievedUser.save = saveSpy;
      findOneSpy = sandbox.stub(User, 'findOne').yields(null, retrievedUser);

      confirmUser(request, response);

      assertSendWasCalledWith(signUpFailedMessage);
      assertTokenFindWasCalled();
      assertFindOneWasCalledWithId();
      assert.calledOnce(saveSpy);
    });

    it('shall confirm user token and persist as verified user', () => {
      response.status = createResponseWithStatusCode(200);
      tokenRetrieveSpy = sandbox.stub(Token, 'findOne').yields(null, { token: 'token', _userId: getBody().mail });
      const retrievedUser = getUser();
      saveSpy = sandbox.stub(User.prototype, 'save').yields(null, null);
      retrievedUser.save = saveSpy;
      findOneSpy = sandbox.stub(User, 'findOne').yields(null, retrievedUser);

      confirmUser(request, response);

      assertSendWasCalledWith({ msg: 'Sign up complete! Please log in.' });
      assertTokenFindWasCalled();
      assertFindOneWasCalledWithId();
      assert.calledOnce(saveSpy);
    });

    function assertTokenFindWasCalled() {
      assertStubWasCalledOnceWith(tokenRetrieveSpy, { token: 'token' });
    }
  });

  describe('forgotPassword', () => {
    beforeEach(() => {
      body = getBodyForForgotPassword();
      request = { body };
      response = {
        send: spy(),
        json: spy(),
        status: createResponseWithStatusCode(200)
      };
      sendResetMailStub = sandbox.stub(mailService, 'sendResetMail');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('shall not update password when user retrieve error', () => {
      response.status = createResponseWithStatusCode(422);
      findSpy = sandbox.stub(User, 'find').yields({ error: 'Could not retrieve user' });

      forgotPassword(request, response);

      assertJsonWasCalledWith({ msg: 'Password reset failed' });
      assertFindWasCalledWithEmail();
      assert.notCalled(sendResetMailStub);
    });

    it('shall not update password when user update error', () => {
      response.status = createResponseWithStatusCode(422);
      const retrievedUser = getUser();
      saveSpy = sandbox.stub(User.prototype, 'save').yields({ err: 'Could not update user' }, null);
      retrievedUser.save = saveSpy;
      findSpy = sandbox.stub(User, 'find').yields(null, [retrievedUser]);

      forgotPassword(request, response);

      assertJsonWasCalledWith({ msg: 'Password reset failed' });
      assertFindWasCalledWithEmail();
      assert.calledOnce(saveSpy);
      assert.notCalled(sendResetMailStub);
    });

    it('shall update password after updating user', () => {
      response.status = createResponseWithStatusCode(200);
      const retrievedUser = getUser();
      saveSpy = sandbox.stub(User.prototype, 'save').yields(null, null);
      retrievedUser.save = saveSpy;
      findSpy = sandbox.stub(User, 'find').yields(null, [retrievedUser]);

      forgotPassword(request, response);

      assertSendWasCalledWith({ msg: 'Please check your email to reset your password' });
      assertFindWasCalledWithEmail();
      assert.calledOnce(saveSpy);
      assert.calledOnce(sendResetMailStub);
      assertResetPasswordEmailValues(sendResetMailStub);
    });

    function assertResetPasswordEmailValues(sendResetMailStub) {
      const sendResetMailStubArgs = sendResetMailStub.getCall(0).args;
      expect(sendResetMailStubArgs.length).to.be.equal(3);
      expect(sendResetMailStubArgs[0]).to.be.equal(body.email);
      expect(sendResetMailStubArgs[1]).to.be.eql([getUser().name]);
    }
  });

  describe('resetPassword', () => {
    beforeEach(() => {
      body = getBodyToResetPassword();
      clock = useFakeTimers(now.getTime());
      request = { body };
      response = {
        send: spy(),
        json: spy(),
        status: createResponseWithStatusCode(200)
      };
      sendSuccessfulResetMailStub = sandbox.stub(mailService, 'sendSuccessfulResetMail');
    });

    afterEach(() => {
      sandbox.restore();
      clock.restore();
    });

    it('shall not reset password when reset token not found', () => {
      response.status = createResponseWithStatusCode(422);
      findOneSpy = sandbox.stub(User, 'findOne').yields({ error: 'Could not retrieve user' });

      resetPassword(request, response);

      assertJsonWasCalledWith({ error: 'Looks like your reset link expired!' });
      assertFindOneWasCalledWithToken();
      assert.notCalled(sendSuccessfulResetMailStub);
    });

    it('shall not reset password is user not found reset token not found', () => {
      response.status = createResponseWithStatusCode(422);
      findOneSpy = sandbox.stub(User, 'findOne').yields(null, null);

      resetPassword(request, response);

      assertJsonWasCalledWith({ error: 'Looks like your reset link expired!' });
      assertFindOneWasCalledWithToken();
      assert.notCalled(sendSuccessfulResetMailStub);
    });

    it('shall not reset password when updating user fails', () => {
      response.status = createResponseWithStatusCode(422);
      const retrievedUser = getUser();
      saveSpy = sandbox.stub(User.prototype, 'save').yields({ err: 'Could not update user' }, null);
      retrievedUser.save = saveSpy;
      retrievedUser.hashPassword = spy();
      findOneSpy = sandbox.stub(User, 'findOne').yields(null, retrievedUser);

      resetPassword(request, response);

      assertJsonWasCalledWith({ msg: 'Password reset failed' });
      assertFindOneWasCalledWithToken();
      assert.calledOnce(saveSpy);
      assert.calledOnce(retrievedUser.hashPassword);
      assert.notCalled(sendSuccessfulResetMailStub);
    });

    it('shall reset password and updating user', () => {
      response.status = createResponseWithStatusCode(200);
      const retrievedUser = getUser();
      saveSpy = sandbox.stub(User.prototype, 'save').yields(null, retrievedUser);
      retrievedUser.save = saveSpy;
      retrievedUser.hashPassword = spy();
      findOneSpy = sandbox.stub(User, 'findOne').yields(null, retrievedUser);

      resetPassword(request, response);

      assertSendWasCalledWith({ msg: 'Password successfully reset! Please login to use Peblio.', user: retrievedUser });
      assertFindOneWasCalledWithToken();
      assert.calledOnce(saveSpy);
      assert.calledOnce(retrievedUser.hashPassword);
      assert.calledOnce(sendSuccessfulResetMailStub);
      assertResetMailValues(sendSuccessfulResetMailStub);
    });

    function assertResetMailValues(sendSuccessfulResetMailStub) {
      const sendSuccessfulResetMailStubArgs = sendSuccessfulResetMailStub.getCall(0).args;
      expect(sendSuccessfulResetMailStubArgs.length).to.be.equal(1);
      expect(sendSuccessfulResetMailStubArgs[0]).to.be.equal(getUser().email);
    }
  });

  describe('resendConfirmUser', () => {
    beforeEach(() => {
      body = getBodyFoResendConfirmUser();
      request = { body };
      response = {
        send: spy(),
        json: spy(),
        status: createResponseWithStatusCode(200)
      };
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('shall not resend confirmation email when reset token not found', () => {
      response.status = createResponseWithStatusCode(400);
      findSpy = sandbox.stub(User, 'find').yields({ error: 'Could not retrieve user' });

      resendConfirmUser(request, response);

      assertSendWasCalledWith({ msg: 'We were unable to find a user with that email.' });
      assertFindWasCalledWithEmail();
    });

    it('shall not resend confirmation email when user not found', () => {
      response.status = createResponseWithStatusCode(400);
      findSpy = sandbox.stub(User, 'find').yields(null, []);

      resendConfirmUser(request, response);

      assertSendWasCalledWith({ msg: 'We were unable to find a user with that email.' });
      assertFindWasCalledWithEmail();
    });

    it('shall not resend confirmation email when user new token could not be saved', () => {
      response.status = createResponseWithStatusCode(500);
      const retrievedUser = getUser();
      tokenSaveSpy = sandbox.stub(Token.prototype, 'save').yields({ error: 'Could not save token' });
      findSpy = sandbox.stub(User, 'find').yields(null, [retrievedUser]);

      resendConfirmUser(request, response);

      assertSendWasCalledWith({ msg: 'Sign up failed' });
      assertFindWasCalledWithEmail();
      assert.calledOnce(tokenSaveSpy);
    });

    it('shall resend confirmation email when user new token saved', () => {
      response.status = createResponseWithStatusCode(200);
      const retrievedUser = getUser();
      tokenSaveSpy = sandbox.stub(Token.prototype, 'save').yields(null);
      findSpy = sandbox.stub(User, 'find').yields(null, [retrievedUser]);

      resendConfirmUser(request, response);

      assertSendWasCalledWith({ msg: 'Please check your email to finish signing up' });
      assertFindWasCalledWithEmail();
      assert.calledOnce(tokenSaveSpy);
    });
  });
});

function getBody() {
  return {
    mail: 'bla@gmail.com',
    name: 'Bla',
    userType: 'teacher',
    password: 'IAmNotTellingYouThis',
    requiresGuardianConsent: false
  };
}

function getBodyForChildWithGuardiansConsent() {
  return {
    mail: 'bla@gmail.com',
    name: 'Bla',
    userType: 'student',
    password: 'IAmNotTellingYouThis',
    requiresGuardianConsent: true,
    guardianEmail: 'gbla@gmail.com'
  };
}

function getUser() {
  return {
    email: 'bla@gmail.com',
    name: 'Bla',
    type: 'teacher',
    password: 'IAmNotTellingYouThis',
    requiresGuardianConsent: false,
    isVerified: false
  };
}

function getUserToLogin() {
  const body = getBody();
  return {
    name: body.mail,
    password: body.password,
  };
}

function getBodyToConfirmUser() {
  return {
    token: 'token'
  };
}

function getBodyFoResendConfirmUser() {
  return {
    email: getBody().mail
  };
}

function getBodyToResetPassword() {
  return {
    token: 'token',
    password: getBody().password
  };
}

function getBodyForForgotPassword() {
  return {
    email: getBody().mail
  };
}

function getUserToBeSaved() {
  const body = getBody();
  return {
    email: body.mail,
    name: body.name,
    type: body.userType,
    password: body.password,
    loginType: 'password',
    requiresGuardianConsent: body.requiresGuardianConsent,
    isVerified: false
  };
}

function assertJsonWasCalledWith(msg) {
  assertStubWasCalledOnceWith(response.json, msg);
}

function assertSendWasCalledWith(msg) {
  assertStubWasCalledOnceWith(response.send, msg);
}

function assertFindOneWasCalledWithUsername() {
  assertStubWasCalledOnceWith(findOneSpy, { name: 'Bla' });
}

function assertFindOneWasCalledWithId() {
  assertStubWasCalledOnceWith(findOneSpy, { _id: 'bla@gmail.com' });
}

function assertFindOneWasCalledWithToken() {
  assertStubWasCalledOnceWith(findOneSpy, {
    resetPasswordToken: getBodyToResetPassword().token,
    resetPasswordExpires: { $gt: now.getTime() }
  });
}

function assertFindWasCalledWithEmail() {
  assertStubWasCalledOnceWith(findSpy, { email: 'bla@gmail.com' });
}
