import { expect } from 'chai';
import Log from '../../src/models/log.js';

describe('logTest', function () {
    describe('buildLogFromRequest', function () {

        it('shall not validate log if it does not have message', function () {
            const actualLog = new Log({
                info: "Someinfo",
                stacktrace: "Somestacktrace",
                path: "Somepath",
                action: "Someaction",
                level: "DEBUG",
                module: "ui"
            });

            actualLog.validate(err => {
                expect(err.message).to.be.eql("Log validation failed: message: Path `message` is required.");
            })
        });

        it('shall not validate log if it does not have path', function () {
            const actualLog = new Log({
                message: "Somemessage",
                info: "Someinfo",
                stacktrace: "Somestacktrace",
                action: "Someaction",
                level: "DEBUG",
                module: "ui"
            });

            actualLog.validate(err => {
                expect(err.message).to.be.eql("Log validation failed: path: Path `path` is required.");
            })
        });

        it('shall not validate log if it does not have action', function () {
            const actualLog = new Log({
                message: "Somemessage",
                info: "Someinfo",
                stacktrace: "Somestacktrace",
                path: "Somepath",
                level: "DEBUG",
                module: "ui"
            });

            actualLog.validate(err => {
                expect(err.message).to.be.eql("Log validation failed: action: Path `action` is required.");
            })
        });

        it('shall assign default values to module, level, occurredAt', function () {
            const actualLog = new Log({
                message: "Somemessage",
                info: "Someinfo",
                stacktrace: "Somestacktrace",
                path: "Somepath",
                action: "Someaction"
            });

            actualLog.validate(err => {
                expect(err).to.be.null;
                expect(actualLog.level).to.be.eql("ERROR");
                expect(actualLog.module).to.be.eql("community-ui");
                expect(actualLog.occurredAt instanceof Date).to.be.true;
            })
        });


        it('shall validate log if it has all required fields', function () {
            const actualLog = new Log({
                message: "Somemessage",
                info: "Someinfo",
                stacktrace: "Somestacktrace",
                path: "Somepath",
                level: "DEBUG",
                module: "ui",
                action: "Someaction"
            });

            actualLog.validate(err => {
                expect(err).to.be.null;
            })
        });
    });
});