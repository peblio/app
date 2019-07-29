import { expect } from 'chai';
import { assert } from 'sinon';
import { savePageVersion, get } from '../../src/controllers/pageVersionController';
import * as pageVersionService from '../../src/service/pageVersionService';

const sinon = require('sinon');

const sandbox = sinon.sandbox.create();
const request = 'request';
const response = 'response';
let savePageVersionServiceStub;
let getPageVersionsServiceStub;

describe('pageVersionController', () => {
  describe('savePageVersion', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('shall call savePageVersion from service', async () => {
      const returnValue = 'savePageVersionResponse';
      savePageVersionServiceStub = sandbox.stub(pageVersionService, 'savePageVersion').returns(returnValue);

      const actualReturnValue = await savePageVersion(request, response);

      expect(actualReturnValue).to.be.eql(returnValue);
      assert.calledOnce(savePageVersionServiceStub);
      assert.calledWith(savePageVersionServiceStub, request, response);
    });
  });

  describe('get', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('shall call renamePage from service', async () => {
      const returnValue = 'renamePageResponse';
      getPageVersionsServiceStub = sandbox.stub(pageVersionService, 'get').returns(returnValue);

      const actualReturnValue = await get(request, response);

      expect(actualReturnValue).to.be.eql(returnValue);
      assert.calledOnce(getPageVersionsServiceStub);
      assert.calledWith(getPageVersionsServiceStub, request, response);
    });
  });
});
