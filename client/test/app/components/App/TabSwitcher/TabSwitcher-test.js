import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import TabSwitcher from '../../../../../src/app/components/TabSwitcher/TabSwitcher';

describe('ToggleButton component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <TabSwitcher
        className='custom-class'
        tabs={[
          {
            label: 'Tab 1',
            component: 'Component 1'
          },
          {
            label: 'Tab 2',
            component: 'Component 2'
          }
        ]}
      />
    );
  });

  it('Should render without errors', () => {
    expect(wrapper.find('.tab-switcher')).to.have.lengthOf(1);
    expect(wrapper.find('.tab-switcher__tabs')).to.have.lengthOf(1);

    const tabs = wrapper.find('.tab-switcher__tabs__tab');
    expect(tabs).to.have.lengthOf(2);

    const firstTab = tabs.first();
    const secondTab = tabs.last();
    expect(firstTab.text()).to.equal('Tab 1');
    expect(secondTab.text()).to.equal('Tab 2');

    expect(wrapper.find('.tab-switcher__tabs__tab--selected')).to.have.lengthOf(1);
    expect(wrapper.find('.tab-switcher__selected-tab')).to.have.lengthOf(1);
    expect(wrapper.find('.tab-switcher__selected-tab').text()).to.equal('Component 1');
  });

  it('Should also have aditional className (passed as prop) applied ', () => {
    expect(wrapper.find('.tab-switcher.custom-class')).to.have.lengthOf(1);
    expect(wrapper.find('.tab-switcher__tabs.custom-class__tabs')).to.have.lengthOf(1);
    expect(wrapper.find('.tab-switcher__tabs__tab.custom-class__tabs__tab')).to.have.lengthOf(2);
    expect(wrapper.find('.tab-switcher__tabs__tab--selected.custom-class__tabs__tab--selected')).to.have.lengthOf(1);
    expect(wrapper.find('.tab-switcher__selected-tab.custom-class__selected-tab')).to.have.lengthOf(1);
  });

  it('Should switch tabs when clicked on a second tab', () => {
    const tabs = wrapper.find('.tab-switcher__tabs__tab');

    const secondTab = tabs.last();
    secondTab.simulate('click');
    expect(wrapper.find('.tab-switcher__selected-tab').text()).to.equal('Component 2');
  });
});
