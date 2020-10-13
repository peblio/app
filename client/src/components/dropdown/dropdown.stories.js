import React, { useState } from 'react';
import Dropdown from '../../app/components/Dropdown/Dropdown';

export default { title: 'Dropdown' };

export const dropdown = () => {
  const [value, setValue] = useState('');
  return (
    <Dropdown
      placeholder="Gradessssss"
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

export const dropdownWithLabel = () => {
  const [value, setValue] = useState('');
  return (
    <Dropdown
      label="label"
      placeholder="Gradessssss"
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

export const disabledDropdown = () => {
  const [value, setValue] = useState('');
  return (
    <Dropdown
      placeholder="Gradessssss"
      style={{ width: '100px' }}
      state={value}
      setState={setValue}
      disabled
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

export const buttonDropdown = () => {
  const [value, setValue] = useState('');
  return (
    <Dropdown
      placeholder="Gradessssss"
      style={{ width: '146px' }}
      state={value}
      setState={setValue}
      className="btn"
      options={[
        {
          name: '10th',
          value: 10,
          onClick: () => console.log('10th')
        },
        {
          name: '9th',
          value: 9,
          onClick: () => console.log('9th')
        },
        {
          name: '8th',
          value: 8,
          onClick: () => console.log('8th')
        },
      ]}
    />
  );
};
