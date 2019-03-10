import { expect } from 'chai';
import { createResponseWithStatusCode, assertStubWasCalledOnceWith } from '../utils';
import { createUser, loginUser, confirmUser, forgotPassword, resetPassword, resendConfirmUser } from '../../src/controllers/userRegisterActionsController';
import * as mailService from '../../src/service/mailSenderService';
import { assert, spy, useFakeTimers } from 'sinon';
const sandbox = require('sinon').sandbox.create();
const User = require('../../src/models/user.js');
const passport = require('passport');
const Token = require('../../src/models/token.js');
const signUpFailedMessage = {
    msg: "Sign up failed"
};

const loginFailedMessage = {
    msg: "Login failed"
};
const now = new Date();
var request;
var response;
var body;
var findOneSpy;
var saveSpy;
var findSpy;
var clock;
var tokenSaveSpy;
var sendSignUpConfirmationMailStub;
var sendSuccessfulResetMailStub;
var sendResetMailStub;

describe('userRegisterActionsService', function () {
    describe('createUser', function () {
        var userToBeSaved;

        beforeEach(function () {
            body = getBody();
            userToBeSaved = getUserToBeSaved();
            request = { body };
            response = {
                send: spy(),
                json: spy(),
                status: createResponseWithStatusCode(200)
            };
            sendSignUpConfirmationMailStub = sandbox.stub(mailService, 'sendSignUpConfirmationMail');

        });

        afterEach(function () {
            sandbox.restore();
        });

        it('shall not create user when it already exists', function () {
            findOneSpy = sandbox.stub(User, 'findOne').yields(null, { name: 'whiskers' });
            response.status = createResponseWithStatusCode(400)

            createUser(request, response);

            assertFindOneWasCalledWithUsername();
            assertSendWasCalledWith({
                msg: "Username not available! Please try again"
            });
            assert.notCalled(sendSignUpConfirmationMailStub);
        });

        it('shall not create user when retrieving username fails', function () {
            findOneSpy = sandbox.stub(User, 'findOne').yields({ error: "Could not retrieve user" }, null);
            response.status = createResponseWithStatusCode(422)

            createUser(request, response);

            assertFindOneWasCalledWithUsername();
            assertSendWasCalledWith(signUpFailedMessage);
            assert.notCalled(sendSignUpConfirmationMailStub);
        });

        it('shall fail creating user when user could not be persisted', function () {
            findOneSpy = sandbox.stub(User, 'findOne').yields(null, null);
            var userSaveMock = sandbox.mock(new User());
            saveSpy = sandbox.stub(User.prototype, 'save').yields({ error: "Could not save user" }, null);
            userSaveMock.save = saveSpy;
            response.status = createResponseWithStatusCode(422);

            createUser(request, response);

            assertFindOneWasCalledWithUsername();
            assert.calledOnce(saveSpy);
            assertJsonWasCalledWith(signUpFailedMessage);
            assert.notCalled(sendSignUpConfirmationMailStub);
        });

        it('shall save automatically verified user ', function () {
            findOneSpy = sandbox.stub(User, 'findOne').yields(null, null);
            saveSpy = sandbox.stub(User.prototype, 'save').yields(null, userToBeSaved);
            response.status = createResponseWithStatusCode(200);
            request.body.userType = "student";
            userToBeSaved.type = "student"

            createUser(request, response);

            assertFindOneWasCalledWithUsername();
            assert.calledOnce(saveSpy);
            assert.calledOnce(response.send);
            const actualResponse = response.send.getCall(0).args[0];
            const userSaved = actualResponse.user;
            expect(actualResponse.msg).to.be.equal("Successfully signed up! Please log in");
            assertUserSavedWithCorrectValues(userSaved);
            assert.notCalled(sendSignUpConfirmationMailStub);
        });

        it('shall not save non verified user when error generating token', function () {
            findOneSpy = sandbox.stub(User, 'findOne').yields(null, null);
            saveSpy = sandbox.stub(User.prototype, 'save').yields(null, userToBeSaved);
            tokenSaveSpy = sandbox.stub(Token.prototype, 'save').yields({ error: "Could not save token" });
            response.status = createResponseWithStatusCode(500);

            createUser(request, response);

            assertFindOneWasCalledWithUsername();
            assert.calledOnce(saveSpy);
            assert.calledOnce(tokenSaveSpy);
            assertSendWasCalledWith(signUpFailedMessage);
            assert.notCalled(sendSignUpConfirmationMailStub);
        });

        it('shall save non verified user and send email', function () {
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

        function assertSignupConfirmationEmailValues(sendSignUpConfirmationMailStub) {
            const sendSignUpConfirmationMailStubArgs = sendSignUpConfirmationMailStub.getCall(0).args;
            expect(sendSignUpConfirmationMailStubArgs.length).to.be.equal(3);
            expect(sendSignUpConfirmationMailStubArgs[0]).to.be.equal(body.mail);
            expect(sendSignUpConfirmationMailStubArgs[1]).to.be.eql([body.name]);
        }

        function assertUserSavedWithCorrectValues(userSaved) {
            expect(userSaved.name).to.be.equal(userToBeSaved.name);
            expect(userSaved.email).to.be.equal(userToBeSaved.email);
            expect(userSaved.isVerified).to.be.true;
            expect(userSaved.isNew).to.be.true;
            expect(userSaved.blurb).to.be.equal("I <3 CS");
            expect(userSaved.type).to.be.equal("student");
            expect(userSaved.password).to.be.equal("IAmNotTellingYouThis");
        }
    });

    describe('loginUser', function () {
        var next;

        var passportAuthenticateStub;

        beforeEach(function () {
            body = getUserToLogin();
            request = { body };
            response = {
                send: spy(),
                json: spy(),
                status: createResponseWithStatusCode(200)
            };
            next = spy();
        });

        afterEach(function () {
            sandbox.restore();
        });

        it('shall not login user user could not be retrieved', function () {
            findSpy = sandbox.stub(User, 'find').yields({ err: "Could not connect to database" }, null);
            response.status = createResponseWithStatusCode(401);

            loginUser(request, response, next);

            assertFindWasCalledWithEmail();
            assertSendWasCalledWith(loginFailedMessage);
        });

        it('shall not login when email associated with multiple accounts', function () {
            findSpy = sandbox.stub(User, 'find').yields(null, [{ name: "1" }, { name: "2" }]);
            response.status = createResponseWithStatusCode(400);

            loginUser(request, response, next);

            assertFindWasCalledWithEmail();
            assertSendWasCalledWith({ msg: "This email is associated with multiple accounts, please use username to login" });
        });

        it('shall not login when passport authentication error', function () {
            findSpy = sandbox.stub(User, 'find').yields(null, [{ name: "1" }]);
            response.status = createResponseWithStatusCode(500);
            passportAuthenticateStub = sandbox.stub(passport, 'authenticate').returns(function () { });
            passportAuthenticateStub.yields("Could not connect to database", null);

            loginUser(request, response, next);

            assertFindWasCalledWithEmail();
            assertPassportAuthenticateWasCalled();
            assertSendWasCalledWith({ msg: "Could not connect to database" })
        });

        it('shall not login when passport authentication could not retrieve user', function () {
            findSpy = sandbox.stub(User, 'find').yields(null, [{ name: "1" }]);
            response.status = createResponseWithStatusCode(401);
            passportAuthenticateStub = sandbox.stub(passport, 'authenticate').returns(function () { });
            passportAuthenticateStub.yields(null, null);

            loginUser(request, response, next);

            assertFindWasCalledWithEmail();
            assertPassportAuthenticateWasCalled();
            assertSendWasCalledWith(loginFailedMessage)
        });

        it('shall not login user when not verified', function () {
            findSpy = sandbox.stub(User, 'find').yields(null, [{ name: "1" }]);
            response.status = createResponseWithStatusCode(401);
            passportAuthenticateStub = sandbox.stub(passport, 'authenticate').returns(function () { });
            passportAuthenticateStub.yields(null, { isVerified: false })

            loginUser(request, response, next);

            assertFindWasCalledWithEmail();
            assertPassportAuthenticateWasCalled();
            assertSendWasCalledWith({
                msg: 'Your account has not been verified. \n <a href="/confirmation"> Resend email verification</a>'
            })
        });

        it('shall not login user when login returns error', function () {
            findSpy = sandbox.stub(User, 'find').yields(null, [{ name: "1" }]);
            response.status = createResponseWithStatusCode(401);
            passportAuthenticateStub = sandbox.stub(passport, 'authenticate').returns(function () { });
            passportAuthenticateStub.yields(null, { isVerified: true })
            request.login = sandbox.stub();

            loginUser(request, response, next);
            const loginCallback = request.login.getCall(0).args[1];
            loginCallback("error");

            assertFindWasCalledWithEmail();
            assertPassportAuthenticateWasCalled();
            assertSendWasCalledWith({
                msg: "error"
            })
        });

        it('shall login user successfully', function () {
            findSpy = sandbox.stub(User, 'find').yields(null, [{ name: "1" }]);
            response.status = createResponseWithStatusCode(200);
            passportAuthenticateStub = sandbox.stub(passport, 'authenticate').returns(function () { });
            passportAuthenticateStub.yields(null, { isVerified: true, name: body.name, type: body.userType })
            request.login = sandbox.stub();

            loginUser(request, response, next);
            const loginCallback = request.login.getCall(0).args[1];
            loginCallback();

            assertFindWasCalledWithEmail();
            assertPassportAuthenticateWasCalled();
            assertSendWasCalledWith({ msg: "Login Successful", user: { name: body.name, type: body.userType } })
        });

        function assertPassportAuthenticateWasCalled() {
            assertStubWasCalledOnceWith(passportAuthenticateStub, 'local');
        };

    });

    describe('confirmUser', function () {
        var tokenRetrieveSpy;

        beforeEach(function () {
            body = getBodyToConfirmUser();
            request = { body };
            response = {
                send: spy(),
                json: spy(),
                status: createResponseWithStatusCode(200)
            };
        });

        afterEach(function () {
            sandbox.restore();
        });

        it('shall return 400 when token not sent', function () {
            request.body = {};
            response.status = createResponseWithStatusCode(400);

            confirmUser(request, response);

            assertSendWasCalledWith({ msg: '' });
        });

        it('shall not confirm user if token retrieve error', function () {
            response.status = createResponseWithStatusCode(400);
            tokenRetrieveSpy = sandbox.stub(Token, 'findOne').yields({ error: "Could not retrieve token" });

            confirmUser(request, response);

            assertSendWasCalledWith({ msg: '' });
            assertTokenFindWasCalled();
        });

        it('shall not confirm user if token not found or has expired', function () {
            response.status = createResponseWithStatusCode(400);
            tokenRetrieveSpy = sandbox.stub(Token, 'findOne').yields(null, null);

            confirmUser(request, response);

            assertSendWasCalledWith({ msg: "We were unable to find a valid token. Your token my have expired." });
            assertTokenFindWasCalled();
        });

        it('shall not confirm user if token found but user retrieve error', function () {
            response.status = createResponseWithStatusCode(400);
            tokenRetrieveSpy = sandbox.stub(Token, 'findOne').yields(null, { token: "token", _userId: getBody().mail });
            findOneSpy = sandbox.stub(User, 'findOne').yields({ err: "Error retrieving user" }, null);

            confirmUser(request, response);

            assertSendWasCalledWith({ msg: '' });
            assertTokenFindWasCalled();
            assertFindOneWasCalledWithId();
        });

        it('shall not confirm user if token found but user not found', function () {
            response.status = createResponseWithStatusCode(400);
            tokenRetrieveSpy = sandbox.stub(Token, 'findOne').yields(null, { token: "token", _userId: getBody().mail });
            findOneSpy = sandbox.stub(User, 'findOne').yields(null, null);

            confirmUser(request, response);

            assertSendWasCalledWith({ msg: "We were unable to find a user for this token." });
            assertTokenFindWasCalled();
            assertFindOneWasCalledWithId();
        });

        it('shall not confirm user if token already verified', function () {
            response.status = createResponseWithStatusCode(400);
            tokenRetrieveSpy = sandbox.stub(Token, 'findOne').yields(null, { token: "token", _userId: getBody().mail });
            findOneSpy = sandbox.stub(User, 'findOne').yields(null, { isVerified: true });

            confirmUser(request, response);

            assertSendWasCalledWith({ msg: "This account has already been verified. Please log in." });
            assertTokenFindWasCalled();
            assertFindOneWasCalledWithId();
        });

        it('shall not confirm if user update fails while verifying', function () {
            response.status = createResponseWithStatusCode(500);
            tokenRetrieveSpy = sandbox.stub(Token, 'findOne').yields(null, { token: "token", _userId: getBody().mail });
            var retrievedUser = getUser();
            saveSpy = sandbox.stub(User.prototype, 'save').yields({ err: "Could not update user" }, null);
            retrievedUser.save = saveSpy;
            findOneSpy = sandbox.stub(User, 'findOne').yields(null, retrievedUser);

            confirmUser(request, response);

            assertSendWasCalledWith(signUpFailedMessage);
            assertTokenFindWasCalled();
            assertFindOneWasCalledWithId();
            assert.calledOnce(saveSpy);
        });

        it('shall confirm user token and persist as verified user', function () {
            response.status = createResponseWithStatusCode(200);
            tokenRetrieveSpy = sandbox.stub(Token, 'findOne').yields(null, { token: "token", _userId: getBody().mail });
            var retrievedUser = getUser();
            saveSpy = sandbox.stub(User.prototype, 'save').yields(null, null);
            retrievedUser.save = saveSpy;
            findOneSpy = sandbox.stub(User, 'findOne').yields(null, retrievedUser);

            confirmUser(request, response);

            assertSendWasCalledWith({ msg: "Sign up complete! Please log in." });
            assertTokenFindWasCalled();
            assertFindOneWasCalledWithId();
            assert.calledOnce(saveSpy);
        });

        function assertTokenFindWasCalled() {
            assertStubWasCalledOnceWith(tokenRetrieveSpy, { token: "token" });
        };

    });

    describe('forgotPassword', function () {

        beforeEach(function () {
            body = getBodyForForgotPassword();
            request = { body };
            response = {
                send: spy(),
                json: spy(),
                status: createResponseWithStatusCode(200)
            };
            sendResetMailStub = sandbox.stub(mailService, 'sendResetMail');
        });

        afterEach(function () {
            sandbox.restore();
        });

        it('shall not update password when user retrieve error', function () {
            response.status = createResponseWithStatusCode(422);
            findSpy = sandbox.stub(User, 'find').yields({ error: "Could not retrieve user" });

            forgotPassword(request, response);

            assertJsonWasCalledWith({ msg: 'Password reset failed' });
            assertFindWasCalledWithEmail();
            assert.notCalled(sendResetMailStub);
        });

        it('shall not update password when user update error', function () {
            response.status = createResponseWithStatusCode(422);
            var retrievedUser = getUser();
            saveSpy = sandbox.stub(User.prototype, 'save').yields({ err: "Could not update user" }, null);
            retrievedUser.save = saveSpy;
            findSpy = sandbox.stub(User, 'find').yields(null, [retrievedUser]);

            forgotPassword(request, response);

            assertJsonWasCalledWith({ msg: 'Password reset failed' });
            assertFindWasCalledWithEmail();
            assert.calledOnce(saveSpy);
            assert.notCalled(sendResetMailStub);
        });

        it('shall update password after updating user', function () {
            response.status = createResponseWithStatusCode(200);
            var retrievedUser = getUser();
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

    describe('resetPassword', function () {

        beforeEach(function () {
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

        afterEach(function () {
            sandbox.restore();
            clock.restore();
        });

        it('shall not reset password when reset token not found', function () {
            response.status = createResponseWithStatusCode(422);
            findOneSpy = sandbox.stub(User, 'findOne').yields({ error: "Could not retrieve user" });

            resetPassword(request, response);

            assertJsonWasCalledWith({ error: 'Looks like your reset link expired!' });
            assertFindOneWasCalledWithToken();
            assert.notCalled(sendSuccessfulResetMailStub);
        });

        it('shall not reset password is user not found reset token not found', function () {
            response.status = createResponseWithStatusCode(422);
            findOneSpy = sandbox.stub(User, 'findOne').yields(null, null);

            resetPassword(request, response);

            assertJsonWasCalledWith({ error: 'Looks like your reset link expired!' });
            assertFindOneWasCalledWithToken();
            assert.notCalled(sendSuccessfulResetMailStub);
        });

        it('shall not reset password when updating user fails', function () {
            response.status = createResponseWithStatusCode(422);
            var retrievedUser = getUser();
            saveSpy = sandbox.stub(User.prototype, 'save').yields({ err: "Could not update user" }, null);
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

        it('shall reset password and updating user', function () {
            response.status = createResponseWithStatusCode(200);
            var retrievedUser = getUser();
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

    describe('resendConfirmUser', function () {

        beforeEach(function () {
            body = getBodyFoResendConfirmUser();
            request = { body };
            response = {
                send: spy(),
                json: spy(),
                status: createResponseWithStatusCode(200)
            };
        });

        afterEach(function () {
            sandbox.restore();
        });

        it('shall not resend confirmation email when reset token not found', function () {
            response.status = createResponseWithStatusCode(400);
            findSpy = sandbox.stub(User, 'find').yields({ error: "Could not retrieve user" });

            resendConfirmUser(request, response);

            assertSendWasCalledWith({ msg: 'We were unable to find a user with that email.' });
            assertFindWasCalledWithEmail();
        });

        it('shall not resend confirmation email when user not found', function () {
            response.status = createResponseWithStatusCode(400);
            findSpy = sandbox.stub(User, 'find').yields(null, []);

            resendConfirmUser(request, response);

            assertSendWasCalledWith({ msg: 'We were unable to find a user with that email.' });
            assertFindWasCalledWithEmail();
        });

        it('shall not resend confirmation email when user new token could not be saved', function () {
            response.status = createResponseWithStatusCode(500);
            var retrievedUser = getUser();
            tokenSaveSpy = sandbox.stub(Token.prototype, 'save').yields({ error: "Could not save token" });
            findSpy = sandbox.stub(User, 'find').yields(null, [retrievedUser]);

            resendConfirmUser(request, response);

            assertSendWasCalledWith({ msg: 'Sign up failed' });
            assertFindWasCalledWithEmail();
            assert.calledOnce(tokenSaveSpy);
        });

        it('shall resend confirmation email when user new token saved', function () {
            response.status = createResponseWithStatusCode(200);
            var retrievedUser = getUser();
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
        mail: "bla@gmail.com",
        name: "Bla",
        userType: "teacher",
        password: "IAmNotTellingYouThis",
        requiresGuardianConsent: false
    };
};

function getUser() {
    return {
        email: "bla@gmail.com",
        name: "Bla",
        type: "teacher",
        password: "IAmNotTellingYouThis",
        requiresGuardianConsent: false,
        isVerified: false
    };
};

function getUserToLogin() {
    const body = getBody();
    return {
        name: body.mail,
        password: body.password,
    };
};

function getBodyToConfirmUser() {
    return {
        token: "token"
    };
};

function getBodyFoResendConfirmUser() {
    return {
        email: getBody().mail
    };
};

function getBodyToResetPassword() {
    return {
        token: "token",
        password: getBody().password
    };
};

function getBodyForForgotPassword() {
    return {
        email: getBody().mail
    };
};

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
};

function assertJsonWasCalledWith(msg) {
    assertStubWasCalledOnceWith(response.json, msg);
};

function assertSendWasCalledWith(msg) {
    assertStubWasCalledOnceWith(response.send, msg);
};

function assertFindOneWasCalledWithUsername() {
    assertStubWasCalledOnceWith(findOneSpy, { name: "Bla" });
}

function assertFindOneWasCalledWithId() {
    assertStubWasCalledOnceWith(findOneSpy, { _id: "bla@gmail.com" });
}

function assertFindOneWasCalledWithToken() {
    assertStubWasCalledOnceWith(findOneSpy, {
        resetPasswordToken: getBodyToResetPassword().token,
        resetPasswordExpires: { $gt: now.getTime() }
    });
}

function assertFindWasCalledWithEmail() {
    assertStubWasCalledOnceWith(findSpy, { email: "bla@gmail.com" });
}