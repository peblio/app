import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Documents from '../../../../../src/app/components/Shared/Documents/Documents.jsx';

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
        allIds: [],
        byId: {}
      },
      pages: {},
      selectedFolderIds: [],
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders Documents', () => {
    wrapper = shallow(<Documents store={store} {...props} />).dive();
    console.log('**');
    console.log(wrapper);
    console.log('**');
    expect(wrapper.find('.user-account__link').first().text()).to.equal('Profile');
  });
});
