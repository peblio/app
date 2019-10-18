import { assert, spy } from 'sinon';
import { createResponseWithStatusCode, assertStubWasCalledOnceWith } from '../utils';
import * as userService from '../../src/service/userService';

const sandbox = require('sinon').sandbox.create();
const Page = require('../../src/models/page.js');
const User = require('../../src/models/user.js');

let findUserByIdSpy;
let findOnePageSpy;
let request;
let response;
const pageId = 'pageId';
const userObjectId = 'userObjectId';
const user = { _id: userObjectId, name: 'username', type: 'teacher' };
const page = { user: userObjectId, parentId: pageId };
const expectedUserData = {
  name: 'username',
  type: 'teacher'
};


describe('userService', () => {
  describe('getUserDetailsById', () => {
    beforeEach(() => {
      request = {
        params: {
          userObjectId
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

    it('shall return error when retrieve user errors', () => {
      response.status = createResponseWithStatusCode(500);
      findUserByIdSpy = sandbox.stub(User, 'findById').yields('error retrieving user', null);

      userService.getUserDetailsById(request, response);

      assertFindByIdWasCalledWithUserId();
      assertSendWasCalledWith('error retrieving user');
    });

    it('shall return error when retrieve user does not return user', () => {
      response.status = createResponseWithStatusCode(404);
      findUserByIdSpy = sandbox.stub(User, 'findById').yields(null, null);

      userService.getUserDetailsById(request, response);

      assertFindByIdWasCalledWithUserId();
      assertSendWasCalledWith(null);
    });

    it('shall return user name when retrieve user by id', () => {
      findUserByIdSpy = sandbox.stub(User, 'findById').yields(null, user);

      userService.getUserDetailsById(request, response);

      assertFindByIdWasCalledWithUserId();
      assertSendWasCalledWith(expectedUserData);
    });
  });

  describe('getUserDetailsForPage', () => {
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

    it('shall return error when retrieve page errors', () => {
      response.status = createResponseWithStatusCode(500);
      findOnePageSpy = sandbox.stub(Page, 'findOne').yields('error retrieving page', null);
      findUserByIdSpy = sandbox.stub(User, 'findById').yields('error retrieving user', null);

      userService.getUserDetailsForPage(request, response);

      assertFindOneWasCalledWithPageShortId();
      assertSendWasCalledWith('error retrieving page');
      assert.notCalled(findUserByIdSpy);
    });

    it('shall return error when retrieve page does not return page', () => {
      response.status = createResponseWithStatusCode(404);
      findOnePageSpy = sandbox.stub(Page, 'findOne').yields(null, null);
      findUserByIdSpy = sandbox.stub(User, 'findById').yields('error retrieving user', null);

      userService.getUserDetailsForPage(request, response);

      assertFindOneWasCalledWithPageShortId();
      assertSendWasCalledWith(null);
      assert.notCalled(findUserByIdSpy);
    });

    it('shall return error when retrieve user errors', () => {
      response.status = createResponseWithStatusCode(500);
      findOnePageSpy = sandbox.stub(Page, 'findOne').yields(null, page);
      findUserByIdSpy = sandbox.stub(User, 'findById').yields('error retrieving user', null);

      userService.getUserDetailsForPage(request, response);

      assertFindOneWasCalledWithPageShortId();
      assertSendWasCalledWith('error retrieving user');
      assertFindByIdWasCalledWithUserId();
    });

    it('shall return error when retrieve user does not return user', () => {
      response.status = createResponseWithStatusCode(404);
      findOnePageSpy = sandbox.stub(Page, 'findOne').yields(null, page);
      findUserByIdSpy = sandbox.stub(User, 'findById').yields(null, null);

      userService.getUserDetailsForPage(request, response);

      assertFindOneWasCalledWithPageShortId();
      assertSendWasCalledWith(null);
      assertFindByIdWasCalledWithUserId();
    });

    it('shall return user name given page id', () => {
      findOnePageSpy = sandbox.stub(Page, 'findOne').yields(null, page);
      findUserByIdSpy = sandbox.stub(User, 'findById').yields(null, user);

      userService.getUserDetailsForPage(request, response);

      assertFindOneWasCalledWithPageShortId();
      assertSendWasCalledWith(expectedUserData);
      assertFindByIdWasCalledWithUserId();
    });
  });

  describe('getUserDetailsForParentPage', () => {
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

    it('shall return error when retrieve page errors', () => {
      response.status = createResponseWithStatusCode(500);
      findOnePageSpy = sandbox.stub(Page, 'findOne').yields('error retrieving page', null);
      findUserByIdSpy = sandbox.stub(User, 'findById').yields(null, null);

      userService.getUserDetailsForParentPage(request, response);

      assertFindOneWasCalledWithPageShortId();
      assertSendWasCalledWith('error retrieving page');
      assert.notCalled(findUserByIdSpy);
    });

    it('shall return error when retrieve page does not return page', () => {
      response.status = createResponseWithStatusCode(404);
      findOnePageSpy = sandbox.stub(Page, 'findOne').yields(null, null);
      findUserByIdSpy = sandbox.stub(User, 'findById').yields(null, null);

      userService.getUserDetailsForParentPage(request, response);

      assertFindOneWasCalledWithPageShortId();
      assertSendWasCalledWith(null);
      assert.notCalled(findUserByIdSpy);
    });

    it('shall return error when retrieve user errors', () => {
      response.status = createResponseWithStatusCode(500);
      findOnePageSpy = sandbox.stub(Page, 'findOne').onCall(0).yields(null, page).onCall(1).yields(null, page);
      findUserByIdSpy = sandbox.stub(User, 'findById').yields('error retrieving user', null);

      userService.getUserDetailsForParentPage(request, response);

      assertFindOneWasCalledTwiceWithPageShortId();
      assertSendWasCalledWith('error retrieving user');
      assertFindByIdWasCalledWithUserId();
    });

    it('shall return error when retrieve parentPage does not return page', () => {
      response.status = createResponseWithStatusCode(404);
      findOnePageSpy = sandbox.stub(Page, 'findOne').onCall(0).yields(null, page).onCall(1).yields(null, null);
      findUserByIdSpy = sandbox.stub(User, 'findById').yields('error retrieving user', null);

      userService.getUserDetailsForParentPage(request, response);

      assertFindOneWasCalledTwiceWithPageShortId();
      assertSendWasCalledWith(null);
      assert.notCalled(findUserByIdSpy);
    });

    it('shall return error when retrieve user does not return user', () => {
      response.status = createResponseWithStatusCode(404);
      findOnePageSpy = sandbox.stub(Page, 'findOne').onCall(0).yields(null, page).onCall(1).yields(null, page);
      findUserByIdSpy = sandbox.stub(User, 'findById').yields(null, null);

      userService.getUserDetailsForParentPage(request, response);

      assertFindOneWasCalledTwiceWithPageShortId();
      assertSendWasCalledWith(null);
      assertFindByIdWasCalledWithUserId();
    });

    it('shall return user name given page id', () => {
      findOnePageSpy = sandbox.stub(Page, 'findOne').onCall(0).yields(null, page).onCall(1).yields(null, page);
      findUserByIdSpy = sandbox.stub(User, 'findById').yields(null, user);

      userService.getUserDetailsForParentPage(request, response);

      assertFindOneWasCalledTwiceWithPageShortId();
      assertSendWasCalledWith(expectedUserData);
      assertFindByIdWasCalledWithUserId();
    });
  });
});

function assertFindOneWasCalledWithPageShortId() {
  assertStubWasCalledOnceWith(findOnePageSpy, { id: pageId });
}

function assertFindOneWasCalledTwiceWithPageShortId() {
  assert.calledTwice(findOnePageSpy);
  assert.alwaysCalledWith(findOnePageSpy, { id: pageId });
}

function assertFindByIdWasCalledWithUserId() {
  assertStubWasCalledOnceWith(findUserByIdSpy, userObjectId);
}

function assertSendWasCalledWith(msg) {
  assertStubWasCalledOnceWith(response.send, msg);
}
