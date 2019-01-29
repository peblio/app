import { expect } from 'chai';
import { buildLogFromRequest } from '../../../src/models/creator/logCreator.js';
import Log from '../../../src/models/log.js';
const request = {
    body: {
        message: "Somemessage",
        info: "Someinfo",
        stacktrace: "Somestacktrace",
        path: "Somepath",
        action: "Someaction",
        level: "Somelevel",
        module: "Somemodule"
    }
};

describe('logCreator', function () {
    describe('buildLogFromRequest', function () {

        it('shall create tag from request', function () {
            const actualLog = buildLogFromRequest(request);

            expect(actualLog instanceof Log).to.be.true;
            expect(actualLog.message).to.be.eql("Somemessage");
            expect(actualLog.info).to.be.eql("Someinfo");
            expect(actualLog.stacktrace).to.be.eql("Somestacktrace");
            expect(actualLog.path).to.be.eql("Somepath");
            expect(actualLog.action).to.be.eql("Someaction");
            expect(actualLog.level).to.be.eql("Somelevel");
            expect(actualLog.module).to.be.eql("Somemodule");
            expect(actualLog.occurredAt instanceof Date).to.be.true;

        });

        it('shall create tag with default values for level. module, date', function () {
            request.body.level = null;
            request.body.module = null
            const actualLog = buildLogFromRequest(request);

            expect(actualLog instanceof Log).to.be.true;
            expect(actualLog.level).to.be.eql("ERROR");
            expect(actualLog.module).to.be.eql("client");
            expect(actualLog.occurredAt instanceof Date).to.be.true;

        });
    });
});