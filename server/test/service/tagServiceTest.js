import { expect } from 'chai';
import { saveTag } from '../../src/service/tagService';
import { assert, spy } from 'sinon';
import Tag from '../../src/models/tag.js';
import * as tagCreator from '../../src/models/creator/tagCreator.js';
const sandbox = require('sinon').sandbox.create();
const name = "Java";
const tagRetrieveError = "error retrieving tag";
const tagSaveError = "error saving tag";
var findOneSpy;
var saveTagSpy;
var request;
var response;
var buildTagFromRequestSpy;

describe('tagService', function () {
    describe('saveTag', function () {

        beforeEach(function () {
            request = {
                body: {
                    name
                }
            };
            response = {
                send: spy(),
                json: spy(),
                status: createResponseWithStatusCode(200)
            };
            buildTagFromRequestSpy = sandbox.stub(tagCreator, 'buildTagFromRequest').returns(new Tag({ name }));
        });

        afterEach(function () {
            sandbox.restore();
        });

        it('shall return error if retrieving tag gives error', function () {
            response.status = createResponseWithStatusCode(500);
            findOneSpy = sandbox.stub(Tag, 'findOne').yields(tagRetrieveError, null);
            saveTagSpy = sandbox.stub(Tag.prototype, 'save').yields(null, null);

            saveTag(request, response);

            assertBuildTagFromRequestWasCalled();
            assertFindOneWasCalledWithTagName();
            assertSendWasCalledWith(tagRetrieveError);
            assert.notCalled(saveTagSpy);
        });

        it('shall return error if saving tag gives error', function () {
            response.status = createResponseWithStatusCode(500);
            findOneSpy = sandbox.stub(Tag, 'findOne').yields(null, null);
            saveTagSpy = sandbox.stub(Tag.prototype, 'save').yields(tagSaveError, null);

            saveTag(request, response);

            assertBuildTagFromRequestWasCalled();
            assertFindOneWasCalledWithTagName();
            assertSaveTagWasCalled();
            assertSendWasCalledWith(tagSaveError);
        });

        it('shall not save tag if name already exists', function () {
            findOneSpy = sandbox.stub(Tag, 'findOne').yields(null, { name });
            saveTagSpy = sandbox.stub(Tag.prototype, 'save').yields(null, null);

            saveTag(request, response);

            assertBuildTagFromRequestWasCalled();
            assertFindOneWasCalledWithTagName();
            assert.notCalled(saveTagSpy);
            assert.calledOnce(response.send);
        });

        it('shall save tag if name does not exists already', function () {
            findOneSpy = sandbox.stub(Tag, 'findOne').yields(null, null);
            saveTagSpy = sandbox.stub(Tag.prototype, 'save').yields(null, null);

            saveTag(request, response);

            assertBuildTagFromRequestWasCalled();
            assertFindOneWasCalledWithTagName();
            assertSaveTagWasCalled(saveTagSpy);
            assert.calledOnce(response.send);
        });
    });
});

function assertSendWasCalledWith(msg) {
    assert.calledOnce(response.send);
    assert.calledWith(response.send, msg);
};

function assertBuildTagFromRequestWasCalled() {
    assert.calledOnce(buildTagFromRequestSpy);
};

function assertFindOneWasCalledWithTagName() {
    assert.calledOnce(findOneSpy);
    assert.calledWith(findOneSpy, { name });
}

function assertSaveTagWasCalled() {
    assert.calledOnce(saveTagSpy);
}

function createResponseWithStatusCode(statusCode) {
    return function (responseStatus) {
        expect(responseStatus).to.be.equal(statusCode);
        return this;
    }
};