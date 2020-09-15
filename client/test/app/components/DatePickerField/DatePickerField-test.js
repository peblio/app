import React, { useState } from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import DatePickerField from '../../../../src/app/components/DatePickerField/DatePickerField';

// const DatePickerFieldContainer = (props) => {
//   const [value, setValue] = useState('');
//   return (
//     // <DatePickerField
//     //   state={value}
//     //   setState={setValue}
//     //   {...props}
//     // />
//   );
// };

// describe('DatePickerField component', () => {
//   it('Should render without any errors', () => {
//     const wrapper = mount(
//       // <DatePickerFieldContainer
//       //   placeholder="mm/dd/yy"
//       //   label="Label"
//       // />
//       <DatePickerFieldContainer
//         label="Label"
//         placeholder="Placeholder"
//       />
//     );

//     expect(wrapper.find('.date-picker-field')).to.have.lengthOf(1);
//     // expect(wrapper.find('.date-picker-field__label')).to.have.lengthOf(1);
//     // expect(wrapper.find('.date-picker-field__input-container')).to.have.lengthOf(1);
//     // expect(wrapper.find('.date-picker-field__input-container__input')).to.have.lengthOf(1);
//     // expect(wrapper.find('.date-picker-field__input-container__icon')).to.have.lengthOf(1);
//     // expect(wrapper.find('.date-picker-field__calendar-container')).to.have.lengthOf(1);
//   });
// });


const DatePickerFieldContainer = (props) => {
  const [value, setValue] = useState();
  return (
    <DatePickerField
      state={value}
      setState={setValue}
      label="Label"
      containerWidth="276px"
    />
  );
};

describe('DatePickerField component', () => {
  it('Should render without any errors', () => {
    const wrapper = mount(
      <DatePickerFieldContainer
        label="Label"
        containerWidth="100px"
        placeholder="Placeholder"
      />
    );
    expect(wrapper.find('.date-picker-field')).to.have.lengthOf(1);
    expect(wrapper.find('.date-picker-field__label')).to.have.lengthOf(1);
    expect(wrapper.find('.date-picker-field__input-container')).to.have.lengthOf(1);
    expect(wrapper.find('.date-picker-field__input-container__input')).to.have.lengthOf(1);
    expect(wrapper.find('.date-picker-field__input-container__icon')).to.have.lengthOf(1);
    expect(wrapper.find('.date-picker-field__calendar-container')).to.have.lengthOf(1);
  });
});
