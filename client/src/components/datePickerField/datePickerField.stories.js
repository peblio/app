import React, { useState } from 'react';
import DatePickerField from '../../app/components/DatePickerField/DatePickerField';

export default { title: 'DatePickerField' };

export const datePickerField = () => {
  const [date, setDate] = useState(new Date());

  return (
    <DatePickerField
      state={date}
      setState={setDate}
      label="Label"
      containerWidth="276px"
    />
  );
};
