import { assert, spy } from 'sinon';
import { ObjectId } from 'mongodb';

import { createResponseWithStatusCode, assertStubWasCalledOnceWith } from '../utils.js';
import { getPage, getPagesWithTag, savePageAsGuest, savePage, deletePage, updatePage, movePage, uploadPageSnapshotToS3ServiceStub } from '../../src/service/pageService';
import * as pageCreator from '../../src/models/creator/pageCreator';

const sinon = require('sinon');

const sandbox = sinon.sandbox.create();
const mockAWSSinon = require('mock-aws-sinon');
const Page = require('../../src/models/page.js');
const User = require('../../src/models/user.js');
const Folder = require('../../src/models/folder.js');

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
  id: '9NL7Svh1D'
};
const folderId = 'somefolderId';
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
let findOnePageExecStub;
let findOnePageStub;
let updateUserSpy;
let updateUserExecStub;
let updatePageSpy;
let folderCountStub;
let folderCountExecStub;
let buildPageForUpdateFromRequestStub;
let paginateSpy;

describe('pageService', () => {
  describe('uploadPageSnapshotToS3ServiceStub', () => {
    beforeEach(() => {
      request = {
        body: {
          id: pageId,
          image: 'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
        }
      };
      response = {
        send: spy(),
        json: spy(),
        status: createResponseWithStatusCode(200),
        sendStatus: createResponseWithStatusCode(200)
      };
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('shall return error if image could not be deleted from s3', async () => {
      // TODO add test
    });
  });

  describe('getPage', () => {
    beforeEach(() => {
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

    afterEach(() => {
      sandbox.restore();
    });

    it('shall retrieve page by id', () => {
      findSpy = sandbox.stub(Page, 'find').yields(null, [pageData]);

      getPage(request, response);

      assertFindWasCalledWithPageId();
      assertSendWasCalledWith([pageData]);
    });

    it('shall return error when retrieve page by id fails', () => {
      response.status = createResponseWithStatusCode(500);
      findSpy = sandbox.stub(Page, 'find').yields(error, null);

      getPage(request, response);

      assertFindWasCalledWithPageId();
      assertSendWasCalledWith(error);
    });

    it('shall return 404 when page not found', () => {
      response.status = createResponseWithStatusCode(404);
      findSpy = sandbox.stub(Page, 'find').yields(null, null);

      getPage(request, response);

      assertFindWasCalledWithPageId();
      assert.calledOnce(response.send);
    });
  });

  describe('getPagesWithTag', () => {
    beforeEach(() => {
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

    afterEach(() => {
      sandbox.restore();
    });

    it('shall retrieve pages for tag and default pagination parameters', () => {
      paginateSpy = sandbox.stub(Page, 'paginate').yields(null, pageData);

      getPagesWithTag(request, response);

      assertPaginateWasCalledWithTag();
      assertSendWasCalledWith(pageData);
    });

    it('shall retrieve pages for tag with limit, offset and sort from query', () => {
      request = {
        query: {
          tag,
          offset: 7,
          limit: 13,
          sort: 'heading'
        }
      };
      paginateSpy = sandbox.stub(Page, 'paginate').yields(null, pageData);

      getPagesWithTag(request, response);

      assertPaginateWasCalledWithTagOffsetLimit(request.query.offset, request.query.limit, request.query.sort);
      assertSendWasCalledWith(pageData);
    });

    it('shall return error when retrieve page by id fails', () => {
      response.status = createResponseWithStatusCode(500);
      paginateSpy = sandbox.stub(Page, 'paginate').yields(error, null);

      getPagesWithTag(request, response);

      assertPaginateWasCalledWithTag();
      assertSendWasCalledWith(error);
    });
  });

  describe('savePageAsGuest', () => {
    beforeEach(() => {
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

    afterEach(() => {
      sandbox.restore();
    });

    it('shall return error if peblioguest user not found', async () => {
      response.status = createResponseWithStatusCode(500);
      findOneExecStub = sandbox.stub().throws({ message: 'peblioguest user not found' });
      findOneUserSpy = sandbox.stub(User, 'findOne').returns({ exec: findOneExecStub });
      savePageSpy = sandbox.stub(Page.prototype, 'save').throws({ message: 'Could not save Page as guest' });

      await savePageAsGuest(request, response);

      assertFindOneUserWasCalledWithName();
      assert.calledOnce(findOneExecStub);
      assert.notCalled(savePageSpy);
      assertSendWasCalledWith({ error: 'peblioguest user not found' });
    });

    it('shall return error when saving page errors page by id', async () => {
      response.status = createResponseWithStatusCode(500);
      findOneExecStub = sandbox.stub().returns(guestUser);
      findOneUserSpy = sandbox.stub(User, 'findOne').returns({ exec: findOneExecStub });
      savePageSpy = sandbox.stub(Page.prototype, 'save').throws({ message: 'Could not save Page as guest' });

      await savePageAsGuest(request, response);

      assertFindOneUserWasCalledWithName();
      assert.calledOnce(findOneExecStub);
      assert.calledOnce(savePageSpy);
      assertSendWasCalledWith({ error: 'Could not save Page as guest' });
    });

    it('shall save page as guest', async () => {
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

  describe('savePage', () => {
    beforeEach(() => {
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

    afterEach(() => {
      sandbox.restore();
    });

    it('shall return unauthorized if user not present in request', async () => {
      response.status = createResponseWithStatusCode(403);
      savePageSpy = sandbox.stub(Page.prototype, 'save').returns(pageData);

      await savePage({}, response);

      assert.notCalled(savePageSpy);
      assertSendWasCalledWith({ error: 'Please log in first' });
    });

    it('shall return error if saving page fails', async () => {
      response.status = createResponseWithStatusCode(500);
      savePageSpy = sandbox.stub(Page.prototype, 'save').throws({ message: 'Error saving page' });

      await savePage(request, response);

      assert.calledOnce(savePageSpy);
      assertSendWasCalledWith({ error: 'Error saving page' });
    });

    it('shall save page for logged in user', async () => {
      savePageSpy = sandbox.stub(Page.prototype, 'save').returns(pageData);

      await savePage(request, response);

      assert.calledOnce(savePageSpy);
      assertSendWasCalledWith({ page: pageData });
    });
  });

  describe('deletePage', () => {
    beforeEach(() => {
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

    afterEach(() => {
      sandbox.restore();
    });

    it('shall return error is deleting page fails', async () => {
      response.status = createResponseWithStatusCode(500);
      updatePageSpy = sandbox.stub(Page, 'update').throws({ message: 'Could not delete page' });

      await deletePage(request, response);

      assertPageWasUpdatedWithDeletedAtDetails();
      assertSendWasCalledWith({ error: 'Could not delete page' });
    });

    it('shall return success after page is deleted', async () => {
      response.sendStatus = createResponseWithStatusCode(204);
      updatePageSpy = sandbox.stub(Page, 'update');

      await deletePage(request, response);

      assertPageWasUpdatedWithDeletedAtDetails();
      assert.notCalled(response.send);
    });
  });

  describe('updatePage', () => {
    beforeEach(() => {
      request = {
        body: { ...pageData },
        user: loggedInUser
      };
      response = {
        send: spy(),
        json: spy(),
        status: createResponseWithStatusCode(200),
      };
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('shall return 403 error when request is unauthrorized', async () => {
      request.user = null;
      response.status = createResponseWithStatusCode(403);
      buildPageForUpdateFromRequestStub = sandbox.stub(pageCreator, 'buildPageForUpdateFromRequest').returns(pageData);

      await updatePage(request, response);

      assert.notCalled(buildPageForUpdateFromRequestStub);
      assertSendWasCalledWith({ error: 'Please log in first' });
    });

    it('shall return error when retrieval of page to be updated threw an error', async () => {
      response.status = createResponseWithStatusCode(500);
      buildPageForUpdateFromRequestStub = sandbox.stub(pageCreator, 'buildPageForUpdateFromRequest').returns(pageData);
      findOnePageStub = sandbox.stub(Page, 'findOne').yields({ message: 'Could not update page' }, null);

      await updatePage(request, response);

      assert.calledOnce(buildPageForUpdateFromRequestStub);
      assertFindOnePageWasCalledWithPageId();
      assertSendWasCalledWith({ error: 'Could not retrieve page!' });
    });

    it('shall return error when page to be updated was not found', async () => {
      response.status = createResponseWithStatusCode(500);
      buildPageForUpdateFromRequestStub = sandbox.stub(pageCreator, 'buildPageForUpdateFromRequest').returns(pageData);
      findOnePageStub = sandbox.stub(Page, 'findOne').yields(null, null);

      await updatePage(request, response);

      assert.calledOnce(buildPageForUpdateFromRequestStub);
      assertFindOnePageWasCalledWithPageId();
      assertSendWasCalledWith({ error: 'Could not retrieve page!' });
    });

    it('shall return error when page to be updated does not have user', async () => {
      response.status = createResponseWithStatusCode(500);
      buildPageForUpdateFromRequestStub = sandbox.stub(pageCreator, 'buildPageForUpdateFromRequest').returns(pageData);
      findOnePageStub = sandbox.stub(Page, 'findOne').yields(null, pageData);

      await updatePage(request, response);

      assert.calledOnce(buildPageForUpdateFromRequestStub);
      assertFindOnePageWasCalledWithPageId();
      assertSendWasCalledWith({ error: 'Could not retrieve page!' });
    });

    it('shall return unauthorized error when page to be updated is not owned by user trying to update it', async () => {
      pageData.user = ObjectId('507f1f77bcf86cd799439011');
      response.status = createResponseWithStatusCode(403);
      buildPageForUpdateFromRequestStub = sandbox.stub(pageCreator, 'buildPageForUpdateFromRequest').returns(pageData);
      findOnePageStub = sandbox.stub(Page, 'findOne').yields(null, pageData);

      await updatePage(request, response);

      assert.calledOnce(buildPageForUpdateFromRequestStub);
      assertFindOnePageWasCalledWithPageId();
      assertSendWasCalledWith({ error: 'Missing permission to update page' });
    });

    it('shall return error if updating page fails', async () => {
      pageData.user = loggedInUser._id;
      response.status = createResponseWithStatusCode(500);
      buildPageForUpdateFromRequestStub = sandbox.stub(pageCreator, 'buildPageForUpdateFromRequest').returns(pageData);
      findOnePageStub = sandbox.stub(Page, 'findOne').yields(null, pageData);
      updatePageSpy = sandbox.stub(Page, 'update').yields({ message: 'Could not update page' }, null);

      await updatePage(request, response);

      assertFindOnePageWasCalledWithPageId();
      assertUpdatePageWasCalledWithLatestPageData();
      assert.calledOnce(buildPageForUpdateFromRequestStub);
      assertSendWasCalledWith({ message: 'Could not update page' });
    });

    it('shall return success after updating page', async () => {
      pageData.user = loggedInUser._id;
      updatePageSpy = sandbox.stub(Page, 'update').yields(null, pageData);
      buildPageForUpdateFromRequestStub = sandbox.stub(pageCreator, 'buildPageForUpdateFromRequest').returns(pageData);
      findOnePageStub = sandbox.stub(Page, 'findOne').yields(null, pageData);

      await updatePage(request, response);

      assertFindOnePageWasCalledWithPageId();
      assertUpdatePageWasCalledWithLatestPageData();
      assert.calledOnce(buildPageForUpdateFromRequestStub);
      assert.calledOnce(response.send);
    });
  });

  describe('movePage', () => {
    beforeEach(() => {
      request = {
        user: loggedInUser,
        body: {
          folderId
        },
        params: {
          pageId
        }
      };
      response = {
        send: spy(),
        json: spy(),
        status: createResponseWithStatusCode(200),
        sendStatus: createResponseWithStatusCode(200)
      };
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('shall return error if request not authenticated', async () => {
      response.status = createResponseWithStatusCode(403);
      savePageSpy = sandbox.stub(Page.prototype, 'save');

      await movePage({}, response);

      assert.notCalled(savePageSpy);
      assertSendWasCalledWith({ error: 'Please log in first' });
    });

    it('shall return 400 if no body', async () => {
      response.sendStatus = createResponseWithStatusCode(400);
      savePageSpy = sandbox.stub(Page.prototype, 'save');

      await movePage({ user: loggedInUser }, response);

      assert.notCalled(savePageSpy);
      assert.notCalled(response.send);
    });

    it('shall return error if page not found', async () => {
      response.status = createResponseWithStatusCode(500);
      findOnePageExecStub = sandbox.stub().throws({ message: 'Could not find page' });
      findOnePageStub = sandbox.stub(Page, 'findOne').returns({ exec: findOnePageExecStub });
      savePageSpy = sandbox.stub(Page.prototype, 'save');

      await movePage(request, response);

      assert.notCalled(savePageSpy);
      assertSendWasCalledWith({ error: 'Could not find page' });
      assertFindOnePageWasCalledWithId();
    });

    it('shall return 404 if page not found', async () => {
      response.status = createResponseWithStatusCode(404);
      findOnePageExecStub = sandbox.stub().returns(null);
      findOnePageStub = sandbox.stub(Page, 'findOne').returns({ exec: findOnePageExecStub });
      savePageSpy = sandbox.stub(Page.prototype, 'save');

      await movePage(request, response);

      assert.notCalled(savePageSpy);
      assertSendWasCalledWith({ error: `Page with id ${pageId} not found` });
      assertFindOnePageWasCalledWithId();
    });

    it('shall return error if retrieve folder gives error', async () => {
      response.status = createResponseWithStatusCode(500);
      findOnePageExecStub = sandbox.stub().returns(pageData);
      findOnePageStub = sandbox.stub(Page, 'findOne').returns({ exec: findOnePageExecStub });
      folderCountExecStub = sandbox.stub().throws({ message: 'Folder not found' });
      folderCountStub = sandbox.stub(Folder, 'count').returns({ exec: folderCountExecStub });
      savePageSpy = sandbox.stub(Page.prototype, 'save');

      await movePage(request, response);

      assert.notCalled(savePageSpy);
      assertSendWasCalledWith({ error: 'Folder not found' });
      assertFindOnePageWasCalledWithId();
      assert.calledOnce(folderCountExecStub);
      assertFolderCountWasCalledWithFolderId();
    });

    it('shall return 404 if folder not found', async () => {
      response.status = createResponseWithStatusCode(404);
      findOnePageExecStub = sandbox.stub().returns(pageData);
      findOnePageStub = sandbox.stub(Page, 'findOne').returns({ exec: findOnePageExecStub });
      folderCountExecStub = sandbox.stub().returns(null);
      folderCountStub = sandbox.stub(Folder, 'count').returns({ exec: folderCountExecStub });
      savePageSpy = sandbox.stub(Page.prototype, 'save');

      await movePage(request, response);

      assert.notCalled(savePageSpy);
      assertSendWasCalledWith({ error: 'Folder with id somefolderId not found' });
      assertFindOnePageWasCalledWithId();
      assert.calledOnce(folderCountExecStub);
      assertFolderCountWasCalledWithFolderId();
    });

    it('shall return error if saving page fails', async () => {
      response.status = createResponseWithStatusCode(500);
      findOnePageExecStub = sandbox.stub().returns(pageData);
      findOnePageStub = sandbox.stub(Page, 'findOne').returns({ exec: findOnePageExecStub });
      folderCountExecStub = sandbox.stub().returns(1);
      folderCountStub = sandbox.stub(Folder, 'count').returns({ exec: folderCountExecStub });
      savePageSpy = sandbox.stub(Page.prototype, 'save').throws({ message: 'Save page failed' });
      pageData.save = savePageSpy;

      await movePage(request, response);

      assert.calledOnce(savePageSpy);
      assertSendWasCalledWith({ error: 'Save page failed' });
      assertFindOnePageWasCalledWithId();
      assert.calledOnce(folderCountExecStub);
      assertFolderCountWasCalledWithFolderId();
    });

    it('shall move page to new folder', async () => {
      findOnePageExecStub = sandbox.stub().returns(pageData);
      findOnePageStub = sandbox.stub(Page, 'findOne').returns({ exec: findOnePageExecStub });
      folderCountExecStub = sandbox.stub().returns(1);
      folderCountStub = sandbox.stub(Folder, 'count').returns({ exec: folderCountExecStub });
      savePageSpy = sandbox.stub(Page.prototype, 'save').returns(pageData);
      pageData.save = savePageSpy;

      await movePage(request, response);

      assert.calledOnce(savePageSpy);
      assertSendWasCalledWith({ page: pageData });
      assertFindOnePageWasCalledWithId();
      assert.calledOnce(folderCountExecStub);
      assertFolderCountWasCalledWithFolderId();
    });

    it('shall remove page from folder', async () => {
      request.body.folderId = null;
      findOnePageExecStub = sandbox.stub().returns(pageData);
      findOnePageStub = sandbox.stub(Page, 'findOne').returns({ exec: findOnePageExecStub });
      folderCountExecStub = sandbox.stub().returns(1);
      folderCountStub = sandbox.stub(Folder, 'count').returns({ exec: folderCountExecStub });
      savePageSpy = sandbox.stub(Page.prototype, 'save').returns(pageData);
      pageData.save = savePageSpy;

      await movePage(request, response);

      assert.calledOnce(savePageSpy);
      assertSendWasCalledWith({ page: pageData });
      assert.notCalled(folderCountStub);
      assertFindOnePageWasCalledWithId();
    });
  });
});

function assertUpdatePageWasCalledWithLatestPageData() {
  assert.calledOnce(updatePageSpy);
  assert.calledWith(updatePageSpy,
    { id: pageData.id },
    {
      heading: pageData.heading,
      title: pageData.title,
      id: '9NL7Svh1D',
      description: pageData.description,
      editors: pageData.editors,
      editorIndex: pageData.editorIndex,
      layout: pageData.layout,
      workspace: pageData.workspace,
      tags: pageData.tags,
      user: loggedInUser._id
    },
    sinon.match.any);
}

function assertFindWasCalledWithPageId() {
  assertStubWasCalledOnceWith(findSpy, { id: pageId });
}

function assertFolderCountWasCalledWithFolderId() {
  assertStubWasCalledOnceWith(folderCountStub, { _id: folderId, user: loggedInUser._id });
}

function assertFindOnePageWasCalledWithId() {
  assertStubWasCalledOnceWith(findOnePageStub, { _id: pageId });
}

function assertFindOnePageWasCalledWithPageId() {
  assertStubWasCalledOnceWith(findOnePageStub, { id: pageData.id });
}

function assertPageWasUpdatedWithDeletedAtDetails() {
  assertStubWasCalledOnceWith(updatePageSpy, { _id: newPageId }, { deletedAt: Date.now() });
}

function assertUpdateUserWasCalledWithPageId() {
  assertStubWasCalledOnceWith(updateUserSpy, { _id: loggedInUser._id }, { pages: [request.body.id] });
}

function assertPaginateWasCalledWithTag() {
  assertStubWasCalledOnceWith(paginateSpy, { $or: [{ isPublished: true }, { isPublished: null }], tags: tag }, { offset: 0, limit: 10, sort: 'title' });
}

function assertPaginateWasCalledWithTagOffsetLimit(offset, limit, sort) {
  assertStubWasCalledOnceWith(paginateSpy, { $or: [{ isPublished: true }, { isPublished: null }], tags: tag }, { offset, limit, sort });
}

function assertSendWasCalledWith(msg) {
  assertStubWasCalledOnceWith(response.send, sinon.match(msg));
}

function assertFindOneUserWasCalledWithId() {
  assertStubWasCalledOnceWith(findOneUserSpy, { _id: loggedInUser._id });
}

function assertFindOneUserWasCalledWithName() {
  assertStubWasCalledOnceWith(findOneUserSpy, { name: 'peblioguest' });
}
