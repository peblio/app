import { expect } from 'chai'
import * as userRegisterActionsService from '../../src/service/userRegisterActionsService';
import { createUser, loginUser, forgotPassword, resetPassword, confirmUser, resendConfirmUser } from '../../src/controllers/userRegisterActionsController';
import { assert, spy } from 'sinon';
const sandbox = require('sinon').sandbox.create();
var request;
var response;
var next;
var returnValue;


describe('userRegisterActionsController', function () {

    beforeEach(function () {
        request = spy();
        response = spy();
        next = spy();
        returnValue = new Object();
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('shall call createUser from service', function () {
        var createUserSpy = sandbox.stub(userRegisterActionsService, 'createUser').returns(returnValue);

        var actualReturnValue = createUser(request, response);

        expect(actualReturnValue).to.be.equal(returnValue);
        assert.calledOnce(createUserSpy);
        assert.calledWith(createUserSpy, request, response);
    });

    it('shall call loginUser from service', function () {
        var loginUserSpy = sandbox.stub(userRegisterActionsService, 'loginUser').returns(returnValue);

        var actualReturnValue = loginUser(request, response, next);

        expect(actualReturnValue).to.be.equal(returnValue);
        assert.calledOnce(loginUserSpy);
        assert.calledWith(loginUserSpy, request, response, next);
    });

    it('shall call confirmUser from service', function () {
        var confirmUserSpy = sandbox.stub(userRegisterActionsService, 'confirmUser').returns(returnValue);

        var actualReturnValue = confirmUser(request, response);

        expect(actualReturnValue).to.be.equal(returnValue);
        assert.calledOnce(confirmUserSpy);
        assert.calledWith(confirmUserSpy, request, response);
    });

    it('shall call forgotPassword from service', function () {
        var forgotPasswordSpy = sandbox.stub(userRegisterActionsService, 'forgotPassword').returns(returnValue);

        var actualReturnValue = forgotPassword(request, response);

        expect(actualReturnValue).to.be.equal(returnValue);
        assert.calledOnce(forgotPasswordSpy);
        assert.calledWith(forgotPasswordSpy, request, response);
    });

    it('shall call resetPassword from service', function () {
        var resetPasswordSpy = sandbox.stub(userRegisterActionsService, 'resetPassword').returns(returnValue);

        var actualReturnValue = resetPassword(request, response);

        expect(actualReturnValue).to.be.equal(returnValue);
        assert.calledOnce(resetPasswordSpy);
        assert.calledWith(resetPasswordSpy, request, response);
    });

    it('shall call resendConfirmUser from service', function () {
        var resendConfirmUserSpy = sandbox.stub(userRegisterActionsService, 'resendConfirmUser').returns(returnValue);

        var actualReturnValue = resendConfirmUser(request, response);

        expect(actualReturnValue).to.be.equal(returnValue);
        assert.calledOnce(resendConfirmUserSpy);
        assert.calledWith(resendConfirmUserSpy, request, response);
    });

});