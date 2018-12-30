import { getPage } from '../../src/controllers/pageControllerNew';
import { assert, spy } from 'sinon';
const sandbox = require('sinon').sandbox.create();
const Page = require('../../src/models/page.js');
var findSpy;
var request;
var response;
const pageData = {
    data: "SomePageData"
};
const pageId = "pageId";
const error = {error: 'Could not retrieve page'};

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
});

function assertFindWasCalledWithPageId() {
    assert.calledOnce(findSpy);
    assert.calledWith(findSpy, { id: pageId });
}

function assertSendWasCalledWith(msg) {
    assert.calledOnce(response.send);
    assert.calledWith(response.send, msg);
};