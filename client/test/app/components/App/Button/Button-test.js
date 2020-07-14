import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Button from '../../../../../src/app/components/Button/Button';

describe('Button component', () => {
  it('Should render without errors', () => {
    const wrapper = shallow(
      <Button>
        Hello
      </Button>
    );
    expect(wrapper.find('.button')).to.have.lengthOf(1);
    expect(wrapper.text()).to.equal('Hello');
  });

  it('Should also have a className supplied as a prop', () => {
    const wrapper = shallow(
      <Button className="primary">
        Hello
      </Button>
    );
    expect(wrapper.find('.button.primary')).to.have.lengthOf(1);
    expect(wrapper.text()).to.equal('Hello');
  });
});
