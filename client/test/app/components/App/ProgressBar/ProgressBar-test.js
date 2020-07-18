import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ProgressBar from '../../../../../src/app/components/ProgressBar/ProgressBar';

describe('ProgressBar component', () => {
  it('Should render without any errors', () => {
    const props = {
      total: 100,
      completed: 50,
      containerWidth: '100px',
      showDetails: true,
      units: 'MB',
      label: 'Label'
    };

    const wrapper = shallow(
      <ProgressBar
        {...props}
      />
    );

    const progressBar = wrapper.find('.progress-bar');
    expect(progressBar).to.have.lengthOf(1);
    expect(wrapper.find('.progress-bar__label')).to.have.lengthOf(1);
    expect(wrapper.find('.progress-bar__total')).to.have.lengthOf(1);
    expect(wrapper.find('.progress-bar__completed')).to.have.lengthOf(1);
    const details = wrapper.find('.progress-bar__details');
    expect(details).to.have.lengthOf(1);
    expect(details.text()).to.equal(`${props.completed}${props.units} out of ${props.total}${props.units}`);
  });

  it('Should not render label when not provided', () => {
    const props = {
      total: 100,
      completed: 50,
      containerWidth: '100px',
      showDetails: true,
      units: 'MB',
    };

    const wrapper = shallow(
      <ProgressBar
        {...props}
      />
    );

    expect(wrapper.find('progress-bar__label')).to.have.lengthOf(0);
  });

  it('Should not render details when showDetails is passed as false', () => {
    const props = {
      total: 100,
      completed: 50,
      containerWidth: '100px',
      showDetails: false,
      units: 'MB',
    };

    const wrapper = shallow(
      <ProgressBar
        {...props}
      />
    );

    expect(wrapper.find('progress-bar__details')).to.have.lengthOf(0);
  });
});
