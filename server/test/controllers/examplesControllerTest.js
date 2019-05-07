import { createResponseWithStatusCode, assertStubWasCalledOnceWith } from '../utils';
import { getExamples } from '../../src/controllers/examplesController';
import { assert, spy } from 'sinon';
const sandbox = require('sinon').sandbox.create();
const Page = require('../../src/models/page.js');
const User = require('../../src/models/user.js');
const users = [{ _id: 1 }];
const pageExamples = new Object();
var findSpy;
var userFindSpy;
var request;
var response;

describe('examplesController', function () {
    describe('getExamples', function () {

        beforeEach(function () {
            request = spy();
            response = {
                send: spy(),
                json: spy(),
                status: createResponseWithStatusCode(500)
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

function assertFindWasCalledWithUserId() {
    assertStubWasCalledOnceWith(findSpy, { user: users[0]._id });
}

function assertFindUserWasCalledWithpeblioexamplesUser() {
    assertStubWasCalledOnceWith(userFindSpy, { name: 'peblioexamples' });
}

function assertSendWasCalledWith(msg) {
    assertStubWasCalledOnceWith(response.send, msg);
};