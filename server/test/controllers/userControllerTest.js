import { expect } from 'chai'
import { createUser } from '../../src/controllers/userControllerNew';
import { assert, spy } from 'sinon';
const stubTransport = require('nodemailer-stub-transport');
const sandbox = require('sinon').sandbox.create();
const User = require('../../src/models/user.js');
const Token = require('../../src/models/token.js');
const signUpFailedMessage = {
    msg: "Sign up failed"
};

describe('userControllerNew', function () {
    describe('createUser', function () {
        var request;
        var response;
        var findOneSpy;
        var tokenSaveSpy;
        var saveSpy;
        var userToBeSaved;
        var body;

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

        function getUserToBeSaved() {
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

        function getBody() {
            return {
                mail: "bla@gmail.com",
                name: "Bla",
                userType: "teacher",
                password: "IAmNotTellingYouThis",
                requiresGuardianConsent: false
            };
        }

        function createResponseWithStatusCode(statusCode) {
            return function (responseStatus) {
                expect(responseStatus).to.be.equal(statusCode);
                return this;
            }
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

        function assertFindOneWasCalledWithUsername() {
            assert.calledOnce(findOneSpy);
            assert.calledWith(findOneSpy, { name: "Bla" });
        }

        function assertSendWasCalledWith(msg) {
            assert.calledOnce(response.send);
            assert.calledWith(response.send, msg);
        }

        function assertJsonWasCalledWith(msg) {
            assert.calledOnce(response.json);
            assert.calledWith(response.json, msg);
        }

    });

});