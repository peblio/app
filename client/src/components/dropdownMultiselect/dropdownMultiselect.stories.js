import React, { useState } from 'react';
import DropdownMultiselect from '../../app/components/DropdownMultiselect/DropdownMultiselect';

export default { title: 'DropdownMultiselect' };

export const dropdown = () => {
  const [selected, setSelected] = useState([]);
  return (
    <DropdownMultiselect
      placeholder="Gradessssss"
      style={{ width: '146px' }}
      selected={selected}
      setSelected={setSelected}
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
  const [selected, setSelected] = useState([]);
  return (
    <DropdownMultiselect
      label='Label'
      placeholder="Gradessssss"
      style={{ width: '146px' }}
      selected={selected}
      setSelected={setSelected}
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
