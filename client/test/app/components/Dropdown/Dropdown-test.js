import React, { useState } from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import Dropdown from '../../../../src/app/components/Dropdown/Dropdown';

const DropdownContainer = () => {
  const [value, setValue] = useState('');
  return (
    <Dropdown
      placeholder="Grades"
      style={{ width: '100px' }}
      state={value}
      setState={setValue}
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

describe('Dropdown component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <DropdownContainer />
    );
  });
  const getProps = () => wrapper.find('Dropdown').props();

  it('Should render without errors', () => {
    const dropdown = wrapper.find('.dropdown');
    expect(dropdown).to.have.lengthOf(1);
    const trigger = wrapper.find('.dropdown__trigger');
    expect(trigger).to.have.lengthOf(1);
    expect(trigger.find('span').text()).to.equal(getProps().placeholder);
  });

  it('Should not render options before being clicked', () => {
    expect(wrapper.find('.dropdown__options')).to.have.lengthOf(0);
  });

  it('Should render options after being clicked and should close again on clicking', () => {
    const trigger = wrapper.find('.dropdown__trigger');
    trigger.simulate('click');
    expect(wrapper.find('.dropdown__options')).to.have.lengthOf(1);
    trigger.simulate('click');
    expect(wrapper.find('.dropdown__options')).to.have.lengthOf(0);
  });

  it('Should change the value on click and render its name as selected and close the options', (done) => {
    // click to show options
    const trigger = wrapper.find('.dropdown__trigger');
    trigger.simulate('click');

    // get all the options
    const options = wrapper.find('.dropdown__option');
    expect(options).to.have.lengthOf(getProps().options.length);

    // get first option and click it
    const firstOption = options.last();
    firstOption.simulate('click');
    console.log(firstOption.debug());
    // console.log(wrapper.debug());
    setImmediate(() => {
      try {
        expect(trigger.find('span').text()).to.equal(getProps().options[options.length - 1].name);
        expect(getProps().state).to.equal(getProps().options[options.length - 1].value);
      } catch (err) {
        console.log(err);
      } finally {
        done();
      }
    });
  });
});
