import React, { useState } from 'react';
import TextareaField from '../../app/components/TextareaField/TextareaField';

export default { title: 'TextareaField' };

export const clasroom = () => {
  const [value, setValue] = useState('');
  return (
    <TextareaField
      state={value}
      setState={setValue}
      label="Description"
      placeholder="type description..."
      containerWidth="813px"
      textareaHeight="96px"
    />
  )
}