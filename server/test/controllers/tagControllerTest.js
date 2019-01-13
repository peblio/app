import { expect } from 'chai';
import { assert } from 'sinon';
import { saveTag } from '../../src/controllers/tagController';
import * as saveTagService from '../../src/service/tagService';
const sandbox = require('sinon').sandbox.create();
const name = "Java";
const request = "request";
const response = "response";
var saveTagServiceStub;

describe('tagController', function () {
    describe('saveTag', function () {

        beforeEach(function () {
            saveTagServiceStub = sandbox.stub(saveTagService, 'saveTag').returns({ name });
        });

        afterEach(function () {
            sandbox.restore();
        });

        it('shall call saveTag from service', function () {

            const returnValue = saveTag(request, response);

            expect(returnValue).to.be.eql({ name });
            assertSaveTagFromServiceWasCalledWithRequestResponse();
        });
    });
});

function assertSaveTagFromServiceWasCalledWithRequestResponse() {
    assert.calledOnce(saveTagServiceStub);
    assert.calledWith(saveTagServiceStub, request, response);
}