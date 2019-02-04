import { expect } from 'chai';
import Page from '../../src/models/page.js';
const mongoose = require('mongoose');

describe('pageTest', function () {
    describe('buildTagFromRequest', function () {

        it('shall not validate page if user has not value', function () {
            const actualPage = new Page();

            actualPage.validate(err => {
                expect(err.message).to.be.eql("Page validation failed: user: Path `user` is required.");
            })
        });


        it('shall validate page and return no errors', function () {
            const actualPage = new Page({ user: mongoose.Types.ObjectId("5bd45c4b9524a22dd05a78f2") });

            actualPage.validate(err => {
                expect(err).to.be.null;
            })

        });
    });
});