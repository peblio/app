import { expect } from 'chai';
import { assert, spy } from 'sinon';
import { saveTag, getAllTags, getAllTagsStartingWith } from '../../src/service/tagService';
import Tag from '../../src/models/tag.js';
import * as tagCreator from '../../src/models/creator/tagCreator.js';

const sandbox = require('sinon').sandbox.create();
const name = "Java";
const tagRetrieveError = "error retrieving tag";
const tagSaveError = "error saving tag";

let findSpy;
let findOneSpy;
let saveTagSpy;
let request;
let response;
let buildTagFromRequestSpy;

describe('tagService', () => {
  describe('saveTag', () => {
    beforeEach(() => {
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

    afterEach(() => {
      sandbox.restore();
    });

    it('shall return error if retrieving tag gives error', () => {
      response.status = createResponseWithStatusCode(500);
      findOneSpy = sandbox.stub(Tag, 'findOne').yields(tagRetrieveError, null);
      saveTagSpy = sandbox.stub(Tag.prototype, 'save').yields(null, null);

      saveTag(request, response);

      assertBuildTagFromRequestWasCalled();
      assertFindOneWasCalledWithTagName();
      assertSendWasCalledWith(tagRetrieveError);
      assert.notCalled(saveTagSpy);
    });

    it('shall return error if saving tag gives error', () => {
      response.status = createResponseWithStatusCode(500);
      findOneSpy = sandbox.stub(Tag, 'findOne').yields(null, null);
      saveTagSpy = sandbox.stub(Tag.prototype, 'save').yields(tagSaveError, null);

      saveTag(request, response);

      assertBuildTagFromRequestWasCalled();
      assertFindOneWasCalledWithTagName();
      assertSaveTagWasCalled();
      assertSendWasCalledWith(tagSaveError);
    });

    it('shall not save tag if name already exists', () => {
      findOneSpy = sandbox.stub(Tag, 'findOne').yields(null, { name });
      saveTagSpy = sandbox.stub(Tag.prototype, 'save').yields(null, null);

      saveTag(request, response);

      assertBuildTagFromRequestWasCalled();
      assertFindOneWasCalledWithTagName();
      assert.notCalled(saveTagSpy);
      assert.calledOnce(response.send);
    });

    it('shall save tag if name does not exists already', () => {
      findOneSpy = sandbox.stub(Tag, 'findOne').yields(null, null);
      saveTagSpy = sandbox.stub(Tag.prototype, 'save').yields(null, null);

      saveTag(request, response);

      assertBuildTagFromRequestWasCalled();
      assertFindOneWasCalledWithTagName();
      assertSaveTagWasCalled(saveTagSpy);
      assert.calledOnce(response.send);
    });
  });

  describe('getAllTags', () => {
    beforeEach(() => {
      request = {};
      response = {
        send: spy(),
        json: spy(),
        status: createResponseWithStatusCode(200)
      };
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('shall return error if retrieving tag gives error', () => {
      response.status = createResponseWithStatusCode(500);
      findSpy = sandbox.stub(Tag, 'find').yields(tagRetrieveError, null);

      getAllTags(request, response);

      assertFindWasCalled();
      assertSendWasCalledWith(tagRetrieveError);
    });

    it('shall retrieve all tags', () => {
      const tags = [new Tag({ name: 'Java' }), new Tag({ name: 'C#' })];
      findSpy = sandbox.stub(Tag, 'find').yields(null, tags);

      getAllTags(request, response);

      assertFindWasCalled();
      assertSendWasCalledWith(tags);
    });
  });

  describe('getAllTagsStartingWith', () => {
    beforeEach(() => {
      request = {
        params: {
          tagPrefix: 'Jav'
        }
      };
      response = {
        send: spy(),
        json: spy(),
        status: createResponseWithStatusCode(200)
      };
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('shall return error if retrieving tag gives error', () => {
      response.status = createResponseWithStatusCode(500);
      findSpy = sandbox.stub(Tag, 'find').yields(tagRetrieveError, null);

      getAllTagsStartingWith(request, response);

      assertFindWasCalledWithRegex();
      assertSendWasCalledWith(tagRetrieveError);
    });

    it('shall retrieve all tags', () => {
      const tags = [new Tag({ name: 'Java' }), new Tag({ name: 'Java8' })];
      findSpy = sandbox.stub(Tag, 'find').yields(null, tags);

      getAllTagsStartingWith(request, response);

      assertFindWasCalledWithRegex();
      assertSendWasCalledWith(tags);
    });
  });
});

function assertSendWasCalledWith(msg) {
  assert.calledOnce(response.send);
  assert.calledWith(response.send, msg);
}

function assertFindWasCalled() {
  assert.calledOnce(findSpy);
}

function assertFindWasCalledWithRegex() {
  assert.calledOnce(findSpy);
  assert.calledWith(findSpy, {
    name: {
      $regex: '^Jav'
    }
  });
}

function assertBuildTagFromRequestWasCalled() {
  assert.calledOnce(buildTagFromRequestSpy);
}

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
  };
}
