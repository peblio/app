import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import IconButton from '../../../../../src/app/components/IconButton/IconButton';

import FileSVG from '../../../../../src/app/images/file.svg';

describe('IconButton component', () => {
  it('Should render without errors', () => {
    const wrapper = shallow(
      <IconButton icon={<FileSVG />}>
        Hello
      </IconButton>
    );
    expect(wrapper.find('.icon-button')).to.have.lengthOf(1);
    expect(wrapper.text()).to.equal('Hello');
  });
});
