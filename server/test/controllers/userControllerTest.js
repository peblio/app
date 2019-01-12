import { expect } from 'chai';
import * as userController from '../../src/controllers/userController';
import { assert, spy } from 'sinon';
const sandbox = require('sinon').sandbox.create();
const Page = require('../../src/models/page.js');
const User = require('../../src/models/user.js');
var findUserByIdSpy;
var findPageByIdSpy;
var findOnePageSpy;
var request;
var response;
const pageId = "pageId";
const userObjectId = "userObjectId";
const user = { _id: userObjectId, name: "username", type: "teacher" };
const page = { user: userObjectId, parentId: pageId };
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
            findUserByIdSpy = sandbox.stub(User, 'findById').yields("error retrieving user", null);

            userController.getUserNameById(request, response);

            assertFindByIdWasCalledWithUserId();
            assertSendWasCalledWith("error retrieving user");
        });

        it('shall return user name when retrieve user by id', function () {
            findUserByIdSpy = sandbox.stub(User, 'findById').yields(null, user);

            userController.getUserNameById(request, response);

            assertFindByIdWasCalledWithUserId();
            assertSendWasCalledWith(expectedUserData);
        });
    });

    describe('getUserNameForPage', function () {

        beforeEach(function () {
            request = {
                params: {
                    pageId
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
            findUserByIdSpy = sandbox.stub(User, 'findById').yields("error retrieving user", null);

            userController.getUserNameForPage(request, response);

            assertFindOneWasCalledWithPageShortId();
            assertSendWasCalledWith("error retrieving page");
            assert.notCalled(findUserByIdSpy);
        });

        it('shall return error when retrieve user errors', function () {
            response.status = createResponseWithStatusCode(500);
            findOnePageSpy = sandbox.stub(Page, 'findOne').yields(null, page);
            findUserByIdSpy = sandbox.stub(User, 'findById').yields("error retrieving user", null);

            userController.getUserNameForPage(request, response);

            assertFindOneWasCalledWithPageShortId();
            assertSendWasCalledWith("error retrieving user");
            assertFindByIdWasCalledWithUserId();
        });

        it('shall return user name given page id', function () {
            findOnePageSpy = sandbox.stub(Page, 'findOne').yields(null, page);
            findUserByIdSpy = sandbox.stub(User, 'findById').yields(null, user);

            userController.getUserNameForPage(request, response);

            assertFindOneWasCalledWithPageShortId();
            assertSendWasCalledWith(expectedUserData);
            assertFindByIdWasCalledWithUserId();
        });
    });

    describe('getUserNameForParentPage', function () {

        beforeEach(function () {
            request = {
                params: {
                    pageId
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
            findUserByIdSpy = sandbox.stub(User, 'findById').yields(null, null);

            userController.getUserNameForParentPage(request, response);

            assertFindOneWasCalledWithPageShortId();
            assertSendWasCalledWith("error retrieving page");
            assert.notCalled(findUserByIdSpy);
        });

        it('shall return error when retrieve user errors', function () {
            response.status = createResponseWithStatusCode(500);
            findOnePageSpy = sandbox.stub(Page, 'findOne').yields(null, page).yields(null, page);
            findUserByIdSpy = sandbox.stub(User, 'findById').yields("error retrieving user", null);

            userController.getUserNameForParentPage(request, response);

            assertFindOneWasCalledTwiceWithPageShortId();
            assertSendWasCalledWith("error retrieving user");
            assertFindByIdWasCalledWithUserId();
        });

        it('shall return user name given page id', function () {
            findOnePageSpy = sandbox.stub(Page, 'findOne').yields(null, page).yields(null, page);
            findUserByIdSpy = sandbox.stub(User, 'findById').yields(null, user);

            userController.getUserNameForParentPage(request, response);

            assertFindOneWasCalledTwiceWithPageShortId();
            assertSendWasCalledWith(expectedUserData);
            assertFindByIdWasCalledWithUserId();
        });
    });

});

function assertFindOneWasCalledWithPageShortId() {
    assert.calledOnce(findOnePageSpy);
    assert.calledWith(findOnePageSpy, { id: pageId });
}

function assertFindOneWasCalledTwiceWithPageShortId() {
    assert.calledTwice(findOnePageSpy);
    assert.alwaysCalledWith(findOnePageSpy, { id: pageId });
}

function assertFindByIdWasCalledWithUserId() {
    assert.calledOnce(findUserByIdSpy);
    assert.calledWith(findUserByIdSpy, userObjectId);
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