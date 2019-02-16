import { expect } from 'chai';
import { buildLogFromRequest, getQueryForSearchLogs, getOptionsForSearchLogs } from '../../../src/models/creator/logCreator.js';
import Log from '../../../src/models/log.js';
let request = {
    body: {
        message: "Somemessage",
        info: "Someinfo",
        stacktrace: "Somestacktrace",
        path: "Somepath",
        action: "Someaction",
        level: "INFO",
        module: "ui"
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
            expect(actualLog.level).to.be.eql("INFO");
            expect(actualLog.module).to.be.eql("ui");
            expect(actualLog.occurredAt instanceof Date).to.be.true;

        });

        it('shall create tag with default values for level. module, date', function () {
            request.body.level = null;
            request.body.module = null
            const actualLog = buildLogFromRequest(request);

            expect(actualLog instanceof Log).to.be.true;
            expect(actualLog.level).to.be.eql("ERROR");
            expect(actualLog.module).to.be.eql("community-ui");
            expect(actualLog.occurredAt instanceof Date).to.be.true;

        });
    });

    describe('getQueryForSearchLogs', function () {

        beforeEach(function () {
            request = { query: {} };
        });

        it('shall build empty query from request', function () {
            const query = getQueryForSearchLogs(request);

            expect(query).to.be.eql({});
        });

        it('shall build query with level from request', function () {
            request = {
                query: {
                    level: 'TRACE'
                }
            };
            const query = getQueryForSearchLogs(request);

            expect(query).to.be.eql({ level: 'TRACE' });
        });

        it('shall build query with module from request', function () {
            request = {
                query: {
                    module: 'ui'
                }
            };
            const query = getQueryForSearchLogs(request);

            expect(query).to.be.eql({ module: 'ui' });
        });

        it('shall build query with path from request', function () {
            request = {
                query: {
                    path: 'pages'
                }
            };
            const query = getQueryForSearchLogs(request);

            expect(query).to.be.eql({ path: 'pages' });
        });

        it('shall build query with path from request', function () {
            request = {
                query: {
                    action: 'savePage'
                }
            };
            const query = getQueryForSearchLogs(request);

            expect(query).to.be.eql({ action: 'savePage' });
        });

    });

    describe('getOptionsForSearchLogs', function () {

        beforeEach(function () {
            request = { query: {} };
        });

        it('shall build default options from request', function () {
            const options = getOptionsForSearchLogs(request);

            expect(options).to.be.eql({ limit: 10, offset: 0 });
        });

        it('shall build default options from request', function () {
            const options = getOptionsForSearchLogs(request);

            expect(options).to.be.eql({ limit: 10, offset: 0 });
        });

    });
});