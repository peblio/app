import { expect } from 'chai';
import * as userController from '../../src/controllers/userController';
import { assert, spy } from 'sinon';
const sandbox = require('sinon').sandbox.create();
const Page = require('../../src/models/page.js');
const User = require('../../src/models/user.js');
var findOneUserSpy;
var findOnePageSpy;
var request;
var response;
const pageId = "pageId";
const userObjectId = "userObjectId";
const user = {_id: userObjectId, name: "username", type: "teacher"};
const page = {user: userObjectId};
const expectedUserData = {
    name: "username", 
    type: "teacher"
};


describe('userController', function () {
    describe('getUserNameById', function () {

        beforeEach(function () {
            request = {
                params: {
                    userObjectId
                }
            };
            response = {
                send: spy(),
                json: spy(),
                status: createResponseWithStatusCode(200)
            };
        });

        afterEach(function () {
            sandbox.restore();
        });

        it('shall return error when retrieve user errors', function () {
            response.status = createResponseWithStatusCode(500);
            findOneUserSpy = sandbox.stub(User, 'findOne').yields("error retrieving user", null);

            userController.getUserNameById(request, response);
            
            assertFindOneWasCalledWithUserId();
            assertSendWasCalledWith("error retrieving user");
        });

        it('shall return user name when retrieve user by id', function () {
            findOneUserSpy = sandbox.stub(User, 'findOne').yields(null, user);

            userController.getUserNameById(request, response);
            
            assertFindOneWasCalledWithUserId();
            assertSendWasCalledWith(expectedUserData);
        });
    });

    describe('getUserNameForPage', function () {

        beforeEach(function () {
            request = {
                params: {
                    pageParentId: pageId
                }
            };
            response = {
                send: spy(),
                json: spy(),
                status: createResponseWithStatusCode(200)
            };
        });

        afterEach(function () {
            sandbox.restore();
        });

        it('shall return error when retrieve page errors', function () {
            response.status = createResponseWithStatusCode(500);
            findOnePageSpy = sandbox.stub(Page, 'findOne').yields("error retrieving page", null);
            findOneUserSpy = sandbox.stub(User, 'findOne').yields("error retrieving user", null);

            userController.getUserNameForPage(request, response);
            
            assertFindOnePageWasCalledWithPageId();
            assertSendWasCalledWith("error retrieving page");
            assert.notCalled(findOneUserSpy);
        });

        it('shall return error when retrieve user errors', function () {
            response.status = createResponseWithStatusCode(500);
            findOnePageSpy = sandbox.stub(Page, 'findOne').yields(null, page);
            findOneUserSpy = sandbox.stub(User, 'findOne').yields("error retrieving user", null);

            userController.getUserNameForPage(request, response);
            
            assertFindOnePageWasCalledWithPageId();
            assertSendWasCalledWith("error retrieving user");
            assertFindOneWasCalledWithUserId();
        });

        it('shall return user name given page id', function () {
            findOnePageSpy = sandbox.stub(Page, 'findOne').yields(null, page);
            findOneUserSpy = sandbox.stub(User, 'findOne').yields(null, user);

            userController.getUserNameForPage(request, response);
            
            assertFindOnePageWasCalledWithPageId();
            assertSendWasCalledWith(expectedUserData);
            assertFindOneWasCalledWithUserId();
        });
    });

});

function assertFindOneWasCalledWithUserId() {
    assert.calledOnce(findOneUserSpy);
    assert.calledWith(findOneUserSpy, { _id: userObjectId });
}

function assertFindOnePageWasCalledWithPageId() {
    assert.calledOnce(findOnePageSpy);
    assert.calledWith(findOnePageSpy, { _id: pageId });
}

function assertSendWasCalledWith(msg) {
    assert.calledOnce(response.send);
    assert.calledWith(response.send, msg);
};

function createResponseWithStatusCode(statusCode) {
    return function (responseStatus) {
        expect(responseStatus).to.be.equal(statusCode);
        return this;
    }
};