import { expect } from 'chai';
import Tag from '../../src/models/tag.js';

describe('tagCreator', function () {
    describe('buildTagFromRequest', function () {

        it('shall not validate tag if it does not have name', function () {
            const actualtag = new Tag();

            actualtag.validate(err => {
                expect(err.message).to.be.eql("Tag validation failed: name: Path `name` is required.");
            })

        });
    });
});