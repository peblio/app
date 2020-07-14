import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Button from '../../../../../src/app/components/Button/Button';

const setUp = (props = {}) => {
  const component = shallow(<Button {...props} />);
  return component;
};

describe('Button component', () => {
  it('Should render without errors', () => {
    const wrapper = setUp();
    expect(wrapper.find('.button')).to.have.lengthOf(1);
  });

  it('Should also have a className supplied as a prop', () => {
    const wrapper = setUp({ className: 'primary' });
    expect(wrapper.find('.button.primary')).to.have.lengthOf(1);
  });
});
