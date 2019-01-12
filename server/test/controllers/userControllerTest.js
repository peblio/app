import { expect } from 'chai';
import * as userController from '../../src/controllers/userController';
import * as userService from '../../src/service/userService';
import { assert, spy } from 'sinon';
const sandbox = require('sinon').sandbox.create();
var request = new Object();
var response = new Object();
var getUserNameByIdStub;
var getUserNameForPageStub;
var getUserNameForParentPageStub;
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

    it('shall call getUserNameById from service', function () {
        getUserNameByIdStub = sandbox.stub(userService, 'getUserNameById').returns(returnValue);

        const actualValue = userController.getUserNameById(request, response);

        expect(actualValue).to.be.eql(returnValue);
        assert.calledOnce(getUserNameByIdStub);
        assert.calledWith(getUserNameByIdStub, request, response);
    });


    it('shall call getUserNameForPage from service', function () {
        getUserNameForPageStub = sandbox.stub(userService, 'getUserNameForPage').returns(returnValue);

        const actualValue = userController.getUserNameForPage(request, response);

        expect(actualValue).to.be.eql(returnValue);
        assert.calledOnce(getUserNameForPageStub);
        assert.calledWith(getUserNameForPageStub, request, response);
    });

    it('shall call getUserNameForParentPage from service', function () {
        getUserNameForParentPageStub = sandbox.stub(userService, 'getUserNameForParentPage').returns(returnValue);

        const actualValue = userController.getUserNameForParentPage(request, response);

        expect(actualValue).to.be.eql(returnValue);
        assert.calledOnce(getUserNameForParentPageStub);
        assert.calledWith(getUserNameForParentPageStub, request, response);
    });

});

