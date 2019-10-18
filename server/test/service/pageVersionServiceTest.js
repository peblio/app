import { assert, spy } from 'sinon';
import { ObjectId } from 'mongodb';
import { createResponseWithStatusCode, assertStubWasCalledOnceWith } from '../utils.js';
import { savePageVersion, get } from '../../src/service/pageVersionService';

const sinon = require('sinon');

const sandbox = sinon.sandbox.create();
const PageVersion = require('../../src/models/pageversion.js');
const Page = require('../../src/models/page.js');

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
const pageVersion = 'version';
const loggedInUser = {
  _id: 2,
  pages: []
};
const pageUpdateUserObjectId = new ObjectId('506f1f77bcf86cd799439011');
let trashedPageDataWithUser;
let deletedPageDataWithUser;
let findPageSpy;
let savePageVerionSpy;
let findPageExecSpy;
let findPageVerionSpy;
let request;
let response;
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
    trashedPageDataWithUser = Object.assign({}, pageDataWithUser);
    trashedPageDataWithUser.trashedAt = new Date();
    deletedPageDataWithUser = Object.assign({}, pageDataWithUser);
    deletedPageDataWithUser.deletedAt = new Date();
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

  describe('get', () => {
    beforeEach(() => {
      request = {
        user: loggedInUser,
        query: {
          id: pageDataWithUser.id
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

    it('shall return unauthorized if user not present in request', async () => {
      response.status = createResponseWithStatusCode(403);
      findPageVerionSpy = sandbox.stub(PageVersion, 'find');

      await get({}, response);

      assert.notCalled(findPageVerionSpy);
      assertSendWasCalledWith({ error: 'Please log in first' });
    });

    it('shall not get page version if page does not exist', async () => {
      response.status = createResponseWithStatusCode(404);
      findPageExecSpy = sandbox.stub().returns(null);
      findPageSpy = sandbox.stub(Page, 'findOne').returns({ exec: findPageExecSpy });
      findPageVerionSpy = sandbox.stub(PageVersion, 'find');

      await get(request, response);

      assert.calledOnce(response.send);
      assertStubWasCalledOnceWith(findPageSpy, { id: pageDataWithUser.id });
      assert.notCalled(findPageVerionSpy);
    });

    it('shall not get page version if page is trashed', async () => {
      response.status = createResponseWithStatusCode(404);
      findPageExecSpy = sandbox.stub().returns(trashedPageDataWithUser);
      findPageSpy = sandbox.stub(Page, 'findOne').returns({ exec: findPageExecSpy });
      findPageVerionSpy = sandbox.stub(PageVersion, 'find');

      await get(request, response);

      assert.calledOnce(response.send);
      assertStubWasCalledOnceWith(findPageSpy, { id: pageDataWithUser.id });
      assert.notCalled(findPageVerionSpy);
    });

    it('shall not get page version if page is deleted', async () => {
      response.status = createResponseWithStatusCode(404);
      findPageExecSpy = sandbox.stub().returns(deletedPageDataWithUser);
      findPageSpy = sandbox.stub(Page, 'findOne').returns({ exec: findPageExecSpy });
      findPageVerionSpy = sandbox.stub(PageVersion, 'find');

      await get(request, response);

      assert.calledOnce(response.send);
      assertStubWasCalledOnceWith(findPageSpy, { id: pageDataWithUser.id });
      assert.notCalled(findPageVerionSpy);
    });

    it('shall get all pageVersions for page', async () => {
      response.status = createResponseWithStatusCode(200);
      findPageExecSpy = sandbox.stub().returns(pageDataWithUser);
      findPageSpy = sandbox.stub(Page, 'findOne').returns({ exec: findPageExecSpy });
      const pageVersionDataArray = [];
      for (let i = 0; i < 16; i++) {
        pageVersionDataArray.push(pageDataWithUser);
      }
      const execSpy = sandbox.stub().returns(pageVersionDataArray);
      const sortSpy = sandbox.stub().returns({ exec: execSpy });
      findPageVerionStub = sandbox.stub(PageVersion, 'find').returns({ sort: sortSpy });

      await get(request, response);

      assert.calledOnce(response.send);
      assertStubWasCalledOnceWith(findPageSpy, { id: pageDataWithUser.id });
      assertStubWasCalledOnceWith(findPageVerionStub, { id: pageDataWithUser.id });
      assert.calledOnce(findPageExecSpy);
      assert.calledOnce(execSpy);
      assertStubWasCalledOnceWith(sortSpy, [['createdAt']]);
    });

    it('shall get only required version of page', async () => {
      response.status = createResponseWithStatusCode(200);
      request.query.version = pageVersion;
      findPageExecSpy = sandbox.stub().returns(pageDataWithUser);
      findPageSpy = sandbox.stub(Page, 'findOne').returns({ exec: findPageExecSpy });
      const execSpy = sandbox.stub().returns(pageDataWithUser);
      findPageVerionStub = sandbox.stub(PageVersion, 'find').returns({ exec: execSpy });

      await get(request, response);

      assert.calledOnce(response.send);
      assertStubWasCalledOnceWith(findPageSpy, { id: pageDataWithUser.id });
      assertStubWasCalledOnceWith(findPageVerionStub, { id: pageDataWithUser.id, version_id: pageVersion });
      assert.calledOnce(findPageExecSpy);
      assert.calledOnce(execSpy);
    });
  });
});

function assertSendWasCalledWith(msg) {
  assertStubWasCalledOnceWith(response.send, msg);
}
