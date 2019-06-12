import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Pages from '../../../../../src/app/components/Shared/Documents/DocumentsView/Pages/Pages.jsx';

const sinon = require('sinon');

const sandbox = sinon.sandbox.create();

const mockStore = configureMockStore([thunk]);
let wrapper;
let store;
let props;

const allProps = {
  profileName: 'Pico',
  pages: [
    {
      title: 'Title',
      updatedAt: new Date('December 17, 1995 03:24:00')
    }
  ],
  container: 'dashboard'
};
configure({ adapter: new Adapter() });

describe('Folders component - Block View ', () => {
  beforeEach(() => {
    store = mockStore({
      dashboard: {
        documentView: 'block'
      }
    });
    props = allProps;
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders Pages details', () => {

  });
});
