import React from 'react';
import jest from 'jest-mock';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import EditorFile from '../../../../../../../src/app/components/App/Shared/EditorComponents/EditorFiles/EditorFile.jsx';

const sinon = require('sinon');

const sandbox = sinon.sandbox.create();
let confirm = () => true;
const mockStore = configureMockStore([thunk]);
let wrapper;
let store;
let props;
configure({ adapter: new Adapter() });

describe('Shared component Documents', () => {
  beforeEach(() => {
    confirm = () => true;
    props = {
      file: {
        name: 'test.js',
        id: '0'
      },
      index: 0,
      deleteFileFromEditor: jest.fn(),
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders EditorFile with test.js', () => {
    wrapper = shallow(<EditorFile {...props} />);
    expect(wrapper.find('.editor-toolbar__file')).to.have.lengthOf(1);
    expect(wrapper.find('.editor-toolbar__file-name')).to.have.lengthOf(1);
    expect(wrapper.find('.editor-toolbar__file-button').first().text()).to.equal('test.js');
  });

  it.only('check that deleteFile is called on clicking delete', () => {
    const jsdomConfirm = window.confirm; // remember the jsdom alert
    window.confirm = () => true;
    wrapper = shallow(<EditorFile {...props} />);
    const e = {
      stopPropagation: () => undefined
    };
    expect(wrapper.find('.editor-toolbar__file-button-option')).to.have.lengthOf(1);
    wrapper.find('.editor-toolbar__file-button-option').first().simulate('mousedown');
    expect(wrapper.find('.editor-toolbar__file-button-delete')).to.have.lengthOf(1);
    wrapper.find('.editor-toolbar__file-button-delete').first().simulate('mousedown', e);
    expect(props.deleteFileFromEditor.mock.calls.length).to.equal(1);
    window.confirm = jsdomConfirm;
  });
});
