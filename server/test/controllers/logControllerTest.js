import { expect } from 'chai';
import { assert } from 'sinon';
import { saveLog } from '../../src/controllers/logController';
import * as logService from '../../src/service/logService';
const Log = require('../../src/models/log.js');
const sandbox = require('sinon').sandbox.create();
const request = "request";
const response = "response";
let saveLogServiceStub;
const log = new Log({
    message: "Somemessage",
    info: "Someinfo",
    stacktrace: "Somestacktrace",
    path: "Somepath",
    action: "Someaction",
    level: "Somelevel",
    module: "Somemodule"
});

describe('logController', function () {
    describe('saveLog', function () {

        beforeEach(function () {
            saveLogServiceStub = sandbox.stub(logService, 'saveLog').returns({ log });
        });

        afterEach(function () {
            sandbox.restore();
        });

        it('shall call saveLog from service', async function () {

            const returnValue = await saveLog(request, response);

            expect(returnValue).to.be.eql({ log });
            assertSaveLogFromServiceWasCalledWithRequestResponse();
        });
    });

});

function assertSaveLogFromServiceWasCalledWithRequestResponse() {
    assert.calledOnce(saveLogServiceStub);
    assert.calledWith(saveLogServiceStub, request, response);
}