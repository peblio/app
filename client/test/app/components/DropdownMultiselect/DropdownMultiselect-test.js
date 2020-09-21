import React, { useState } from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import DropdownMultiselect from '../../../../src/app/components/DropdownMultiselect/DropdownMultiselect';

const DropdownMultiselectContainer = () => {
  const [selected, setSelected] = useState([]);

  return (
    <DropdownMultiselect
      placeholder="Select"
      style={{ width: '100px' }}
      selected={selected}
      setSelected={setSelected}
      options={[
        {
          name: '10th',
          value: 10
        },
        {
          name: '9th',
          value: 9
        },
        {
          name: '8th',
          value: 8
        },
        {
          name: '7th',
          value: 7
        },
        {
          name: '6th Standard',
          value: 6
        }
      ]}
    />
  );
};

describe('DropdownMultiselect component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <DropdownMultiselectContainer />
    );
  });

  const getProps = () => wrapper.find('DropdownMultiselect').props();

  it('Should render without errors', () => {
    const dropdown = wrapper.find('.multiselect-dropdown');
    expect(dropdown).to.have.lengthOf(1);
    const trigger = wrapper.find('.multiselect-dropdown__trigger');
    expect(trigger).to.have.lengthOf(1);
    expect(trigger.find('span').text()).to.equal(getProps().placeholder);
    expect(wrapper.find('.multiselect-dropdown__options')).to.have.lengthOf(1);
    expect(wrapper.find('.multiselect-dropdown__options--active')).to.have.lengthOf(0);
  });

  it('Should not render options before being clicked', () => {
    expect(wrapper.find('.multiselect-dropdown__options--active')).to.have.lengthOf(1);
  });

  it('Should render options after being clicked and should close again on clicking', () => {
    const trigger = wrapper.find('.multiselect-dropdown__trigger');
    console.log(trigger.debug());
    trigger.simulate('click');
    expect(wrapper.find('.multiselect-dropdown__options--active')).to.have.lengthOf(1);
    trigger.simulate('click');
    expect(wrapper.find('.multiselect-dropdown__options--active')).to.have.lengthOf(0);
  });
});
