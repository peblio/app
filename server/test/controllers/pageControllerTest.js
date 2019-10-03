import { expect } from 'chai';
import { assert } from 'sinon';
import { getPage, getPagesWithTag, savePageAsGuest, savePage, deletePage, updatePage, updatePageWithVersion, movePage, getTrashPages, trashPage, emptyTrash, restoreFromTrash, uploadPageSnapshotToS3, renamePage, getMyPagesWithTag } from '../../src/controllers/pageController';
import * as pageService from '../../src/service/pageService';

const sinon = require('sinon');

const sandbox = sinon.sandbox.create();
const request = 'request';
const response = 'response';
let getPageServiceStub;
let getPagesWithTagServiceStub;
let getMyPagesWithTagServiceStub;
let savePageAsGuestServiceStub;
let savePageServiceStub;
let deletePageServiceStub;
let updatePageServiceStub;
let movePageServiceStub;
let uploadPageSnapshotToS3ServiceStub;
let trashPageServiceStub;
let getTrashPagesServiceStub;
let restoreFromTrashServiceStub;
let emptyTrashServiceStub;
let renamePageServiceStub;
let updatePageVersionServiceStub;

describe('pageController', () => {
  describe('getPage', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('shall call getPage from service', async () => {
      const returnValue = 'getPageResponse';
      getPageServiceStub = sandbox.stub(pageService, 'getPage').returns(returnValue);

      const actualReturnValue = await getPage(request, response);

      expect(actualReturnValue).to.be.eql(returnValue);
      assert.calledOnce(getPageServiceStub);
      assert.calledWith(getPageServiceStub, request, response);
    });
  });

  describe('renamePage', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('shall call renamePage from service', async () => {
      const returnValue = 'renamePageResponse';
      renamePageServiceStub = sandbox.stub(pageService, 'renamePage').returns(returnValue);

      const actualReturnValue = await renamePage(request, response);

      expect(actualReturnValue).to.be.eql(returnValue);
      assert.calledOnce(renamePageServiceStub);
      assert.calledWith(renamePageServiceStub, request, response);
    });
  });

  describe('restoreFromTrash', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('shall call restoreFromTrash from service', async () => {
      const returnValue = 'restoreFromTrash';
      restoreFromTrashServiceStub = sandbox.stub(pageService, 'restoreFromTrash').returns(returnValue);

      const actualReturnValue = await restoreFromTrash(request, response);

      expect(actualReturnValue).to.be.eql(returnValue);
      assert.calledOnce(restoreFromTrashServiceStub);
      assert.calledWith(restoreFromTrashServiceStub, request, response);
    });
  });

  describe('getPagesWithTag', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('shall call getPagesWithTag from service', async () => {
      const returnValue = 'getPagesWithTagResponse';
      getPagesWithTagServiceStub = sandbox.stub(pageService, 'getPagesWithTag').returns(returnValue);

      const actualReturnValue = await getPagesWithTag(request, response);

      expect(actualReturnValue).to.be.eql(returnValue);
      assert.calledOnce(getPagesWithTagServiceStub);
      assert.calledWith(getPagesWithTagServiceStub, request, response);
    });
  });

  describe('emptyTrash', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('shall call emptyTrash from service', async () => {
      const returnValue = 'emptyTrashResponse';
      emptyTrashServiceStub = sandbox.stub(pageService, 'emptyTrash').returns(returnValue);

      const actualReturnValue = await emptyTrash(request, response);

      expect(actualReturnValue).to.be.eql(returnValue);
      assert.calledOnce(emptyTrashServiceStub);
      assert.calledWith(emptyTrashServiceStub, request, response);
    });
  });

  describe('getMyPagesWithTag', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('shall call getMyPagesWithTag from service', async () => {
      const returnValue = 'getMyPagesWithTagResponse';
      getMyPagesWithTagServiceStub = sandbox.stub(pageService, 'getMyPagesWithTag').returns(returnValue);

      const actualReturnValue = await getMyPagesWithTag(request, response);

      expect(actualReturnValue).to.be.eql(returnValue);
      assert.calledOnce(getMyPagesWithTagServiceStub);
      assert.calledWith(getMyPagesWithTagServiceStub, request, response);
    });
  });

  describe('savePageAsGuest', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('shall call savePageAsGuest from service', async () => {
      const returnValue = 'savePageAsGuestResponse';
      savePageAsGuestServiceStub = sandbox.stub(pageService, 'savePageAsGuest').returns(returnValue);

      const actualReturnValue = await savePageAsGuest(request, response);

      expect(actualReturnValue).to.be.eql(returnValue);
      assert.calledOnce(savePageAsGuestServiceStub);
      assert.calledWith(savePageAsGuestServiceStub, request, response);
    });
  });

  describe('savePage', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('shall call savePage from service', async () => {
      const returnValue = 'savePageResponse';
      savePageServiceStub = sandbox.stub(pageService, 'savePage').returns(returnValue);

      const actualReturnValue = await savePage(request, response);

      expect(actualReturnValue).to.be.eql(returnValue);
      assert.calledOnce(savePageServiceStub);
      assert.calledWith(savePageServiceStub, request, response);
    });
  });

  describe('deletePage', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('shall call deletePage from service', async () => {
      const returnValue = 'deletePageResponse';
      deletePageServiceStub = sandbox.stub(pageService, 'deletePage').returns(returnValue);

      const actualReturnValue = await deletePage(request, response);

      expect(actualReturnValue).to.be.eql(returnValue);
      assert.calledOnce(deletePageServiceStub);
      assert.calledWith(deletePageServiceStub, request, response);
    });
  });

  describe('updatePage', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('shall call updatePage from service', async () => {
      const returnValue = 'updatePageResponse';
      updatePageServiceStub = sandbox.stub(pageService, 'updatePage').returns(returnValue);

      const actualReturnValue = await updatePage(request, response);

      expect(actualReturnValue).to.be.eql(returnValue);
      assert.calledOnce(updatePageServiceStub);
      assert.calledWith(updatePageServiceStub, request, response);
    });
  });

  describe('updatePageWithVersion', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('shall call updatePageWithVersion from service', async () => {
      const returnValue = 'updatePageWithVersionResponse';
      updatePageVersionServiceStub = sandbox.stub(pageService, 'updatePageWithVersion').returns(returnValue);

      const actualReturnValue = await updatePageWithVersion(request, response);

      expect(actualReturnValue).to.be.eql(returnValue);
      assert.calledOnce(updatePageVersionServiceStub);
      assert.calledWith(updatePageVersionServiceStub, request, response);
    });
  });

  describe('trashPage', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('shall call trashPage from service', async () => {
      const returnValue = 'trashPageResponse';
      trashPageServiceStub = sandbox.stub(pageService, 'trashPage').returns(returnValue);

      const actualReturnValue = await trashPage(request, response);

      expect(actualReturnValue).to.be.eql(returnValue);
      assert.calledOnce(trashPageServiceStub);
      assert.calledWith(trashPageServiceStub, request, response);
    });
  });

  describe('getTrashPages', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('shall call getTrashPages from service', async () => {
      const returnValue = 'getTrashPagesResponse';
      getTrashPagesServiceStub = sandbox.stub(pageService, 'getTrashPages').returns(returnValue);

      const actualReturnValue = await getTrashPages(request, response);

      expect(actualReturnValue).to.be.eql(returnValue);
      assert.calledOnce(getTrashPagesServiceStub);
      assert.calledWith(getTrashPagesServiceStub, request, response);
    });
  });

  describe('movePage', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('shall call movePage from service', async () => {
      const returnValue = 'movePageResponse';
      movePageServiceStub = sandbox.stub(pageService, 'movePage').returns(returnValue);

      const actualReturnValue = await movePage(request, response);

      expect(actualReturnValue).to.be.eql(returnValue);
      assert.calledOnce(movePageServiceStub);
      assert.calledWith(movePageServiceStub, request, response);
    });
  });

  describe('uploadPageSnapshotToS3', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('shall call uploadPageSnapshotToS3 from service', async () => {
      const returnValue = 'getPageResponse';
      uploadPageSnapshotToS3ServiceStub = sandbox.stub(pageService, 'uploadPageSnapshotToS3').returns(returnValue);

      const actualReturnValue = await uploadPageSnapshotToS3(request, response);

      expect(actualReturnValue).to.be.eql(returnValue);
      assert.calledOnce(uploadPageSnapshotToS3ServiceStub);
      assert.calledWith(uploadPageSnapshotToS3ServiceStub, request, response);
    });
  });
});
