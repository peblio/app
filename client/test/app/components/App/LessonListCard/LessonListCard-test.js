import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import LessonListCard from '../../../../../src/app/components/LessonListCard/LessonListCard';

describe('LessonListCard component', () => {
  it('Should render without errors', () => {
    const wrapper = shallow(
      <LessonListCard>
        Hello
      </LessonListCard>
    );
    expect(wrapper.find('.lesson-list-card')).to.have.lengthOf(1);
    expect(wrapper.find('.lesson-list-card__color')).to.have.lengthOf(1);
    expect(wrapper.text()).to.equal('Hello');
  });
});
