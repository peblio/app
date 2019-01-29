import { createResponseWithStatusCode } from '../utils.js';
import { saveLog } from '../../src/service/logService';
import * as logCreator from '../../src/models/creator/logCreator';
import { assert, spy } from 'sinon';

const sinon = require('sinon');
const sandbox = sinon.sandbox.create();
const Log = require('../../src/models/log.js');

const body = {
    message: "Somemessage",
    info: "Someinfo",
    stacktrace: "Somestacktrace",
    path: "Somepath",
    action: "Someaction",
    level: "Somelevel",
    module: "Somemodule"
};
const log = new Log({
    message: "Somemessage",
    info: "Someinfo",
    stacktrace: "Somestacktrace",
    path: "Somepath",
    action: "Someaction",
    level: "Somelevel",
    module: "Somemodule"
});
const error = { error: "Could not save Log" };
let saveLogSpy;
let buildLogFromRequestStub;
let request;
let response;

describe('logService', function () {

    describe('saveLog', function () {

        beforeEach(function () {
            request = {
                body
            };
            response = {
                send: spy(),
                json: spy(),
                status: createResponseWithStatusCode(200)
            };
        });

        afterEach(function () {
            sandbox.restore();
        });

        it('shall return error if log could not be saved', async function () {
            response.status = createResponseWithStatusCode(500);
            saveLogSpy = sandbox.stub(Log.prototype, 'save').throws({ message: "Could not save Log" });
            buildLogFromRequestStub = sandbox.stub(logCreator, 'buildLogFromRequest').returns(log);

            await saveLog(request, response);

            assertbuildLogFromRequestWasCalled();
            assertSaveLogWasCalled();
            assertSendWasCalledWith(error);
        });

        it('shall save and return log', async function () {
            buildLogFromRequestStub = sandbox.stub(logCreator, 'buildLogFromRequest').returns(log);
            saveLogSpy = sandbox.stub(Log.prototype, 'save').returns(log);

            await saveLog(request, response);

            assertbuildLogFromRequestWasCalled();
            assertSaveLogWasCalled();
            assertSendWasCalledWith({ log });
        });

    });

});

function assertbuildLogFromRequestWasCalled() {
    assert.calledOnce(buildLogFromRequestStub);
    assert.calledWith(buildLogFromRequestStub, request);
}

function assertSaveLogWasCalled() {
    assert.calledOnce(saveLogSpy);
}

function assertSendWasCalledWith(object) {
    assert.calledOnce(response.send);
    assert.calledWith(response.send, sinon.match(object));
};
