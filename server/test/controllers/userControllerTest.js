import { expect } from 'chai';
import * as userController from '../../src/controllers/userController';
import * as userService from '../../src/service/userService';
import { assert } from 'sinon';
const sandbox = require('sinon').sandbox.create();
var request = new Object();
var response = new Object();
var getUserDetailsByIdStub;
var getUserDetailsForPageStub;
var getUserDetailsForParentPageStub;
const returnValue = {
    name: "username",
    type: "teacher"
};


describe('userController', function () {

    beforeEach(function () {
        request = new Object();
        response = new Object();
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('shall call getUserDetailsById from service', function () {
        getUserDetailsByIdStub = sandbox.stub(userService, 'getUserDetailsById').returns(returnValue);

        const actualValue = userController.getUserDetailsById(request, response);

        expect(actualValue).to.be.eql(returnValue);
        assert.calledOnce(getUserDetailsByIdStub);
        assert.calledWith(getUserDetailsByIdStub, request, response);
    });

    it('shall call getUserDetailsForPage from service', function () {
        getUserDetailsForPageStub = sandbox.stub(userService, 'getUserDetailsForPage').returns(returnValue);

        const actualValue = userController.getUserDetailsForPage(request, response);

        expect(actualValue).to.be.eql(returnValue);
        assert.calledOnce(getUserDetailsForPageStub);
        assert.calledWith(getUserDetailsForPageStub, request, response);
    });

    it('shall call getUserDetailsForParentPage from service', function () {
        getUserDetailsForParentPageStub = sandbox.stub(userService, 'getUserDetailsForParentPage').returns(returnValue);

        const actualValue = userController.getUserDetailsForParentPage(request, response);

        expect(actualValue).to.be.eql(returnValue);
        assert.calledOnce(getUserDetailsForParentPageStub);
        assert.calledWith(getUserDetailsForParentPageStub, request, response);
    });

});

