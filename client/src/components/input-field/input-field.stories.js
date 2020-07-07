import React, { useState } from 'react';
import InputField from '../../app/components/InputField/InputField.jsx';

export default { title: 'InputField' };

export const clasroom = () => {
  const [value, setValue] = useState('');
  return (
    <InputField
      state={value}
      onChange={(e) => { setValue(e.target.value); }}
      label="*Class Name"
      placeholder="enter class name"
      containerWidth="813px"
    />
  );
};

export const subject = () => {
  const [value, setValue] = useState('');
  return (
    <InputField
      state={value}
      onChange={(e) => { setValue(e.target.value); }}
      label="Subject"
      placeholder="enter subject"
      containerWidth="199px"
    />
  );
};
