import { expect } from 'chai';
import { buildPageForUpdateFromRequest } from '../../../src/models/creator/pageCreator.js';

const request = {
  body: {
    heading: 'Some heading',
    title: 'Some title',
    editors: 'Some editors',
    editorIndex: ' Some editorIndex',
    layout: 'A perfect layout',
    workspace: 'No workspace',
    tags: []
  }
};

describe('pageCreator', () => {
  describe('buildPageForUpdateFromRequest', () => {
    it('shall build Page for update from request', () => {
      const actualPage = buildPageForUpdateFromRequest(request);

      expect(actualPage.name).to.be.eql(request.body.name);
      expect(actualPage.title).to.be.eql(request.body.title);
      expect(actualPage.editors).to.be.eql(request.body.editors);
      expect(actualPage.editorIndex).to.be.eql(request.body.editorIndex);
      expect(actualPage.layout).to.be.eql(request.body.layout);
      expect(actualPage.workspace).to.be.eql(request.body.workspace);
      expect(actualPage.tags).to.be.eql(request.body.tags);
    });
  });
});
