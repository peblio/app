import React, { useState } from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import ToggleButton from '../../../../src/app/components/ToggleButton/ToggleButton';

const ToggleButtonWrapper = () => {
  const [state, setState] = useState(false);

  return (
    <ToggleButton
      state={state}
      onClick={() => { setState(val => !val); }}
    />
  );
};

describe('ToggleButton component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <ToggleButtonWrapper />
    );
  });

  it('Should render without errors', () => {
    expect(wrapper.find('.toggle-button')).to.have.lengthOf(1);
    expect(wrapper.find('.toggle-button--active')).to.have.lengthOf(0);
  });

  it('Should toggle the state on clicking', () => {
    const button = wrapper.find('.toggle-button');
    button.simulate('click');
    expect(wrapper.find('.toggle-button--active')).to.have.lengthOf(1);
  });
});
