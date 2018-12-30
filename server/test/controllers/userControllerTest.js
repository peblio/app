import { expect } from 'chai'
import { createUser, loginUser } from '../../src/controllers/userControllerNew';
import { assert, spy } from 'sinon';
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
var request;
var response;
var body;

describe('userControllerNew', function () {
    describe('createUser', function () {
        var findOneSpy;
        var tokenSaveSpy;
        var saveSpy;
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
        });

        it('shall not create user when retrieving username fails', function () {
            findOneSpy = sandbox.stub(User, 'findOne').yields({ error: "Could not retrieve user" }, null);
            response.status = createResponseWithStatusCode(422)

            createUser(request, response);

            assertFindOneWasCalledWithUsername();
            assertSendWasCalledWith(signUpFailedMessage);
        });

        it('shall fail creating user when user could not be persisted', function () {
            findOneSpy = sandbox.stub(User, 'findOne').yields(null, null);
            saveSpy = sandbox.stub(User.prototype, 'save').yields({ error: "Could not save user" }, null);
            response.status = createResponseWithStatusCode(422);

            createUser(request, response);

            assertFindOneWasCalledWithUsername();
            assert.calledOnce(saveSpy);
            assertJsonWasCalledWith(signUpFailedMessage);
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
        });


        function assertUserSavedWithCorrectValues(userSaved) {
            expect(userSaved.name).to.be.equal(userToBeSaved.name);
            expect(userSaved.email).to.be.equal(userToBeSaved.email);
            expect(userSaved.isVerified).to.be.true;
            expect(userSaved.isNew).to.be.true;
            expect(userSaved.blurb).to.be.equal("I <3 CS");
            expect(userSaved.type).to.be.equal("student");
            expect(userSaved.password).to.be.equal("IAmNotTellingYouThis");
        }

        function assertFindOneWasCalledWithUsername() {
            assert.calledOnce(findOneSpy);
            assert.calledWith(findOneSpy, { name: "Bla" });
        }

    });

    describe('loginUser', function () {
        var next;
        var findSpy;
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

        function assertFindWasCalledWithEmail() {
            assert.calledOnce(findSpy);
            assert.calledWith(findSpy, { email: "bla@gmail.com" });
        }

        function assertPassportAuthenticateWasCalled() {
            assert.calledOnce(passportAuthenticateStub);
            assert.calledWith(passportAuthenticateStub, 'local');
        };

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

function getUserToLogin() {
    const body = getBody();
    return {
        name: body.mail,
        password: body.password,
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
    assert.calledOnce(response.json);
    assert.calledWith(response.json, msg);
};



function createResponseWithStatusCode(statusCode) {
    return function (responseStatus) {
        expect(responseStatus).to.be.equal(statusCode);
        return this;
    }
};

function assertSendWasCalledWith(msg) {
    assert.calledOnce(response.send);
    assert.calledWith(response.send, msg);
};