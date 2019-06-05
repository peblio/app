import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import DocumentsView from '../../../../../src/app/components/Shared/Documents/DocumentsView/DocumentsView.jsx';
import Folders from '../../../../../src/app/components/Shared/Documents/DocumentsView/Folders/Folders.jsx';
import Pages from '../../../../../src/app/components/Shared/Documents/DocumentsView/Pages/Pages.jsx';
// import { jumpToFolderByShortId, clearSelectedFolders } from '../../../../../src/app/action/folder.js';

const sinon = require('sinon');

const sandbox = sinon.sandbox.create();

const mockStore = configureMockStore([thunk]);
let wrapper;
let store;
let props;

const allProps = {
  folders: {
    allIds: ['1'],
    byId: { 1: {} }
  },
  pages: {
    allIds: ['1'],
    byId: { 1: {} }
  },
  selectedFolderIds: [],
  folderId: '',
  container: 'dashboard'
};

const allStore = {
  page: {
    pages: {
      allIds: ['1'],
      byId: { 1: { folder: '' } }
    },
  }
};
configure({ adapter: new Adapter() });

describe('Shared component DocumentsView ', () => {
  beforeEach(() => {
    store = mockStore(allStore);
    props = {
      profileName: 'pico',
      folders: {
        allIds: ['1'],
        byId: { 1: { parent: '' } }
      },
      pages: {
        allIds: ['1'],
        byId: { 1: { folder: '' } }
      },
      selectedFolderIds: [],
      folderId: '',
      container: 'dashboard'

    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders Folders component if there are folders', () => {
    wrapper = shallow(<DocumentsView store={store} {...props} />).dive();
    console.log(wrapper.debug());
    expect(wrapper.find(Folders)).to.have.lengthOf(1);
  });
  // TODO : add test that checks if Page renders - issue at time of writing is that connected components appear differently in the wrapper
});


describe('Shared component DocumentsView ', () => {
  beforeEach(() => {
    store = mockStore(allStore);
    allProps.folders.allIds = [];
    allProps.folders.byId = {};
    props = allProps;
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('does not render Folders component if there are no folders', () => {
    wrapper = shallow(<DocumentsView store={store} {...props} />).dive();
    expect(wrapper.find(Folders)).to.have.lengthOf(0);
  });
});
