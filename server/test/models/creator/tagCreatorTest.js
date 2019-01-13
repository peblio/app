import { expect } from 'chai';
import { buildTagFromRequest } from '../../../src/models/creator/tagCreator.js';
import Tag from '../../../src/models/tag.js';
const name = "Java";
const request = {
    body: {
        name
    }
};

describe('tagCreator', function () {
    describe('buildTagFromRequest', function () {

        it('shall create tag from request', function () {
            const actualtag = buildTagFromRequest(request);

            expect(actualtag instanceof Tag).to.be.true;
            expect(actualtag.name).to.be.eql("Java");
        });
    });
});