import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ClassCard from '../../../../../src/app/components/ClassCard/ClassCard';

describe('ClassCard component', () => {
  it('Should render without errors and render all props accordingly', () => {
    const wrapper = shallow(
      <ClassCard
        classCode="Xkd546"
        classLink="google.com"
        classTitle="Class Title"
        subject="Subject"
        grade="6th"
        studentCount={20}
      />
    );
    expect(wrapper.find('.class-card')).to.have.lengthOf(1);

    const classCode = wrapper.find('.class-card__code');
    expect(classCode).to.have.lengthOf(1);
    expect(classCode.text()).to.equal('Xkd546');

    const classTitle = wrapper.find('.class-card__title');
    expect(classTitle).to.have.lengthOf(1);
    expect(classTitle.text()).to.equal('Class Title');

    const classSubject = wrapper.find('.class-card__subject');
    expect(classSubject).to.have.lengthOf(1);
    expect(classSubject.text()).to.equal('Subject');

    const cardFooter = wrapper.find('.class-card__card-footer');
    expect(cardFooter.text()).to.equal('6th GRADE20 STUDENTS');
  });
});
