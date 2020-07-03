import React, { useState } from 'react';
import Dropdown from '../../app/components/Dropdown/Dropdown';

export default { title: 'Dropdown' };

export const clasroom = () => {
  const [value, setValue] = useState('');
  return (
    <Dropdown 
      placeholder="Grade"
      style={{width: '100px'}} 
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
        },{
          name: '7th',
          value: 7
        },
        {
          name: '6th',
          value: 6
        }
      ]}
    />
  )
}