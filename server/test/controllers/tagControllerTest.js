import { expect } from 'chai';
import { assert } from 'sinon';
import { saveTag, getAllTags, getAllTagsStartingWith } from '../../src/controllers/tagController';
import * as saveTagService from '../../src/service/tagService';
const sandbox = require('sinon').sandbox.create();
const name = "Java";
const request = "request";
const response = "response";
let saveTagServiceStub;
let getAllTagsServiceStub;
let getAllTagsStartingWithServiceStub;

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

    describe('getAllTags', function () {

        beforeEach(function () {
            getAllTagsServiceStub = sandbox.stub(saveTagService, 'getAllTags').returns({ name });
        });

        afterEach(function () {
            sandbox.restore();
        });

        it('shall call getAllTags from service', function () {

            const returnValue = getAllTags(request, response);

            expect(returnValue).to.be.eql({ name });
            assertGetAllTagsFromServiceWasCalledWithRequestResponse();
        });
    });

    describe('getAllTagsStartingWith', function () {

        beforeEach(function () {
            getAllTagsStartingWithServiceStub = sandbox.stub(saveTagService, 'getAllTagsStartingWith').returns({ name });
        });

        afterEach(function () {
            sandbox.restore();
        });

        it('shall call getAllTagsStartingWith from service', function () {

            const returnValue = getAllTagsStartingWith(request, response);

            expect(returnValue).to.be.eql({ name });
            assertGetAllTagsStartingWithFromServiceWasCalledWithRequestResponse();
        });
    });

});

function assertSaveTagFromServiceWasCalledWithRequestResponse() {
    assert.calledOnce(saveTagServiceStub);
    assert.calledWith(saveTagServiceStub, request, response);
}

function assertGetAllTagsFromServiceWasCalledWithRequestResponse() {
    assert.calledOnce(getAllTagsServiceStub);
    assert.calledWith(getAllTagsServiceStub, request, response);
}

function assertGetAllTagsStartingWithFromServiceWasCalledWithRequestResponse() {
    assert.calledOnce(getAllTagsStartingWithServiceStub);
    assert.calledWith(getAllTagsStartingWithServiceStub, request, response);
}