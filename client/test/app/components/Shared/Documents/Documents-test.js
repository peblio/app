import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Documents from '../../../../../src/app/components/Shared/Documents/Documents.jsx';
import DocumentsView from '../../../../../src/app/components/Shared/Documents/DocumentsView/DocumentsView.jsx';
import Folders from '../../../../../src/app/components/Shared/Documents/DocumentsView/Folders/Folders.jsx';

const sinon = require('sinon');

const sandbox = sinon.sandbox.create();

const mockStore = configureMockStore([thunk]);
let wrapper;
let store;
let props;
configure({ adapter: new Adapter() });

describe('UserAccount component when logged in as teacher', () => {
  beforeEach(() => {
    store = mockStore({
      dashboard: {
        documentSort: 'title',
        documentView: 'line'
      }
    });
    props = {
      folders: {
        allIds: ['1'],
        byId: { 1: {} }
      },
      pages: {},
      selectedFolderIds: [],
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders DocumentsView', () => {
    wrapper = shallow(<Documents store={store} {...props} />).dive();
    expect(wrapper.find(DocumentsView)).to.have.lengthOf(1);
  });

  it('renders DocumentsView', () => {
    wrapper = shallow(<Documents store={store} {...props} />).dive().dive();
    expect(wrapper.find(Folders)).to.have.lengthOf(1);
  });
});
