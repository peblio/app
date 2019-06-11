import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { TestFolder } from '../../../../../src/app/components/Shared/Documents/DocumentsView/Folders/Folder.jsx';
import DeleteIcon from '../../../../../src/app/images/trash.svg';
// import { jumpToFolderByShortId, clearSelectedFolders } from '../../../../../src/app/action/folder.js';

const sinon = require('sinon');

const sandbox = sinon.sandbox.create();

const mockStore = configureMockStore([thunk]);
let wrapper;
let store;
let props;

const allProps = {
  profileName: 'Pico',
  folder:
    {
      _id: 1,
      files: [],
      title: 'Title',
      updatedAt: new Date('December 17, 1995 03:24:00')
    },
  container: 'dashboard',
  documentView: 'block',
  connectDropTarget: e => (e),
  connectDragSource: e => (e),
};
configure({ adapter: new Adapter() });

describe('Folder component - Block View ', () => {
  beforeEach(() => {
    store = mockStore({

    });
    props = allProps;
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders Folders details', () => {

  });
});
