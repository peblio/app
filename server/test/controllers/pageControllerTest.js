import { expect } from 'chai';
import { getPage, getExamples } from '../../src/controllers/pageControllerNew';
import { assert, spy } from 'sinon';
const sandbox = require('sinon').sandbox.create();
const Page = require('../../src/models/page.js');
const User = require('../../src/models/user.js');
var findSpy;
var userFindSpy;
var request;
var response;
const pageData = {
    data: "SomePageData"
};
const pageId = "pageId";
const error = {error: 'Could not retrieve page'};
const users = [{_id: 1}];
const pageExamples = new Object();

describe('pageController', function () {
    describe('getPage', function () {

        beforeEach(function () {
            request = {
                params: {
                    pageId
                }
            };
            response = {
                send: spy(),
                json: spy()
            };
        });

        afterEach(function () {
            sandbox.restore();
        });

        it('shall retrieve page by id', function () {
            findSpy = sandbox.stub(Page, 'find').yields(null, pageData);

            getPage(request, response);
            
            assertFindWasCalledWithPageId();
            assertSendWasCalledWith(pageData);
        });

        it('shall return error when retrieve page by id fails', function () {
            findSpy = sandbox.stub(Page, 'find').yields(error, null);

            getPage(request, response);
            
            assertFindWasCalledWithPageId();
            assertSendWasCalledWith(error);
        });
    });

    describe('getExamples', function () {

        beforeEach(function () {
            request = spy();
            response = {
                send: spy(),
                json: spy(),
                status:  createResponseWithStatusCode(500)
            };
        });

        afterEach(function () {
            sandbox.restore();
        });

        it('shall not retrieve examples when user retrieve failed', function () {
            userFindSpy = sandbox.stub(User, 'find').yields("error retrieving user", null);

            getExamples(request, response);
            
            assertFindUserWasCalledWithpeblioexamplesUser()
            assertSendWasCalledWith("error retrieving user");
        });

        it('shall not retrieve examples when Page retrieve failed', function () {
            userFindSpy = sandbox.stub(User, 'find').yields(null, users);
            findSpy = sandbox.stub(Page, 'find').yields("error retrieving page", null);

            getExamples(request, response);
            
            assertFindUserWasCalledWithpeblioexamplesUser();
            assertFindWasCalledWithUserId();
            assertSendWasCalledWith("error retrieving page");
        });

        it('shall retrieve examples for peblioexamples user', function () {
            userFindSpy = sandbox.stub(User, 'find').yields(null, users);
            findSpy = sandbox.stub(Page, 'find').yields(null, pageExamples);
            response.status = createResponseWithStatusCode(200);

            getExamples(request, response);
            
            assertFindUserWasCalledWithpeblioexamplesUser();
            assertFindWasCalledWithUserId();
            assertSendWasCalledWith(pageExamples);
        });
    });
});

function assertFindWasCalledWithPageId() {
    assert.calledOnce(findSpy);
    assert.calledWith(findSpy, { id: pageId });
}

function assertFindWasCalledWithUserId() {
    assert.calledOnce(findSpy);
    assert.calledWith(findSpy, { user: users[0]._id });
}

function assertFindUserWasCalledWithpeblioexamplesUser() {
    assert.calledOnce(userFindSpy);
    assert.calledWith(userFindSpy, { name: 'peblioexamples' });
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