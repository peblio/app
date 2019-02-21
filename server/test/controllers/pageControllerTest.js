import { expect } from 'chai';
import { getPage, getPagesWithTag, savePageAsGuest, savePage, deletePage, updatePage, movePage, uploadPageSnapshotToS3 } from '../../src/controllers/pageController';
import * as pageService from '../../src/service/pageService';
import { assert } from 'sinon';

const sinon = require('sinon');
const sandbox = sinon.sandbox.create();
const request = "request";
let response = response;
let getPageServiceStub;
let getPagesWithTagServiceStub;
let savePageAsGuestServiceStub;
let savePageServiceStub;
let deletePageServiceStub;
let updatePageServiceStub;
let movePageServiceStub;
let uploadPageSnapshotToS3ServiceStub;

describe('pageController', function () {

    describe('getPage', function () {

        afterEach(function () {
            sandbox.restore();
        });

        it('shall call getPage from service', async function () {
            const returnValue = "getPageResponse"
            getPageServiceStub = sandbox.stub(pageService, 'getPage').returns(returnValue);

            const actualReturnValue = await getPage(request, response);

            expect(actualReturnValue).to.be.eql(returnValue);
            assert.calledOnce(getPageServiceStub);
            assert.calledWith(getPageServiceStub, request, response);
        });
    });

    describe('getPagesWithTag', function () {

        afterEach(function () {
            sandbox.restore();
        });

        it('shall call getPagesWithTag from service', async function () {
            const returnValue = "getPagesWithTagResponse"
            getPagesWithTagServiceStub = sandbox.stub(pageService, 'getPagesWithTag').returns(returnValue);

            const actualReturnValue = await getPagesWithTag(request, response);

            expect(actualReturnValue).to.be.eql(returnValue);
            assert.calledOnce(getPagesWithTagServiceStub);
            assert.calledWith(getPagesWithTagServiceStub, request, response);
        });
    });

    describe('savePageAsGuest', function () {

        afterEach(function () {
            sandbox.restore();
        });

        it('shall call savePageAsGuest from service', async function () {
            const returnValue = "savePageAsGuestResponse"
            savePageAsGuestServiceStub = sandbox.stub(pageService, 'savePageAsGuest').returns(returnValue);

            const actualReturnValue = await savePageAsGuest(request, response);

            expect(actualReturnValue).to.be.eql(returnValue);
            assert.calledOnce(savePageAsGuestServiceStub);
            assert.calledWith(savePageAsGuestServiceStub, request, response);
        });

    });

    describe('savePage', function () {

        afterEach(function () {
            sandbox.restore();
        });

        it('shall call savePage from service', async function () {
            const returnValue = "savePageResponse"
            savePageServiceStub = sandbox.stub(pageService, 'savePage').returns(returnValue);

            const actualReturnValue = await savePage(request, response);

            expect(actualReturnValue).to.be.eql(returnValue);
            assert.calledOnce(savePageServiceStub);
            assert.calledWith(savePageServiceStub, request, response);
        });

    });

    describe('deletePage', function () {
        afterEach(function () {
            sandbox.restore();
        });

        it('shall call deletePage from service', async function () {
            const returnValue = "deletePageResponse"
            deletePageServiceStub = sandbox.stub(pageService, 'deletePage').returns(returnValue);

            const actualReturnValue = await deletePage(request, response);

            expect(actualReturnValue).to.be.eql(returnValue);
            assert.calledOnce(deletePageServiceStub);
            assert.calledWith(deletePageServiceStub, request, response);
        });
    });

    describe('updatePage', function () {

        afterEach(function () {
            sandbox.restore();
        });

        it('shall call updatePage from service', async function () {
            const returnValue = "updatePageResponse"
            updatePageServiceStub = sandbox.stub(pageService, 'updatePage').returns(returnValue);

            const actualReturnValue = await updatePage(request, response);

            expect(actualReturnValue).to.be.eql(returnValue);
            assert.calledOnce(updatePageServiceStub);
            assert.calledWith(updatePageServiceStub, request, response);
        });

    });

    describe('movePage', function () {

        afterEach(function () {
            sandbox.restore();
        });

        it('shall call movePage from service', async function () {
            const returnValue = "movePageResponse"
            movePageServiceStub = sandbox.stub(pageService, 'movePage').returns(returnValue);

            const actualReturnValue = await movePage(request, response);

            expect(actualReturnValue).to.be.eql(returnValue);
            assert.calledOnce(movePageServiceStub);
            assert.calledWith(movePageServiceStub, request, response);
        });

    });

    describe('uploadPageSnapshotToS3', function () {

        afterEach(function () {
            sandbox.restore();
        });

        it('shall call getPage from service', async function () {
            const returnValue = "getPageResponse"
            uploadPageSnapshotToS3ServiceStub = sandbox.stub(pageService, 'uploadPageSnapshotToS3').returns(returnValue);

            const actualReturnValue = await uploadPageSnapshotToS3(request, response);

            expect(actualReturnValue).to.be.eql(returnValue);
            assert.calledOnce(uploadPageSnapshotToS3ServiceStub);
            assert.calledWith(uploadPageSnapshotToS3ServiceStub, request, response);
        });
    });

});
