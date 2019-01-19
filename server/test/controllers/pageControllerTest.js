import { createResponseWithStatusCode } from './utils.js';
import { getPage, getPagesWithTag, savePageAsGuest } from '../../src/controllers/pageControllerNew';
import { assert, spy } from 'sinon';

const sandbox = require('sinon').sandbox.create();
const Page = require('../../src/models/page.js');
const User = require('../../src/models/user.js');
const tag = "Java";

const pageData = {
    data: 'SomePageData'
};
const pageId = 'pageId';
const error = { error: 'Could not retrieve page' };
const guestUser = {
    _id: 1
};

let findSpy;
let savePageSpy;
let findOneUserSpy;
let request;
let response;
let execStub;

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
            execStub = sandbox.stub().throws({ message: "peblioguest user not found" });
            findOneUserSpy = sandbox.stub(User, 'findOne').returns({ exec: execStub });
            savePageSpy = sandbox.stub(Page.prototype, 'save').throws({ message: "Could not save Page as guest" });

            await savePageAsGuest(request, response);

            assert.calledOnce(findOneUserSpy);
            assert.calledOnce(execStub);
            assert.notCalled(savePageSpy);
            assertSendWasCalledWith({ error: "peblioguest user not found" });
        });

        it('shall return error when saving page errors page by id', async function () {
            response.status = createResponseWithStatusCode(500);
            execStub = sandbox.stub().returns(guestUser);
            findOneUserSpy = sandbox.stub(User, 'findOne').returns({ exec: execStub });
            savePageSpy = sandbox.stub(Page.prototype, 'save').throws({ message: "Could not save Page as guest" });

            await savePageAsGuest(request, response);

            assert.calledOnce(findOneUserSpy);
            assert.calledOnce(execStub);
            assert.calledOnce(savePageSpy);
            assertSendWasCalledWith({ error: "Could not save Page as guest" });
        });

        it('shall save page as guest', async function () {
            execStub = sandbox.stub().returns(guestUser);
            findOneUserSpy = sandbox.stub(User, 'findOne').returns({ exec: execStub });
            savePageSpy = sandbox.stub(Page.prototype, 'save').returns(pageData);

            await savePageAsGuest(request, response);

            assert.calledOnce(findOneUserSpy);
            assert.calledOnce(execStub);
            assert.calledOnce(savePageSpy);
            assertSendWasCalledWith({ page: pageData });
        });

    });

});

function assertFindWasCalledWithPageId() {
    assert.calledOnce(findSpy);
    assert.calledWith(findSpy, { id: pageId });
}

function assertFindWasCalledWithTag() {
    assert.calledOnce(findSpy);
    assert.calledWith(findSpy, { tags: tag });
}

function assertSendWasCalledWith(msg) {
    assert.calledOnce(response.send);
    assert.calledWith(response.send, msg);
};