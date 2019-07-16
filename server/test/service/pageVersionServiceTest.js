import { assert, spy } from 'sinon';
import { ObjectId } from 'mongodb';
import { expect } from 'chai';
import { createResponseWithStatusCode, assertStubWasCalledOnceWith } from '../utils.js';
import { savePageVersion, get } from '../../src/service/pageVersionService';

const sinon = require('sinon');

const sandbox = sinon.sandbox.create();
const PageVersion = require('../../src/models/pageversion.js');

const tag = 'Java';

const pageData = {
  heading: 'Some heading',
  title: 'Some title',
  editors: 'Some editors',
  description: 'Some description',
  editorIndex: ' Some editorIndex',
  layout: 'A perfect layout',
  workspace: 'No workspace',
  tags: ['tag1', 'tag2'],
  id: '9NL7Svh1D',
};

let pageDataWithUser = {
  heading: 'Some heading',
  title: 'Some title',
  editors: 'Some editors',
  description: 'Some description',
  editorIndex: ' Some editorIndex',
  layout: 'A perfect layout',
  workspace: 'No workspace',
  tags: ['tag1', 'tag2'],
  id: '9NL7Svh1D',
  user: {
    _id: new ObjectId('506f1f77bcf86cd799439011')
  }
};
const folderId = 'somefolderId';
const pageId = 'pageId';
const error = { error: 'Could not retrieve page' };
const pageVersion = 'version';
const guestUser = {
  _id: 1
};
const loggedInUser = {
  _id: 2,
  pages: []
};
const pageUpdateUserObjectId = new ObjectId('506f1f77bcf86cd799439011');
const pageUpdateUser = {
  _id: pageUpdateUserObjectId
};
const newPageId = 3;
let findSpy;
let savePageVerionSpy;
let findOneUserSpy;
let request;
let response;
let findOneExecStub;
let findOnePageExecStub;
let findOnePageStub;
let updateUserSpy;
let updatePageSpy;
let updatePageExecStub;
let updatePageStub;
let folderCountStub;
let folderCountExecStub;
let buildPageForUpdateFromRequestStub;
let paginateSpy;
let findPageVerionStub;

describe('pageVersionService', () => {
  beforeEach(() => {
    pageDataWithUser = {
      heading: 'Some heading',
      title: 'Some title',
      editors: 'Some editors',
      description: 'Some description',
      editorIndex: ' Some editorIndex',
      layout: 'A perfect layout',
      workspace: 'No workspace',
      tags: ['tag1', 'tag2'],
      id: '9NL7Svh1D',
      user: {
        _id: pageUpdateUserObjectId
      }
    };
  });
  describe('savePageVersion', () => {
    beforeEach(() => {
      request = {
        user: loggedInUser,
        body: pageDataWithUser
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

    it('shall return unauthorized if user not present in request', async () => {
      response.status = createResponseWithStatusCode(403);
      savePageVerionSpy = sandbox.stub(PageVersion.prototype, 'save').returns(pageDataWithUser);

      await savePageVersion({}, response);

      assert.notCalled(savePageVerionSpy);
      assertSendWasCalledWith({ error: 'Please log in first' });
    });

    it('shall not save page version when body does not have id', async () => {
      response.status = createResponseWithStatusCode(200);
      request.body = {};
      savePageVerionSpy = sandbox.stub(PageVersion.prototype, 'save').returns(pageDataWithUser);

      await savePageVersion(request, response);

      assert.calledOnce(response.send);
      assert.notCalled(savePageVerionSpy);
    });

    it('shall save page version for logged in user', async () => {
      response.status = createResponseWithStatusCode(200);
      const execSpy = sandbox.stub().returns([pageDataWithUser]);
      const sortSpy = sandbox.stub().returns({ exec: execSpy });
      savePageVerionSpy = sandbox.stub(PageVersion.prototype, 'save').returns(Promise.resolve(pageDataWithUser));
      findPageVerionStub = sandbox.stub(PageVersion, 'find').returns({ sort: sortSpy });
      const deletePageVerionStub = sandbox.stub(PageVersion, 'deleteOne').returns({ sort: sortSpy });

      await savePageVersion(request, response);

      assert.calledOnce(response.send);
      assert.calledOnce(savePageVerionSpy);
      assert.notCalled(deletePageVerionStub);
    });

    it('shall save page version and delete oldest version for logged in user', async () => {
      response.status = createResponseWithStatusCode(200);
      const pageVersionDataArray = [];
      for (let i = 0; i < 16; i++) {
        pageVersionDataArray.push(pageDataWithUser);
      }
      const execSpy = sandbox.stub().returns(pageVersionDataArray);
      const sortSpy = sandbox.stub().returns({ exec: execSpy });
      savePageVerionSpy = sandbox.stub(PageVersion.prototype, 'save').returns(Promise.resolve(pageDataWithUser));
      findPageVerionStub = sandbox.stub(PageVersion, 'find').returns({ sort: sortSpy });
      const deletePageVerionStub = sandbox.stub(PageVersion, 'deleteOne').returns({ exec: execSpy });

      await savePageVersion(request, response);

      assert.calledOnce(response.send);
      assert.calledOnce(savePageVerionSpy);
      assert.calledOnce(deletePageVerionStub);
    });
  });
});

function assertSendWasCalledWith(msg) {
  assertStubWasCalledOnceWith(response.send, msg);
}
