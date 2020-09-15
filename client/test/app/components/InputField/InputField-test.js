import React, { useState } from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import InputField from '../../../../src/app/components/InputField/InputField';

const InputFieldContainer = (props) => {
  const [value, setValue] = useState('');
  return (
    <InputField
      state={value}
      onChange={(e) => { setValue(e.target.value); }}
      {...props}
    />
  );
};

describe('InputField component', () => {
  it('Should render without any errors', () => {
    const wrapper = mount(
      <InputFieldContainer
        label="Label"
        containerWidth="100px"
        placeholder="Placeholder"
      />
    );
    const input = wrapper.find('.input-field');
    expect(input).to.have.lengthOf(1);
    expect(input.find('.input-field__text-box')).to.have.lengthOf(1);
    const label = input.find('.input-field__label');
    expect(label).to.have.lengthOf(1);
    expect(label.text()).to.equal('Label');
  });

  it('Should not render label if not provided', () => {
    const wrapper = mount(
      <InputFieldContainer
        containerWidth="100px"
        placeholder="Placeholder"
      />
    );
    expect(wrapper.find('.input-field__label')).to.have.lengthOf(0);
  });

  it('Should change the state on keyboard input', () => {
    const wrapper = mount(
      <InputFieldContainer
        label="Label"
        containerWidth="100px"
        placeholder="Placeholder"
      />
    );
    const input = wrapper.find('.input-field__text-box');
    input.simulate('change', { target: { value: 'Testing' } });
    const { state } = wrapper.find('InputField').props();
    expect(state).to.equal('Testing');
  });
});
