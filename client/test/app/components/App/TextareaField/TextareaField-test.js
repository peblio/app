import React, { useState } from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import TextareaField from '../../../../../src/app/components/TextareaField/TextareaField';

const TextareaFieldContainer = (props) => {
  const [value, setValue] = useState('');
  return (
    <TextareaField
      state={value}
      onChange={(e) => { setValue(e.target.value); }}
      {...props}
    />
  );
};

describe('TextareaField component', () => {
  it('Should render without any errors', () => {
    const wrapper = mount(
      <TextareaFieldContainer
        label="Label"
        containerWidth="100px"
      />
    );
    const textarea = wrapper.find('.textarea-field');
    expect(textarea).to.have.lengthOf(1);
    expect(textarea.find('.textarea-field__text-box')).to.have.lengthOf(1);
    expect(textarea.find('.textarea-field__label')).to.have.lengthOf(1);
  });

  it('Should not render label if not provided', () => {
    const wrapper = mount(
      <TextareaFieldContainer
        containerWidth="100px"
        textareaHeight="45px"
      />
    );
    expect(wrapper.find('.textarea-field__label')).to.have.lengthOf(0);
  });

  it('Should change the state on keyboard input', () => {
    const wrapper = mount(
      <TextareaFieldContainer
        label="Label"
        containerWidth="100px"
      />
    );
    const textarea = wrapper.find('.textarea-field__text-box');
    textarea.simulate('change', { target: { value: 'Testing' } });
    console.log(wrapper.find('TextareaField').debug());
    const { state } = wrapper.find('TextareaField').props();
    expect(state).to.equal('Testing');
  });
});
