import { spy } from 'sinon';
import { getSketches, getFileInfo } from '../../src/controllers/apiController';
import { createResponseWithStatusCode, assertStubWasCalledOnceWith } from '../utils.js';

const sinon = require('sinon');
const User = require('../../src/models/user.js');

const sandbox = sinon.sandbox.create();
const user = 'user';
const error = 'error';
const studentUser = {
  type: 'student'
};
let request = {};
let response = {};
let userRetrieveStub;

function assertSendWasCalledWith(object) {
  assertStubWasCalledOnceWith(response.send, object);
}

describe('apiController', () => {
  describe('getSketches', () => {
    beforeEach(() => {
      request = {
        params: {
          user
        },
        query: {}
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

    it('shall return unauthorized when user missing', async () => {
      response.status = createResponseWithStatusCode(403);
      request.params = {};

      getSketches(request, response);

      assertSendWasCalledWith({ error: 'Please log in first or specify a user' });
    });

    it('shall return 404 when user retrieve returns found', async () => {
      response.status = createResponseWithStatusCode(404);
      userRetrieveStub = sandbox.stub(User, 'findOne').yields(error, null);

      getSketches(request, response);

      assertSendWasCalledWith({ error });
      assertStubWasCalledOnceWith(userRetrieveStub, { name: request.params.user });
    });

    it('shall return 404 when user not found', async () => {
      response.status = createResponseWithStatusCode(404);
      userRetrieveStub = sandbox.stub(User, 'findOne').yields(null, null);

      getSketches(request, response);

      assertSendWasCalledWith({ error: null });
      assertStubWasCalledOnceWith(userRetrieveStub, { name: request.params.user });
    });

    it('shall return 403 when data belongs to student', async () => {
      response.status = createResponseWithStatusCode(403);
      userRetrieveStub = sandbox.stub(User, 'findOne').yields(null, studentUser);

      getSketches(request, response);

      assertSendWasCalledWith({ error: 'This users data cannot be accessed' });
      assertStubWasCalledOnceWith(userRetrieveStub, { name: request.params.user });
    });

    /* it('shall return page and folder data for user', async function () {
            response.status = createResponseWithStatusCode(200);
            userRetrieveStub = sandbox.stub(User, 'findOne').yields(null, teacherUser);
            const pageRetrieveExecStub = sandbox.stub().returns(pages);
            pageRetrieveStub = sandbox.stub(Page, 'find').returns({ exec: pageRetrieveExecStub });
            const folderRetrieveExecStub = sandbox.stub().returns(folders);
            folderRetrieveStub = sandbox.stub(Folder, 'find').returns({ exec: folderRetrieveExecStub });

            await getSketches(request, response);

            assert.calledOnce(pageRetrieveExecStub);
            assert.calledOnce(folderRetrieveExecStub);
            assertStubWasCalledOnceWith(userRetrieveStub, { name: request.params.user });
            assertStubWasCalledOnceWith(pageRetrieveStub, { user: teacherUser._id });
            assertStubWasCalledOnceWith(folderRetrieveStub, { user: teacherUser._id });
            // assertSendWasCalledWith({pages, folders});
        });
        */
  });

  describe('getFileInfo', () => {
    beforeEach(() => {
      response = {
        send: spy(),
        json: spy(),
        status: createResponseWithStatusCode(200)
      };
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('shall return unauthorized when user missing', async () => {
      response.status = createResponseWithStatusCode(403);

      getFileInfo(request, response);

      assertSendWasCalledWith({ err: 'Please log in first' });
    });
  });
});
