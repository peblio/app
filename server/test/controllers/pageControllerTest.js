import { createResponseWithStatusCode } from './utils.js';
import { getPage, getPagesWithTag } from '../../src/controllers/pageControllerNew';
import { assert, spy } from 'sinon';

const sandbox = require('sinon').sandbox.create();
const Page = require('../../src/models/page.js');
const tag = "Java";

const pageData = {
    data: 'SomePageData'
};
const pageId = 'pageId';
const error = { error: 'Could not retrieve page' };

let findSpy;
let request;
let response;

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
});

function assertFindWasCalledWithPageId() {
    assert.calledOnce(findSpy);
    assert.calledWith(findSpy, { id: pageId });
}

function assertFindWasCalledWithTag() {
    assert.calledOnce(findSpy);
    assert.calledWith(findSpy, { tags: tag});
}

function assertSendWasCalledWith(msg) {
    assert.calledOnce(response.send);
    assert.calledWith(response.send, msg);
};