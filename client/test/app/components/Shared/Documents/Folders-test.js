import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Folders from '../../../../../src/app/components/Shared/Documents/DocumentsView/Folders/Folders.jsx';
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
  folders: [
    {
      files: [],
      title: 'Title',
      updatedAt: new Date('December 17, 1995 03:24:00')
    }
  ],
  container: 'dashboard',
  documentView: 'block'
};
configure({ adapter: new Adapter() });

describe.only('Folders component - Block View ', () => {
  beforeEach(() => {
    store = mockStore({

    });
    props = allProps;
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders Folders details', () => {
    wrapper = shallow(<Folders store={store} {...props} />);
    console.log(wrapper.debug());
    expect(wrapper.find('.profile-folders__title').first().text()).to.equal('Title');
    expect(wrapper.find('.profile-folders__line-title').first().text()).to.equal('17/Dec/1995');
    expect(wrapper.find('.profile-folders__sub-info').first().text()).to.equal('0 files');
  });
});
