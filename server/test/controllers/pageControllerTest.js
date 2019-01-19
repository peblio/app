import { createResponseWithStatusCode } from './utils.js';
import { getPage, getPagesWithTag, savePageAsGuest, savePage, deletePage } from '../../src/controllers/pageControllerNew';
import { assert, spy } from 'sinon';

const sandbox = require('sinon').sandbox.create();
const Page = require('../../src/models/page.js');
const User = require('../../src/models/user.js');
const tag = "Java";

const pageData = {
    data: 'SomePageData',
};
const pageId = 'pageId';
const error = { error: 'Could not retrieve page' };
const guestUser = {
    _id: 1
};
const loggedInUser = {
    _id: 2,
    pages: []
};
const newPageId = 3;
let findSpy;
let savePageSpy;
let findOneUserSpy;
let request;
let response;
let findOneExecStub;
let updateUserSpy;
let updateUserExecStub;
let deleteOnePageSpy;

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
                json: spy(),
                status: createResponseWithStatusCode(200)
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
            response.status = createResponseWithStatusCode(500);
            findSpy = sandbox.stub(Page, 'find').yields(error, null);

            getPage(request, response);

            assertFindWasCalledWithPageId();
            assertSendWasCalledWith(error);
        });
    });

    describe('getPagesWithTag', function () {

        beforeEach(function () {
            request = {
                query: {
                    tag
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

        it('shall retrieve page by id', () => {
            findSpy = sandbox.stub(Page, 'find').yields(null, pageData);

            getPagesWithTag(request, response);

            assertFindWasCalledWithTag();
            assertSendWasCalledWith(pageData);
        });

        it('shall return error when retrieve page by id fails', function () {
            response.status = createResponseWithStatusCode(500);
            findSpy = sandbox.stub(Page, 'find').yields(error, null);

            getPagesWithTag(request, response);

            assertFindWasCalledWithTag();
            assertSendWasCalledWith(error);
        });
    });

    describe('savePageAsGuest', function () {

        beforeEach(function () {
            request = {
                query: {
                    tag
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

        it('shall return error if peblioguest user not found', async function () {
            response.status = createResponseWithStatusCode(500);
            findOneExecStub = sandbox.stub().throws({ message: "peblioguest user not found" });
            findOneUserSpy = sandbox.stub(User, 'findOne').returns({ exec: findOneExecStub });
            savePageSpy = sandbox.stub(Page.prototype, 'save').throws({ message: "Could not save Page as guest" });

            await savePageAsGuest(request, response);

            assertFindOneUserWasCalledWithName();
            assert.calledOnce(findOneExecStub);
            assert.notCalled(savePageSpy);
            assertSendWasCalledWith({ error: "peblioguest user not found" });
        });

        it('shall return error when saving page errors page by id', async function () {
            response.status = createResponseWithStatusCode(500);
            findOneExecStub = sandbox.stub().returns(guestUser);
            findOneUserSpy = sandbox.stub(User, 'findOne').returns({ exec: findOneExecStub });
            savePageSpy = sandbox.stub(Page.prototype, 'save').throws({ message: "Could not save Page as guest" });

            await savePageAsGuest(request, response);

            assertFindOneUserWasCalledWithName();
            assert.calledOnce(findOneExecStub);
            assert.calledOnce(savePageSpy);
            assertSendWasCalledWith({ error: "Could not save Page as guest" });
        });

        it('shall save page as guest', async function () {
            findOneExecStub = sandbox.stub().returns(guestUser);
            findOneUserSpy = sandbox.stub(User, 'findOne').returns({ exec: findOneExecStub });
            savePageSpy = sandbox.stub(Page.prototype, 'save').returns(pageData);

            await savePageAsGuest(request, response);

            assertFindOneUserWasCalledWithName();
            assert.calledOnce(findOneExecStub);
            assert.calledOnce(savePageSpy);
            assertSendWasCalledWith({ page: pageData });
        });

    });

    describe('savePage', function () {

        beforeEach(function () {
            request = {
                user: loggedInUser,
                body: {
                    id: newPageId
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

        it('shall return unauthorized if user not present in request', async function () {
            response.status = createResponseWithStatusCode(403);
            savePageSpy = sandbox.stub(Page.prototype, 'save').returns(pageData);

            await savePage({}, response);

            assert.notCalled(savePageSpy);
            assertSendWasCalledWith({ error: 'Please log in first' });
        });

        it('shall return error if user not found', async function () {
            response.status = createResponseWithStatusCode(500);
            findOneExecStub = sandbox.stub().throws({ message: "Could not find user" });
            findOneUserSpy = sandbox.stub(User, 'findOne').returns({ exec: findOneExecStub });
            savePageSpy = sandbox.stub(Page.prototype, 'save').returns(pageData);

            await savePage(request, response);

            assert.calledOnce(findOneExecStub);
            assertFindOneUserWasCalledWithId();
            assert.notCalled(savePageSpy);
            assertSendWasCalledWith({ error: "Could not find user" });
        });

        it('shall return error if updating while adding pageId to user fails', async function () {
            response.status = createResponseWithStatusCode(500);
            findOneExecStub = sandbox.stub().returns(loggedInUser);
            findOneUserSpy = sandbox.stub(User, 'findOne').returns({ exec: findOneExecStub });
            updateUserExecStub = sandbox.stub().throws({ message: "Could not update user with pageId" });
            updateUserSpy = sandbox.stub(User, 'update').returns({ exec: updateUserExecStub });
            savePageSpy = sandbox.stub(Page.prototype, 'save').returns(pageData);

            await savePage(request, response);

            assert.calledOnce(findOneExecStub);
            assertFindOneUserWasCalledWithId();
            assert.calledOnce(updateUserExecStub);
            assertUpdateUserWasCalledWithPageId();
            assert.notCalled(savePageSpy);
            assertSendWasCalledWith({ error: "Could not update user with pageId" });
        });

        it('shall return error if saving page fails', async function () {
            response.status = createResponseWithStatusCode(500);
            findOneExecStub = sandbox.stub().returns(loggedInUser);
            findOneUserSpy = sandbox.stub(User, 'findOne').returns({ exec: findOneExecStub });
            updateUserExecStub = sandbox.stub();
            updateUserSpy = sandbox.stub(User, 'update').returns({ exec: updateUserExecStub });
            savePageSpy = sandbox.stub(Page.prototype, 'save').throws({ message: "Error saving page" });

            await savePage(request, response);

            assert.calledOnce(findOneExecStub);
            assertFindOneUserWasCalledWithId();
            assert.calledOnce(updateUserExecStub);
            assertUpdateUserWasCalledWithPageId();
            assert.calledOnce(savePageSpy);
            assertSendWasCalledWith({ error: "Error saving page" });
        });

        it('shall save page for logged in user', async function () {
            findOneExecStub = sandbox.stub().returns(loggedInUser);
            findOneUserSpy = sandbox.stub(User, 'findOne').returns({ exec: findOneExecStub });
            updateUserExecStub = sandbox.stub();
            updateUserSpy = sandbox.stub(User, 'update').returns({ exec: updateUserExecStub });
            savePageSpy = sandbox.stub(Page.prototype, 'save').returns(pageData);

            await savePage(request, response);

            assert.calledOnce(findOneExecStub);
            assertFindOneUserWasCalledWithId();
            assert.calledOnce(updateUserExecStub);
            assertUpdateUserWasCalledWithPageId();
            assert.calledOnce(savePageSpy);
            assertSendWasCalledWith({ page: pageData });
        });

    });

    describe('deletePage', function () {

        beforeEach(function () {
            request = {
                params: {
                    pageId: newPageId
                }
            };
            response = {
                send: spy(),
                json: spy(),
                status: createResponseWithStatusCode(200),
                sendStatus: createResponseWithStatusCode(200)
            };
        });

        afterEach(function () {
            sandbox.restore();
        });

        it('shall return error is deleting page fails', async function () {
            response.status = createResponseWithStatusCode(500);
            deleteOnePageSpy = sandbox.stub(Page, 'deleteOne').throws({ message: "Could not delete page" });

            await deletePage(request, response);

            assertDeleteOnePageWasCalledWithPageId();
            assertSendWasCalledWith({ error: 'Could not delete page' });
        });

        it('shall return success after page is deleted', async function () {
            response.sendStatus = createResponseWithStatusCode(204);
            deleteOnePageSpy = sandbox.stub(Page, 'deleteOne');

            await deletePage(request, response);

            assertDeleteOnePageWasCalledWithPageId();
            assert.notCalled(response.send);
        });

    });

});

function assertFindWasCalledWithPageId() {
    assert.calledOnce(findSpy);
    assert.calledWith(findSpy, { id: pageId });
}

function assertDeleteOnePageWasCalledWithPageId() {
    assert.calledOnce(deleteOnePageSpy);
    assert.calledWith(deleteOnePageSpy, { _id: newPageId });
}

function assertUpdateUserWasCalledWithPageId() {
    assert.calledOnce(updateUserSpy);
    assert.calledWith(updateUserSpy, { _id: loggedInUser._id }, { pages: [request.body.id] });
}

function assertFindWasCalledWithTag() {
    assert.calledOnce(findSpy);
    assert.calledWith(findSpy, { tags: tag });
}

function assertSendWasCalledWith(msg) {
    assert.calledOnce(response.send);
    assert.calledWith(response.send, msg);
};

function assertFindOneUserWasCalledWithName() {
    assert.calledOnce(findOneUserSpy);
    assert.calledWith(findOneUserSpy, { name: 'peblioguest' });
};

function assertFindOneUserWasCalledWithId() {
    assert.calledOnce(findOneUserSpy);
    assert.calledWith(findOneUserSpy, { _id: loggedInUser._id });
};

