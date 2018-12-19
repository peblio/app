import { expect } from 'chai'
import { createUser } from '../../src/controllers/userControllerNew';
import { assert, spy } from 'sinon';
const { mockRequest } = require('mock-req-res');
const sandbox = require('sinon').sandbox.create();
const User = require('../../src/models/user.js');
const body = {
    mail: "bla@gmail.com",
    name: "Bla",
    userType: "teacher",
    password: "IAmNotTellingYouThis",
    requiresGuardianConsent: false
};

describe('userControllerNew', function () {
    describe('createUser', function () {
        var request;
        var response;

        beforeEach(function () {
            request = mockRequest();
        });

        afterEach(function () {
            sandbox.restore();
        });

        it('shall not create user when it already exists', function () {
            var findOneSpy = sandbox.stub(User, 'findOne').yields(null, { name: 'whiskers' });
            response = {
                send: spy(),
                json: spy(),
                status: function (responseStatus) {
                    expect(responseStatus).to.be.equal(400);
                    return this;
                }
            };

            createUser(request, response);

            findOneSpy.calledOnceWithExactly({ name: "Bla" });
            assert.calledWith(response.send, {
                msg: "Username not available! Please try again"
            });
        });

        it('shall fail creating user when user could not be persisted', function () {
            var findOneSpy = sandbox.stub(User, 'findOne').yields(null, null);
            var saveSpy = sandbox.stub(User.prototype, 'save').yields({ error: "Could not save user" }, null);
            response = {
                send: spy(),
                json: spy(),
                status: function (responseStatus) {
                    expect(responseStatus).to.be.equal(422);
                    return this;
                }
            };

            createUser(request, response);

            findOneSpy.calledOnceWithExactly({ name: "Bla" });
            saveSpy.calledOnceWithExactly({
                email: body.mail,
                name: body.name,
                type: body.userType,
                password: "Something",
                loginType: 'password',
                requiresGuardianConsent: body.requiresGuardianConsent,
                isVerified: false
            })
            assert.calledWith(response.json, {
                msg: "Sign up failed"
            });
        });
    });

});