import React from 'react';
import { configure, shallow } from 'enzyme';
import { assert } from 'sinon';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import * as dispatchFunction from '../../../../../../src/app/action/pageVersion';
import { InsertToolbar } from '../../../../../../src/app/components/App/MainToolbar/InsertToolbar/InsertToolbar';

const sinon = require('sinon');

const sandbox = sinon.sandbox.create();

let wrapper;
let props;
let togglePageVersionMock;
configure({ adapter: new Adapter() });

describe('InsertToolbar', () => {
  beforeEach(() => {
    dispatchFunction.togglePageVersion = sandbox.mock();
    togglePageVersionMock = sandbox.mock();
    props = {
      togglePageVersion: togglePageVersionMock,
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('shall render history button', () => {
    wrapper = shallow(<InsertToolbar {...props} />);

    const toolbarContainer = wrapper.find('.insert-toolbar__container');
    expect(toolbarContainer).to.have.lengthOf(1);

    const toolbarContainerRight = toolbarContainer.find('.insert-toolbar__container-right');
    expect(toolbarContainerRight).to.have.lengthOf(1);

    const togglePageVersionButton = toolbarContainerRight.find('[data-test="insert-toolbar__show-page-version"]');
    expect(togglePageVersionButton).to.have.lengthOf(1);
  });

  it('shall call togglePageVersion function on history button click', () => {
    wrapper = shallow(<InsertToolbar {...props} />);
    const toolbarContainer = wrapper.find('.insert-toolbar__container');
    const toolbarContainerRight = toolbarContainer.find('.insert-toolbar__container-right');
    const togglePageVersionButton = toolbarContainerRight.find('[data-test="insert-toolbar__show-page-version"]');
    togglePageVersionButton.simulate('keyDown', { keyCode: 40 });

    assert.calledOnce(togglePageVersionMock);
  });
});
