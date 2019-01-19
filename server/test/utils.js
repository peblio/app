import { expect } from 'chai';

export function createResponseWithStatusCode(statusCode) {
    return function (responseStatus) {
        expect(responseStatus).to.be.equal(statusCode);
        return this;
    }
};