import { expect } from 'chai';
import { assert } from 'sinon';
const sinon = require('sinon');

export function createResponseWithStatusCode(statusCode) {
    return function (responseStatus) {
        expect(responseStatus).to.be.equal(statusCode);
        return this;
    }
};

export function assertStubWasCalledOnceWith(stub, object) {
    assert.calledOnce(stub);
    assert.calledWith(stub, sinon.match(object));
};